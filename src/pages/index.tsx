import { Box, Text, Spinner, Center, Flex } from "@chakra-ui/react";
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
import React, { useState, useEffect } from 'react';
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
import fav from "../assets/imgs/favicon.ico"

import { MyModal } from '../components/MyModal'
import { SignupModal } from '../components/onboarding/Signup/SignupModal'
import { Step1 } from '../components/createProfileModels/step1'
import { Step1Form } from '../components/createProfileModels/step1Form'
import { LoginForm } from '../components/onboarding/Login/LoginForm'
import { ForgotPasswordModal } from '../components/onboarding/Login/ForgotPassword/ForgotPasswordModal'
import { ForgotPassword } from '../components/onboarding/Login/ForgotPassword/ForgotPasswordForm'
import { SignupForm } from '../components/onboarding/Signup/SignupForm'
import { SignUpVerificationModal } from '../components/onboarding/Signup/Verification/VerificationModal'
import { SignUpVerificationForm } from '../components/onboarding/Signup/Verification/VerificationForm'
import { Step2Form } from '../components/createProfileModels/step2/step2Form'
import { WelcomeScreen1 } from '../components/createProfileModels/welcomeScreen/screen1'
import { InnerSection } from '../components/createProfileModels/welcomeScreen/innerSection'
import OrganizationCreationModal from '../components/organization/OrganizationCreationModal';
import gdlogo from '../assets/imgs/gdlogopegiun.png'
import explorepegiun from '../assets/imgs/explorepegiun.png'
import exchangepegiun from '../assets/imgs/exchangepegiun.png'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/toast'
interface ModelType {
  login: boolean
  forgotPassword: boolean
  signUp: boolean
  drawer: boolean
  signUpVerification: boolean
  step1: boolean
  step2: boolean,
  welcomeScreen1: boolean
  welcomeScreen2: boolean
  welcomeScreen3: boolean
  welcomeScreen4: boolean
}

