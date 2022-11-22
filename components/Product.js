import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Image from "next/image";

export default function Product() {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch('https://fakestoreapi.com/products?limit=10')
            .then(res=>res.json())
            .then(json=> {
                setData(json);
                console.log(json);
            }).catch(err => console.error(err));
    },[]);

    return (
        <>
            { data.map((obj, index) => (
                <div key={obj.id} className={'card'}>
                    <Link  href={'#'}>
                        <Image src={obj.image} alt={obj.title} width={500} height={500} className={'rounded shadow'}/>
                    </Link>
                    <div className="flex flex-col items-center p-4 justify-center">
                        <Link href={'#'}>
                            <h2 className="text-lg mb-2 h-[3.5rem] line-clamp-2 text-ellipsis break-all">{obj.title}</h2>
                        </Link>
                        <p className="mb-2 h-[48px] line-clamp-2 text-ellipsis break-all">{obj.description}</p>
                        <p className="mb-2">{obj.price}</p>
                        <button className={'primary-button'} type={'button'}>Add to Cart</button>
                    </div>
                </div>
            ))}
        </>
    )
}