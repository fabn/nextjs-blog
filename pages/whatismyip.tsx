import React, {useEffect, useState} from "react";
import Head from 'next/head'
import Layout, {siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

function MyIpAddress() {
    const [ip, setIp] = useState('127.0.0.1');
    useEffect(() => {
        fetch('https://jsonip.com').then(r => r.json()).then(data => {
            console.log('Got ip address info', data);
            setIp(data.ip);
        })
    }, []);
    return <h4>Your Ip address is: <code>{ip}</code></h4>
}

export default function WhatIsMyIp() {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>What Is My Ip Address</h2>
                <MyIpAddress/>
            </section>
            <section>
                <h3>
                    <Link href={'/'}><a>Go back to home page</a></Link>
                </h3>
            </section>
        </Layout>
    )
}
