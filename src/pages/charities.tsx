import React, { useState } from 'react'
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import Charity from "../assets/imgs/Charity.png";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Link,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
  Badge,
  PopoverTrigger,
  PopoverContent,
  Stack,
  Input,
  Text,
  Avatar,
  Spacer,
  Spinner
} from '@chakra-ui/react'
import part1 from "../assets/imgs/part1.png";
import part2 from "../assets/imgs/part2.png";
import part1Mb from "../assets/imgs/part1-mb.png";
import part2Mb from "../assets/imgs/part2-mb.png";
import part3 from "../assets/imgs/part3.png";
import part4 from "../assets/imgs/part4.png";
import partner1 from "../assets/imgs/partner1.png";
import partner2 from "../assets/imgs/partner2.png";
import partner3 from "../assets/imgs/partner3.png";
import partner4 from "../assets/imgs/partner4.png";
import Penny from "../assets/imgs/Penny.png";
import pennygovernment from "../assets/imgs/pennygovernment.png";
import pennyvolunteer from "../assets/imgs/pennyvolunteer.png";
import pennysports from "../assets/imgs/pennysports.png";
import pennyfundraising from "../assets/imgs/pennyfundraising.png";
import pennyevent from "../assets/imgs/pennyevent.png";
import pennyteaching from "../assets/imgs/pennyteaching.png";
import pennyenvironment from "../assets/imgs/pennyenvironment.png";
import pennyanimals from "../assets/imgs/pennyanimals.png";
import { Container, Row, Col } from "react-bootstrap";
import step1 from "../assets/imgs/step1.png";
import Head from "next/head";
import dashboard1 from "../assets/imgs/dashboard1.png";
import dashboard2 from "../assets/imgs/dashboard2.png";
import gooddeedspegiun from "../assets/imgs/gooddeedspegiun.png"
import gooddeedspegiun2 from "../assets/imgs/gooddeedspegiun2.png"
import rev from "../assets/imgs/rev.png";
import step2 from "../assets/imgs/step2.png";
import pennysearching2 from "../assets/imgs/pennysearching2.png";
import charityLogo1 from "../assets/imgs/boys_girls_club_logo.png";
import charityLogo2 from "../assets/imgs/geneva-center-logo.png";
import charityLogo3 from "../assets/imgs/habitat-logo.png";
import MonthlyPlan from "../components/MonthlyPlan";
import AnualPlan from "../components/AnualPlan";
import healthcare from "../assets/imgs/hospital-healthcare.png"
import { useMediaQuery } from '@chakra-ui/react'
import { Popover } from 'antd';
import { useRouter } from 'next/router'
import Reviews from '../components/Review/Reviews';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import fav from "../assets/imgs/favicon.ico"
import rev1 from "../assets/imgs/student_rev_1.png";
import revew1 from '../assets/imgs/review_one.jpg'
import revew2 from '../assets/imgs/review_two.jpg'
import revew3 from '../assets/imgs/review_three.jpg'

import logoHorizontal from '../assets/imgs/logo/newlogo.png';
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
import { isLogin, getLoginData, baseUrl, accessToken} from '../components/Helper/index'
import axios from 'axios'
import OrganizationCreationModal from '../components/organization/OrganizationCreationModal';
import gdlogo from '../assets/imgs/gdlogopegiun.png'
import explorepegiun from '../assets/imgs/explorepegiun.png'
import exchangepegiun from '../assets/imgs/exchangepegiun.png'

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

