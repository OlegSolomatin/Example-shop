import { useSession, signIn, signOut } from "next-auth/react"
export default function AccessToken() {
    const { data: session, status } = useSession()
    const { accessToken } = session
    console.log(session, status);
    return (
        <>
            <div>Access Token: {accessToken}</div>
            <div>Status: {status}</div>
            <div>Email: {session.user.email}</div>
            <div>Id: {session.user._id}</div>
        </>
    )
}