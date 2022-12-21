import React, {useEffect} from 'react';
import Layout from "../../components/Layout";

export default function Telegram(){

    /*const tgClose = window.Telegram.WebApp;

    useEffect(() => {
        tg.ready();
    }, [])*/

    const closeTgWebApp = () => tgClose();

    return(
        <Layout title={'Telegram-app'} tg={true}>
            <div className={'container-tg'}>
                Telegram App
                <button onClick={closeTgWebApp}>Close Tg</button>
                <span>{document.querySelector('meta[name="description"]')}</span>
            </div>
        </Layout>
    )
}