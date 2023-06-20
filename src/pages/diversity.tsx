import React from "react";
import { Box, Spacer, Text, Container, SimpleGrid } from "@chakra-ui/react";
import Head from "next/head";
import { isMobile } from "react-device-detect";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import { Section1 } from "../components/howToUse/section1";
import HeadingAndText from "../components/headingAndText";

const Diversity = () => {
    return (
        <Box>
            <Head>
                {/* <title>Good Deeds | Community Good Deeds</title> */}
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
            <Section1 title="Diversity & Inclusion" />

            < Container
                as={SimpleGrid}
                maxW="container.lg"
                columns={{ base: 1 }}
                spacing={{ base: 8, lg: 6 }}
                mb={7}
            >
                <Text>
                    At Good Deeds a diverse, inclusive, and equitable workplace is one where all employees and volunteers,
                    whatever their gender, race, ethnicity, national origin, age, sexual orientation or identity, education
                    or disability, feels valued and respected. We are committed to a non-discriminatory approach and
                    provide equal opportunity for employment and advancement in all of our departments, programs,
                    and worksites. We respect and value diverse life experiences and heritages and ensure that all
                    voices are valued and heard.
                </Text>
                <Text>
                    We’re committed to modeling diversity and inclusion for the entire online marketplace community,
                    and to maintaining an inclusive environment with equitable treatment for all.
                </Text>
            </Container>

            <HeadingAndText
                heading="To provide informed, authentic leadership for cultural equity, Good Deeds strives to:"
                unOrderedList={
                    [
                        { description: "See diversity, inclusion, and equity as connected to our mission and critical to ensure the well-being of our staff and the communities we serve." },
                        { description: "Acknowledge and dismantle any inequities within our policies, systems, programs, and services, and continually update and report organization progress." },
                        { description: "Explore potential underlying, unquestioned assumptions that interfere with inclusiveness." },
                        { description: "Advocate for and support board-level thinking about how systemic inequities impact our organization’s work, and how best to address that in a way that is consistent with our mission." },
                        { description: "Help to challenge assumptions about what it takes to be a strong leader at our organization, and who is well-positioned to provide leadership." },
                        { description: "Practice and encourage transparent communication in all interactions." },
                        { description: "Commit time and resources to expand more diverse leadership within our board, staff, committee, and advisory bodies." },
                        { description: "Lead with respect and tolerance. We expect all employees to embrace this notion and to express it in workplace interactions and through everyday practices." },
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

            <HeadingAndText
                heading="Good Deeds abides by the following action items to help promote diversity and inclusion in our workplace:"
                unOrderedList={
                    [
                        { description: "Pursue cultural competency throughout our organization by creating substantive learning opportunities and formal, transparent policies." },
                        { description: "Generate and aggregate quantitative and qualitative research related to equity \nto make incremental, measurable progress toward the visibility of our diversity, inclusion, and equity efforts. Once the content is curated it will be added to our website so others can access." },
                        { description: "Improve our cultural leadership pipeline by creating and supporting programs and policies that foster leadership that reflects the diversity of society." },
                        { description: "Pool resources and expand offerings for underrepresented constituents by connecting with other arts organizations committed to diversity and inclusion efforts." },
                        { description: "Develop and present sessions on diversity, inclusion, and equity to provide information and resources internally, and to members, the community, and the online marketplace industry." },
                        { description: "Develop a system for being more intentional and conscious of bias during the hiring, promoting, or evaluating process. Train our hiring team on equitable practices." },
                        { description: "Include a salary range with all public job descriptions." },
                        { description: "Advocate for public and private-sector policy that promotes diversity, inclusion, and equity. Challenge systems and policies that create inequity, oppression and disparity." },
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

export default Diversity;
