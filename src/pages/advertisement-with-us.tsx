import { Box, Center, Text, Container, SimpleGrid, Spacer, Flex, Skeleton, Image, Link } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";

import { LastSection } from "../components/about/lastSection";
import { Section1 } from "../components/howToUse/section1";

// import advertiseWithUsImg from '../assets/imgs/advertise-with-us.jpg';
import aboutadvertise from '../assets/imgs/about/aboutadvertise.jpg';


const advertisement = () => {
  return (
    <Box>
      <Head>
        {/* <title>Good Deeds | Advertise With Us</title> */}
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
      <Section1 title="Advertise With Us" />
      <Container
        as={SimpleGrid}
        maxW="container.lg"
        columns={{ base: 1 }}
        my="10"
      >
        <Text fontSize="3xl" color="primary.300" fontWeight="700" mb="4">
          Advertising Opportunities for Any Size Business
        </Text>
        <Text mb="10">
          Good Deeds is a website app connects people with great local or national businesses and business owners
          with their communities.
        </Text>

        <Text fontSize="3xl" fontWeight="700" mb="4">
          Good Deeds Ads
        </Text>
        <Text>
          Many consumers use Good Deeds every day when making purchasing decisions. Good Deeds Ads feature your
          business when consumers search for specific services that your business offers.
        </Text>

        <Flex justifyContent="center" mt="20" mb="10">
          <Image
            src={aboutadvertise.src}
            alt={"main image 1"}
            draggable="false"
            fallback={<Skeleton />}
            cursor={"pointer"}
          />
        </Flex>

        <Text color="orange.500" fontWeight="700">
          Targeted advertising
        </Text>
        <Text mb="5">
          Good Deeds Ads puts your business in front of all local consumers nation-wide who are looking for specific
          products and services your business offers.
        </Text>

        <Text color="orange.500" fontWeight="700">
          Premium placement on Good Deeds search engine
        </Text>
        <Text mb="5">
          Drive traffic to your Business Page with Good Deeds Ads. Good Deeds Ads appear in a variety of places,
          including on relevant search result pages.
        </Text>

        <Text color="orange.500" fontWeight="700">
          Presence on mobile and desktop devices
        </Text>
        <Text mb="5">
          Over half of Good Deeds searches come from users on mobile devices. Good Deeds Ads promote your business
          across all Good Deeds platforms: desktop, mobile website, and mobile app.
        </Text>

        <Text textAlign="center" mb="16">
          Do you want to learn more about Good Deeds for Business? <br />
          <Link href="mailto:Advertising@gooddeeds.ca" color="blue">Advertising@gooddeeds.ca</Link>
        </Text>

        <Text color="orange.500" fontWeight="500">
          Agency Business <br />
          Invest in your company's growth. Partner with Good Deeds.
        </Text>
        <Text mb="5">
          The Good Deeds Advertising Partner Program supports digital marketing companies that provide service to
          small and medium sized local businesses. Good Deeds Advertising Partners get resources, results, and
          revenue by connecting their clients with high purchase intent customers at scale.
        </Text>

        <Text>Contact us @ <Link href="mailto:advertising@gooddeeds.ca" color="blue">advertising@gooddeeds.ca</Link></Text>
      </Container>
      <Footer />
    </Box>
  );
};

export default advertisement;
