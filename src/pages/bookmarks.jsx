import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import Browse from "../components/Browse/browse";
import { isLogin } from "../components/Helper/index";
import Router from "next/router";
import fav from "../assets/imgs/favicon.ico"

function Profile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeTab,] = React.useState(
    router.query.activeTab ? router.query.activeTab : 0
  );

  React.useEffect(() => {
    setIsLoading(true);
    if (!isLogin()) {
      setIsLoading(true);
      Router.push({ pathname: "/" })
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <Box>
      <Head>
        {/* <title>Good Deeds | My Favoirits Good Deeds</title> */}
        <title>Good Deeds | An Online Marketplace of Opportunities</title>
        <link rel="icon" href={fav.src}  />
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
      {!isLoading &&
        <Browse
          isBookmark={true}
          isSearch={false}
          activeTab={activeTab}
        ></Browse>
      }
      <Footer />
    </Box>
  );
}

export default Profile;
