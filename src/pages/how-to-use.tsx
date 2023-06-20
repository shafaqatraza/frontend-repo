import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import { Section1 } from "../components/howToUse/section1";
import { Section2 } from "../components/howToUse/section2";
import { Section3 } from "../components/howToUse/section3";

const HowToUse = () => {
  return (
    <Box>
      <Head>
        {/* <title>Good Deeds | How to use</title> */}
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

      <Section1 title="How Good Deeds Works" />
      <Section2 />
      <Section3 />
      {/* <MyTabs />  */}

      <Footer />
    </Box>
  );
};

export default HowToUse;
