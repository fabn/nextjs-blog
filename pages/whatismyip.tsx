import React, {useEffect, useState} from "react";
import Head from 'next/head'
import Layout, {siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import useSWR from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

function useCurrentIp() {
    const {data, error} = useSWR('https://jsonip.com', fetcher)
    return {
        ip: data.ip,
        isLoading: !error && !data,
        isError: error
    }
}

function MyIpAddress() {
    const {ip, isLoading, isError} = useCurrentIp()
    if (isLoading) return <h4>Loading data...</h4>
    if (isError) return <h4>Error while fetching</h4>
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
