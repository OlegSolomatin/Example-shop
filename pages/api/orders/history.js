import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import db from '../../../utils/db';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send({ message: 'signin required' });
    }
    const { user } = session;

    await db.connect();
    let orders;
    let ordersUser;
    if (user.isAdmin) {
        orders = await Order.find({});
        await db.disconnect();
        res.send(orders);
    } else {
        ordersUser = await Order.find({user : user._id});
        await db.disconnect();
        res.send(ordersUser);
    }
};

export default handler;