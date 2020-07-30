import React from "react";
import Head from 'next/head'
import Layout, {siteTitle} from '../components/layout'
import Link from 'next/link'
import useSWR from 'swr'
import axios from 'axios'
import {Button, Dimmer, Divider, Loader, Segment} from "semantic-ui-react";
import { FaBeer } from 'react-icons/fa';

const fetcher = url => axios.get(url).then(res => res.data)

function useCurrentIp() {
    const {data = {}, error} = useSWR('https://jsonip.com', fetcher)
    return {
        ip: data.ip,
        isLoading: !error && !data,
        isError: error
    }
}

function MyIpAddress() {
    const {ip, isLoading} = useCurrentIp()

    return <Dimmer.Dimmable as={Segment} dimmed={isLoading} color={'red'}>
        <Dimmer active={isLoading} inverted>
            <Loader>Loading</Loader>
        </Dimmer>

        Your current ip address is: <code>{ip}</code>
    </Dimmer.Dimmable>
}

export default function WhatIsMyIp() {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <MyIpAddress/>

            <Segment textAlign='center'>
                <FaBeer size={250} color={'red'} title={'beer'}/>
            </Segment>

            <Divider/>

            <Link href={'/'}>
                <Button fluid as='a'>Go back to home page</Button>
            </Link>
        </Layout>
    )
}
