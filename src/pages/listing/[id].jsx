import { Box, Spacer } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useCallback, useState } from "react";
import { Footer } from "../../components/Footer";
import ListingView from "../../components/Listing/listingView";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";
import { baseUrl, isLogin, accessToken } from "../../components/Helper/index";
import axios from "axios";
import Navbar from "../../components/Navbar";

const EditListing = () => {


  return (
    <>
        <Box>
          <Head>
            {/* <title>Good Deeds | Listing Good Deeds</title> */}
            <link
              rel="stylesheet"
              type="text/css"
              charset="UTF-8"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            {/* <title>Good Deeds | An Online Marketplace of Opportunities</title> */}
            <link rel="icon" href="/favicon.ico" />
            {/* <meta name="title" content="A marketplace of opportunity" /> */}
            {/* <meta name="description" content={listingData?.description} /> */}
            {/* <meta name="keywords" content={tagsAarray.toString()} /> */}
            <meta name="robots" content="index, follow" />
            <meta
              http-equiv="Content-Type"
              content="text/html; charset=utf-8"
            />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="1 days" />

            {/* <meta property="og:title" content="A marketplace of opportunity" />
            <meta
              property="og:description"
              content="A marketplace of opportunity. An online community of do-gooders; paying it forward, and getting rewarded."
            /> */}
            {/* <meta property="og:image" content="/gd-favicon.ico" /> */}
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
          <ListingView />
          <Spacer />
          {isMobile ? null : <Footer />}
        </Box>
    </>
  );
};

export default EditListing;
