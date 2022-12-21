/*import { useSession, signIn, signOut } from "next-auth/react"

export default function AccessToken() {

    const { data: session, status } = useSession();
    if(status === 'authenticated') {
        const { accessToken } = session;
        console.log(session, status);
    }

    return (
        <>
        {
            status === 'authenticated' ? (
                <>
                    <div>Access Token: {accessToken}</div>
                    <div>Status: {status}</div>
                    <div>Email: {session.user.email}</div>
                    <div>Id: {session.user._id}</div>
                    {/!*<div>Device: {info}</div>*!/}
                </>
            ) : (
                <>
                    <div>{status}</div>
                </>
            )
        }
        </>
    )
}*/