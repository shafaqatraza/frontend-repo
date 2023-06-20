import {
    Box, Container, SimpleGrid, Text,
    HStack,
    Stack,
    Center,
    Spinner,
    Link
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Section1 } from "../../components/howToUse/section1";
import { UserCard } from '../../components/Profile/UserCard';
import { UserAvatar } from '../../components/Profile/UserAvatar'
import { CardContent } from '../../components/Profile/CardContent'
import { CardHeader } from '../../components/Profile/CardHeader'
import { Rating } from '../../components/Rating'
import { isMobile } from 'react-device-detect'
import { useRouter } from 'next/router'
import axios from "axios";
import { baseUrl } from '../../components/Helper/index';
import moment from "moment";


const PublicReviews = () => {


    const [allReviews, setAllReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()

    // console.log('koPPkoZZk', allReviews)

    const getAllReviews = (id) => {
        setIsLoading(true);
        axios.get(`${baseUrl}/reviews/${id}`)
            .then(res => {
                setAllReviews(res.data.data);
                setIsLoading(false);
            }).catch(err => {
                console.log(err);
                setIsLoading(false);
            })
    }

    useEffect(() => {

        if (router?.query.id !== undefined && router?.query.id !== '') {
            getAllReviews(router?.query.id);
        }

    }, [router.query])



    return (
        <Box>
            <Head>
                {/* <title>Good Deeds | User Reviews</title> */}
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

            <Section1 title="Reviews" />

            <Container
                as={SimpleGrid}
                maxW="container.lg"
                columns={{ base: 1 }}
                spacing={{ base: 8, lg: 6 }}
                mb={7}
            >
                {isLoading &&
                    <Center h='500px' >
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='orange.200'
                            color='orange.500'
                            size='xl'
                        />
                    </Center>
                }

                {!isLoading &&
                    allReviews.length === 0 ? (
                    <Text fontSize={18} my={10} color="black" fontWeight="bold">
                        No Review
                    </Text>
                ) : (
                    allReviews?.map((allReview, index) => {
                        return (
                            <UserCard position="relative" key={index}>
                                <Stack
                                    direction={{ base: 'column', xs: 'row' }}
                                    spacing={{ base: '4', md: '10' }}
                                    color="grey.100"
                                    style={
                                        isMobile ? { position: 'relative', left: '-8%', top: '-5px' } : {}
                                    }
                                >
                                    <Link href={`/profile/${allReview?.buyer_username}`}>
                                        <UserAvatar
                                            style={{ marginRight: '20px' }}
                                            name={allReview.buyer_name || ''}
                                            // src="https://images.unsplash.com/photo-1506935077180-46af676a2f6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
                                            src={
                                                allReview.avatar !== undefined && allReview.avatar != ''
                                                    ? allReview.avatar
                                                    :
                                                    'https://images.unsplash.com/photo-1506935077180-46af676a2f6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                                            }
                                        //   isVerified
                                        />
                                    </Link>
                                    <CardContent>
                                        <CardHeader
                                            style={
                                                isMobile
                                                    ? {
                                                        position: 'relative',
                                                        right: '-10%'
                                                    }
                                                    : {}
                                            }
                                        // title={profileData.user_profile.username || ''}
                                        />

                                        <Stack
                                            spacing="1"
                                            mt="2"
                                            color="grey.100"
                                            style={
                                                isMobile
                                                    ? {
                                                        position: 'relative',
                                                        right: '-10%'
                                                    }
                                                    : {}
                                            }
                                        >
                                            <HStack>
                                                <Text fontSize={12} color="grey">
                                                    {moment(allReview.created_at).utc().format('YYYY-MM-DD, h:mm a')}

                                                </Text>
                                            </HStack>
                                            <HStack>
                                                <Link href={`/profile/${allReview?.buyer_username}`}>
                                                    <Text fontSize={18} color="black" fontWeight="bold">
                                                        {allReview.buyer_username != undefined ? allReview.buyer_username : allReview.seller_username}
                                                    </Text>
                                                </Link>
                                            </HStack>

                                            <HStack>
                                                <Text fontSize={14} color="black">
                                                    <Rating defaultValue={allReview.buyer_rating != undefined ? allReview.buyer_rating : allReview.seller_rating} size="sm" />
                                                </Text>
                                            </HStack>
                                            <HStack>
                                                <Text fontSize={14} color="black">
                                                    {allReview.buyer_review != undefined ? allReview.buyer_review : allReview.seller_review}
                                                </Text>
                                            </HStack>

                                        </Stack>

                                    </CardContent>
                                </Stack>
                            </UserCard>
                        )
                    })
                )
                }


            </Container>

            <Footer />
        </Box>
    );
};

export default PublicReviews;
