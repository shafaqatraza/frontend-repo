import { Box, Container, SimpleGrid, Text, Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,  UnorderedList,
    ListItem, } from "@chakra-ui/react";
import { Spacer, Divider } from '@chakra-ui/react'
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import { Section1 } from "../components/howToUse/section1";
import HeadingAndText from "../components/headingAndText";
import { isMobile } from "react-device-detect";
import fav from "../assets/imgs/favicon.ico"

const Community = () => {
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
            {/* <Section1 title="Community Guidelines" /> */}
            <h1 className="guide-heading"><span style={{color:"#E27832"}}>Community</span> Guidelines</h1>
            <div className="community-guideline">
                < Container
                    as={SimpleGrid}
                    maxW="container.lg"
                    columns={{ base: 1 }}
                    spacing={{ base: 8, lg: 4 }}
                    mb={2}
                >
                    
                        <Text fontWeight="bold" className="guide-sub-heading">
                            Good Deeds Community Guidelines & Code of Conduct
                        </Text>
                        <Text className="mt-3 mb-5">
                            Updated Feb 26, 2022
                        </Text>
                    
                    <Text fontWeight="600">
                        We're so glad to have you as part of the Good Deeds Community!
                    </Text>
                    <Text fontWeight="600">
                        This community is a space for Good Deeds users to exchange good and services, volunteer their time
                        and grow personally and professionally.
                    </Text>
                    <Text fontWeight="600">
                        We want to ensure that this community remains a space that is positive, helpful and supportive,
                        and where everyone feels like they are connecting with others with the same values of giving back
                        and feeling completely safe to engage like-minded users.
                    </Text>
                    <Text fontWeight="600">
                        Our community members come from many different countries, cultures, backgrounds, and professions.
                        Because we likely understand things differently, it feels important for all of us to be conscious
                        of how we communicate with each other. It's also a wonderful opportunity for us to learn a lot
                        about each other.
                    </Text>
                </Container>
                <div className=" privacy-policy-content">
                <Container
                    as={SimpleGrid}
                    maxW="5xl"
                    columns={{ base: 1 }}
                    spacing={{ base: 8, lg: 6 }}
                    // py={{ base: 10, sm: 10, lg: 12 }}
                    // mb={{ lg: 4 }}
                    mt={37}
                    mb={20}
                >
                    <Accordion allowToggle allowMultiple>
                    <AccordionItem pt="5px" pb={"22px"} style={{borderColor:"black"}} className="border-top-0">
                        <h2>
                        <AccordionButton className="ps-md-0">
                            <Box
                            flex="1"
                            textAlign="left"
                            fontWeight="700"
                            fontSize="24px"
                            letterSpacing="tight"
                            marginEnd={'6'}
                            color="primary.300"
                            width={"fit-content"}
                            
                            >
                            Good Deeds's commitment to this community:
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel px={0} pb={4}>
                        <br></br>
                        
                        <Text>
                        We are committed to making this community space a respectful and harassment-free experience for everyone, regardless of gender, gender identity and expression, sex, sexual orientation, disability, neuro(a)typicality, physical appearance, body size, race, ethnicity, national origin, immigration status, age, political affiliation, or religion.
                        </Text>
                        </AccordionPanel>
                    </AccordionItem>

                    
                    <AccordionItem pt="5px" pb={"22px"} style={{borderColor:"black"}}>
                        <h2>
                        <AccordionButton className="ps-md-0">
                            <Box
                            flex="1"
                            textAlign="left"
                            fontWeight="700"
                            fontSize="24px"
                            letterSpacing="tight"
                            marginEnd={'6'}
                            color="primary.300"
                            >
                            Our collective community values:
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} pe={0} >
                        <br></br>
                        <UnorderedList>
                        <ListItem>
                        Positivity - We choose to cultivate positivity in our interactions with each other, creating a space where people can come to feel uplifted and inspired.
                        </ListItem>
                        <br/>
                        <ListItem>
                        Courtesy & Respect - We choose to be kind and polite to one another. We don't have to agree on everything – in fact, we believe that it’s beneficial to have varied views and perspectives. However, we encourage all members to be constructive, tactful and respoectful when communicating with other users.
                        </ListItem>
                        <br/>
                        <ListItem>
                        Thoughtful Language - We choose to be mindful of how our words and tone might be understood. We’ve learned that written communication has the potential to be easily misinterpreted, especially by members from different cultures and backgrounds. For instance, sometimes sarcasm is not so easily translated to other languages. If there's a moment when someone says something that feels offensive, it's very likely that they didn't mean to upset anyone and it was just a misunderstanding or miscommunication. However, if you have felt hurt or offended by anything that's been said by someone in the community, please feel free to contact someone on the Good Deeds team for extra support.
                        </ListItem>
                        </UnorderedList>
                        {/* <br /> */}
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem pt="5px" pb={"22px"} style={{borderColor:"black"}} className="ps-md-0">
                        <h2>
                        <AccordionButton className="ps-md-0">
                            <Box
                            flex="1"
                            textAlign="left"
                            fontWeight="700"
                            fontSize="24px"
                            letterSpacing="tight"
                            marginEnd={'6'}
                            color="primary.300"
                            >
                            What we encourage you to do in the community:
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} pe={0}>
                        <br></br>
                        <UnorderedList>
                            <ListItem>
                            Donating your time
                            </ListItem>
                            <br/>
                            <UnorderedList>
                                <ListItem>
                                Connect to the causes you care about. It creates opportunities for non-profit organizations to accomplish their goals by engaging and involving its volunteers, and it allows volunteers an opportunity to connect with and contribute to building community.
                                </ListItem>
                                <br/>
                                <ListItem>
                                Individuals: Provide users professional services through teaching, advising or mentoring.
                                </ListItem>
                                <br/>
                                <ListItem>
                                Volunteer Opportunities: Community members must be aware that each charity or NPO may require police background checks, applications, and also require various training before commencement of volunteering.
                                </ListItem>
                                <br />
                                <ListItem>
                                Businesses: Support community members with professional services such as legal advice, phycological consulting or counselling services.
                                </ListItem>
                            </UnorderedList>
                        </UnorderedList>
                        <br/>
                        <UnorderedList>
                            <ListItem>
                            Donating Services
                            </ListItem>
                            <br/>
                            <UnorderedList>
                                <ListItem>
                                Individuals: Connect with community members to provide a variety of skilled and unskilled services. These services can range from dog walking, massages to plumbing or cleaning services. Please ensure individual skilled trades have the proper education and certifications required to legally provide the service. Due diligence is highly recommended.
                                </ListItem>
                                <br/>
                                <ListItem>
                                Experience level: Community members providing services should indicate the appropriate experience level (beginner/intermediate/advanced)
                                </ListItem>
                                <br/>
                                <ListItem>
                                Businesses: Donate free services to community members such as beauty and spa, dry cleaning, gym passes etc.
                                </ListItem>
                            </UnorderedList>
                        </UnorderedList>
                        <br />
                        <UnorderedList>
                            <ListItem>
                            Donating Items
                            </ListItem>
                            <br/>
                            <UnorderedList>
                                <ListItem>
                                Individuals: Provide community members with items you no longer need or want. These items can range from common household items, clothing and apparel to event tickets or restaurant vouchers.
                                </ListItem>
                                <br/>
                                <ListItem>
                                Quality rating: Community members posting items should accurately describe the condition in which the items are in and to identify through photos any imperfections or inclusions.
                                </ListItem>
                                <br/>
                                <ListItem>
                                Businesses: Connect with community members to provide goods. Please ensure goods provided meet all the FDA regulations or safety certifications for safe use. Businesses have an obligation to ensure items provided meet the highest of standards.
                                </ListItem>
                                <br />
                            </UnorderedList>
                        </UnorderedList>
                        <UnorderedList>
                            <ListItem>
                            Receiving items and services
                            </ListItem>
                            <br/>
                            <UnorderedList>
                                <ListItem>
                                Receiver beware: All community members accepting goods and services on the platform must due their due diligence and ensure safety measures of the individuals exchanging are met at all times.
                                </ListItem>
                                <br/>
                                <ListItem>
                                Photos/Files: Community members should provide multiple high-resolution photos to improve search ranking.
                                </ListItem>
                                <br/>
                                <ListItem>
                                Quality rating: Community members posting items should accurately describe the condition in which the items are in and to identify through photos any imperfections or inclusions.
                                </ListItem>
                                <br />
                            </UnorderedList>
                        </UnorderedList>
                        <UnorderedList>
                            <ListItem>
                            Digital Wallet
                            </ListItem>
                            <br/>
                            <UnorderedList>
                                <ListItem>
                                The digital wallet acts as the users credit account. It will track and trace all transaction to and from the account. Any disputes that arise should be discussed and rectified by both users first and if cannot be resolved, be escalated to our customer service personal for investigation and remediation.
                                </ListItem>
                                <br/>
                            </UnorderedList>
                        </UnorderedList>
                        <UnorderedList>
                            <ListItem>
                            Spread the word about Good Deeds
                            </ListItem>
                            <br/>
                            <UnorderedList>
                                <ListItem>
                                Spread the word about the amazing things you are giving and receiving on the Good Deeds site by posting on social media and tagging #gooddeedsinaction and
                                </ListItem>
                                <br/>
                                <ListItem>
                                Influencers: Learn how you can be an official Good Deeds influencer, earning valuable virtual credits to use on the website. Contact Amanda Diplo, amanda@gooddeeds.ca to learn more on how to get involved.
                                </ListItem>
                                <br/>
                            </UnorderedList>
                        </UnorderedList>
                        <UnorderedList>
                            <ListItem>
                            Build connections with one another
                            </ListItem>
                            <br/>
                            <UnorderedList>
                                <ListItem>
                                This community is filled with like-minded, positive, awesome people, and we are always trying to help you build connections with each other through community activities, events and discussions.
                                </ListItem>
                                <br/>
                                <ListItem>
                                Best practice: be open, kind and inclusive with one another, and you’ll make some wonderful professional connections and friendships along the way. :)
                                </ListItem>
                            </UnorderedList>
                        </UnorderedList>
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem pt="5px" pb={"22px"} style={{borderColor:"black"}}>
                        <h2>
                        <AccordionButton className="ps-md-0">
                            <Box
                            flex="1"
                            textAlign="left"
                            fontWeight="700"
                            fontSize="24px"
                            letterSpacing="tight"
                            marginEnd={'6'}
                            color="primary.300"
                            >
                           What we do not allow:
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} px={0} >
                        <br></br>
                        <UnorderedList>
                            <ListItem>
                            Collecting Money outside Good Deeds platform
                            </ListItem>
                            <br/>
                            <ListItem>
                            Sharing external links to indecent material
                            </ListItem>
                            <br/>
                            <ListItem>
                            Being rude, hateful or insulting
                            </ListItem>
                            <br/>
                            <ListItem>
                            Harassing other members. This includes:
                            </ListItem>
                            <br/>
                            <UnorderedList>
                                <ListItem>
                                Offensive comments or jokes related to gender, sexual orientation, disability, physical appearance, body size, race, or religion
                                </ListItem>
                                <br/>
                                <ListItem>
                                Deliberate intimidation, stalking, or following
                                </ListItem>
                                <br/>
                                <ListItem>
                                Threats of violence
                                </ListItem>
                                <br/>
                                <ListItem>
                                Unwelcomed sexual attention
                                </ListItem>
                                <br/>
                                <ListItem>
                                Trolling
                                </ListItem>
                                <br/>
                                <ListItem>
                                Continued one-on-one communication after requests to cease
                                </ListItem>
                                <br/>
                                <ListItem>
                                Non-consensual publication of private correspondence
                                </ListItem>
                            </UnorderedList>
                        </UnorderedList>
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem pt="5px" pb={"22px"} style={{borderColor:"black"}}>
                        <h2>
                        <AccordionButton className="ps-md-0">
                            <Box
                            flex="1"
                            textAlign="left"
                            fontWeight="700"
                            fontSize="24px"
                            letterSpacing="tight"
                            marginEnd={'6'}
                            color="primary.300"
                            >
                            Responses to any behaviour that violates this Code of Conduct:
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} px={0}>
                        <br></br>
                        <UnorderedList>
                            <ListItem>
                            If you are being harassed, or if you notice that someone else in the Good Deeds Community is being harassed, please contact a Good Deeds team member via email (all reports are confidential): Amanda Diplo, Community Strategist: amanda@gooddeeds.ca
                            </ListItem>
                            <br/>
                            <ListItem>
                            If a member engages in behavior that violates this code of conduct, they may be given a warning or they may be asked to leave the community, depending on the severity of the behavior. If a member is asked to stop any harassing behavior, they are expected to comply immediately. Two quick notes:
                            </ListItem>
                            <br/>
                            <UnorderedList>
                                <ListItem>
                                While we don't intend to delete anyone's comments, if we ever see any cruel/offensive/harassing comments, trolling, graphic content or messages that feel like spam, these are circumstances that could possibly result in us deleting the post.
                                </ListItem>
                                <br/>
                                <ListItem>
                                If you have not-so-positive yet crucial feedback for someone, it might be more appropriate to share it privately, and in a supportive way. If you need any help with this, please feel free to ask a Good Deeds team member for advice. We’re happy to help you with this.
                                </ListItem>
                            </UnorderedList>
                        </UnorderedList>
                        </AccordionPanel>
                    </AccordionItem>

                    </Accordion>
                        <Text>
                             At the end of the day, we encourage you to bring a positive and open mind to the Good Deeds community. We promise you'll get the most out of it that way.
                        </Text>
                        <Text>
                        Thank you all for being part of our community!
                        </Text>
                        <Text>
                        Warmly,
                        </Text>
                        <Text className="fw-bold">
                        The Good Deeds Team
                        </Text>
                </Container>
                </div>
                {/* <Container maxW="container.lg">
                    <Text className="guide-sub-heading mt-3">Our collective community <span style={{color:"#E27832"}}>values:</span></Text>
                </Container>
                <HeadingAndText
                    heading=" "
                    unOrderedList={
                        [
                            {
                                title: "Positivity  - ",
                                description: "We choose to cultivate positivity in our interactions with each other, creating a space where people can come to feel uplifted and inspired."
                            },
                            {
                                title: "Courtesy & Respect  - ",
                                description: "We choose to be kind and polite to one another. We don't have to agree on everything – in fact, we believe that it’s beneficial to have varied views and perspectives. However, we encourage all members to be constructive, tactful and respoectful when communicating with other users."
                            },
                            {
                                title: "Thoughtful Language  - ",
                                description: "We choose to be mindful of how our words and tone might be understood. We’ve learned that written communication has the potential to be easily misinterpreted, especially by members from different cultures and backgrounds. For instance, sometimes sarcasm is not so easily translated to other languages. If there's a moment when someone says something that feels offensive, it's very likely that they didn't mean to upset anyone and it was just a misunderstanding or miscommunication. However, if you have felt hurt or offended by anything that's been said by someone in the community, please feel free to contact someone on the Good Deeds team for extra support."
                            },
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
                    <Container maxW="container.lg">

                    <Text className="guide-sub-heading">What we <span style={{color:"#E27832"}}>encourage</span> you to do in the community</Text>
                </Container>
                <HeadingAndText
                    heading=" "
                    unOrderedList={
                        [
                            {
                                title: "Donating your time",
                                sublist: [
                                    { description: "Connect to the causes you care about.  It creates opportunities for non-profit organizations to accomplish their goals by engaging and involving its volunteers, and it allows volunteers an opportunity to connect with and contribute to building community." },
                                    { title: "Individuals: ", description: "Provide users professional services through teaching, advising or mentoring." },
                                    { title: "Volunteer Opportunities: ", description: "Community members must be aware that each charity or NPO may require police background checks, applications, and also require various training before commencement of volunteering." },
                                    { title: "Businesses: ", description: "Support community members with professional services such as legal advice, phycological consulting or counselling services." },
                                ]
                            },
                            {
                                title: "Donating Services",
                                sublist: [
                                    { title: "Individuals: ", description: "Connect with community members to provide a variety of skilled and unskilled services.  These services can range from dog walking, massages to plumbing or cleaning services.  Please ensure individual skilled trades have the proper education and certifications required to legally provide the service.  Due diligence is highly recommended." },
                                    { title: "Experience level: ", description: "Community members providing services should indicate the appropriate experience level (beginner/intermediate/advanced)" },
                                    { title: "Businesses: ", description: "Donate free services to community members such as beauty and spa, dry cleaning, gym passes etc." },
                                ]
                            },
                            {
                                title: "Donating Items",
                                sublist: [
                                    { title: "Individuals: ", description: "Provide community members with items you no longer need or want.  These items can range from common household items, clothing and apparel to event tickets or restaurant vouchers." },
                                    { title: "Quality rating: ", description: "Community members posting items should accurately describe the condition in which the items are in and to identify through photos any imperfections or inclusions." },
                                    { title: "Businesses: ", description: "Connect with community members to provide goods.  Please ensure goods provided meet all the FDA regulations or safety certifications for safe use.  Businesses have an obligation to ensure items provided meet the highest of standards." },
                                ]
                            },
                            {
                                title: "Receiving items and services",
                                sublist: [
                                    { title: "Receiver beware: ", description: "All community members accepting goods and services on the platform must due their due diligence and ensure safety measures of the individuals exchanging are met at all times." },
                                    { title: "Photos/Files: ", description: "Community members should provide multiple high-resolution photos to improve search ranking." },
                                    { title: "Quality rating: ", description: "Community members posting items should accurately describe the condition in which the items are in and to identify through photos any imperfections or inclusions." },
                                ]
                            },
                            {
                                title: "Digital Wallet",
                                sublist: [
                                    { description: "The digital wallet acts as the users credit account.  It will track and trace all transaction to and from the account.  Any disputes that arise should be discussed and rectified by both users first and if cannot be resolved, be escalated to our customer service personal for investigation and remediation." },
                                ]
                            },
                            {
                                title: "Spread the word about Good Deeds",
                                sublist: [
                                    { description: "Spread the word about the amazing things you are giving and receiving on the Good Deeds site by posting on social media and tagging #gooddeedsinaction and" },
                                    { description: "Influencers: Learn how you can be an official Good Deeds influencer, earning valuable virtual deed dollars to use on the website. Contact Amanda Diplo, amanda@gooddeeds.ca to learn more on how to get involved." },
                                ]
                            },
                            {
                                title: "Build connections with one another",
                                sublist: [
                                    { description: "This community is filled with like-minded, positive, awesome people, and we are always trying to help you build connections with each other through community activities, events and discussions." },
                                    { description: "Best practice: be open, kind and inclusive with one another, and you’ll make some wonderful professional connections and friendships along the way. :)" },
                                ]
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
                    <Container maxW="container.lg">

                    <Text className="guide-sub-heading">What we <span style={{color:"#E27832"}}>do not</span> allow</Text>
                </Container>
                <HeadingAndText
                    heading=" "
                    unOrderedList={
                        [
                            {
                                description: "Collecting Money outside Good Deeds platform"
                            },
                            {
                                description: "Sharing external links to indecent material"
                            },
                            {
                                description: "Being rude, hateful or insulting"
                            },
                            {
                                description: "Harassing other members. This includes:",
                                sublist: [
                                    { description: "Offensive comments or jokes related to gender, sexual orientation, disability, physical appearance, body size, race, or religion" },
                                    { description: "Deliberate intimidation, stalking, or following" },
                                    { description: "Threats of violence" },
                                    { description: "Unwelcomed sexual attention" },
                                    { description: "Trolling" },
                                    { description: "Continued one-on-one communication after requests to cease" },
                                    { description: "Non-consensual publication of private correspondence" },
                                ]
                            },
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
                    <Container maxW="container.lg">

                    <Text className="guide-sub-heading">Responses to any behavior that <span style={{color:"#E27832"}}>violates</span> this Code of Conduct:</Text>
                </Container>
                <HeadingAndText
                    heading=" "
                    list={
                        [
                            {
                                description: "If you are being harassed, or if you notice that someone else in the Good Deeds Community is being harassed, please contact a Good Deeds team member via email (all reports are confidential): \nAmanda Diplo, Community Strategist: admin@gooddeeds.ca"
                            },
                            {
                                description: "If a member engages in behavior that violates this code of conduct, they may be given a warning or they may be asked to leave the community, depending on the severity of the behavior. If a member is asked to stop any harassing behavior, they are expected to comply immediately. \nTwo quick notes:",
                                sublist: [
                                    {
                                        description: "While we don't intend to delete anyone's comments, if we ever see any cruel/offensive/harassing comments, trolling, graphic content or messages that feel like spam, these are circumstances that could possibly result in us deleting the post.",
                                    },
                                    {
                                        description: "If you have not-so-positive yet crucial feedback for someone, it might be more appropriate to share it privately, and in a supportive way. If you need any help with this, please feel free to ask a Good Deeds team member for advice. We’re happy to help you with this.",
                                    }
                                ]
                            },
                            {
                                description: "At the end of the day, we encourage you to bring a positive and open mind to the Good Deeds community. We promise you'll get the most out of it that way.",
                            },
                            {
                                description: "Thank you all for being part of our community!",
                            },
                            {
                                description: "Warmly,",
                            },
                            {
                                description: "The Good Deeds Team",
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

                </HeadingAndText> */}
            </div>
            <Footer />
        </Box>
    );
}

export default Community;
