import { Box, Container, SimpleGrid, Text } from "@chakra-ui/react";
import { Spacer, Divider } from '@chakra-ui/react'
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import { Section1 } from "../components/howToUse/section1";
import HeadingAndText from "../components/headingAndText";
import { isMobile } from "react-device-detect";
import fav from "../assets/imgs/favicon.ico"

const Careers = () => {
    return (
        <Box>
            <Head>
                {/* <title>Good Deeds | Community Good Deeds</title> */}
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
            <Section1 title="Careers" />

            < Container
                as={SimpleGrid}
                maxW="container.lg"
                columns={{ base: 1 }}
                spacing={{ base: 8, lg: 6 }}
                mb={7}
            >
                <Text>
                    Do you put the passion in compassion? Does the act of giving offer you more pleasure than a box of
                    chocolates? Are you ready to bring a wave of positive change to your community and beyond? If you
                    gave a resounding “YES” to all those questions, we want you!
                </Text>
            </Container>

            <HeadingAndText
                heading="Why Work with Us?"
                para="Good Deeds is seeking self-motivated and empathetic individuals who genuinely believe in the
                power of making the world a better place. Your role will be dynamic, like the relationships we
                aim to establish with our beautiful communities. There will never be a dull moment as we invest
                our valuable time brainstorming outreach ideas and spreading the Good Deeds mission."
            >
                {isMobile ? <Spacer /> :
                    <div>
                        <Spacer />
                        <Spacer />
                        <Spacer />
                    </div>
                }

            </HeadingAndText>

            <HeadingAndText
                heading="Team Benefits:"
                list={
                    [
                        {
                            title: "Health Benefits  - ",
                            description: "We’re always looking out for you! Members of the Good Deeds team will enjoy a wide range of health benefits to ensure that they receive the care and treatment they deserve.",
                        },
                        {
                            title: "RRSP Contributions  - ",
                            description: "We care about your future. Good Deeds believes in contributing to your financial health and well-being by matching all RRSP contributions.",
                        },
                        {
                            title: "Work from Home  - ",
                            description: "We understand the impacts the new normal or any other mobility restrictions have on our ability to earn income. Our roles are flexible, and we believe that Good Deeds can exist at any time and any place.",
                        },
                        {
                            title: "Unlimited Vacation  - ",
                            description: "Good Deeds practices a method-neutral system that provides team members with the freedom to function at their best according to their natural rhythm. We have faith that the most well-rested minds and bodies can achieve wonders.",
                        },
                        {
                            title: "Free Virtual Deed Dollars  - ",
                            description: "You’re instantly a brand ambassador once you’re on board. As such, we’d like to provide you with a superb orientation of the platform with free virtual deed dollars. We believe your firsthand experience will help shape a better understanding of the Good Deeds mission and community.",
                        },
                        {
                            description: "If you’re interested in joining the Good Deeds family, please reach out and let us know how you wish to contribute. One of our team members will contact you shortly to get to know you a little better before proceeding with the rest of the hiring process."
                        },
                        {
                            description: "We hope to hear from you soon!"
                        }
                    ]
                }
            >
                {isMobile ? <Spacer /> :
                    <div>
                        <Spacer />
                        <Spacer />
                        <Spacer />
                    </div>
                }
            </HeadingAndText>
            <Footer />
        </Box>
    );
}

export default Careers;
