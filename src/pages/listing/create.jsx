import { Box, Spacer } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { isMobile } from "react-device-detect";
import { Footer } from "../../components/Footer";
import CreateListingForm from '../../components/Listing';
import Navbar from "../../components/Navbar";
import { GOOGLE_API_KEY } from '../../components/Helper'
const CreateListing = () => {
    return (
        <Box>

            <Head>
                <title>Good Deeds | Post Listing Good Deeds</title>
                <meta name="description" content="Post Listing Good Deeds" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <CreateListingForm />
            <Spacer />
            {isMobile ? null : <Footer />}
        </Box>
    );
}

export default CreateListing;
