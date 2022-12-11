import React, { useEffect } from 'react';
import Layout from "../components/Layout";
import Link from "next/link";
import { useForm } from "react-hook-form"
import { signIn, useSession} from "next-auth/react";
import { getErrorMessage } from "../utils/erorr"
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function Login() {

    const { data: session } = useSession();

    const router = useRouter();
    const { redirect } = router.query

    useEffect(() => {
        if(session?.user){
            router.push(redirect || '/')
        }
    }, [router,session, redirect]);
    

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm()

    const submitHandler = async ({login, password}) => {
        try {
            const result = await signIn(
                'credentials', {
                    redirect: false,
                    login,
                    password
                }
            )
            if (result.error) {
                toast.error(result.error)
            }
        } catch (err) {
            toast.error(getErrorMessage(err))
        }
    }

    return (
        <Layout title={'Login'}>
            <div className="container-login-signin">
                <form action="" className={'w-full'} onSubmit={handleSubmit(submitHandler)}>
                    <h1 className={'mb-4 text-lg'}>Sign In</h1>
                    <div className={'mb-4'}>
                        <label htmlFor="login">
                            Username
                        </label>
                        <input type="login"
                               className="w-full"
                               id="login"
                               autoFocus
                               {...register('login', {
                                   required: 'Please enter your login',
                                   pattern: {
                                       value: /^[a-zA-Z](.[a-zA-Z0-9_-]*)$/,
                                       message: 'Please enter valid login'
                                   }
                               })}
                        />
                        {errors.login && (
                            <div className={'text-red-500'}>{errors.login.message}</div>
                        )}
                    </div>
                    <div className={'mb-4'}>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input type="password"
                               className="w-full"
                               id="password"
                               autoFocus
                               {...register('password', {
                                   required: 'Please enter your password',
                                   minLength: { value: 6, message: 'Please enter at least 6 characters'}
                               })}
                        />
                        {errors.password && (
                            <div className={'text-red-500'}>{errors.password.message}</div>
                        )}
                    </div>
                    <div className={'mb-4'}>
                        <button className={'prymaryButton'}>
                            Sign In
                        </button>
                    </div>
                </form>
                <p>Or</p>
                {/*<div className={'container-social-auth'}>
                    <button onClick={signIn()}>SignIn with Goolge</button>
                </div>*/}
                <div className="mb-4">Don&apos;t have an account? &nbsp;
                    <Link href={`/register?redirect=${redirect || '/'}`}>Create account</Link>
                </div>
            </div>

        </Layout>
    )
}