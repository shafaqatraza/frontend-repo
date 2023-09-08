import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import penstu from "../assets/imgs/penstu.png";
import { Image, Input, Button, Text, Box, Flex, useMediaQuery } from "@chakra-ui/react";
import part1 from "../assets/imgs/part1.png";
import part2 from "../assets/imgs/part2.png";
import part3 from "../assets/imgs/part3.png";
import part4 from "../assets/imgs/part4.png";
import partner1 from "../assets/imgs/partner1.png";
import partner2 from "../assets/imgs/partner2.png";
import partner3 from "../assets/imgs/partner3.png";
import partner4 from "../assets/imgs/partner4.png";
import partp1 from "../assets/imgs/partp1.png";
import pennyearncreds from "../assets/imgs/pennyearncreds.png";
import conversation from "../assets/imgs/conversation.png";
import pennyshop from "../assets/imgs/penyshop.png";
import rev from "../assets/imgs/rev.png";
import studentAbout from "../assets/imgs/student-about-pg.jpg";
import pennysearchpegiun from "../assets/imgs/pennysearchpegiun.png";
import pennyTeachingstudent from "../assets/imgs/pennyTeachingstudent.png";
import explorepegiun from "../assets/imgs/explorepegiun.png";
import goodDeedsCertificate from "../assets/imgs/goodDeedsCertificate.png";
import pennyWithCheckMark from "../assets/imgs/pennyWithCheckMark.png";
import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import { useToast } from '@chakra-ui/toast'
import { useRouter } from "next/router";
import { Popover } from 'antd';
import Reviews from "../components/Review/Reviews";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import fav from "../assets/imgs/favicon.ico"
import rev1 from "../assets/imgs/student_rev_1.png";
import frankrusso from '../assets/imgs/frankrusso.png'
import nina from '../assets/imgs/Nina_Harlow.png'
import meg from '../assets/imgs/Meg_randall.png'

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