const Home: NextPage = () => {
  const toast = useToast()
  const [type, setType] = React.useState<string>('offering')
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [hotDeals, setHotDeals] = React.useState<any>([]);
  const [newListing, setNewListing] = React.useState<any>([]);
  const [wihslistIds, setWishListIds] = React.useState<any>([]);
  const [recentReviews, setRecentReviews] = React.useState<any>([]);
  const [trendingNow, setTrendingNow] = React.useState<any>([]);
  const [refer, setRefer] = useState<any>('')
  const [isRefer, setIsRefer] = useState<boolean>(true);
  const [showCreateOrgModal, setShowCreateOrgModal] = useState(false);
  const [openOrganization, setOpenOrganization] = useState<boolean>(false);
  const [orgData, setOrgData] = useState([]);
  const router = useRouter()
  const { token, 'accept-invite': acceptInvite, 'decline-invitation': declineInvitation} = router.query;
  
  const [showModel, setShowModel] = useState<ModelType>({
    login: false,
    forgotPassword: false,
    signUp: false,
    drawer: false,
    signUpVerification: false,
    step1: false,
    step2: false,
    welcomeScreen1: false,
    welcomeScreen2: false,
    welcomeScreen3: false,
    welcomeScreen4: false
  })

  useEffect(() => {
    if(isLogin()){
      axios.get(`${baseUrl}/organizations`, {
        headers: {
          Authorization: 'Bearer ' + accessToken(),
        }
      }).then((res) => {
        setOrgData(res.data);
      }).catch((err) => {
        // console.log(err);
      })
    }
    
  }, [isLogin()])

  useEffect(() => {
    if (token && acceptInvite) {
      if(isLogin()){
        if(showModel.signUp === false && showModel.signUpVerification === false && showModel.step1 === false && showModel.step2 === false && showModel.welcomeScreen1 === false 
          && showModel.welcomeScreen2 === false && showModel.welcomeScreen3 === false && showModel.welcomeScreen4 === false){
          axios.get(`${baseUrl}/accept-invite?invitationtoken=${token}`, {
            headers: {
              Authorization: 'Bearer ' + accessToken(),
            }
          }).then((response) => {
              if(response.data.status === 'accepted'){
                toast({ position: 'top', title: response.data.message, status: 'warning' })
                goToOrganizatonDashboard()
              }
              
              if(response.data.status === 'success'){
                toast({ position: "top", title: response.data.message, status: "success" });
                goToOrganizatonDashboard()
              }

              if(response.data.status === 'inactive'){
                toast({ position: "top", title: response.data.message, status: "warning" });
              }
              
            })
            .catch((error) => {
              toast({ position: 'top', title: error.response.data.message, status: 'warning' })
            });
        }else if(showModel.signUp === true){
          axios.get(`${baseUrl}/accept-invite?invitationtoken=${token}`, {
            headers: {
              Authorization: 'Bearer ' + accessToken(),
            }
          }).then((response) => {
              if(response.data.status === 'accepted'){
                toast({ position: 'top', title: response.data.message, status: 'warning' })
              }
              
              if(response.data.status === 'success'){
                toast({ position: "top", title: response.data.message, status: "success" });
              }

              if(response.data.status === 'inactive'){
                toast({ position: "top", title: response.data.message, status: "warning" });
              }
              
            })
            .catch((error) => {
              toast({ position: 'top', title: error.response.data.message, status: 'warning' })
            });
        }else if (showModel.welcomeScreen3 === true) {
          goToOrganizatonDashboard()
        }
      }else{
        let dubShow = { ...showModel }
        dubShow.login = true
        setShowModel(dubShow)
      }
  
    }
  }, [token, acceptInvite, isLogin()]);

  useEffect(() => {
    if (token && declineInvitation) {
      axios.get(`${baseUrl}/decline-invitation?invitationtoken=${token}`)
        .then((response) => {
          toast({ position: "top", title: response.data.message, status: "success" });
        })
        .catch((error) => {
          toast({ position: 'top', title: error.response.data.message, status: 'warning' })
        });
    }

  }, [token, declineInvitation])


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

  

  const [data, setData] = useState<any>({
    username: '',
    bio: '',
    location: '',
    website_url: '',
    avatar: null,
    refer: '',
    email: '',
  })

  const openCreateOrgModal = () => { 
    setShowCreateOrgModal(true);
  };

  const closeCreateOrgModal = () => {
    setShowCreateOrgModal(false);
  };


  const goToOrganizatonDashboard = () => {
    router.push("/organization")
  }

  useEffect(() => {
    if(openOrganization && isLogin() && orgData.length !== 0){
      goToOrganizatonDashboard()
    }
  })

  // Callback function to handle the "Select" button click in child component
  const handleGetVolunteersAndDonorsClick = () => { 
    if (!isLogin()) {
      setOpenOrganization(true)
      let dubShow = { ...showModel }
      dubShow.login = true
      setShowModel(dubShow)
    } else if(isLogin() && orgData.length == 0) {
      openCreateOrgModal()
      setOpenOrganization(true)
    }
  };

  return (
    <Box style={{overflowX:"hidden"}}>
      <Head>
        {/* <html lang="en" /> */}
        {/* <title>Good Deeds</title> */}
        <title>Good Deeds: The First Peer 2 Peer Marketplace That Rewards Kindness</title>
        <link rel="icon" href={fav.src} />
        <meta name="title" content="Good Deeds: The First Peer 2 Peer Marketplace That Rewards Kindness" />
        <meta name="description" content="Discover Good Deeds, the groundbreaking P2P marketplace where kindness gets rewarded. List unwanted items or offer services, earn Deed Dollars, and shop for real rewards. Sign up now." />
        <meta name="keywords" content="Marketplace, Goodddeds, Canada, Toronto, Ontario, Community" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />

        <meta property="og:title" content="Good Deeds: The First Peer 2 Peer Marketplace That Rewards Kindness" />
        <meta property="og:description" content="Discover Good Deeds, the groundbreaking P2P marketplace where kindness gets rewarded. List unwanted items or offer services, earn Deed Dollars, and shop for real rewards. Sign up now." />
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
        <meta name="google-site-verification" content="g7v358l0lU7mhI5NfaVJw1gqRT6XWkYaMELw_5uObe4"></meta>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Good Deeds",
              "image": "https://gooddeeds.ca/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnewlogo.bf5beb6b.png&w=384&q=75",
              "@id": "https://gooddeeds.ca/",
              "url": "https://gooddeeds.ca/",
              "telephone": "+1 800-535-8054",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "",
                "addressLocality": "Brampton",
                "addressRegion": "ON",
                "postalCode": "",
                "addressCountry": "CA"
              },
              "sameAs": [
                "https://www.facebook.com/gooddeeds.ca",
                "https://www.instagram.com/gooddeedsllc/",
                "https://www.linkedin.com/company/good-deeds-llc-1/about/"
              ]
            }
          `}
        </script>
        
        {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqal6LVnvttE3KHG-Xk9z3cVMRVUWFjY4&libraries=places"></script> */}
      </Head>
      <Navbar />
      <Banner />
      <OurPartners/>
      <VolunteerCategories/>
      {/* <BlueBlock /> */}
      <GetStarted/>
      <SocialServices/>
      <Plan 
        handleGetVolunteersAndDonorsClick = {handleGetVolunteersAndDonorsClick}
        isLogin = { isLogin }
        organizationExists = { orgData.length }
        
      />
      <Reviews/>
      {/* Login Signup Modals */}
      <>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        
        {showModel.login && (
          <MyModal
            show={showModel}
            setShow={setShowModel}
            TitleModal="Login"
            body={<LoginForm show={showModel} setShowModel={setShowModel} />}
          />
        )}

        {showModel.forgotPassword && (
          <ForgotPasswordModal
            show={showModel.forgotPassword}
            setShow={(value: boolean) => {
              let dubShow = { ...showModel }
              dubShow.forgotPassword = value
              setShowModel(dubShow)
            }}
            goBack={() => {
              let dubShow = { ...showModel }
              dubShow.forgotPassword = false
              dubShow.login = true
              setShowModel(dubShow)
            }}
            TitleModal="Forgot Password"
            body={<ForgotPassword show={showModel} setShowModel={setShowModel} />}
          />
        )}
        {showModel.signUp && (
          <SignupModal
            show={showModel}
            setShow={setShowModel}
            TitleModal="Sign up and receive 100 deed dollars"
            body={
              <SignupForm
                userData={data}
                setUserData={setData}
                show={showModel}
                setShowModel={setShowModel}
                refer={refer}
              />
            }
          />
        )}
        {showModel.signUpVerification && (
          <SignUpVerificationModal
            show={showModel.signUpVerification}
            setShow={(value: boolean) => {
              let dubShow = { ...showModel }
              dubShow.signUpVerification = value
              setShowModel(dubShow)
            }}
            goBack={() => {
              let dubShow = { ...showModel }
              dubShow.signUpVerification = false
              dubShow.signUp = true
              setShowModel(dubShow)
            }}
            body={
              <SignUpVerificationForm
                data={data}
                setData={setData}
                show={showModel}
                setShowModel={setShowModel} />
            }
          />
        )}
        {showModel.step1 && (
          <Step1
            show={showModel.step1}
            setShow={(value: boolean) => {
              let dubShow = { ...showModel }
              dubShow.step1 = value
              setShowModel(dubShow)
            }}
            goBack={() => {
              let dubShow = { ...showModel }
              dubShow.step2 = false
              dubShow.step1 = true
              setShowModel(dubShow)
            }}
            TitleModal="Create Profile"
            currentStep={1}
            body={
              showModel.step1 && (
                <Step1Form
                  data={data}
                  setData={setData}
                  show={showModel}
                  setShowModel={setShowModel}
                />
              )
            }
          />
        )}

        {showModel.step2 && (
          <Step1
            show={showModel.step2}
            setShow={(value: boolean) => {
              let dubShow = { ...showModel }
              dubShow.step2 = value
              setShowModel(dubShow)
            }}
            goBack={() => {
              let dubShow = { ...showModel }
              dubShow.step2 = false
              dubShow.step1 = true
              setShowModel(dubShow)
            }}
            TitleModal="Create Profile"
            currentStep={2}
            body={
              <Step2Form
                data={data}
                setData={setData}
                show={showModel}
                setShowModel={setShowModel}
              />
            }
          />
        )}

        {showModel.welcomeScreen1 && (
          <WelcomeScreen1
            show={showModel.welcomeScreen1}
            setShow={(value: any) => {
              let dubShow = { ...showModel }
              dubShow.welcomeScreen1 = value
              setShowModel(dubShow)
            }}
            TitleModal={`Welcome to Good Deeds!`}
            body={
              <InnerSection
                currentStep={1}
                image={gdlogo.src}
                lastStep={false}
                //   para="Good Deeds is the world’s first free-to-use
                // marketplace that promotes and rewards acts of kindness."
                show={showModel}
                setShowModel={setShowModel}
                goNext={() => {
                  let dubShow = { ...showModel }
                  dubShow.welcomeScreen1 = false
                  dubShow.welcomeScreen2 = true
                  setShowModel(dubShow)
                }}
              />
            }
          />
        )}

        {showModel.welcomeScreen2 && (
          <WelcomeScreen1
            show={showModel.welcomeScreen2}
            setShow={(value: any) => {
              let dubShow = { ...showModel }
              dubShow.welcomeScreen2 = value
              setShowModel(dubShow)
            }}
            TitleModal="Explore or offer items
            and services"
            body={
              <InnerSection
                currentStep={2}
                lastStep={false}
                image={explorepegiun.src}
                para="In exchange for donating things that you no longer need, providing a free service or experience or volunteering, you earn virtual deed dollars that can be used to acquire things you need."
                show={showModel}
                setShowModel={setShowModel}
                goNext={() => {
                  let dubShow = { ...showModel }
                  dubShow.welcomeScreen2 = false
                  dubShow.welcomeScreen3 = true
                  setShowModel(dubShow)
                }}
              />
            }
          />
        )}
        {showModel.welcomeScreen3 && (
          <WelcomeScreen1
            show={showModel.welcomeScreen3}
            setShow={(value: any) => {
              let dubShow = { ...showModel }
              dubShow.welcomeScreen3 = value
              setShowModel(dubShow)
            }}
            TitleModal="Exchanging items and services"
            body={
              <InnerSection
                currentStep={3}
                image={exchangepegiun.src}
                para="Receive or provide your items and services in person or remotely. Don't worry — your deed dollars are pending until the transaction successfully happens."
                show={showModel}
                setShowModel={setShowModel}
                goNext={() => {
                  let dubShow = { ...showModel }
                  dubShow.welcomeScreen3 = false
                  dubShow.welcomeScreen4 = true
                  setShowModel(dubShow)
                }}
                lastStep={true}
              />
            }
          />
        )}

        <OrganizationCreationModal
          show={showCreateOrgModal}
          onClose={closeCreateOrgModal}
        />
      </Flex>
      </>
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


