import React from 'react';
import Link from "next/link";
import Image from "next/image";

export default function Product({product, addToCartHandler}) {
    return (
        <div className="card">
            <Link href={`/product/${product.slug}`}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        className="rounded shadow"
                        width={250}
                        height={250}
                    />
            </Link>
            <div className="flex flex-col items-center justify-center p-5">
                <Link href={`/product/${product.slug}`}>
                        <h2 className="text-lg">{product.name}</h2>
                </Link>
                <p className="mb-2">{product.brand}</p>
                <p className={'mb-2'}>${product.price}</p>
                <button className="primary-button" type="button" onClick={() => addToCartHandler(product)}>
                    Add to cart
                </button>
            </div>
        </div>
    );
}