const StudentLanding = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  const [isSmallerThan767] = useMediaQuery('(max-width: 767px)')
  const [isSmallerThan850] = useMediaQuery('(max-width: 850px)');
  const [showCreateOrgModal, setShowCreateOrgModal] = useState(false);
  const [companyName, setCompanyName] = useState('')
  const [expertise, setExpertise] = useState('')
  const [description, setDescription] = useState('')
  const toast = useToast()
  const router = useRouter();
  const [refer, setRefer] = useState<any>('')
  const [isRefer, setIsRefer] = useState<boolean>(true);
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

  

  const submitForm = () => {
    // console.log('companyName', companyName, 'expertise', expertise, 'description', description)
    if (companyName == '' || expertise == '' || description == '') {
      toast({ position: "top", title: "Please fill form.", status: "error" })
    } else {
      setCompanyName('')
      setExpertise('')
      setDescription('')
      toast({ position: "top", title: "Form submitted successfully.", status: "success" })
    }
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
        Do you have expertise in strategic planning or management? Individuals who specialize in governance roles are skilled at making calm and thoughtful decisions even in the most challenging environments.
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        lineHeight={'24px'}
        color={'#323232'}
        textAlign={'center'}
        mt={'20px'}
      >
        These roles may include volunteer leaders, campaign management assistants, and volunteer sectional heads.
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
        Do you have a strong belief in inspiring the minds of the next generation? Good Deeds offers some of the most noble roles in teaching and training.
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        lineHeight={'24px'}
        color={'#323232'}
        textAlign={'center'}
        mt={'20px'}
      >
        These roles may include workshop instructors, reading specialists, and teaching assistants.
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
        Do yo love giving back to your community? We’re always looking for individuals with big hearts who are ready to offer their precious time to help build a better world.
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        lineHeight={'24px'}
        color={'#323232'}
        textAlign={'center'}
        mt={'20px'}
      >
        We offer a variety of volunteering positions across various charity and non-profit organizations.
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
        If you’ve always wanted to do your part for our lovely planet, we want you! Join Good Deeds to promote sustainable practices and messaging campaigns as a volunteer.
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        lineHeight={'24px'}
        color={'#323232'}
        textAlign={'center'}
        mt={'20px'}
      >
        Role include: green ambassadors, community clean-up volunteers, and youth sustainability influencers.
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
        Are you a natural athlete with a drive for physical activities and friendly competition? We’d love for you to assist in training and motivating others with a similar interest in the sporting world.
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        lineHeight={'24px'}
        color={'#323232'}
        textAlign={'center'}
        mt={'20px'}
      >
        Roles include: sports buddies, coaching assistants, and sports program volunteers.
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
        Are you trained and experienced in providing specialized care for hospitals and the elderly? Good Deeds offers many volunteering opportunities for your humanitarian efforts.
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        lineHeight={'24px'}
        color={'#323232'}
        textAlign={'center'}
        mt={'20px'}
      >
        Roles include: volunteer carers, activity support, and administrative support.
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
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        lineHeight={'24px'}
        color={'#323232'}
        textAlign={'center'}
        mt={'20px'}
      >
        Roles include: special events staffing, awareness campaign ambassadors, and flyer distributors.
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
        Do you have a love for animals and actively advocate for the shelters of the voiceless? We welcome animal lovers to share their passionate skills in providing the best care.
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        lineHeight={'24px'}
        color={'#323232'}
        textAlign={'center'}
        mt={'20px'}
      >
        Roles include education and outreach staffing, animal welfare representatives, and dedicated pet carers.
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
        Do you experience great joy and satisfaction when you manage an event without a hitch? We are always on the lookout for organized volunteers with a keen eye for detail.
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        lineHeight={'24px'}
        color={'#323232'}
        textAlign={'center'}
        mt={'20px'}
      >
        Roles include: event volunteers, recruiters, and campaign marketing designers.
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
        Do you possess hands-on skills or trade expertise that you’d like to share? Many hospitals, schools, and homes constantly seek your valuable contributions!
      </Text>
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        lineHeight={'24px'}
        color={'#323232'}
        textAlign={'center'}
        mt={'20px'}
      >
        Roles include: volunteer roles with IT, communication, or design specializations.
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
          autoplay: true, 
          autoplaySpeed: 3000,
          dots: false,
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
        {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqal6LVnvttE3KHG-Xk9z3cVMRVUWFjY4&libraries=places"></script> */}
      </Head>
      <Navbar />
      
      {/* Login Signup Modals */}
      <>
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
      </Flex>
      </>
      <div className="container">
        <div className="row ">
          <div className="col-md-8 mt-5 pe-md-0 future-bright">
            <p className="good-deeds px-4 px-md-0">
              <span style={{ color: "#183553" }}>Your</span>{" "}
              <span style={{ color: "#E27832" }}>future</span>{" "}
              <span style={{ color: "#183553" }}>Looks brighter with</span>{" "}
              <span style={{ color: "#E27832" }}>Good Deeds</span>
              {/* <span className="you-motivated">with good deeds</span>{" "} */}
              {/* <span className="volunteers">with Good Deeds</span>{" "} */}
            </p>
            <Image src={penstu.src} className="d-block d-md-none my-4" alt={"Charity"} />
            <div className="mt-3 mb-2 col-md-10">
              <p className="our-platform d-none d-md-block">
              Explore a wide range of online and in-person volunteer opportunities. Make a significant impact on the causes that matter to you, fulfill your 40-hour graduation requirement and earn exclusive Deed Dollars to get the things you need. 
              </p>
              <p className="our-platform mt-3 d-none d-md-block">Get engaged, create a positive change, and enjoy the benefits.</p>
              <p className="our-platform mt-3 d-block d-md-none px-4 px-md-2" style={{fontWeight:600,}}>Browse a broad range of online or in-person volunteer opportunities. Help causes that matter most to you while completing your 40 hours and earning exclusive Deed Dollars to help you get the stuff you need.</p>
            </div>
            <div className="mt-4 mb-0 pt-2 px-4 px-md-0 ">
              {!isLogin() && (
                <button 
                  className="try-button d-none d-md-block" 
                  style={{width:"350px"}}
                  onClick={() => {
                    let dubShow = { ...showModel }
                    dubShow.login = true
                    setShowModel(dubShow)
                    
                  }}
                >
                  Start Earning Rewards Today!
                </button>
              )}

              {!isLogin() && (
              <button 
                className="try-button d-block d-md-none" 
                style={{height:"50px", width:"300px"}}
                onClick={() => {
                  let dubShow = { ...showModel }
                  dubShow.login = true
                  setShowModel(dubShow)
                  
                }}
                >
                Sign up and get 100 FREE Deed Dollars!
              </button>
              )}
            </div>
          </div>
          <div className="col-md-4 align-items-center ps-md-0 pe-md-0 d-none d-md-flex">
            <div className="mt-5">
              <Image src={penstu.src} alt={"Charity"} />
            </div>
          </div>
        </div>
      </div>
      {/* Partners */}
      <div className="container">
        <div className='pt-md-4 pt-3 pb-3 pb-md-0'>
          <p className="text-center part-txt">Our Partners</p>
        </div>
        <div className="partners-img mt-4 p-3 pe-0 mb-md-5 mb-4">
            <Slider {...settings}>
              
                <div  className="pe-3">
                  <a href="https://www.autism.net"><img src={part1.src} className="w-100" style={{height:"150px",}} alt="" /></a>
                </div>
                <div  className="pe-3">
                  <a href="https://www.blood.ca"><img src={part2.src} className="" style={{height:"150px",}} alt="" /></a>
                </div>
                <div className="pe-3 ">
                  <a href="https://www.bgccan.com"><img src={part3.src} className="" style={{height:"150px",}} alt="" /></a>
                </div>
                <div className="pe-3 w-100 ms-auto d-flex align-items-end">
                  <a href="https://www.habitat.org/" className='w-100'><img src={part4.src} className="w-100" style={{height:"150px",}} alt="" /></a>
                </div>
                <div  className="pe-3">
                  <a href="https://www.autism.net"><img src={part1.src} className="w-100" style={{height:"150px",}} alt="" /></a>
                </div>
                <div  className="pe-3">
                  <a href="https://www.blood.ca"><img src={part2.src} className="" style={{height:"150px",}} alt="" /></a>
                </div>
                <div className="pe-3">
                  <a href="https://www.bgccan.com"><img src={part3.src} className="" style={{height:"150px",}} alt="" /></a>
                </div>
                <div className="pe-3 w-100 ms-auto d-flex align-items-end">
                  <a href="https://www.habitat.org/" className='w-100'><img src={part4.src} className="w-100" style={{height:"150px",}} alt="" /></a>
                </div>

            </Slider>
        </div>
      </div>
      {/* Volunteer */}
      <div className="main-volunteer-section">
        <div className="container mt-5">
          <div className="mt-3">
            <p
              style={{ color: "#183553" }}
              className="volun-txt text-md-center p-md-4 pt-4 ps-4 volunteer-opportunity"
            >
              Discover Volunteer Opportunities
            </p>
          </div>
          <div className="row volunteer-card-row1">
            <Popover content={SkilledTrades} trigger="hover" placement="right">
              <div
                className="card col-md-2 col-sm-4"
                style={{
                  height: "109px",
                  width: "218px",
                  backgroundColor: "#183553",
                }}
              >
                <div className="volunteer-card-body">
                  <div className="d-flex justify-content-center"></div>
                  <div>
                    <p style={{ color: "white" }} className="text-center mt-5">
                      Skilled Trades
                    </p>
                  </div>
                </div>
              </div>
            </Popover>
            <Popover content={Governance} trigger="hover" placement="right">
              <div
                className="card volunteer-card col-md-2 col-sm-4"
                style={{
                  height: "109px",
                  width: "218px",
                  backgroundColor: "#183553",
                }}
              >
                <div className="volunteer-card-body">
                  <div className="d-flex justify-content-center"></div>
                  <div>
                    <p style={{ color: "white" }} className="text-center mt-5">
                      Governance
                    </p>
                  </div>
                </div>
              </div>
            </Popover>
            <Popover content={CommunityService} trigger="hover" placement="right">
              <div
                className="card volunteer-card col-md-2 col-sm-4"
                style={{
                  height: "109px",
                  width: "218px",
                  backgroundColor: "#183553",
                }}
              >
                <div>
                  <p style={{ color: "white" }} className="text-center mt-5">
                    Community Service
                  </p>
                </div>
              </div>
            </Popover>
            <Popover content={SportsRecreation} trigger="hover" placement="left">
              <div
                className="card volunteer-card col-md-2 col-sm-4"
                style={{
                  height: "109px",
                  width: "218px",
                  backgroundColor: "#183553",
                }}
              >
                <div>
                  <p style={{ color: "white" }} className="text-center mt-5">
                    Sports and Recreation
                  </p>
                </div>
              </div>
            </Popover>
            <Popover content={FundRaising} trigger="hover" placement="left">
              <div
                className="card volunteer-card col-md-2 col-sm-4"
                style={{
                  height: "109px",
                  width: "218px",
                  backgroundColor: "#183553",
                }}
              >
                <div>
                  <p style={{ color: "white" }} className="text-center mt-5">Fundraising</p>
                </div>
              </div>
            </Popover>
            <Popover content={EventManagement} trigger="hover" placement="right">
              <div
                className="card volunteer-card col-md-2 col-sm-4"
                style={{
                  height: "109px",
                  width: "218px",
                  backgroundColor: "#183553",
                }}
              >
                <div>
                  <p style={{ color: "white" }} className="text-center mt-5">
                    Event Management
                  </p>
                </div>
              </div>
            </Popover>
            <Popover content={TeachingTutoring} trigger="hover" placement="right">
              <div
                className="card volunteer-card col-md-2 col-sm-4"
                style={{
                  height: "109px",
                  width: "218px",
                  backgroundColor: "#183553",
                }}
              >
                <div>
                  <p style={{ color: "white" }} className="text-center mt-5">
                    Teaching and tutoring
                  </p>
                </div>
              </div>
            </Popover>
            <Popover content={EnvironmentalServices} trigger="hover" placement="right">
              <div
                className="card volunteer-card col-md-2 col-sm-4"
                style={{
                  height: "109px",
                  width: "218px",
                  backgroundColor: "#183553",
                }}
              >
                <div>
                  <p style={{ color: "white" }} className="text-center mt-5">
                    Environmental Services
                  </p>
                </div>
              </div>
            </Popover>
            <Popover content={HospitalSeniorCare} trigger="hover" placement="left">
              <div
                className="card volunteer-card col-md-2 col-sm-4"
                style={{
                  height: "109px",
                  width: "218px",
                  backgroundColor: "#183553",
                }}
              >
                <div>
                  <p style={{ color: "white" }} className="text-center mt-5">
                    Hospital/ Senior Care
                  </p>
                </div>
              </div>
            </Popover>
            <Popover content={AnimalServices} trigger="hover" placement="left">
              <div
                className="card volunteer-card col-md-2 col-sm-4"
                style={{
                  height: "109px",
                  width: "218px",
                  backgroundColor: "#183553",
                }}
              >
                <div>
                  <p style={{ color: "white" }} className="text-center mt-5">
                    Animal Services
                  </p>
                </div>
              </div>
            </Popover>
          </div>
        </div>
      </div>
      {/* Next Section */}

      <div className="container pb-5 px-3 px-md-2 preferred-company">
        <div className="volunteer-form-wrap">
          <div className="mt-5 pt-md-4 px-3 px-md-0">
            <p
              style={{ color: "#183553", fontSize: "40px", fontWeight: "700", lineHeight: "49.5px" }}
              className="text-center d-none d-md-block"
            >
              Do you have a preferred <span style={{ color: "#E27832" }}>company</span> to volunteer for?
            </p>
            <p
              style={{ color: "#183553", fontSize: "30px", fontWeight: "700", lineHeight: "1.3" }}
              className="d-block d-md-none mb-4"
            >
              Is there a specific  <span style={{ color: "#E27832" }}>company</span> where you would like to contribute your <span style={{ color: "#E27832" }}>volunteer services</span>?
            </p>
          </div>
          <Image src={conversation.src} className="d-block d-md-none"/>
          <div className="mt-3 py-4 px-3 px-md-0">
            <p
              style={{ color: "#183553", fontSize: "24px", fontWeight: "700", lineHeight: "29.5px" }}
              className="text-md-center d-none d-md-block"
            >
              Let us know which organization you'd like to contribute to or see on our Good Deeds platform. Keep checking back often as we add new volunteer opportunities weekly. Join us in making a difference!
            </p>
            <p
              style={{ color: "#183553", fontSize: "16px", fontWeight: "600", lineHeight: "1.3" }}
              className="text-md-center  d-block d-md-none"
            >
              Share your request along with details about the company you’d like to join or wish to see on the Good Deeds platform. Don’t forget to check back often as we strive to add volunteer opportunities each week.
            </p>
          </div>
          <div className="row">
            <div className="col-md-7">
              <form className="formrr mt-3">
                <div className="mt-2">
                  <label
                    style={{
                      fontWeight: "500",
                      fontSize: "20px",
                      lineHeight: "24px",
                    }}
                    className="form-label"
                  >
                    Company Name
                  </label>
                  <Input
                    style={{ backgroundColor: "#F6F6F6" }}
                    type="tel"
                    className="form-control mt-1"
                    id="phone-number"
                    placeholder="eg. Geneva Center for Autism"
                    required
                    onChange={(e) => setCompanyName(e.target.value)}
                    value={companyName}
                  />
                </div>
                <div className="mb-3 mt-3">
                  <label
                    style={{
                      fontWeight: "500",
                      fontSize: "20px",
                      lineHeight: "24px",
                    }}
                    className="form-label"
                  >
                    Department/Area of Expertise
                  </label>
                  <Input
                    style={{ backgroundColor: "#F6F6F6" }}
                    type="tel"
                    className="form-control mt-1"
                    id="phone-number"
                    placeholder="Marketing Department"
                    required
                    onChange={(e) => setExpertise(e.target.value)}
                    value={expertise}
                  />
                </div>
                <div className="mb-3 mt-3">
                  <label
                    style={{
                      fontWeight: "500",
                      fontSize: "20px",
                      lineHeight: "24px",
                    }}
                    className="form-label"
                  >
                    Description
                  </label>
                  <textarea
                    style={{ backgroundColor: "#F6F6F6" }}
                    cols={10}
                    rows={5}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control mt-1"
                    id="phone-number"
                    placeholder="Tell us more about what experience you are looking for"
                    required
                    value={description}
                  />
                </div>

              </form>
            </div>
            <div className="col-md-5 d-flex mt-md-5 align-items-center flex-column">
              <Image src={conversation.src} className="d-none d-md-block"/>
              <Button
                variant={'solid'}
                colorScheme={'orange'}
                style={{ borderRadius: 50 }}
                size={'md'}
                fontSize="16px"
                mt="56px"
                onClick={submitForm}
                minW="285px"
                className="ms-md-5"
              >
                Submit a Volunteer Request
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row px-4 px-md-0">
          <div className="col-md-6 py-md-5 pb-0" >
          <Text
              fontSize="22px"
              lineHeight="26px"
              color="#E27832"
              fontWeight="600"
              className="d-block d-md-none"
            >About Us</Text>
            <Text
              fontSize="40px"
              lineHeight="48px"
              color="#183553"
              fontWeight="700"
              mt="18px"
              className="d-block d-md-none mb-5"
            >
              More People, More <Text color="#E27832" display="inline-block">Impact</Text>
            </Text>
            <Image src={studentAbout.src} alt={"about us"} style={{ width: '550px', maxWidth: '100%' }} />
          </div>
          <div className="col-md-6 py-md-5">
            <Text
              fontSize="22px"
              lineHeight="26px"
              color="#E27832"
              fontWeight="600"
              className="d-none d-md-block ms-md-5"
            >About Us</Text>
            <Text
              fontSize="40px"
              lineHeight="48px"
              color="#183553"
              fontWeight="700"
              className="d-none d-md-block"
              mt="18px"
            >
              More People, More <Text color="#E27832" display="inline-block">Impact</Text>
            </Text>
            <Text
              fontSize="22px"
              lineHeight="26.63px"
              color="#212121"
              fontWeight="600"
              mt="80px"
              className="about-more-people ms-md-5"
              style={{color:"#212121",fontSize:"22px",fontWeight:"600",maxWidth:"73%"}}
            >
              Good Deeds is a digital platform that directly delivers meaningful opportunities to you.  Volunteer with Good Deeds today and earn Deed Dollars for every volunteer hour you contribute.
            </Text>
            <Button
              variant={'solid'}
              colorScheme={'orange'}
              style={{ borderRadius: 50 }}
              size={'md'}
              display="block"
              minW="320px"
              height="50px"
              m="20px auto 0"
              onClick={() => router.push("/about")}
              className="mt-5 "
            >
              Learn more about Good Deeds
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews  */}
      <div className="student-landing-review mb-5">
      <div
        className="mt-5 deeds-review"
        
      >
        <Container>
          <div className="text-center">
            <p className="review-txt pt-5">
              Hear What Our Volunteers Have to Say
            </p>
          </div>
          <Row className="mt-5 pb-5">
            <Col className="rev-col" md={4}>

              <div>
                <div className="card-review pb-md-3">
                  <div className="stars d-flex justify-content-center">
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                  </div>
                  <p className="review">
                  Good Deeds made it super easy for me to find volunteer opportunities that were meaningful and enjoyable. Honestly, I missed some sleep because of the community service projects at school, but not anymore. I recommend giving it a shot!
                  </p>
                  <div className="d-flex align-items-center justify-content-center mt-4">
                    <Image
                      src={nina.src}
                      alt={"Review"}
                      style={{
                        width: '40px',
                        height: '46px',
                        borderRadius: '50%',
                        border:"4px solid #E27832"
                      }}
                      className="me-3"
                    />
                    <div className="">
                      <p className="rev-txt1">Nina Harlowe (student)</p>
                      <p className="rev-txt2">Toronto, Ontario</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="rev-col" md={4}>

              <div>
                <div className="card-review pb-md-3">
                  <div className="stars d-flex justify-content-center">
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                  </div>
                  <p className="review">
                  I loveee animals and I’ve always wanted to volunteer at a local shelter. But it’s such a challenge finding the PERFECT opportunity, and there are always a million steps involved. Good Deeds connected me with a shelter in a few simple clicks on my phone. Would you believe that? I still can’t.
                  </p>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <Image
                      src={meg.src}
                      alt={"Review"}
                      style={{
                        width: '40px',
                        height: '46px',
                        borderRadius: '50%',
                        border:"4px solid #E27832"
                      }}
                      className="me-3"
                    />
                    <div >
                      <p className="rev-txt1">Meg Randall (student)</p>
                      <p className="rev-txt2">Mississauga, Ontario</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="rev-col" md={4}>
              <div>
                <div className="card-review pb-md-3">
                  <div className="stars d-flex justify-content-center">
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                  </div>
                  <p className="review">
                  My dad took me through the volunteer signup on Good Deeds. He said it was easier than the TikTok stuff. It’s a lot coming from him. Now we’re both pretty involved in the local community. Thanks, guys, much appreciated!
                  </p>
                  <div className="d-flex align-items-center justify-content-center mt-4">
                    <Image
                      src={frankrusso.src}
                      alt={"Review"}
                      style={{
                        width: '40px',
                        height: '46px',
                        borderRadius: '50%',
                        border:"4px solid #E27832"
                      }}
                      className="me-3"
                    />
                    <div>
                      <p className="rev-txt1">Frank Russo (student)</p>
                      <p className="rev-txt2">North York, Ontario</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      </div>

      <div style={{ backgroundColor: "rgba(222, 227, 230, 0.5)" }}>
        <div className="container pb-4 pb-md-0">
          <div className="row pt-3 pt-md-0 px-md-5">
            <div className="col-md-4 py-md-5 mb-4 mb-md-0 py-4 px-5 px-md-5" >
              <Image src={partner1.src} alt={"icon"} style={{ margin: '0 auto' }} />
              <Text
                fontSize="24px"
                lineHeight="30px"
                color="#212121"
                fontWeight="700"
                textAlign="center"
                mt="60px"
              >Convenient Access</Text>
              <Text
                fontSize="20px"
                lineHeight="24px"
                color="#212121"
                fontWeight="600"
                textAlign="center"
                mt="34px"
                className="px-md-3"
              >Free access to Good Deed's ever-expanding database of volunteer opportunities that match your preferences or support your future goals.
              </Text>
            </div>
            <div className="col-md-4 py-md-5 mb-4 mb-md-0 py-4 px-5 px-md-5" >
              <Image src={partner2.src} alt={"icon"} style={{ margin: '0 auto' }} />
              <Text
                fontSize="24px"
                lineHeight="30px"
                color="#212121"
                fontWeight="700"
                textAlign="center"
                mt="60px"
                className="mt-md-4 pt-md-1"
              >Optimized <br className="d-none d-md-block"/>
                Security and Safety</Text>
              <Text
                fontSize="20px"
                lineHeight="24px"
                color="#212121"
                fontWeight="600"
                textAlign="center"
                mt="34px"
                className="px-md-4"
              >Provide volunteers with <br className="d-none d-xl-block"/>a reliable and secure platform that connects with verified and vetted organizations and age-appropriate volunteer opportunities.

              </Text>
            </div>
            <div className="col-md-4 py-md-5 mb-4 mb-md-0 py-4 px-5 px-md-5" >
              <Image src={partner4.src} alt={"icon"} style={{ margin: '0 auto' }} />
              <Text
                fontSize="24px"
                lineHeight="30px"
                color="#212121"
                fontWeight="700"
                textAlign="center"
                mt="60px"
              >Get Rewarded
              </Text>
              <Text
                fontSize="20px"
                lineHeight="24px"
                color="#212121"
                fontWeight="600"
                textAlign="center"
                mt="34px"
                className="px-md-3"
              >Volunteerism is such an incredibly important experience and Good Deeds would like to reward you for a job well done.
              </Text>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5 mt-md-5 fourty-hours px-5 px-md-2">
        <p
          style={{ fontSize: '36px', lineHeight: '44px', color: '#183553', fontWeight: '700',}} className="text-md-center "
        >How the <span style={{ color: '#E27832' }}>40 Hour</span> Volunteer <span style={{ color: '#E27832' }}>Program</span> Works
        </p>
        <Row >
          <Col md={12}>
            <p className="step1-txt ms-md-5 mt-5 col-md-4 d-flex justify-content-md-center">
              Step 1
            </p>
            <div className="d-flex justify-content-center flex-column flex-md-row mt-4 px-2 px-md-0">
              <div>
                <Image src={pennysearchpegiun.src}  alt={"Image"} className="step-image m-auto m-md-0" />
              </div>
              <div className="col-md-6 fourty-hours-content">
                <p className="mt-4 mb-2 step1-txt text-center text-md-start">Search</p>
                <hr style={{marginLeft:"-30px"}}/>
                <p className="step1-txt2 mt-2">
                  Use the search tool to find the perfect volunteer opportunity.
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-end">
          <Col md={10}>
            <p className="step1-txt text-md-center text-lg-end mt-5 me-5">Step 2</p>
            <div className="d-flex justify-content-end align-items-end flex-column flex-md-row container">
              <div className="col-md-6 order-2 order-md-1 fourty-hours-content">
                <p className="mb-2 mt-4 step1-txt text-md-end text-center" style={{marginRight:"-20px"}}>
                  APPLY
                </p>
                <hr className="hr-step2" style={{ height: "5px",marginRight:"-41px" }} />
                  <p className="step1-txt2 mt-2 ms-md-4 mb-5">
                    Click the apply button of your preferred volunteer opportunity, fill out the application, and hit submit.

                  </p>
              </div>
              <div className="m-auto m-md-0 order-1 order-md-2">
                <Image src={pennyWithCheckMark.src} alt="example"  className="img-fluid step-image  " />
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <p className="step1-txt mt-5 col-md-4 d-flex justify-content-md-center ms-md-5 ps-md-4">
              Step 3
            </p>
            <div className="d-flex justify-content-center mt-4 flex-column flex-md-row px-2 px-md-0">
              <div>
                <Image src={pennyTeachingstudent.src} alt={"Image"} className="step-image m-auto m-md-0" />
              </div>
              <div className="col-md-6 mt-4 fourty-hours-content">
                <p className="mt-4 mb-2 step1-txt text-center text-md-start">ONBOARD</p>
                <hr style={{marginLeft:"-20px"}}/>
                <p className="step1-txt2 mt-2 pe-3">
                  Once your application has been approved you will receive detailed instructions on the next steps in the onboarding process.
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-end">
          <Col md={11} className="ps-md-5">
            <p className="step1-txt text-md-center text-lg-end mt-5 me-5 pe-5">Step 4</p>
            <div className="d-flex justify-content-end flex-column flex-md-row container mt-5">
              <div className="col-md-6 mt-4 order-2 order-md-1 fourty-hours-content">
                <p className="mb-2 mt-4 step1-txt text-md-end text-center">YOU DID IT!!</p>
                <hr className="hr-step2" style={{ height: "5px", marginRight:"-33px" }} />
                  <p className="step1-txt2 mt-2 ms-md-5">
                    Once you’ve accumulated 40 hours of volunteer work, you will receive an official certificate of completion signed by your volunteer coordinator. You can proceed to submit the certificate to your school as official proof of your community contributions.
                  </p>
              </div>
              <div className="order-1 order-md-2 m-auto m-md-0">
                <Image
                  src={goodDeedsCertificate.src}
                  alt="example"
                  className="img-fluid step-image"
                />
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <p className="step1-txt mt-5 col-md-4 d-flex justify-content-md-center ms-md-5 ps-md-5">
              Step 5
            </p>
            <div className="d-flex justify-content-center flex-column flex-md-row  mt-4 px-2 px-md-0">
              <div>
                <Image src={explorepegiun.src} className="step-image" alt={"Image"} />
              </div>
              <div className="col-md-6 d-flex flex-column justify-content-end fourty-hours-step-five fourty-hours-content" style={{marginLeft:"-70px"}}>
                <p className="mt-5 mb-md-2 step1-txt lh-sm ms-md-4 text-center text-md-start">Browse For Rewards</p>
                <hr />
                <p className="step1-txt2 mt-2 m-md-5 pe-5 d-none d-md-block">
                  Now you can browse the marketplace to find items and services that you want.
                </p>
                <p className="step1-txt2 mt-2 m-md-5d-block d-md-none">
                Once you’ve accumulated 40 hours of volunteer work, you will receive an official certificate of completion signed by your volunteer coordinator. You can proceed to submit the certificate to your school as official proof of your community contributions. 
                </p>
              </div>
            </div>

          </Col>
        </Row>

      </div>

      <div style={{ backgroundColor: "rgba(222, 227, 230, 0.5)" }}>
        <div className="container py-4 px-4 px-md-2">
          <div className="row py-sm-5 pt-3 pb-4 px-2 px-md-0">
            <div className="col-lg-5" >
              <Text
                color="#183553"
                fontWeight="700"
                className="parental mb-4 mb-lg-0"
              >
                Parental <Text color="#E27832" display="inline-block">Concerns</Text> and
                Volunteering Opportunities
              </Text>
            </div>
            <div className="col-lg-7 d-flex flex-column justify-content-center">
              <Text
                fontSize="22px"
                lineHeight="26px"
                color="#212121"
                fontWeight="600"
                className="parental-para pe-md-5 ps-md-5"
              >
                Are you worried about your child's volunteering progress? The Good Deeds platform makes it effortless to track the details of your teens assigned volunteering activities from the convenience of your mobile device. We highly encourage parents to join in the process of giving with a quick and easy sign-up.
              </Text>
              <Button
                variant={'solid'}
                colorScheme={'orange'}
                style={{ borderRadius: 50, height:"48px"}}
                size={'md'}
                display="block"
                minW="320px"
                m="50px auto 0"
                onClick={() => router.push("/blog")}
              >
                Click here to Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default StudentLanding;
