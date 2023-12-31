import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Footer } from "../components/Footer";
import Browse from "../components/Browse/browse";
import { isMobile } from 'react-device-detect'

function Profile() {
  const router = useRouter();

  const [activeTab,] = React.useState(
    router.query.activeTab ? router.query.activeTab : 0
  );

  return (
    <Box>
      <Head>
        {/* <title>Good Deeds | Search</title> */}
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
      <Browse
        isBookmark={false}
        isSearch={true}
        activeTab={activeTab}></Browse>
      {isMobile ? null : <Footer />}
    </Box>
  );
}

export default Profile;
