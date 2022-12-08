import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';

async function handler(req, res) {
    if (req.method !== 'POST') {
        return;
    }
    const { login, name, secondName, email, password } = req.body;
    if (
        !login ||
        !name ||
        !secondName ||
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 5
    ) {
        res.status(422).json({
            message: 'Validation error',
        });
        return;
    }

    await db.connect();

    //check if user already exists email or login
    const existingUserLogin = await User.findOne({ login: login });
    const existingUserEmail = await User.findOne({ email: email });
    if (existingUserLogin || existingUserEmail) {
        res.status(422).json({ message: 'User exists already!' });
        await db.disconnect();
        return;
    }
    //end check if user already exists email or login

    //create new user
    const newUser = new User({
        login,
        name,
        secondName,
        email,
        password: bcryptjs.hashSync(password),
        isAdmin: false,
    });

    const user = await newUser.save();
    await db.disconnect();
    res.status(201).send({
        message: 'Created user!',
        _id: user._id,
        login: user.login,
        name: user.name,
        secondName: user.secondName,
        email: user.email,
        isAdmin: user.isAdmin,
    });
}

export default handler;