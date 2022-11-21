import React from 'react';
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return(
        <Header>
            <nav className={"flex h-12 px-4 justify-between shadow-amber-700 item-center"}>
                <Link href="#">
                    <a className={'text-lg font-bold'}>Brand Name</a>
                </Link>
                <div>
                    <Link href="/cart">
                        <a className={'p-2'}>Cart</a>
                    </Link>
                    <Link href="/login">
                        <a className={'p-2'}>Login</a>
                    </Link>
                </div>
            </nav>
        </Header>
    )
}