const Charities = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  const [isSmallerThan767] = useMediaQuery('(max-width: 767px)')
  const [isSmallerThan850] = useMediaQuery('(max-width: 850px)');
  const [showCreateOrgModal, setShowCreateOrgModal] = useState(false);
  const router = useRouter()
  const [orgData, setOrgData] = useState([]);
  const handleClickOne = () => {
    setSelectedButton(1);
  }
  const handleClickTwo = () => {
    setSelectedButton(2);
  }

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

  const [refer, setRefer] = useState<any>('')
  const [isRefer, setIsRefer] = useState<boolean>(true);
  const [openOrganization, setOpenOrganization] = useState<boolean>(false);

  const goToOrganizatonDashboard = () => {
    router.push("/organization")
  }

  if(openOrganization && isLogin() && orgData.length !== 0){
    goToOrganizatonDashboard()
  }

  const Governance = (
    <Box w={'472px'} maxW={'100%'} p={'30px 48px'}>
      <Text
        style={{ fontSize: '20px', fontWeight: '700', lineHeight: '24px', color: '#E27832', textAlign: 'center' }}
      >
        Governance
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        lineHeight={'24px'}
        color={'#323232'}
        textAlign={'center'}
        mt={'24px'}
      >
        Looking for expert guidance in strategic planning or operational excellence? Connect with Individuals specialized in governance roles and have a knack for calm and thoughtful decision-making under the most challenging environments.
      </Text>
    </Box>
  );
  const TeachingTutoring = (
    <Box w={'472px'} maxW={'100%'} p={'30px 48px'}>
      <Text
        style={{ fontSize: '20px', fontWeight: '700', lineHeight: '24px', color: '#E27832', textAlign: 'center' }}
      >
        Teaching and Tutoring
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        lineHeight={'24px'}
        color={'#323232'}
        textAlign={'center'}
        mt={'24px'}
      >
        Looking for someone who strongly believes in inspiring the minds of the next generation? Search for teachers, mentors, and tutors who are looking to make a real difference.
      </Text>
    </Box>
  );
  const CommunityService = (
    <Box w={'472px'} maxW={'100%'} p={'30px 48px'}>
      <Text
        style={{ fontSize: '20px', fontWeight: '700', lineHeight: '24px', color: '#E27832', textAlign: 'center' }}
      >
        Community Service
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        lineHeight={'24px'}
        color={'#323232'}
        textAlign={'center'}
        mt={'24px'}
      >
        Do you need help planning, coordinating, and executing your community service initiatives? We can provide you with individuals with big hearts, ever ready to offer their precious time in building a better world.
      </Text>
    </Box>
  );
  const EnvironmentalServices = (
    <Box w={'472px'} maxW={'100%'} p={'30px 48px'}>
      <Text
        style={{ fontSize: '20px', fontWeight: '700', lineHeight: '24px', color: '#E27832', textAlign: 'center' }}
      >
        Environmental Services
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        lineHeight={'24px'}
        color={'#323232'}
        textAlign={'center'}
        mt={'24px'}
      >
        Looking for environmental services support to help with your organizations sustainability goals and objectives? Look no further, check out our list of volunteers ready to help you achieve your environmental goals and help our planet.
      </Text>
    </Box>
  );
  const SportsRecreation = (
    <Box w={'472px'} maxW={'100%'} p={'30px 48px'}>
      <Text
        style={{ fontSize: '20px', fontWeight: '700', lineHeight: '24px', color: '#E27832', textAlign: 'center' }}
      >
        Sports and Recreation
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        lineHeight={'24px'}
        color={'#323232'}
        textAlign={'center'}
        mt={'24px'}
      >
        Are you looking for extra support running your sports program? Let Good Deeds match you with volunteers to help you grow and scale your business while giving them the opportunity to learn the business of the sports world.
      </Text>
    </Box>
  );
  const HospitalSeniorCare = (
    <Box w={'472px'} maxW={'100%'} p={'30px 48px'}>
      <Text
        style={{ fontSize: '20px', fontWeight: '700', lineHeight: '24px', color: '#E27832', textAlign: 'center' }}
      >
        Hospital/Senior Care
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        lineHeight={'24px'}
        color={'#323232'}
        textAlign={'center'}
        mt={'24px'}
      >
        Need additional Hospital or Senior Care volunteers to help keep costs low and save precious healthcare resources? Choose from our many volunteers who want to give back and make a difference in our community..
      </Text>
    </Box>
  );
  const FundRaising = (
    <Box w={'472px'} maxW={'100%'} p={'30px 48px'}>
      <Text
        style={{ fontSize: '20px', fontWeight: '700', lineHeight: '24px', color: '#E27832', textAlign: 'center' }}
      >
        Fundraising
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        lineHeight={'24px'}
        color={'#323232'}
        textAlign={'center'}
        mt={'24px'}
      >
        Do you enjoy communicating and conveying the message of a fundraising campaign? Sociable fundraising volunteers are always welcome at Good Deeds!
      </Text>
    </Box>
  );
  const AnimalServices = (
    <Box w={'472px'} maxW={'100%'} p={'30px 48px'}>
      <Text
        style={{ fontSize: '20px', fontWeight: '700', lineHeight: '24px', color: '#E27832', textAlign: 'center' }}
      >
        Animal Services
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        lineHeight={'24px'}
        color={'#323232'}
        textAlign={'center'}
        mt={'24px'}
      >
        Are you looking for loving and caring animal advocates? We match you with animal lovers looking to gain invaluable experience handling, grooming and caring for all types of animals.
      </Text>
    </Box>
  );
  const EventManagement = (
    <Box w={'472px'} maxW={'100%'} p={'30px 48px'}>
      <Text
        style={{ fontSize: '20px', fontWeight: '700', lineHeight: '24px', color: '#E27832', textAlign: 'center' }}
      >
        Event Management
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        lineHeight={'24px'}
        color={'#323232'}
        textAlign={'center'}
        mt={'24px'}
      >
        Looking for some additional help running your next event? We have many experienced event managers, coordinators ready to volunteer to make your event a success!
      </Text>
    </Box>
  );
  const SkilledTrades = (
    <Box w={'472px'} maxW={'100%'} p={'30px 48px'}>
      <Text
        style={{ fontSize: '20px', fontWeight: '700', lineHeight: '24px', color: '#E27832', textAlign: 'center' }}
      >
        Skilled Trades
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        lineHeight={'24px'}
        color={'#323232'}
        textAlign={'center'}
        mt={'24px'}
      >
        Looking for skilled and experienced trades to help with your projects? check out our list of volunteer plumbers, electricians, carpenters, HVAC specials and more!
      </Text>
    </Box>
  );
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          autoplay: true, 
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          autoplay: true, 
          autoplaySpeed: 3000,
        },
      },
    ],
  };
  return (
    <>
      <Head>
        {/* <title>Good Deeds</title> */}
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
        {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqal6LVnvttE3KHG-Xk9z3cVMRVUWFjY4&libraries=places"></script> */}
      </Head>
      <Navbar />

      {/* Modals */}
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        {showModel.login && (
          <MyModal
            show={showModel}
            setShow={setShowModel}
            TitleModal="Login In"
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
      <div className="container">
        <div className="row">
          <div className="col-md-8 mt-5 ps-md-4 pe-md-5">
            <p className="good-deeds ms-3 ms-md-0 and">Good Deeds <span className="donors"> connects</span> <span >you with motivated</span> <span className="volunteers">volunteers</span> <span className="and">and</span> <span className="donors">donors</span></p>
            <Image src={Charity.src} className='d-block d-md-none px-5' alt={"Charity"} />
            <div className="mt-2 mb-2">
              <p className="our-platform px-4 ps-md-0 pe-md-4" style={{fontWeight:"600"}}>Our platform makes it effortless to manage and reward your donors and volunteers in one convenient place.</p>
            </div>
            <div className="mt-3 mb-3 px-4 px-md-0">
              <button className="try-button mt-3" style={{height:'40px'}}>Try for free for 30 days</button>
            </div>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <div className="mt-5">
              <Image src={Charity.src} alt={"Charity"} />
            </div>
          </div>
        </div>
      </div>
      {/* Our Partners Section */}
      <div className="container px-0 px-md-2">
        <div className='pt-md-5 pb-3 pb-md-0'>
          <p className="text-center part-txt">Our Partners</p>
        </div>
        <div className="partners-img mt-4 p-3 pe-0 mb-md-5 mb-4">
            <Slider {...settings}>
              
                <div  className="pe-3">
                 <a href="https://www.autism.net" target="_blank">
                  <img src={part1.src} className="w-100 d-none d-md-block" style={{height:"150px",}} alt="" />
                  <img src={part1Mb.src} className="w-100 d-block d-md-none" style={{height:"150px",}} alt="" />
                  </a>
                </div>
                <div  className="pe-3">
                  <a href="https://www.blood.ca" target="_blank">
                    <img src={part2.src} className="d-none d-md-block" style={{height:"150px",}} alt="" />
                    <img src={part2Mb.src} className="d-block d-md-none" style={{height:"150px",}} alt="" />
                  </a>
                </div>
                <div className="pe-3">
                  <a href="https://www.bgccan.com" target="_blank"><img src={part3.src} className="" style={{height:"150px",}} alt="" /></a>
                </div>
                <div className="pe-3 w-100 ms-auto d-flex align-items-end">
                  <a href="https://www.habitat.org/" target="_blank" className='w-100'><img src={part4.src} className="w-100" style={{height:"150px",}} alt="" /></a>
                </div>
                <div  className="pe-3">
                  <a href="https://www.autism.net" target="_blank">
                  <img src={part1.src} className="w-100 d-none d-md-block" style={{height:"150px",}} alt="" />
                  <img src={part1Mb.src} className="w-100 d-block d-md-none" style={{height:"150px",}} alt="" />
                  </a>
                </div>
                <div  className="pe-3">
                  <a href="https://www.blood.ca" target="_blank">
                    <img src={part2.src} className="d-none d-md-block" style={{height:"150px",}} alt="" />
                    <img src={part2Mb.src} className="d-block d-md-none" style={{height:"150px",}} alt="" />
                  </a>
                </div>
                <div className="pe-3">
                  <a href="https://www.bgccan.com" target="_blank"><img src={part3.src} className="" style={{height:"150px",}} alt="" /></a>
                </div>
                <div className="pe-3 w-100 ms-auto d-flex align-items-end">
                <a href="https://www.habitat.org/" target="_blank" className='w-100'><img src={part4.src} className="w-100" style={{height:"150px",}} alt="" /></a>
                </div>

            </Slider>
        </div>
      </div>

    
      <div className="container px-0 py-5">
        <div className="d-flex flex-column flex-lg-row align-items-center">
          <div className="me-lg-4 mb-4 mb-lg-0 charity-card conveient-access">
            <img src={partner1.src} className='m-auto mb-4' alt="" />
            <h1 className='mb-4 mt-5 pt-1'>Convenient Access</h1>
            <p style={{lineHeight:"1.2"}}>Access Good Deeds’s diverse and growing database of volunteers with varying levels of unique skills and expertise based on your project needs.</p>
          </div>
          <div className="me-lg-4 mb-4 mb-lg-0 charity-card">
            <img src={partner2.src} className='m-auto mb-4' alt="" />
            <h1 className='mb-4'>Optimized <br /> Security and Safety</h1>
            <p className='px-4' style={{lineHeight:"1.2"}}>Provide your <br /> volunteers with access to a reliable and secure platform to connect with vetted and age-suitable volunteer opportunities.</p>
          </div>
          <div className="me-lg-4 mb-4 mb-lg-0 charity-card">
            <img src={partner3.src} className='m-auto mb-4' alt="" />
            <h1 className='mb-4 mt-5'>Trusted Quality</h1>
            <p className='px-xl-5 px-4' style={{lineHeight:"1.2"}}>Our rate and review feature maintains trusted standards in reliability, transparency, and accountability.</p>
          </div>
          <div className=" charity-card">
            <img src={partner4.src} className='m-auto mb-4' alt="" />
            <h1 className='mb-4 mt-4 pt-2'>Engaging <br /> Reward System</h1>
            <p className='px-3' style={{lineHeight:"1.2"}}>Improve your <br /> volunteer engagement and retention with a reward system where volunteers earn Deed Dollars for their invaluable <br /> contributions. </p>
          </div>
        </div>
      </div>
      {/* Volunteer Categories */}
      <div className="main-volunteer-section mt-5 passionate-vol">
        <div className="container pt-2 pt-md-0 pb-md-5">
          <div className="mt-3">
            <p className="volun-txt text-center pb-md-5 pt-md-0 p-4">Volunteer Categories</p>
          </div>
          <div>
            <p className="text-center volun-txt2 mb-md-4 pb-md-2">
              I am Seeking Passionate Volunteers for...
            </p>
          </div>
          <div className="row volunteer-card-row1">
            <div
              className="card volunteer-card col-md-2 col-sm-4"
              style={{ height: "200px", width: "209px" }}
            >
              <Popover content={SkilledTrades} trigger="hover" placement="right" overlayClassName="wrapper-notify">
                <div className="volunteer-card-body">
                  <div className="d-flex justify-content-center">
                    <Image
                      style={{ width: "130px" }}
                      src={Penny.src}
                      alt={"Skilled Workers"}
                    />
                  </div>
                  <div>
                    <p className="text-center mt-1 skill-txt">Skilled Trades</p>
                  </div>
                </div>
              </Popover>
            </div>
            <div
              className="card volunteer-card col-md-2 col-sm-4"
              style={{ height: "200px", width: "209px" }}
            >
              <Popover overlayClassName="wrapper-notify" content={Governance} trigger="hover" placement="right">
                <div className="volunteer-card-body">
                  <div className="d-flex justify-content-center">
                    <Image
                      style={{ width: "130px" }}
                      src={pennygovernment.src}
                      alt={"Skilled Workers"}
                    />
                  </div>
                  <div>
                    <p className="text-center mt-1 skill-txt">Governance</p>
                  </div>
                </div>
              </Popover>
            </div>
            <div
              className="card volunteer-card col-md-2 col-sm-4"
              style={{ height: "200px", width: "209px" }}
            >
              <Popover overlayClassName="wrapper-notify" content={CommunityService} trigger="hover" placement="right">
                <div className="volunteer-card-body d-flex justify-content-center align-items-center flex-column">
                  <Image src={pennyvolunteer.src} alt={"Skilled Workers"} />
                  <span className="text-center mb-2 skill-txt">
                    Community Service
                  </span>
                </div>
              </Popover>
            </div>
            <div
              className="card volunteer-card col-md-2 col-sm-4"
              style={{ height: "200px", width: "209px" }}
            >
              <Popover overlayClassName="wrapper-notify" content={SportsRecreation} trigger="hover" placement="left">
                <div className="volunteer-card-body d-flex justify-content-center align-items-center flex-column">
                  <Image
                    style={{ width: "130px" }}
                    src={pennysports.src}
                    alt={"Skilled Workers"}
                  />
                  <span className="text-center mb-2 skill-txt">
                    Sports and Recreation
                  </span>
                </div>
              </Popover>
            </div>
            <div
              className="card volunteer-card col-md-2 col-sm-4"
              style={{ height: "200px", width: "209px" }}
            >
              <Popover overlayClassName="wrapper-notify" content={FundRaising} trigger="hover" placement="left">
                <div className="volunteer-card-body d-flex justify-content-center align-items-center flex-column">
                  <Image
                    style={{ width: "130px" }}
                    src={pennyfundraising.src}
                    alt={"Skilled Workers"}
                  />
                  <span className="text-center mb-2 skill-txt">Fundraising</span>
                </div>
              </Popover>
            </div>
            <div
              className="card volunteer-card col-md-2 col-sm-4"
              style={{ height: "200px", width: "209px" }}
            >
              <Popover overlayClassName="wrapper-notify" content={EventManagement} trigger="hover" placement="right">
                <div className="volunteer-card-body d-flex justify-content-center align-items-center flex-column">
                  <Image
                    style={{ width: "130px" }}
                    src={pennyevent.src}
                    alt={"Skilled Workers"}
                  />
                  <span className="text-center mb-2 skill-txt">
                    Event Management
                  </span>
                </div>
              </Popover>
            </div>
            <div
              className="card volunteer-card col-md-2 col-sm-4"
              style={{ height: "200px", width: "209px" }}
            >
              <Popover overlayClassName="wrapper-notify" content={TeachingTutoring} trigger="hover" placement="right">
                <div className="volunteer-card-body d-flex justify-content-center align-items-center flex-column">
                  <Image
                    style={{ width: "130px" }}
                    src={pennyteaching.src}
                    alt={"Skilled Workers"}
                  />
                  <span className="text-center mb-2 skill-txt">
                    Teaching and tutoring
                  </span>
                </div>
              </Popover>
            </div>
            <div
              className="card volunteer-card col-md-2 col-sm-4"
              style={{ height: "200px", width: "209px" }}
            >
              <Popover overlayClassName="wrapper-notify" content={EnvironmentalServices} trigger="hover" placement="right">
                <div className="volunteer-card-body d-flex justify-content-center align-items-center flex-column">
                  <Image
                    style={{ width: "130px" }}
                    src={pennyenvironment.src}
                    alt={"Skilled Workers"}
                  />
                  <span className="text-center mb-2 skill-txt">
                    Environmental Services
                  </span>
                </div>
              </Popover>
            </div>
            <div
              className="card volunteer-card col-md-2 col-sm-4"
              style={{ height: "200px", width: "209px" }}
            >
              <Popover overlayClassName="wrapper-notify" content={HospitalSeniorCare} trigger="hover" placement="left">
                <div className="volunteer-card-body d-flex justify-content-center align-items-center flex-column">
                  <Image
                    style={{ width: "130px" }}
                    src={healthcare.src}
                    alt={"Skilled Workers"}
                    className='mt-3'
                  />
                  <span className="text-center mb-2 skill-txt">
                    Hospital/ <br/> Senior Care
                  </span>
                </div>
              </Popover>
            </div>
            <div
              className="card volunteer-card col-md-2 col-sm-4"
              style={{ height: "200px", width: "209px" }}
            >
              <Popover overlayClassName="wrapper-notify" content={AnimalServices} trigger="hover" placement="left">
                <div className="volunteer-card-body d-flex justify-content-center align-items-center flex-column">
                  <Image
                    style={{ width: "130px" }}
                    src={pennyanimals.src}
                    alt={"Skilled Workers"}
                  />
                  <span className="text-center mb-2 skill-txt">
                    Animal <br /> Services
                  </span>
                </div>
              </Popover>
            </div>
          </div>
          <div className="mt-md-4  pb-5 text-center">

          {!isLogin() && (
            <button 
              className="try-button" 
              style={{ height: "50px", width: "320px" }}
              onClick={() => {
                setOpenOrganization(true)
                let dubShow = { ...showModel }
                dubShow.login = true
                setShowModel(dubShow)
                
              }}
            >
              Get Started
            </button>
          )}

          {isLogin() && orgData.length == 0 && (
            <button 
              className="try-button" 
              style={{ height: "50px", width: "320px" }}
              onClick={() => {
                openCreateOrgModal()
                setOpenOrganization(true)
              }}
            >
              Get Started
            </button>
          )}

          
          {isLogin() && orgData.length !== 0 && (
            <button 
              className="try-button" 
              style={{ height: "50px", width: "320px" }}
              onClick={goToOrganizatonDashboard}
            >
              Get Started
            </button>
          )}

          </div>
        </div>
      </div>
      {/* Get Started */}
      <div className="mt-5 pt-md-4 container">
        <p className="start-txt text-center">How to Get Started</p>
      </div>
      <Container className='charities-steps'>
        <Row>
          <Col md={10}>
            <div className="d-flex align-items-center justify-content-center flex-column flex-md-row mt-5 px-5 px-md-0">
              <div>
                <p className="step1-txt mb-md-0 ms-md-5">Step 1</p>
                <img className="img-fluid" src={step1.src} alt="example" />
              </div>
              <div className='charities-stpe-content'>
                <p className="mt-md-5 mb-2 text-center text-md-start step1-txt">Register</p>
                <hr className="hr-step1" style={{ height: "5px", marginLeft:"-40px",borderColor:"#183553"}} />
                <p className="step1-txt2 mt-2">
                  Sign up and create a Good Deeds User account, linked to your organization portal. Ensure you possess the necessary credentials to open an account on behalf of your charity or nonprofit organization.
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <Row className='justify-content-center'>
          <Col md={11} className='px-5 px-md-2'>
            <p className="step1-txt text-md-end mt-3 me-md-5 mt-5 mt-md-0">Step 2</p>
            <div className="d-flex align-items-center justify-content-end container mt-md-5 flex-column flex-md-row ">
              <div className='ms-md-4 mt-md-4 order-2 order-md-1 charities-stpe-content'>
                <p className="mb-2 step1-txt ms-md-5 ps-md-5 text-center text-md-start">Add An Organization</p>

                <hr className="hr-step2 ms-md-5" style={{ height: "5px", marginRight:'-70px',borderColor:"#183553" }} />

                <p className="step1-txt2 mt-2 ms-md-5 ps-md-4">
                Effortlessly manage user donations and volunteer applications with our user-friendly dashboard. Organize and streamline your tasks for enhanced visibility and efficient management.
                </p>
              </div>
              <div className='order-1 order-md-2'>
                <img
                  src={step2.src}
                  alt="example"
                  className="img-fluid"
                />
              </div>
            </div>
          </Col>
        </Row>


        <Row>
          <Col md={10}>
            <div className="d-flex align-items-center justify-content-center mt-5 flex-column flex-md-row px-5 px-md-0">
              <div>
                <p className="step1-txt ms-0 ms-md-5 mt-4">Step 3</p>
                <img className="mt-md-5" src={gooddeedspegiun2.src} alt="example" />
              </div>
              <div className="mt-md-5 charities-stpe-content">
                <p className="mt-5 mb-2 step1-txt text-center text-md-start">Set Up Your Dashboard</p>
                <hr className="hr-step1 me-5" style={{ height: "5px", marginLeft:'-58px',borderColor:"#183553" }} />
                <p className="step1-txt2 mt-2">
                  Organize your dashboard for easy visibility and management of user donations and volunteer applications.
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="d-flex justify-content-center mt-5">
              <div>
                <Image src={dashboard1.src} alt={"Dashboard one"} />
              </div>
              <div className="mt-5">
                <Image src={dashboard2.src} alt={"Dashboard tw0"} />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={10} className='px-5 px-md-2'>
            <p className="step1-txt text-md-end mt-3 me-md-4">Step 4</p>
            <div className="d-flex align-items-center justify-content-end container mt-5 flex-column flex-md-row ">
              <div className='order-2 order-md-1 charities-stpe-content'>
                <p className="mb-2 step1-txt ms-md-5 ps-md-5 mt-3 m4-md-0 text-center text-md-start">Recruit Your Volunteer </p>

                <hr className="hr-step2 ms-md-4" style={{ height: "5px",marginRight:'-25px',borderColor:"#183553" }} />

                <p className="step1-txt2 mt-2 ms-md-5 ps-md-4">
                  Follow up with a selected volunteer application and start collaborating on your campaign!
                </p>
              </div>
              <div className='order-1 order-md-2'>
                <img
                  src={pennysearching2.src}
                  alt="example"
                  className="img-fluid"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="main-volunteer-section py-5 mt-5">
        <div className='my-md-3'>
          <Container>
            <Text
              fontSize={isSmallerThan767 ? "30px" : "30px"}
              fontWeight="700"
              lineHeight="36px"
              color="#212121"
              className='text-md-center px-4 px-md-0'
            >
              More people, more <span style={{ color: '#E27832' }}>impact.</span>
            </Text>
            <div className="c-card-wrapper">
              <div className="c-single-card">
                <div className="tag-btn mb-2">SOCIAL Servies</div>
                <Image src={charityLogo1.src} alt={"Donate"} width={'211px'} height={'211px'} />
                <div className="d-flex flex-column justify-content-between">
                  <Text fontSize="14px" fontWeight="700" lineHeight="17px" color="#000000" mt={'15px'}>Boys & Girls Club of Canada</Text>
                  <Text fontSize="11px" fontWeight="500" lineHeight="14px" color="#212121" mt={'15px'}>
                    Our mission is to provide a safe, supportive place where children and youth can experience new opportunities, overcome barriers, build positive relationships and develop confidence and skills for life.
                  </Text>
                  <Button
                    variant={'solid'}
                    colorScheme={'orange'}
                    className='c-donate-btn mb-5 mb-md-0'
                    height={"37px"}
                    fontSize="12px"
                    display="block"
                    // onClick={submitForm}
                    w="150px"
                  >
                    Donate
                  </Button>
                </div>
              </div>
              <div className="c-single-card">
                <div className="tag-btn mb-2">SOCIAL Servies</div>
                <Image src={charityLogo3.src} alt={"Donate"} width={'211px'} height={'211px'} />
                <div className="d-flex flex-column justify-content-between">
                  <Text fontSize="14px" fontWeight="700" lineHeight="17px" color="#000000" mt={'15px'}>Habitat for Humanity</Text>
                  <Text fontSize="11px" fontWeight="500" lineHeight="14px" color="#212121" mt={'15px'}>
                    Our mission is to bring communities together to help families build strength, stability and independence through affordable home ownership.
                  </Text>
                  <Button
                    variant={'solid'}
                    colorScheme={'orange'}
                    className='c-donate-btn mb-5 mb-md-0'
                    height={"37px"}
                    fontSize="12px"
                    display="block"
                    // onClick={submitForm}
                    w="150px"
                  >
                    Donate
                  </Button>
                </div>
              </div>
              <div className="c-single-card">
                <div className="tag-btn mb-2">PUBLIC BENEFIT</div>
                <Image src={charityLogo2.src} alt={"Donate"} width={'211px'} height={'211px'} />
                <div className="d-flex flex-column justify-content-between">
                  <Text fontSize="14px" fontWeight="700" lineHeight="17px" color="#000000" mt={'15px'}>Geneva Centre for Auism</Text>
                  <Text fontSize="11px" fontWeight="500" lineHeight="14px" color="#212121" mt={'15px'}>
                    Our mission is to empower individuals with Autism Spectrum Disorder, and their families, to fully participate in their communities. We do this by providing direct support for families as well as professional training to share best practices around the world.
                  </Text>
                  <Button
                    variant={'solid'}
                    colorScheme={'orange'}
                    className='c-donate-btn mb-5 mb-md-0'
                    height={"37px"}
                    fontSize="12px"
                    display="block"
                    // onClick={submitForm}
                    w="150px"
                  >
                    Donate
                  </Button>
                </div>
              </div>
            </div>
            <Button
              fontSize="22px"
              fontWeight="600"
              m="60px auto 0"
              display="block"
              _hover={{ background: 'none' }}
              _focus={{ background: 'none' }}
              onClick={() => router.push('/browse?type=offering&activeTab=3')}
            >
              See More
            </Button>
          </Container>
        </div>
      </div>


      {/* plans */}
      <div className="plans-wrap">
        <Container>
          <Text
            fontSize={isSmallerThan767 ? "30px" : "64px"}
            fontWeight="700"
            lineHeight={isSmallerThan767 ? "40px" : "76px"}
            color="#183553"
            className='text-md-center px-3 px-md-0 pb-md-5'
          >Find the Right Plan For Your <br className='d-none d-md-block'/> Organization</Text>
          <div className="d-flex my-md-5 mt-5 mb-3 justify-content-center align-items-center flex-wrap">
            <div className="btn-list d-flex">
              <button onClick={handleClickOne} className={selectedButton === 1 ? 'donate-btn2 shadow' : 'donatee-btn'}>Monthly</button>
              <button onClick={handleClickTwo} className={selectedButton === 2 ? 'donate-btn2 shadow' : 'donatee-btn'}>Annual</button>
            </div>
            <p className="save-txt mt-4 mt-md-0">Save 20% Anually</p>
          </div>
          {selectedButton === 1 ? <MonthlyPlan /> : <AnualPlan />}
        </Container>
      </div>

      {/* testimonials */}

      <div
        className="mt-5 deeds-review pb-md-5"
        
      >
        <Container>
          <div className="text-center">
            <p className="review-txt pt-5">
            Hear What Our Partners Have to Say
            </p>
          </div>
          <div className='px-md-4'>
            <Row className="mt-5 pb-5 mx-0 px-md-5">
              <Col className="rev-col" md={4}>

                <div>
                  <div className="card-review">
                    <div className="stars d-flex justify-content-center">
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                    </div>
                    <p className="review">
                    I was initially skeptical about a platform for giving. After trying it for a few days, I realized how user-friendly it was. I recommended Good Deeds to my daughter so she could round up her 40 hours of community service without the fuss. She loved it.
                    </p>
                    <div className="d-flex align-items-center justify-content-center mt-4">
                      <Image
                        src={revew1.src}
                        alt={"Review"}
                        style={{
                          width: '43px',
                          height: '43px',
                          borderRadius: '50%',
                          border:'4px solid #E27832'
                        }}
                        className='me-3'
                      />
                      <div className="">
                        <p className="rev-txt1">Laina Mercer</p>
                        <p className="rev-txt2">Barrie, Ontario</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="rev-col" md={4}>

                <div>
                  <div className="card-review">
                    <div className="stars d-flex justify-content-center">
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                    </div>
                    <p className="review">
                    Good Deeds is simply perfect for someone like me who’s always looking for the next opportunity to help out. It was just the thing to bond with my son while we engaged in social work as a collective unit. Give it a try if you’re a volunteer with lots to give!
                    </p>
                    <div className="d-flex align-items-center justify-content-center mt-4">
                      <Image
                        src={revew2.src}
                        alt={"Review"}
                        style={{
                          width: '43px',
                          height: '43px',
                          borderRadius: '50%',
                          border:'4px solid #E27832'
                        }}
                        className='me-3'
                      />
                      <div >
                        <p className="rev-txt1">Jake Masic</p>
                        <p className="rev-txt2">Brampton, Ontario</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="rev-col" md={4}>
                <div>
                  <div className="card-review">
                    <div className="stars d-flex justify-content-center">
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                    </div>
                    <p className="review">
                    Our experience with Good Deeds has been nothing short of amazing. The partnership redefined the donation and volunteering process, setting the stage for new fundraising possibilities. We truly look forward to many more good years with Good Deeds.
                    </p>
                    <div className="d-flex align-items-center justify-content-center mt-4">
                      <Image
                        src={revew3.src}
                        alt={"Review"}
                        style={{
                          width: '43px',
                          height: '43px',
                          borderRadius: '50%',
                          border:'4px solid #E27832'
                        }}
                        className='me-3'
                      />
                      <div>
                        <p className="rev-txt1">Abe Evreniadis</p>
                        <p className="rev-txt2">Geneva Centre for Autism</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>


      <Footer />
    </>
  )
}
export default Charities;