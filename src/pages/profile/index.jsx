import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React, { useState, useEffect, useCallback } from "react";
import { Footer } from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { ProfileBanner } from "../../components/Profile/ProfileBanner";
import { MyTabs } from "../../components/Profile/Tabs";
import { Spinner } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';
import { isLogin, accessToken, baseUrl, isProfileCompleted, Logout } from '../../components/Helper/index';
import Router from "next/router";
import axios from "axios";
import { isMobile } from "react-device-detect";

function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [listingData, setListingData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [applicationsData, setApplicationsData] = useState([]);
  const [referCode, setReferCode] = useState("");

  const getProfileDetails = useCallback(async () => {
    setIsLoading(true);
    const data = await axios.get(`${baseUrl}/user/info`, {
      headers: {
        Authorization: "Bearer " + accessToken(),
      },
    });
    if (data.status === 200) {
      setProfileData(data.data.data)
      setTimeout(() => {
        setIsLoading(false);
      }, 1000)
    }
  }, []);

  const getReferCode = useCallback(async () => {
    const data = await axios.get(`${baseUrl}/member/referral-code`, {
      headers: {
        Authorization: "Bearer " + accessToken(),
      },
    });
    if (data.status === 200) {
      setReferCode(data.data['referral-code'] || "")

    }
  }, []);

  const getProfileListing = useCallback(async () => {
    setIsLoading(true);
    const data = await axios.get(`${baseUrl}/user/member-listings`, {
      headers: {
        Authorization: "Bearer " + accessToken(),
      },
    });
    if (data.status === 200) {
      setListingData(data.data.data)
      // setIsLoading(false);
    }
  }, []);

  const getTransactionData = useCallback(async () => {
    setIsLoading(true);
    const data = await axios.get(`${baseUrl}/user/transections`, {
      headers: {
        Authorization: "Bearer " + accessToken(),
      },
    });
    if (data.status === 200) {
      setTransactionData(data.data.data)
      // setIsLoading(false);
    }
  }, []);

  const getApplicationsData = useCallback(async () => {
    setIsLoading(true);
    const data = await axios.get(`${baseUrl}/application`, {
      headers: {
        Authorization: "Bearer " + accessToken(),
      },
    });
    if (data.status === 200) {
      setApplicationsData(data.data.data)
      // setIsLoading(false);
    }
  }, []);

  useEffect(() => {

    if (!isLogin()) {
      Router.push({ pathname: "/" })
    } else {
      if (!isProfileCompleted()) {
        Logout();
        Router.push({ pathname: "/", query: { isCompleted: 'false' } });
      } else {
        setIsLoading(false);
        getReferCode();
        getProfileDetails();
        getProfileListing();
        getTransactionData();
        getApplicationsData();
      }

    }
  }, []);

  return (

    <Box style={{overflowX:"hidden"}}>
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
          <ProfileBanner
            listingDataLength={listingData.length}
            transactionDataLength={transactionData.length}
            profileData={profileData}
            referCode={referCode}
          />
          <MyTabs
            listingData={listingData}
            transactionData={transactionData}
            applicationsData={applicationsData}
          />
        </>
      }
      {isMobile ? null : <Footer />}
    </Box >
  );
}

export default Profile;
