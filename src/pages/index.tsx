import { Box, Text, Spinner, Center } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { Banner } from "../components/banner/Banner";
import BigCards from "../components/BigCards";
import { BlueBlock } from "../components/blueBlock/BlueBlock";
import { InputBlock } from "../components/inputblock/InputBlock";
import Navbar from "../components/Navbar";
import { ProductGrid } from "../components/ProductGrid";
import { TestimonialCard } from "../components/TestimonialCard";
import { products } from "../utils/_Data";
import { ProductCard } from "../components/ProductCard";
import { Footer } from "../components/Footer";
import React from 'react';
import { baseUrl, accessToken, isLogin } from "../components/Helper/index";
import axios from 'axios';
import { ProductSingleCard } from "../components/ProductSingleCard";
import { isMobile } from 'react-device-detect';
import OurPartners from "../components/partners/OurPartners";
import VolunteerCategories from "../components/volunteer/VolunteerCategories";
import GetStarted from "../components/GetStarted/GetStarted";
import SocialServices from "../components/SocialServices/SocialServices";
import Plan from "../components/Plan/Plan";
import Reviews from "../components/Review/Reviews";


const Home: NextPage = () => {

  const [type, setType] = React.useState<string>('offering')
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [hotDeals, setHotDeals] = React.useState<any>([]);
  const [newListing, setNewListing] = React.useState<any>([]);
  const [wihslistIds, setWishListIds] = React.useState<any>([]);
  const [recentReviews, setRecentReviews] = React.useState<any>([]);
  const [trendingNow, setTrendingNow] = React.useState<any>([]);

  const getHotDeals = React.useCallback(async () => {
    setIsLoading(true);
    let url = `${baseUrl}/listings/hot-deals`;
    const data = await axios.get(url);
    if (data.status === 200) {
      setIsLoading(false);
      setHotDeals(data.data.data);
    } else {
      setIsLoading(false)
    }
  }, []);

  const getNewListing = React.useCallback(async () => {
    setIsLoading(true);
    let url = `${baseUrl}/listings/new`;
    const data = await axios.get(url);
    if (data.status === 200) {
      setIsLoading(false);
      setNewListing(data.data.data);
    } else {
      setIsLoading(false)
    }
  }, []);

  const getRecentReviews = React.useCallback(async () => {
    setIsLoading(true);
    let url = `${baseUrl}/listings/reviews/recent`;
    const data = await axios.get(url);
    if (data.status === 200) {
      setIsLoading(false);
      setRecentReviews(data.data);
    } else {
      setIsLoading(false)
    }
  }, []);

  const getTrendingNow = React.useCallback(async () => {
    setIsLoading(true);
    let url = `${baseUrl}/listings/trending-now`;
    const data = await axios.get(url);
    if (data.status === 200) {
      setIsLoading(false);
      setTrendingNow(data.data.data);
    } else {
      setIsLoading(false)
    }
  }, []);

  const addToWhishList = async (id: any) => {

    let fd = new FormData();
    fd.append('listing_id', id);
    const data = await axios.post(`${baseUrl}/user/wishlist/store?listing_id=${id}`, fd, {
      headers: {
        Authorization: "Bearer " + accessToken(),
      },
    });
    getWhishlistIds();

  }

  const removeFromWhiteList = async (id: any) => {
    let fd = new FormData();
    fd.append('listing_id', id)
    const data = await axios.delete(`${baseUrl}/user/wishlist/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken(),
      },
    });
    getWhishlistIds();
  }

  const getWhishlistIds = React.useCallback(async () => {
    let url = `${baseUrl}/user/wishlist`;
    const data = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + accessToken(),
      },
    });

    if (data.status === 200) {
      setWishListIds(data.data.data);
    }
  }, []);

  React.useEffect(() => {
    getHotDeals();
    getNewListing();
    getRecentReviews();
    getTrendingNow();
    if (isLogin()) {
      getWhishlistIds();
    }
  }, [])
  return (
    <Box>
      <Head>
        {/* <title>Good Deeds</title> */}
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
        {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqal6LVnvttE3KHG-Xk9z3cVMRVUWFjY4&libraries=places"></script> */}
      </Head>
      <Navbar />
      <Banner />
      <OurPartners/>
      <VolunteerCategories/>
      {/* <BlueBlock /> */}

        <GetStarted/>
        <SocialServices/>
        <Plan/>
        <Reviews/>
        {/* <InputBlock /> */}
        {/* <InputBlock
          type={type}
          setType={(e: any) => setType(e)} /> */}

      {/* <Box
        maxW="7xl"
        mx="auto"
        px={{ base: "4", md: "8", lg: "12" }}
        py={{ base: "6", md: "8", lg: "12" }}
      >
        <Text fontSize="2xl" fontWeight="semibold" py={2}>
          Hot deals
        </Text>
        {isLoading &&
          <Center h={"150px"} >
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
          <>
            <ProductGrid>
              {hotDeals.map(
                (product: any, index: any) =>
                  index <= 4 && <ProductSingleCard
                    addToWhishList={(e: any) => addToWhishList(e)}
                    removeFromWhiteList={(e: any) => removeFromWhiteList(e)}
                    key={product.id}
                    product={product}
                    inWhishList={wihslistIds.some((o: any) => o.id === product.id)}
                  />
              )}
            </ProductGrid>
            {hotDeals.length === 0 &&
              <Center h={"150px"} >
                <Text>No Hot Deals found.</Text>
              </Center>
            }
          </>
        }

      </Box>
      <Box
        maxW="7xl"
        mx="auto"
        px={{ base: "4", md: "8", lg: "12" }}
        py={{ base: "6", md: "8", lg: "12" }}
      >
        <Text fontSize="2xl" fontWeight="semibold" py={2}>
          Trending Now
        </Text>
        {isLoading &&
          <Center h={"150px"} >
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='orange.200'
              color='orange.500'
              size='xl'
            />
          </Center>
        }
        {!isLoading && (
          <>
            <ProductGrid>
              {trendingNow.map(
                (product: any, index: any) =>
                  index <= 4 && <ProductSingleCard
                    addToWhishList={(e: any) => addToWhishList(e)}
                    removeFromWhiteList={(e: any) => removeFromWhiteList(e)}
                    key={product.id}
                    product={product}
                    inWhishList={wihslistIds.some((o: any) => o.id === product.id)}
                  />
              )}
            </ProductGrid>
            {trendingNow.length === 0 &&
              <Center h={"150px"} >
                <Text>No Trending Product found.</Text>
              </Center>
            }
          </>
        )}
      </Box>
      <Box
        maxW="7xl"
        mx="auto"
        px={{ base: "4", md: "8", lg: "12" }}
        py={{ base: "6", md: "8", lg: "12" }}
      >
        <Text fontSize="2xl" fontWeight="semibold" py={2}>
          New Listings
        </Text>
        {isLoading &&
          <Center h={"200px"} >
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
          <>
            <ProductGrid>
              {newListing.map(
                (product: any, index: any) =>
                  index <= 4 && <ProductSingleCard
                    addToWhishList={(e: any) => addToWhishList(e)}
                    removeFromWhiteList={(e: any) => removeFromWhiteList(e)}
                    key={product.id}
                    product={product}
                    inWhishList={wihslistIds.some((o: any) => o.id === product.id)}
                  />
              )}
            </ProductGrid>
            {newListing.length === 0 &&
              <Center h={"150px"} >
                <Text>No New Listing found.</Text>
              </Center>
            }
          </>
        }
      </Box>*/}


      <Footer />
    </Box>
  );
};

export default Home;


