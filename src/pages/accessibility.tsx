import { Box } from "@chakra-ui/react";
import { Spacer, Divider } from '@chakra-ui/react'
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import { Section1 } from "../components/howToUse/section1";
import HeadingAndText from "../components/headingAndText";
import { isMobile } from "react-device-detect";
import fav from "../assets/imgs/favicon.ico"
const Accessibility = () => {
    return (
        <Box>
            <Head>
                {/* <title>Good Deeds | Community Good Deeds</title> */}
                <title>Good Deeds | An Online Marketplace of Opportunities</title>
                <link rel="icon" href={fav.src} />
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
            <Section1 title="Accessibility" />

            <HeadingAndText
                heading="Introduction"
                list={
                    [
                        { description: "Good Deeds Canada Inc. is committed to building a community enabled by people and supported by technology that’s open to the broadest audience possible. We’re committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards." },
                        { description: "By connecting people, we strive to unleash the entrepreneurial spirit that resides within the community and help people of all abilities realize their full potential." },
                        {
                            description: "“Good Deeds Product and Services” includes:",
                            sublist: [
                                { description: "Gooddeeds.ca" },
                                { description: "Good Deeds Android App" },
                                { description: "Good Deeds iOS App" },
                            ]
                        }
                    ]
                }
            >
                {isMobile ? <Spacer /> : <div><Spacer />
                    <Spacer />
                    <Spacer /></div>}

            </HeadingAndText>

            <HeadingAndText
                heading="Diversity & Inclusion"
                para="Our pledge to provide digital accessibility for people with disabilities is one of the ways 
                we demonstrate our commitment to Diversity & Inclusion."
            >
                {isMobile ? <Spacer /> : <div><Spacer />
                    <Spacer />
                    <Spacer /></div>}
            </HeadingAndText>

            <HeadingAndText
                heading="Feedback"
                list={
                    [
                        {
                            description: "We welcome your feedback on the accessibility of eBay Products. Please let us know if you encounter accessibility barriers while using any eBay Product:",
                            sublist: [
                                { description: "E-mail: accessbility@gooddeeds.ca" }
                            ]
                        }
                    ]
                }
            >
                {isMobile ? null : <div><Spacer />
                    <Spacer />
                    <Spacer /></div>}
            </HeadingAndText>

            <HeadingAndText
                heading="Technical Specifications"
                list={
                    [
                        {
                            description: "Accessibility of Good Deeds products and services relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:",
                            sublist: [
                                { description: "HTML" },
                                { description: "WAI-ARIA" },
                                { description: "CSS" },
                                { description: "JavaScript" },
                            ]
                        }
                    ]
                }
            >
                {isMobile ? <Spacer /> : <div><Spacer />
                    <Spacer />
                    <Spacer /></div>}
            </HeadingAndText>

            <HeadingAndText
                heading="Conformance Standard"
                list={
                    [
                        {
                            description: "The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.",
                        },
                        {
                            description: "While we strive for WCAG 2.0 Level AA conformance on all eBay Products, we follow some Level AAA Success Criteria, for example:",
                            sublist: [
                                { description: "Providing visually hidden text for ambiguous links and buttons" },
                            ]
                        },
                        {
                            description: "Additionally, we follow some WCAG 2.1 Success Criteria, for example:",
                            sublist: [
                                { description: "Providing sufficient contrast for non-text content" },
                                { description: "Supporting multiple device orientations" },
                                { description: "Ensuring sufficient touch target sizes" },
                            ]
                        }
                    ]
                }
            >
                {isMobile ? <Spacer /> : <div><Spacer />
                    <Spacer />
                    <Spacer /></div>}
            </HeadingAndText>
            <Footer />
        </Box>
    );
}

export default Accessibility;
