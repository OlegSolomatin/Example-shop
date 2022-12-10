import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
/*import GoogleProvider from "next-auth/providers/google";*/
import User from "../../../models/User";
import db from "../../../utils/db"
import bcrypt from "bcryptjs"

export default NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    callback: {
        /*redirect: async (url, baseUrl) => {
            if (url === '/api/auth/signup') {
                return Promise.resolve('/profile')
            }
            return Promise.resolve('/api/auth/signup')
        },
        async signIn({ account, profile }) {
            if (account.provider === "google") {
                return profile.email_verified && profile.email.endsWith("@example.com")
            }
            return true // Do different verification for other providers that don't have `email_verified`
        },*/
        async jwt({session, token, user, login}) {

            /*if(user?._id) token._id = user._id;
            if(user?.isAdmin) token.isAdmin = user.isAdmin;*/
            /*token.id = login.id*/
            token.accessToken = user.access_token
            token.login = login
            return { ...token, ...user }
            /*return token;*/
        },
        async session ({session, user, token, login}) {
            /*if(token?._id) session.user._id = token._id;
            if(token?.isAdmin) session.user.isAdmin = token.isAdmin;*/
            /*user.login = session.login*/
            console.log("--Session CALLED--", session, "--user--", user, "--token--", token);
            session.user.login = user.login
            session.user._id = user._id
            session.user._id = token._id
            session.user._id = _id
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
                    console.log(user._id)
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
        }),
        /*GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })*/
    ],
})