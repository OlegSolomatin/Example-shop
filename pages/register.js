import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { getErrorMessage } from '../utils/erorr';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function LoginScreen() {
    const { data: session } = useSession();

    const router = useRouter();
    const { redirect } = router.query;

    useEffect(() => {
        if (session?.user) {
            router.push(redirect || '/');
        }
    }, [router, session, redirect]);

    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm();

    const submitHandler = async ({ name, email, password, login, secondName }) => {
        try {
            await axios.post('/api/auth/signup', {
                login,
                name,
                secondName,
                email,
                password,
            });

            const result = await signIn('credentials', {
                redirect: false,
                login,
                password,
            });
            if (result.error) {
                toast.error(result.error);
            }
        } catch (err) {
            toast.error(getErrorMessage(err));
        }
    };
    return (
        <Layout title="Create Account">
            <form
                className="mx-auto max-w-screen-md"
                onSubmit={handleSubmit(submitHandler)}
            >
                <h1 className="mb-4 text-xl">Create&nbsp;Account</h1>
                <div className="mb-4">
                    <label htmlFor="login">Username</label>
                    <input
                        type="text"
                        className="w-full"
                        id="login"
                        minLength="4"
                        maxLength="20"
                        autoFocus
                        {...register('login', {
                            required: 'Please enter login',
                        })}
                    />
                    {errors.login && (
                        <div className="text-red-500">{errors.login.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="w-full"
                        id="name"
                        minLength="2"
                        maxLength="20"
                        {...register('name', {
                            required: 'Please enter name',
                        })}
                    />
                    {errors.name && (
                        <div className="text-red-500">{errors.name.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="secondName">Second&nbsp;Name</label>
                    <input
                        type="text"
                        className="w-full"
                        id="secondName"
                        minLength="2"
                        maxLength="20"
                        {...register('secondName', {
                            required: 'Please enter Second Name',
                        })}
                    />
                    {errors.sacondName && (
                        <div className="text-red-500">{errors.secondName.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Please enter email',
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                message: 'Please enter valid email',
                            },
                        })}
                        className="w-full"
                        id="email"
                    ></input>
                    {errors.email && (
                        <div className="text-red-500">{errors.email.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: 'Please enter password',
                            minLength: { value: 6, message: 'password is more than 5 chars' },
                        })}
                        className="w-full"
                        id="password"
                        autoFocus
                    ></input>
                    {errors.password && (
                        <div className="text-red-500 ">{errors.password.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword">Confirm&nbsp;Password</label>
                    <input
                        className="w-full"
                        type="password"
                        id="confirmPassword"
                        {...register('confirmPassword', {
                            required: 'Please enter confirm password',
                            validate: (value) => value === getValues('password'),
                            minLength: {
                                value: 6,
                                message: 'confirm password is more than 5 chars',
                            },
                        })}
                    />
                    {errors.confirmPassword && (
                        <div className="text-red-500 ">
                            {errors.confirmPassword.message}
                        </div>
                    )}
                    {errors.confirmPassword &&
                        errors.confirmPassword.type === 'validate' && (
                            <div className="text-red-500 ">Password do not match</div>
                        )}
                </div>

                <div className="mb-4 ">
                    <button className="primary-button">Create&nbsp;an&nbsp;Account</button>
                </div>
                <div className="mb-4 ">
                    Already have an account? &nbsp;
                    <Link href={`/login`}>Sing In</Link>
                </div>
            </form>
        </Layout>
    );
}