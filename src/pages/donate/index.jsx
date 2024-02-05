import { Box, Spacer } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { isMobile } from "react-device-detect";
import { Footer } from "../../components/Footer";
import DonationForm from '../../components/donate/donationForm';
import Navbar from "../../components/Navbar";
import { useRouter } from 'next/router'

const Donate = () => {
    const router = useRouter()
    const donationData = new URLSearchParams(router.asPath.split(/\?|#/)[1]); // Extract query parameters


    return (
        <Box>

            <Head>
                <title>Good Deeds | Donate Now</title>
                <meta name="description" content="Post Listing Good Deeds" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <DonationForm donationData= {donationData}/>
            <Spacer />
            {isMobile ? null : <Footer />}
        </Box>
    );
}

export default Donate;

