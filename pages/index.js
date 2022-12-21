import Layout from '../components/Layout'
import ProductItem from "../components/Product";
import Product from "../models/Product"
import db from "../utils/db";
import axios from "axios";
import React, {useContext, useEffect} from "react";
import {Store} from "../utils/Store";
import {toast} from "react-toastify";
import {useUserAgent} from "next-useragent";
import {useRouter} from 'next/router';

const DesktopContent = 'DesktopContent'
const MobileContent = 'MobileContent'

export default function Home({products, uaString}) {

    /*Check user agent*/
    let ua = useUserAgent(uaString);
    console.log(ua);

    const {state, dispatch} = useContext(Store);
    const { cart } = state

    const addToCartHandler = async (product) => {
        const existItem = cart.cartItems.find(c => c.slug === product.slug)
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`)
        if(data.countInStock < quantity){
            return toast.error('Sorry. Product is out of stock')
        }
        dispatch({type: 'CART_ADD_ITEM', payload: { ...product, quantity}})
        toast.success('Product added to cart')
    }

    const { asPath } = useRouter();
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';

    const URL = `${origin}${asPath}`;
    let urlTg = 'false'
    const router = useRouter()
    useEffect(() => {
        if(URL.includes('tg')) {
            router.push('https://45dd-213-24-126-79.eu.ngrok.io/telegram/')
        }
    })
    /*if (URL.includes('tg')){
        urlTg = 'true'
        router.push('https://45dd-213-24-126-79.eu.ngrok.io/telegram/')
    }*/

    return (
        <Layout title={'Home Page'}>
            {/*<div className={'text-indigo-700'}>
                <div>
                    <span>{urlTg}</span>
                </div>
                <div>
                    <span>{ua.os}</span> <span>{ua.osVersion}</span>
                </div>
                <div>
                    <span>Browser: </span><span>{ua.browser} </span><span>{ua.browserVersion}</span>
                </div>
                <div>
                    <span>Device Type: </span>
                    {
                        ua.deviceType? (
                            <span>{ua.deviceType}</span>
                        ) : (
                            <span>false</span>
                        )
                    }
                </div>
                <div>
                    <span>Device Vendor: </span>
                    {
                        ua.deviceVendor? (
                            <span>{ua.deviceVendor}</span>
                        ) : (
                            <span>false</span>
                        )
                    }
                </div>
                <div>
                    <span>Engine: </span>
                    {
                        ua.engine?(
                            <span>{ua.engine}</span>
                        ) : (
                            <span>false</span>
                        )
                    }
                </div>
                <div>
                    <span>Bot: </span>
                    {
                        ua.isBot? (
                            <span>true</span>
                        ) : (
                            <span>false</span>
                        )
                    }
                </div>
                <div>
                    <span>IOS: </span>
                    {
                        ua.isIos? (
                            <span>true</span>
                        ) : (
                            <span>false</span>
                        )
                    }
                </div>
                <div>
                    <span>Mobile: </span>
                    {
                        ua.isMobile? (
                            <span>true</span>
                        ) : (
                            <span>false</span>
                        )
                    }
                </div>
            </div>*/}
            <div className={'grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 items-center'}>
                {products.map((product) => (
                    <ProductItem product={product} key={product.slug}
                                 addToCartHandler={addToCartHandler}
                    ></ProductItem>
                ))}
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    await db.connect()

    const products = await Product.find().lean()

    return{
        props: {
            products: products.map(db.convertDocToObj),
            uaString: context.req.headers['user-agent']
        }
    }
}
