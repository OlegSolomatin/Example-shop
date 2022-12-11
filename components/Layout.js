import React, {useContext, useEffect, useState} from 'react';
import Head from "next/head";
import styles from "../styles/Header.module.css"
import Link from "next/link";
import {Store} from "../utils/Store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {signOut,useSession} from "next-auth/react";
import  { Menu } from "@headlessui/react";
import DropdownLink from "./DropdownLink";
import Cookies from 'js-cookie'
import { Avatar } from "@nextui-org/react";

export default function Layout({title,children}) {

    const { status , data: session } = useSession()
    const { state, dispatch } = useContext(Store)
    const { cart } = state;
    const [cartItemsCount, setCartItemsCount] = useState(0);
    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((acc, item) => acc + item.quantity, 0))
    }, [cart.cartItems]);

    const logoutHandler = () => {
        Cookies.remove('cart')
        dispatch({ type: 'CART_RESET'})
        signOut({callbackUrl: '/login'})
    }

    return(
        <>
            <Head>
                <title>{title ? title + ' - Brand Name' : 'Brand Name'}</title>
                <meta name="description" content={'Example shop'} />
                <link rel="icon" type="public/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
                <meta name="msapplication-TileColor" content="#2b5797"/>
                <meta name="msapplication-TileImage" content="/mstile-144x144.png"/>
                <meta name="theme-color" content="#ffffff"/>
            </Head>

            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className={styles.container}>
                <header>
                    <nav className='flex h-12 px-4 justify-between shadow-md items-center rounded-b-lg'>
                        <Link href="/" className='text-lg font-bold'>
                            Brand Name
                        </Link>
                        <div className={'flex items-center'}>
                            <Link href='/cart' className='p-2'>
                                Cart
                                {cartItemsCount > 0 && (
                                    <span className={'leading-none ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'}>
                                        {cartItemsCount}
                                    </span>
                                )}
                            </Link>
                            {status === 'loading' ? (
                                'Loading'
                            ) : session?.user ? (
                                <Menu as={'div'} className={'relative inline-block'}>
                                    <Menu.Button className={'text-blue-600 text-2xl uppercase'}>
                                        <Avatar
                                            text={session.user.name}
                                            color="primary"
                                            size="sm"
                                            textColor="white"
                                            bordered
                                            squared
                                        />
                                    </Menu.Button>
                                    <Menu.Items className={'absolute right-0 w-56 origin-top-right bg-white rounded-lg shadow-lg'}>
                                        <Menu.Item>
                                            <DropdownLink className={'dropdown-link'} href={'/profile'}>
                                                Profile
                                            </DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <DropdownLink className={'dropdown-link'} href={'/order-history'}>
                                                Order&nbsp;History
                                            </DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <DropdownLink className={'dropdown-link'} href={'#'} onClick={logoutHandler}>
                                                Log&nbsp;Out
                                            </DropdownLink>
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            ) : (
                                <Link className={'p-2'} href="/login">
                                    Sing In
                                </Link>
                            )}
                        </div>
                    </nav>
                </header>

                <main className='container m-auto mx-0 mt-4 px-4'>{children}</main>

                <footer className='flex h-10 justify-center items-center shadow-inner rounded-t-lg'><p>
                    Copyright &copy; 2022 Brand Name
                </p></footer>
            </div>
        </>
    )

}