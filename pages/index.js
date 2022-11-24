import Layout from '../components/Layout'
import ProductItem from "../components/Product";
import Product from "../models/Product"
import db from "../utils/db";
import axios from "axios";
import {useContext} from "react";
import {Store} from "../utils/Store";
import {toast} from "react-toastify";

export default function Home({products}) {

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

    return (
        <Layout title={'Home Page'}>
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

export async function getServerSideProps() {
    await db.connect()

    const products = await Product.find().lean()

    return{
        props: {
            products: products.map(db.convertDocToObj)
        }
    }
}
