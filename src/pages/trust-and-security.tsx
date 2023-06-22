import { Box, Container, SimpleGrid, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Spacer, Divider } from '@chakra-ui/react'
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import { Section1 } from "../components/howToUse/section1";
import HeadingAndText from "../components/headingAndText";
import { isMobile } from "react-device-detect";
const TrustAndSecurity = () => {
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
            <Section1 title="Trust & Security" />

            <Container
                as={SimpleGrid}
                maxW="container.lg"
                columns={{ base: 1 }}
                spacing={{ base: 8, lg: 6 }}
                mb={7}
            >
                <Text>
                    Good Deeds is committed to creating fantastic and safe experiences.
                </Text>
            </Container>

            <HeadingAndText
                heading="1. INTRODUCTION"
                list={
                    [
                        {
                            description: "This Global Privacy Policy (“Privacy Policy”) describes how Good Deeds, Inc. will gather, use, and maintain your Personal Information on the Good Deeds Platform. It will also explain your legal rights with respect to that information."
                        },
                        {
                            description: "By using the Good Deeds Platform, you confirm that you have read and understand this Privacy Policy, and our Global Terms of Service (together referred to herein as the “Agreement”). The Agreement governs the use of the Good Deeds Platform. Good Deeds will collect, use, and maintain information consistent with the Agreement."
                        },
                        {
                            description: "If you are a California resident or data subject in Europe, please see the “Additional Disclosures for California Residents” and “Additional Disclosures for Data Subjects in the European Economic Area (EEA) and Switzerland” sections, respectively. If you have any questions or wish to exercise your rights and choices, please contact us as set out in the “Contact Us” section below."
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

            <HeadingAndText
                heading="2. GENERAL TERMS"
                list={
                    [
                        {
                            description: "In this Privacy Policy:",
                            sublist: [
                                {
                                    description: `Good Deeds, Inc. may be referred to as "Good Deeds," “we,” “our,” or “us.”`
                                },
                                {
                                    description: "We call a user of the Good Deeds Platform “User,” “Users,” “you,” “your,” or “Client”,” as appropriate."
                                },
                                {
                                    description: "The community platform that we offer at our website (www.gooddeeds.ca)"
                                },
                                {
                                    description: "The mobile applications (whether on iOS or Android) are referred to as the “Apps.”"
                                },
                                {
                                    description: "Good Deeds’s Sites, Apps and related services, information and communications are collectively referred to as the “Good Deeds Platform.”"
                                },
                                {
                                    description: "“Terms of Service” refers to our Global Terms of Service, which can be found here. This Privacy Policy is incorporated into, and considered a part of, the Terms of Service."
                                },
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

            <HeadingAndText
                heading="3. INFORMATION COLLECTION"
                list={
                    [
                        {
                            description: "A. INFORMATION YOU PROVIDE TO GOOD DEEDS"
                        },
                        {
                            description: "Good Deeds collects certain personally identifiable information about you, including information that is reasonably capable of being associated with you (“Information”). Examples of Information that Good Deeds collects include but are not limited to:"
                        },
                        {
                            title: "Contact Information. ",
                            description: "This may include your first and last name, postal address, telephone number, and email address."
                        },
                        {
                            title: "Identity Information. ",
                            description: "If you are a User, we may collect Personal Information, such as your date of birth and address, national identification number if applicable, together with the result of basic criminal record checks as provided by you, or by our Third Party Agents (as defined below), as applicable and to the extent permitted by law in your jurisdiction, and to validate your identity."
                        },
                        {
                            title: "Promotional Information. ",
                            description: "Certain offerings of the Good Deeds Platform, such as newsletters, surveys, contests, and the like are optional and so you are not required to enter them or to give us your data in connection with them. Where you do consent to take advantage of Good Deeds Platform offerings, we will use your data to (as applicable) send you newsletters and other communications that are tailored based on information we have about you, or to operate and manage the survey, contest or similar offering in connection with our legitimate interest in promoting our business and the Good Deeds Platform. To opt-out of receiving marketing communications from us, please see the Choice/Opt-Out section below."
                        },
                        {
                            title: "Content Information. ",
                            description: "You also may choose to send Good Deeds Personal Information in an email or chat message containing inquiries about the Good Deeds Platform and we use this Information in order to help us respond to your inquiry. We also collect content within any messages you exchange with other Users through the Service (such as through our chat functionality), and we will never use or share such information for marketing purposes."
                        },
                        {
                            description: "We require that you furnish your Contact Information when you register an account with us in order to provide services through the Good Deeds Platform. For example, if you are a Client, we collect your first and last name, email address, and your zip or postal code in order to create and administer your Good Deeds account. We also collect additional information in order to facilitate your booking request, such as information about the task you are seeking, the time, date and location of the task. If you are a User, we collect your first and last name, email address, mobile phone number and zip or postal code in order to create and administer your Good Deeds account and facilitate communications between you and your Clients through the Platform. We also collect information about your Services, rates, and skills, as well as Identity Information."
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

            <HeadingAndText
                heading="4. INFORMATION GOOD DEEDS COLLECTS AUTOMATICALLY"
                list={
                    [
                        {
                            description: "We automatically collect certain information when you use the Service. The categories of information we automatically collect and have collected, including in the last 12 months, are as follows:"
                        },
                        {
                            title: "Service Use Data, ",
                            description: "including data about features you use, pages you visit, emails and advertisements you view, portions of the Good Deeds Platform that you view and interact with, the time of day you browse, and your referring and exiting pages."
                        },
                        {
                            title: "Device Data, ",
                            description: "including data about the type of device or browser you use, your device’s operating system, your internet service provider, your device’s regional and language settings, and device identifiers such as IP address and Ad Id. When you visit and interact with the Good Deeds Platform, Good Deeds may collect certain information automatically through cookies or other technologies, including, but not limited to, the type of computer or mobile device you use, your mobile device’s unique device ID, the IP address of your computer or mobile device, your operating system, the type(s) of internet browser(s) you use, and information about the way you use the Good Deeds Platform (“Device Information”). We may use Device Information to monitor the geographic regions from which Users navigate the Good Deeds Platform, and for security and fraud prevention purposes. Use of any IP-masking technologies or similar technologies (like the TOR network) may render portions of the Good Deeds Platform unavailable and are forbidden on the Good Deeds Platform."
                        },
                        {
                            title: "Location Data, ",
                            description: "including imprecise location data (such as location derived from an IP address or data that indicates a city or postal code level), and, with your consent, precise location data (such as latitude/longitude data). When you visit the Good Deeds Platform via a native mobile application, we use, with your consent when required under applicable law, GPS technology (or other similar technology) to determine your current location in order to determine the city you are located in and display a relevant location map. We will not share your current location obtained in this manner with other Users."
                        },
                        {
                            description: "We also use various Tracking Technologies (“Tracking Technologies”) to automatically collect information when you use the Good Deeds Platform, including the following:"
                        },
                        {
                            title: "Cookies. ",
                            description: "When you visit websites our Sites, your browser may automatically transmit information to these websites throughout the visit. In a similar way, when you use our mobile applications, we will access and use mobile device IDs to recognize your device. We use “cookies” and equivalent technologies to collect information through our Site and Apps. Cookies are small data files stored on your device that act as a unique tag to identify your browser."
                        },
                        {
                            description: "Persistent cookies help with personalizing your experience, remembering your preferences, and supporting security features. Additionally, persistent cookies allow us to bring you advertising both on and off the Platform. Persistent cookies may remain on your device for extended periods of time, and generally may be controlled through your browser settings. We utilize persistent cookies that only Good Deeds can read and use, and access mobile device IDs to:",
                            sublist: [
                                {
                                    description: "save your login information for future logins to the Good Deeds Platform;"
                                },
                                {
                                    description: "assist in processing items during checkout;"
                                },
                                {
                                    description: "hold session information; and"
                                },
                                {
                                    description: "track user preferences."
                                },
                            ]
                        },
                        {
                            description: "Session cookies make it easier for you to navigate our website and expire when you close your browser. We utilize session ID cookies and similar technologies to:",
                            sublist: [
                                {
                                    description: "enable certain features of the Good Deeds Platform;"
                                },
                                {
                                    description: "better understand how you interact with the Sites and the Good Deeds Platform;"
                                },
                                {
                                    description: "monitor usage by our Users and web traffic routing on the Good Deeds Platform;"
                                },
                                {
                                    description: "track the number of entries in Good Deeds promotions, sweepstakes and contests; and"
                                },
                                {
                                    description: "identify visited areas of the Good Deeds Platform."
                                }
                            ]
                        },
                        {
                            description: "Unlike persistent cookies, session cookies are deleted from your computer when you log off from the Good Deeds Platform and then close your browser."
                        },
                        {
                            description: "Exhibit A sets out the different categories of cookies that the Good Deeds Platform uses and why we use them."
                        },
                        {
                            description: "We may work with third party advertisers who may also place or read persistent cookies on your browser, and we may use Flash cookies (or local shared objects) to store your preferences or display content based upon what you view on the Sites to personalize your visit."
                        },
                        {
                            description: "You can instruct your browser, by changing its options, to stop accepting cookies or to prompt you before accepting a cookie from the websites you visit. If you do not accept cookies, however, you will not be able to use all portions or all functionalities of the Good Deeds Platform."
                        },
                        {
                            description: "To change your cookie settings for cookies on the Sites, please click on the following addresses based on the browser you use: Internet Explorer, Safari, Chrome, Firefox, and Opera."
                        },
                        {
                            description: `Pixels. We and our Third Party Agents may also use "pixel tags," "web beacons," "clear GIFs," or similar means in connection with the Good Deeds Platform and HTML-formatted email messages to, among other things, track the actions of Users and email recipients, determine the success of marketing campaigns, and compile statistics about Site usage and response rates.`
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

            <HeadingAndText
                heading="5. GOOD DEEDS'S USE OF INFORMATION"
                list={
                    [
                        {
                            description: "We collect and use information for business and commercial purposes in accordance with the practice described in this Privacy Policy. Our business purposes for collecting and using information include:",
                            sublist: [
                                {
                                    description: "To operate and make available the Good Deeds Platform. We use your data to connect you with other users to enable the posting of, selection for, completion of, and deed dollars for products or Services, in order to fulfill our contracts with users;"
                                },
                                {
                                    description: "For fraud prevention, on the basis of our legitimate interests in ensuring a safe and secure environment in which Clients and users can meet and conduct business, and in order to comply with our legal obligations;"
                                },
                                {
                                    description: "For formal volunteer positions, criminal background, and right to work checks, if applicable, and to the extent permitted by local law."
                                },
                                {
                                    description: "For service providers, platform users are encouraged to background check and verify identity of service providers in order to ensure the safety of our users both online and offline, preventing or detecting unlawful acts, protecting the public against dishonesty, and maintaining the integrity of the Good Deeds Platform given that users often interact directly with Clients and may enter their homes;"
                                },
                                {
                                    description: "To analyze Good Deeds Platform usage as necessary for our legitimate interest in improving the Good Deeds Platform to grow our business;"
                                },
                                {
                                    description: "To contact you and deliver (via email, SMS, push notifications, or otherwise) transactional information, administrative notices, marketing notifications, offers and communications relevant to your use of the Good Deeds Platform, with your consent when required under applicable law, as necessary for our legitimate interests in proper communication and engagement with our Users and in promoting our business;"
                                },
                                {
                                    description: "To provide you with customer support in order to fulfill our contracts with users;"
                                },
                                {
                                    description: "For internal market research for our legitimate interest in improving the Good Deeds Platform to grow our business;"
                                },
                                {
                                    description: "For troubleshooting problems for our legitimate interests in ensuring a safe and secure environment in which users can meet;"
                                },
                                {
                                    description: "To assist users in the resolution of complaints and disputes between them, as necessary for our legitimate interests in facilitating good relations among users;"
                                },
                                {
                                    description: "To enforce our Terms of Service and our legitimate interests in ensuring our Agreement is complied with; and"
                                },
                                {
                                    description: "As otherwise set forth in the Agreement."
                                },
                            ]
                        },
                        {
                            title: "Interest-Based Advertising. ",
                            description: "Ads are a standard part of user experience on the Internet, and Good Deeds believes that targeted advertising enhances this experience. Good Deeds and affiliate third parties may use cookies and other technologies to place ads where they believe interested users will see them. In addition to banner ads, Good Deeds may advertise products, companies and events that we think might interest you through the email address you provide. We may incorporate Tracking Technologies into our own Service (including our website and emails) as well as into our ads displayed on other websites and services. Some of these Tracking Technologies may track your activities across time and services for purposes of associating the different devices you use, and delivering relevant ads and/or other content to you (“Interest-Based Advertising”)."
                        },
                        {
                            description: "For more information and to understand your choices regarding third party ads, please see the “Cookies and Other Technologies and Interest-Based Advertising” in Exhibit A. Advertising and marketing is carried out as necessary for our legitimate interests in providing an engaging and relevant experience, promoting our services, and growing our business."
                        },
                        {
                            description: "Analytics and Market Analysis. Good Deeds may analyze information (“Market Analysis”) as necessary for our legitimate interests in providing an engaging and relevant experience, and promoting and growing the Good Deeds Platform."
                        },
                        {
                            description: "Good Deeds uses information to offer services to users who express an interest in these services, through a poll for example, or to Users who can be presumed to have an interest based on results from our Market Analysis. We do this as necessary for our legitimate interests in providing an engaging and relevant experience, promoting our services, and growing our business."
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

            <HeadingAndText
                heading="6. INFORMATION SHARING"
                list={
                    [
                        {
                            description: "We only share the Information we collect about you as described in this Privacy Policy or as described at the time of collection or sharing, including as follows:"
                        },
                        {
                            title: "Third Party Agents. ",
                            description: "We share information, including Identity Information, with entities that process information on our behalf for our business purposes. Third Party Agents assist us with services such as deed dollars processing, data analytics, marketing and advertising, website hosting, fraud prevention and detection, communication services, and technical support. We contractually prohibit our Third Party Agents from retaining, using, or disclosing information about you for any purposes other than performing the services for us, although we may permit them to use information that does not identify you (including information that has been aggregated or de-identified) for any purpose except as prohibited by applicable law."
                        },
                        {
                            description: "To operate the Good Deeds Platform, we may share your information with our agents, representatives, vendors and service providers (“Third Party Agents”) so they can provide us with support services as follows:",
                            sublist: [
                                {
                                    description: "Email origination;"
                                },
                                {
                                    description: "Identity checks (currently carried out carried out by our provider Sterling in U.S. and Canada), to the extent permitted by applicable law;"
                                },
                                {
                                    description: "Customer relationship management services;"
                                },
                                {
                                    description: "To otherwise help us provide the Good Deeds Platform."
                                },
                            ]
                        },
                        {
                            title: "Partners. ",
                            description: `Some Good Deeds content is "sponsored by" or "presented by" other companies. If you connect to the Good Deeds Platform through a co-branded version of our Good Deeds Platform or otherwise participate in one of our partner programs, we may share information about your use of the Good Deeds Platform with that Partner in order to offer the integrated platform and to evaluate the partner program. We may also share your information with our Partners in order to receive additional information about you, or in order to create offers that may be of interest to you. Please check such Partner’s privacy policy before revealing information about yourself. If you don't want these Partners to have your Personal Information, you can choose to not participate.`
                        },
                        {
                            title: "Promotions. ",
                            description: "When you voluntarily enter a sweepstakes, contest, or other promotion, we share information as set out in the official rules that govern the promotion as well as for administrative purposes and as required by law (e.g., on a winners’ list). By entering a promotion, you agree to the official rules that govern that promotion, and may, except where prohibited by applicable law, allow the sponsor and/or other entities to use your name, voice, and/or likeness in advertising or marketing materials. We may occasionally contact you, if you want us to, with information about special events, activities, promotions, contests, submission opportunities, and programs. You always have the ability, in your Account, to ask Good Deeds not to contact you with this type of information. Please see the Your Rights and Choices section for more information."
                        },
                        {
                            title: "Other Users. ",
                            description: "Good Deeds facilitates contact between clients and users and reserves the right to share a user’s contact information (e.g. name, phone number, email, or postal address) with a Client and vice versa, or with their legal or other representative, in order to facilitate: (1) the resolution of a dispute related to or arising from an interaction between two or more Users of the Good Deeds Platform; or (2) the performance of a Task. This exchange of information is a mandatory part of the Good Deeds Platform."
                        },
                        {
                            title: "Legal Obligations. ",
                            description: "Good Deeds and our Third Party Agents may disclose information or user Generated Content, including location data or communication data, to a third party if required or permitted to do so by law or pursuant to a court order, warrant or subpoena. Good Deeds reserves the right to disclose Personal Information from both private and public areas of the Site(s) and the Good Deeds Platform in the absence of a court order, warrant or subpoena, to the extent permitted by applicable law, if we are given reason to believe, in our sole discretion, that someone is causing injury to or interfering with the rights of users, the general public, or Good Deeds or its partners, parents or affiliates."
                        },
                        {
                            description: "It is our policy to provide notice to Users before producing their information in response to law enforcement requests unless (i) we are prohibited or otherwise constrained by law or court order from doing so, (ii) we have reason to believe the User’s account has been compromised such that the notice would go to the wrong person, or notice would otherwise be counterproductive or would create a risk to safety, or (iii) it is an emergency request and prior notice would be impractical (in which case we may provide notice after the fact)."
                        },
                        {
                            title: "Merger or Acquisition. ",
                            description: "Good Deeds reserves the right to share information in connect with, or during negotiations of, any proposed or actual merger, purchase, sale, or any other type of acquisition or business combination of all or any portion of our assets, or transfer of all or a portion of our business to another business."
                        },
                        {
                            title: "Public Areas. ",
                            description: "Your profile on the Good Deeds Platform consists of information about you and your business, and may include information such as photographs, your years in business, skills and expertise, feedback/rating information, and other information, including your username (“Profile”). The information in your User Profile may be visible to all users and the general public. If you choose to post a service via the Good Deeds Platform, the contents of such listing will be viewable to users you select on the Good Deeds Platform.",
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

            <HeadingAndText
                heading="7. YOUR RIGHTS AND CHOICES"
                list={
                    [
                        {
                            description: "You may opt-out of receiving promotional communications from us and our Partners, remove your information from our database, choose to not receive future promotional communications related to the Good Deeds Platform, or cancel your account by logging on to the Site(s) and clicking on the “Account” tab, or by contacting us at retention@gooddeeds.ca."
                        },
                        {
                            title: "Account Settings.",
                            description: "During registration you choose whether to receive marketing correspondence from Good Deeds and its affiliates and Partners. This information remains on your Profile where you can, at any point, easily edit it. After logging on, click on the “Account” tab, then select “Notifications” to make your preferred selections."
                        },
                        {
                            title: "Push Notifications. ",
                            description: "You have the option to receive updates and relevant offers via push notifications in your app. These notifications can be configured in the settings of your mobile device."
                        },
                        {
                            title: "Corrections to Profile. ",
                            description: "You have the right to access, update, and correct inaccuracies in your Good Deeds Profile at any time by logging in and clicking on the “Account” tab. There, you can view, update, and correct your Account information. Our databases automatically update any information you edit in your Profile under the “Account” tab."
                        },
                        {
                            description: "So that we may protect the integrity of the Good Deeds Platform, there are certain pieces of information, such as your age, that you cannot alter yourself. For example, since children under the age of majority in their jurisdiction of residence are not allowed to register as Users, we need to take reasonable measures to preserve the accuracy of our Users' ages. You may contact us at privacy@gooddeeds.ca if there is a need to make a correction to such data. Please see the Children’s Privacy section for more details."
                        },
                        {
                            title: "Promotional Communications. ",
                            description: `You can opt out of receiving promotional communications from Good Deeds sent via email by clicking on the unsubscribe link in any message. You can opt out of receiving promotional communications from Good Deeds sent via text message at any time by following the instructions provided in those messages to text the word "STOP". Please note that your opt-out is limited to the phone number used and will not affect subsequent subscriptions. If you opt-out of only certain communications, other subscription communications may continue. Even if you opt-out of receiving promotional communications, Good Deeds may continue to send you non-promotional communications, such as those about your account, Services, transactions, servicing, or Good Deeds’s ongoing business relationship with you. If you receive unsolicited email from a Good Deeds domain, please let us know here, privacy@gooddeeds.ca.`
                        },
                        {
                            title: "Cookies and Pixels. ",
                            description: "Most browsers accept cookies by default. You can instruct your browser, by changing its settings, to decline or delete cookies. If you use multiple browsers on your device, you will need to instruct each browser separately. Your ability to limit cookies is subject to your browser settings and limitations."
                        },
                        {
                            title: "Do Not Track. ",
                            description: "Your browser settings may allow you to automatically transmit a “Do Not Track” signal to online services you visit. Note, however, there is no industry consensus as to what site and app operations should do with regard to these signals. Accordingly, unless and until the law is interpreted to require us to do so, we do not monitor or take action with respect to “Do Not Track” signals. For more information on “Do Not Track,” visit https://www.allaboutdnt.com."
                        },
                        {
                            title: "App and Location Technologies. ",
                            description: "You can stop all collection of information via an app by uninstalling the app. You can also reset your device Ad Id at any time through your device settings, which is designed to allow you to limit the use of information collected about you. If you do not want us to use your location anymore for the purposes set forth above, you should turn off the location services for the mobile application located in your device’s account settings, your mobile phone settings, and/or within the mobile application."
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

            <HeadingAndText
                heading="8. GOOD DEED'S INFORMATION RETENTION POLICY"
                para="We retain personal data for as long as you are a User in order to meet our contractual obligations to you, and for such longer period as may be in our legitimate interests and to comply with our legal obligations (see Exhibit B for exemplar document retention periods). We may also retain data from which you cannot directly be identified, for example where stored against a randomly-generated identifier so we know the data relates to a single user, but we cannot tell who that user is. We use this kind of data for research purposes and to help us develop and improve our services, and we take appropriate measures to ensure you cannot be re-identified from this data."
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
                heading="9. GOOD DEED’S SECURITY OF COLLECTED INFORMATION"
                list={
                    [
                        {
                            description: "Your Good Deed’s account is password-protected so that only you and authorized Good Dees staff have access to your account information. In order to maintain this protection, do not give your password to anyone. Also, if you share a computer, you should sign out of your Good Deeds account and close the browser window before someone else logs on. This will help protect your information entered on public terminals from disclosure to third parties."
                        },
                        {
                            description: "Good Deeds implements and maintains reasonable administrative, physical, and technical security safeguards to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. Good Deeds has staff dedicated to maintaining this Privacy Policy and other privacy initiatives, periodically reviewing security, and making sure that every Good Deeds employee is aware of our security practices. Nevertheless, transmission via the internet is not completely secure and we cannot guarantee the security of information about you."
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

            <HeadingAndText
                heading="10. NOTIFICATION OF CHAGNES"
                para="Good Deeds's Privacy Policy is periodically reviewed and enhanced as necessary. This Privacy Policy might change as Good Deeds updates and expands the Good Deeds Platform. Good Deeds will endeavor to notify you of any material changes by email. Good Deeds also encourages you to review this Privacy Policy periodically."
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
                heading="11. CHILDREN’S PRIVACY"
                list={
                    [
                        {
                            description: "This service is intended for a general audience, and is not directed at children under 13 years of age. In certain jurisdictions, this minimum age may be higher. Please check the Jurisdiction-specific Provisions below for more information."
                        },
                        {
                            description: "We do not knowingly gather personal information (as defined by the U.S. Children’s Privacy Protection Act, or “COPPA”) in a manner not permitted by COPPA. If you are a parent or guardian and you believe that we have collected information from your child in a manner not permitted by law, please let us know by contacting us privacy@gooddeeds.ca. We will remove the data."
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

            <HeadingAndText
                heading="12. CONTACTING US"
                list={
                    [
                        {
                            description: "If you have any questions about this Privacy Policy or the manner in which we or our Third Party Agents treat your Personal Information, the practices of the Site, your dealings with the Good Deeds Platform, or if you have technical problems, you may contact us privacy@gooddeeds.ca."
                        },
                        {
                            description: "Good Deeds's staff will respond to all mail or email from Users with questions about privacy, including the types of Personal Information stored on the Good Deeds database, and requests to delete or rectify such Personal Information."
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

            <HeadingAndText
                heading="13. JURISDICTION-SPECIFIC PROVISIONS"
                list={
                    [
                        {
                            title: "A. RESIDENTS OF THE UNITED STATES OF AMERICA."
                        },
                        {
                            title: "Information of U.S. Users. ",
                            description: "Our collection, use, and retention of the Information of U.S. Users is in accordance with applicable U.S. laws, as is our determination of what is deemed to be “personal data and/or information”. Such collection, use, and retention laws are different from those afforded to EU Users under the General Data Protection Regulation of 2018 (“GDPR”)."
                        },
                        {
                            description: "Good Deeds expressly disclaims any liability that may arise should any other individuals obtain the information you submit to the Good Deeds Platform."
                        },
                        {
                            title: "Interest-Based Advertising in the United States. ",
                            description: "For more information about interest-based ads, or to opt out of having your web-browsing information used for behavioral advertising purposes, please visit www.aboutads.info/choices."
                        },
                        {
                            title: "Good Deeds’s Security of Collected Information. ",
                            description: "While Good Deeds will use commercially reasonable efforts to ensure the security of all  and Personal Information, we expressly disclaim any liability for any unauthorized access to or use of our secure servers and/or any and all Personal Information and/or  stored therein, and you agree to hold Good Deeds harmless for any damages that may result therefrom. If you have any further questions on this issue, please refer to the Terms of Service."
                        },
                        {
                            title: "B. RESIDENTS OF CANADA."
                        },
                        {
                            title: "Transfer Of Data. ",
                            description: "We and our affiliates and Third Party Agents primarily store data about you, including Personal Information, on servers located and operated within the United States. If you reside or are located outside of the U.S., we may send and store your Personal Information (also commonly referred to as personal data) to the U.S. in order to provide and operate the Good Deeds Platform. By accepting the terms of this Privacy Policy, you acknowledge the transfer to and processing of your Personal Information on servers located in the U.S. and other countries."
                        },
                        {
                            title: "Custom Audience. ",
                            description: "We may use services provided by third-party platforms (such as social networking or other websites) to serve targeted advertisements on such platforms to you, and we may provide a hashed version of your email address or other information to the platform provider for such purposes. To opt-out of the use of your information for such purposes, please launch the opt-out tool at https://youradchoices.ca/choices."
                        },
                        {
                            title: "Interest-Based Advertising in Canada. ",
                            description: "For more information about interest-based ads, or to opt out of having your web-browsing information used for behavioral advertising purposes, please visit https://youradchoices.ca/choices."
                        },
                        {
                            description: "To learn more about interest-based advertising in mobile apps and to opt out of this type of advertising by third-party advertising companies that participate in the DAAC’s AppChoices tool, please download the version of AppChoices for your device at https://youradchoices.ca/appchoices/."
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

            <Container
                as={SimpleGrid}
                maxW="container.lg"
                columns={{ base: 1 }}
                spacing={{ base: 8, lg: 6 }}
                mb={7}
            >
                <TableContainer className="trust-security-table" border="1px solid black">
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Type of Cookie</Th>
                                <Th>Purpose</Th>
                                <Th>Who Serves (for example)</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Authentication Cookies</Td>
                                <Td>These cookies (including local storage and similar technologies) tell us when you’re logged in, so we can customize your experience and connect your account information and settings.</Td>
                                <Td>Good Deeds</Td>
                            </Tr>
                            <Tr>
                                <Td>Localization</Td>
                                <Td>These cookies help provide a localized experience by showing you your local metro area.</Td>
                                <Td>Good Deeds</Td>
                            </Tr>
                            <Tr>
                                <Td>Site features and services</Td>
                                <Td>These provide functionality that helps us deliver products and the Good Deeds Platform. For example, cookies help you log in by pre-filling fields or help ensure older versions of web browsers can still view our Site(s). We may also use cookies and similar technologies to help us provide you with social plugins and other customized content and experiences, including customized fonts.</Td>
                                <Td>
                                    <ul style={{ listStyle: "disc" }}>
                                        <li>Good Deeds</li>
                                        <li>Facebook</li>
                                        <li>Linkedin</li>
                                        <li>Amazon- Hosting</li>
                                        <li>Zopim</li>
                                        <li>Polyfill</li>
                                        <li>MyFonts Counter</li>
                                    </ul>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Analytics and research</Td>
                                <Td>These are used to understand, improve, and research products and services, including when you access the Good Deeds Platform and related websites and apps from a computer or mobile device. For example, we may use cookies to understand how you are using site features, to report on any errors in how the Site is functioning, to report to our vendors when content licensed from them is assessed, and to segment audiences for feature testing. We and our partners may use these technologies and the information we receive to improve and understand how you use websites, apps, products, services and ads.</Td>
                                <Td>
                                    <ul style={{ listStyle: "disc" }}>
                                        <li>Google Analytics</li>
                                        <li>HeapAnalytics</li>
                                        <li>MixPanel</li>
                                        <li>BugSnag</li>
                                        <li>Google Tag Manager</li>
                                    </ul>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Interest-Based Advertising</Td>
                                <Td>
                                    Things like cookies and pixels are used to deliver relevant ads, track ad campaign
                                    performance and efficiency, and to understand your interests from your online
                                    activity on the Site, mobile applications and other websites and apps. For example,
                                    we and our ad partners may rely on information gleaned through these cookies to
                                    serve you ads that may be interesting to you on other websites and in doing that
                                    your information (which will not contain your name, email address or other
                                    "real-world" identifiers) will be shared with other platforms in the digital
                                    advertising ecosystem all involved in assisting the delivery, purchase, reporting
                                    and analysis of digital advertising. Similarly, our advertisers may use a cookie,
                                    attribution service or another similar technology to determine whether we’ve served
                                    an ad and how it performed, or provide us with information about how you interact
                                    with them. <br /><br />
                                    Please note that even if you opt-out of interest-based advertising by a third party,
                                    these tracking technologies may still collect data for other purposes, including
                                    analytics, and you may still see ads from us, but the ads will not be targeted based
                                    on behavioral information about you and may therefore be less relevant to you and
                                    your interests. <br /><br />
                                    You can instruct your browser, by changing its options, to stop accepting cookies
                                    or to prompt you before accepting a cookie from the websites you visit. To
                                    successfully opt-out, you must have cookies enabled in your web browser. Please
                                    see your browser’s instructions for information on cookies and how to enable
                                    them. Your opt-out only applies to the web browser you use so you must opt-out
                                    of each web browser on each device that you use. Once you opt out, if you delete
                                    your browser’s saved cookies, you may need to opt-out again. <br /><br />
                                    For more information about targeting and advertising cookies and how you can opt
                                    out, you can visit the Network Advertising Initiative opt-out page, or the Digital
                                    Advertising Alliance’s opt-out pages in the United States, https://youradchoices.ca/choices/ in Canada
                                </Td>
                                <Td>
                                    <ul style={{ listStyle: "disc" }}>
                                        <li>Good Deeds</li>
                                        <li>Google</li>
                                        <li>Doubleclick</li>
                                        <li>Sailthru</li>
                                        <li>Horizon</li>
                                        <li>Bing Ads</li>
                                    </ul>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>

                <Text fontStyle="italic">Social Media and Digital Advertising cookies and widgets</Text>
            </Container>

            <HeadingAndText
                heading=" "
                unOrderedList={
                    [
                        {
                            title: "DoubleClick: ",
                            description: "Google's Doubleclick re-targeting cookie lets us serve personalized ads to you when you're browsing other websites and social media platforms. You can control ad personalization on Google and partner websites In Google’s Privacy and Terms page."
                        },
                        {
                            title: "Facebook Connect: ",
                            description: "We may allow you to sign up and log in using your Facebook account. If you sign up using Facebook Connect, Facebook will ask your permission to share certain information from your Facebook account with us. This may include your first name, last name, email address, profile picture, and general location in order to create an account. This information is collected by Facebook and is provided to us under the terms of Facebook’s privacy policy. You can control the information that we receive from Facebook using the privacy settings in your Facebook account.",
                        },
                        {
                            title: "Facebook Impressions: ",
                            description: "We use Facebook Impressions to track the number of people that interact with our content on Facebook. This information is collected by Facebook and is provided to us under the terms of Facebook’s privacy policy. You can control the information that we receive from Facebook using the privacy settings in your Facebook account.",
                        },
                        {
                            title: "Google Sign-in: ",
                            description: "We may allow you to sign up and log in using your Google account. If you sign up using Google, Google will ask your permission to share certain information from your Google account with us. This may include your first name, last name, email address, profile picture, and general location in order to create an account. This information is collected by Google and is provided to us under the terms of Google’s privacy policy.",
                        },
                        {
                            title: "LinkedIn Widgets: ",
                            description: "This tool enables visitors to engage with us via LinkedIn and show visitors relevant ads and personalized content on LinkedIn. To learn more about LinkedIn’s practices and to opt out, please visit LinkedIn’s Privacy Policy and Settings.",
                        },
                        {
                            title: "Sailthru: ",
                            description: "Email newsletters you elect to receive from us are transmitted through Sailthru. Sailthru uses pixel tag technology to determine whether an email has been opened. In addition, when you click on any link in an email newsletter or marketing message you have elected to receive, Sailthru recognizes that fact. This information is used in the aggregate to measure the rate at which emails are opened and various links are clicked, to measure user interests and traffic patterns, and to improve the content of the email newsletters and the services and features offered through the email newsletter and marketing messages. Because some of this information is linked to individual email addresses, it is personally identifiable. You can view Sailthru’s privacy policy here.",
                        },
                        {
                            title: "Bing Ads: ",
                            description: "We use Bing Ads to promote our company online and use the cookies provided by Bing to record completion of a transaction on our website. You can find out more about Bing cookies by visiting Bing’s Privacy Policy.",
                        },
                    ]
                }
            >
            </HeadingAndText>

            <Container
                as={SimpleGrid}
                maxW="container.lg"
                columns={{ base: 1 }}
                spacing={{ base: 8, lg: 6 }}
                mb={7}
            >
                <Text fontStyle="italic">Social Media and Digital Advertising cookies and widgets</Text>
            </Container>
            <HeadingAndText
                heading=" "
                unOrderedList={
                    [
                        {
                            title: "Google Analytics: ",
                            description: "We use Google Analytics, a web analytics service. Google Analytics uses cookies to help Good Deeds analyze how visitors use the Site(s). The information generated by cookies about your use of the Site(s) and the Good Deeds Platform (including your IP address) will be transmitted to and stored by a Google server in the United States. Google uses this information for the purpose of evaluating your use of the Site(s), compiling reports on Site activity for Site operators, and providing Site operators with other services relating to Site activity and Internet usage. You can prevent the storage of data relating to your use of the Site(s) and created via the cookie (including your IP address) by Google, as well as the processing of this data by Google, by downloading and installing the browser plug-in available here. You can obtain additional information on Google Analytics’ collection and processing of data and data privacy and security at the following links: How Google Uses Information From Sites Or Apps That Use Our Services and Analytics Help."
                        }
                    ]
                }
            >
            </HeadingAndText>

            <Footer />
        </Box>
    );
}

export default TrustAndSecurity;
