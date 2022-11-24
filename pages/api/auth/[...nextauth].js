import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import User from "../../../models/User";
import db from "../../../utils/db"
import bcrypt from "bcryptjs"

export default NextAuth({
    session: {
        strategy: 'jwt'
    },
    callback: {
        async jwt({token, user}) {
            if(user?._id) token._id = user._id;
            if(user?.isAdmin) token.isAdmin = user.isAdmin;
            return token;
        },
        async session ({session, token}) {
            if(token?._id) session.user._id = token._id;
            if(token?.isAdmin) session.user.isAdmin = token.isAdmin;
            return session;
        }
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                await db.connect();
                const user = await User.findOne({
                    login: credentials.login,
                })
                await db.disconnect();
                if(user && bcrypt.compareSync(credentials.password, user.password)){
                    return {
                        _id: user._id,
                        login: user.login,
                        name: user.name,
                        secondName: user.secondName,
                        email: user.email,
                        image: 'f',
                        isAdmin: user.isAdmin
                    }
                }
                throw new Error('Invalid login or password')
            }
        })
    ],
})