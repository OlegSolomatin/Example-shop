import React from 'react';
/*import Header from './Header';
import Main from './Main'
import Footer from './Footer'*/
import Head from "next/head";
import styles from "../styles/Header.module.css"
import Link from "next/link";
import Data from "../utils/data"


export default function Layout({title,children}) {
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

            <div className={styles.container}>
                <header>
                    <nav className='flex h-12 px-4 justify-between shadow-md shadow-amber-700 items-center'>
                        <Link href="/" className='text-lg font-bold'>
                            Brand Name
                        </Link>
                        <div>
                            <Link href='/cart' className='p-2'>
                                Cart
                            </Link>
                            <Link href='/login' className='p-2'>
                                Login
                            </Link>
                        </div>
                    </nav>
                </header>

                <main className='container m-auto mx-0 mt-4 px-4'>{children}</main>

                <footer className='flex h-10 justify-center items-center shadow-inner shadow-amber-700'><p>
                    Copyright &copy; 2022 Brand Name
                </p></footer>
            </div>
        </>
    )

}