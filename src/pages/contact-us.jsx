import { Box, Text } from '@chakra-ui/react'
import {
  Spacer, Divider, Container,
  SimpleGrid,
  Image,
  Flex
} from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { Footer } from '../components/Footer'
import Navbar from '../components/Navbar'
import { Section1 } from '../components/howToUse/section1'
import Contact from '../components/contact/contact'
import HeadingAndText from '../components/headingAndText'
import { isMobile } from 'react-device-detect'
import gdlogopegiun from "../assets/imgs/gdlogopegiun.png";
import { useMediaQuery } from '@chakra-ui/react'
import fav from "../assets/imgs/favicon.ico"


const ContactUs = () => {
  const [isSmallerThan767] = useMediaQuery('(max-width: 767px)')
  return (
    <Box>
      <Head>
        {/* <title>Good Deeds | Contact Us</title> */}
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
      <Navbar />
      {/* <Section1 title="Contact Us" /> */}

      {/* {isMobile ? ( */}
      < Container
        as={SimpleGrid}
        maxW="container.lg"
        columns={{ base: 1 }}
        spacing={{ base: 8, lg: 6 }}
        mb={12}
      >
        <Box>
          <Flex gap={isSmallerThan767 ? '' : '70px'} alignItems={'center'} justifyContent={'center'} flexDirection={isSmallerThan767 ? 'column' : 'row'} py={'40px'} ps={isSmallerThan767 ? '' :'250px'} className="mt-5" >
            <Text fontSize={isSmallerThan767 ? '34px' : '60px'} color="#183553" textAlign="center" fontWeight={'700'} lineHeight="76px">Contact Us</Text>
            <Image style={{ width: "200px", height: "203px" }} src={gdlogopegiun.src} />
          </Flex>
          <Text fontSize={isSmallerThan767 ? '24px' : '36px'} lineHeight="42px" fontWeight={'700'} color="#183553" textAlign="center">Any questions? Let us help</Text>
          <Text fontSize={isSmallerThan767 ? '16px' : '22px'} color="#212121"  fontWeight={'500'} textAlign="center" mt="40px" className="pt-md-4">A safe and secure community is important to Good Deeds.</Text>
          <Text fontSize={isSmallerThan767 ? '16px' : '22px'} color="#212121"  fontWeight={'500'} textAlign="center" mt="15px">Please fill out the form below and someone will respond to your inquiry within 24-48 hours.</Text>
        </Box>

        <Contact />

      </Container >
      {/* ) : null} */}
      {/* {isMobile ? null : <Contact />} */}
      {/* <div className="d-md-none">
        <p className="privacy-policy mt-5 mb-5">
          <span className="policy">Contact</span> <span className="policy">Us</span>
        </p>
        <div className="d-flex justify-content-center">
          <Image style={{ width: "214px", height: "217px" }} src={gdlogopegiun.src} />
        </div>
        <p className="privacyy-policy mt-5 mb-5">
          <span className="policy">Any questions? Let us help</span>
        </p>
        <div>
          <p className="text-center p-privacy mx-4">A safe and secure community is important to Good Deeds

            <span className="d-block text-center mt-3">Please fill out form below and someone will respond to your inquiry within 24-48 hours</span>

          </p>
        </div>
      </div>
      <div className="d-md-none card shadow border-2 mt-3 mb-5 mx-3">
        <Contact />
      </div> */}
      <Footer />
    </Box >
  )
}

export default ContactUs
