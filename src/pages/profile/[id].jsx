import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from 'next/router'
import React, { useState, useEffect } from "react";
import { Footer } from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Spinner } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';
import { baseUrl } from '../../components/Helper/index';
import axios from "axios";
import { isMobile } from "react-device-detect";
import { PublicProfileTabs } from "../../components/Profile/PublicProfileTabs";
import { PublicProfileBanner } from "../../components/Profile/PublicProfileBanner";

function PublicProfile() {

    const [isLoading, setIsLoading] = useState(true);
    const [listingData, setListingData] = useState([]);
    const [profileData, setProfileData] = useState([]);
    const router = useRouter()

    const getProfileDetails = (username) => {
        setIsLoading(true);
        axios.get(`${baseUrl}/member/profile/${username}`)
            .then(res => {
                setProfileData(res?.data?.message)
                setIsLoading(false);
            }).catch(err => {
                console.log(err);
                setIsLoading(false);
            })
    }

    const getProfileListing = (username) => {
        setIsLoading(true);
        axios.get(`${baseUrl}/member/listings/${username}`)
            .then(res => {
                setListingData(res?.data?.data);
                setIsLoading(false);
            }).catch(err => {
                console.log(err);
                setIsLoading(false);
            })
    }

    useEffect(() => {

        if (router?.query.id !== undefined && router?.query.id !== '') {
            getProfileDetails(router?.query.id);
            getProfileListing(router?.query.id);
        }

    }, [router.query]);

    return (

        <Box>
            <Head>
                {/* <title>Good Deeds | Profile</title> */}
                <title>Good Deeds | An Online Marketplace of Opportunities</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="title" content="A marketplace of opportunity" />
                <meta name="description" content="A marketplace of opportunity. An online community of do-gooders; paying it forward, and getting rewarded." />
                <meta name="keywords" content="Marketplace, Goodddeds, Canada, Toronto, Ontario, Community" />
                <meta name="robots" content="index, follow" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="language" content="English" />
                <meta name="revisit-after" content="1 days" />

                <meta property="og:title" content="A marketplace of opportunity" />
                <meta property="og:description" content="A marketplace of opportunity. An online community of do-gooders; paying it forward, and getting rewarded." />
                <meta property="og:image" content="/gd-favicon.ico" />
                {/* <meta property="og:url" content="" /> */}
                <meta property="og:site_name" content="Good Deeds" />

                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=UA-230154537-1`}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'UA-230154537-1', {
                        page_path: window.location.pathname,
                        });
                    `,
                    }}
                />
            </Head>
            <Navbar />
            {isLoading &&
                <Center h='500px' >
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='orange.200'
                        color='orange.500'
                        size='xl'
                    />
                </Center>
            }
            {!isLoading &&
                <>
                    <PublicProfileBanner
                        listingDataLength={listingData.length}
                        profileData={profileData}
                    />
                    <PublicProfileTabs
                        listingData={listingData}
                    />
                </>
            }
            {isMobile ? null : <Footer />}
        </Box >
    );
}

export default PublicProfile;
