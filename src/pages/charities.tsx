import React, { useState } from 'react'
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import Charity from "../assets/imgs/Charity.png";
import { Image, Text, Button, Box } from '@chakra-ui/react';
import part1 from "../assets/imgs/part1.png";
import part2 from "../assets/imgs/part2.png";
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
import { useMediaQuery } from '@chakra-ui/react'
import { Popover } from 'antd';

const Charities = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  const [isSmallerThan767] = useMediaQuery('(max-width: 767px)')

  const handleClickOne = () => {
    setSelectedButton(1);
  }
  const handleClickTwo = () => {
    setSelectedButton(2);
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

  return (
    <>
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
      <div className="container">
        <div className="row">
          <div className="col-md-8 mt-5">
            <p className="good-deeds">Good Deeds connects <span className="you-motivated">you with motivated</span> <span className="volunteers">volunteers</span> <span className="and">and</span> <span className="donors">donors</span></p>
            <div className="mt-2 mb-2">
              <p className="our-platform">Our platform makes it effortless to manage and reward your donors and volunteers in one convenient place.</p>
            </div>
            <div className="mt-3 mb-3">
              <button className="try-button">Try for free for 30 days</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mt-5">
              <Image src={Charity.src} alt={"Charity"} />
            </div>
          </div>
        </div>
      </div>
      {/* Our Partners Section */}
      <div className="container">
        <div>
          <p className="text-center part-txt">Our Partners</p>
        </div>
        <div className="partners-img mt-5">
          <div className="row">
            <div className="col-md-3 d-flex justify-content-center">
              <Image className="mb-3 mt-3" src={part1.src} alt={"Partner1"} />
            </div>
            <div className="col-md-3 d-flex justify-content-center">
              <Image className="mb-3 mt-3" src={part2.src} alt={"Partner2"} />
            </div>
            <div className="col-md-4 d-flex justify-content-center">
              <Image
                style={{ width: "320px" }}
                className="mb-3 mt-3 img-fluid"
                src={part3.src}
                alt={"Partner3"}
              />
            </div>
            <div className="col-md-2 d-flex justify-content-center">
              <Image
                className="mb-3 mt-3 me-0 me-md-3"
                src={part4.src}
                alt={"Partner4"}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="row mt-5">
            <div className="col-md-3 part-card">
              <div className="d-flex justify-content-center">
                <div
                  className="card border-1"
                  style={{ height: "410px", width: "252px" }}
                >
                  <div className="d-flex justify-content-center mt-3 mb-3s">
                    <Image
                      style={{ maxWidth: "92px", height: "106px" }}
                      src={partner1.src}
                      alt={"Image"}
                    />
                  </div>
                  <div className="card-body">
                    <p
                      className="mt-4"
                      style={{
                        fontSize: "clamp(16px, 1.5vw, 24px)",
                        lineHeight: "clamp(20px, 3.5vw, 30px)",
                        fontWeight: "bold",
                        color: "#212121",
                        textAlign: "center",
                      }}
                    >
                      Convenient Access
                    </p>
                    <p className="card-text text-center mt-4 mb-3">
                      Access Good Deeds’s diverse and growing database of
                      volunteers with varying levels of unique skills and
                      expertise based on your project needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 part-card">
              <div className="d-flex justify-content-center">
                <div
                  className="card border-1"
                  style={{ height: "410px", width: "252px" }}
                >
                  <div className="d-flex justify-content-center mt-3 mb-3s">
                    <Image
                      style={{ width: "92px", height: "106px" }}
                      src={partner2.src}
                      alt={"Image"}
                    />
                  </div>
                  <div className="card-body">
                    <p
                      className="mt-4"
                      style={{
                        fontSize: "clamp(16px, 1.5vw, 24px)",
                        lineHeight: "clamp(20px, 3.5vw, 30px)",
                        fontWeight: "bold",
                        color: "#212121",
                        textAlign: "center",
                      }}
                    >
                      Optimized Security and Safety
                    </p>
                    <p className="card-text text-center mt-4 mb-3">
                      Provide your volunteers with access to a reliable and secure platform to connect with vetted and age-appropriate volunteer opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 part-card">
              <div className="d-flex justify-content-center">
                <div
                  className="card border-1 border-black"
                  style={{ height: "410px", width: "252px" }}
                >
                  <div className="d-flex justify-content-center mt-3 mb-3s">
                    <Image
                      style={{ width: "106px", height: "106px" }}
                      src={partner3.src}
                      alt={"Image"}
                    />
                  </div>
                  <div className="card-body">
                    <p
                      className="mt-4"
                      style={{
                        fontSize: "clamp(16px, 1.5vw, 24px)",
                        lineHeight: "clamp(20px, 3.5vw, 30px)",
                        fontWeight: "bold",
                        color: "#212121",
                        textAlign: "center",
                      }}
                    >
                      Trusted Quality
                    </p>
                    <p className="card-text text-center mt-4 mb-3">
                      Our rate and review feature maintains trusted standards in
                      reliability, transparency, and accountability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 part-card">
              <div className="d-flex justify-content-center">
                <div
                  className="card border-1"
                  style={{ height: "410px", width: "252px" }}
                >
                  <div className="d-flex justify-content-center mt-3 mb-3s">
                    <Image
                      style={{ width: "112px", height: "92px" }}
                      src={partner4.src}
                      alt={"Image"}
                    />
                  </div>
                  <div className="card-body">
                    <p
                      className="mt-4"
                      style={{
                        fontSize: "clamp(16px, 1.5vw, 24px)",
                        lineHeight: "clamp(20px, 3.5vw, 30px)",
                        fontWeight: "bold",
                        color: "#212121",
                        textAlign: "center",
                      }}
                    >
                      Engaging Reward System
                    </p>
                    <p className="card-text text-center mt-4 mb-3">
                      Improve your volunteer engagement and retention with a
                      reward system where volunteers earn Deed Dollars for their
                      invaluable contributions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Volunteer Categories */}
      <div className="main-volunteer-section mt-5">
        <div className="container">
          <div className="mt-3">
            <p className="volun-txt text-center p-4">Volunteer Categories</p>
          </div>
          <div>
            <p className="text-center volun-txt2">
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
                    src={pennyevent.src}
                    alt={"Skilled Workers"}
                  />
                  <span className="text-center mb-2 skill-txt">
                    Hospital/ Senior Care
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
                    Animal Services
                  </span>
                </div>
              </Popover>
            </div>
          </div>
          <div className="mt-5 pb-5 text-center">
            <button className="try-button">Get Started</button>
          </div>
        </div>
      </div>
      {/* Get Started */}
      <div className="mt-5 container">
        <p className="start-txt text-center">How to Get Started</p>
      </div>
      <Container>
        <Row>
          <Col md={10}>
            <div className="d-flex align-items-center justify-content-center mt-5">
              <div>
                <p className="step1-txt">Step 1</p>
                <img className="img-fluid" src={step1.src} alt="example" />
              </div>
              <div>
                <p className="mt-5 mb-2 step1-txt">Sign up</p>
                <hr className="hr-step1" style={{ height: "5px" }} />
                <p className="step1-txt2 mt-2">
                  Sign up and create a Good Deeds User account, linked to your organization portal. Ensure you possess the necessary credentials to open an account on behalf of your charity or nonprofit organization.
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={10}>
            <p className="step1-txt text-end mt-3">Step 2</p>
            <div className="d-flex align-items-center justify-content-end container mt-5">
              <div>
                <p className="mb-2 step1-txt">Add An Organization</p>

                <hr className="hr-step2" style={{ height: "5px" }} />

                <p className="step1-txt2 mt-2">
                  To list volunteer opportunities or set up a donor page on the Good Deeds portal, simply add and create an organization profile.
                </p>
              </div>
              <div>
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
            <div className="d-flex align-items-center justify-content-center mt-5">
              <div>
                <p className="step1-txt ms-0 ms-md-5 mt-4">Step 3</p>
                <img className="mt-5" src={gooddeedspegiun2.src} alt="example" />
              </div>
              <div className="mt-5">
                <p className="mt-5 mb-2 step1-txt">Set Up Your Dashboard</p>
                <hr className="hr-step1" style={{ height: "5px" }} />
                <p className="step1-txt2 mt-2">
                  Create volunteer applications, advertise volunteer roles, and establish a donor page. The dashboard offers vital insights to effectively oversee volunteers and donors.

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
          <Col md={10}>
            <p className="step1-txt text-end mt-3">Step 4</p>
            <div className="d-flex align-items-center justify-content-end container mt-5">
              <div>
                <p className="mb-2 step1-txt">Recruit Your Volunteer </p>

                <hr className="hr-step2" style={{ height: "5px" }} />

                <p className="step1-txt2 mt-2">
                  Follow up with a selected volunteer application and start collaborating on your campaign!
                </p>
              </div>
              <div>
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
        <Container>
          <Text
            fontSize={isSmallerThan767 ? "24px" : "30px"}
            fontWeight="700"
            lineHeight="36px"
            textAlign="center"
            color="#212121"
          >
            More people, more <span style={{ color: '#E27832' }}>impact.</span>
          </Text>
          <div className="c-card-wrapper">
            <div className="c-single-card">
              <div className="tag-btn mb-2">SOCIAL Servies</div>
              <Image src={charityLogo1.src} alt={"Donate"} />
              <div className="d-flex flex-column justify-content-between">
                <Text fontSize="14px" fontWeight="700" lineHeight="17px" color="#000000" mt={'15px'}>Boys & Girls Club of Canada</Text>
                <Text fontSize="11px" fontWeight="500" lineHeight="14px" color="#212121" mt={'15px'}>
                  Our mission is to provide a safe, supportive place where children and youth can experience new opportunities, overcome barriers, build positive relationships and develop confidence and skills for life.
                </Text>
                <Button
                  variant={'solid'}
                  colorScheme={'orange'}
                  style={{ borderRadius: 50 }}
                  size={'md'}
                  fontSize="16px"
                  m="20px auto 0"
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
              <Image src={charityLogo2.src} alt={"Donate"} />
              <div className="d-flex flex-column justify-content-between">
                <Text fontSize="14px" fontWeight="700" lineHeight="17px" color="#000000" mt={'15px'}>Habitat for Humanity</Text>
                <Text fontSize="11px" fontWeight="500" lineHeight="14px" color="#212121" mt={'15px'}>
                  Our mission is to bring communities together to help families build strength, stability and independence through affordable home ownership.
                </Text>
                <Button
                  variant={'solid'}
                  colorScheme={'orange'}
                  style={{ borderRadius: 50 }}
                  size={'md'}
                  fontSize="16px"
                  m="20px auto 0"
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
              <Image src={charityLogo3.src} alt={"Donate"} />
              <div className="d-flex flex-column justify-content-between">
                <Text fontSize="14px" fontWeight="700" lineHeight="17px" color="#000000" mt={'15px'}>Geneva Centre for Auism</Text>
                <Text fontSize="11px" fontWeight="500" lineHeight="14px" color="#212121" mt={'15px'}>
                  Our mission is to empower individuals with Autism Spectrum Disorder, and their families, to fully participate in their communities. We do this by providing direct support for families as well as professional training to share best practices around the world.
                </Text>
                <Button
                  variant={'solid'}
                  colorScheme={'orange'}
                  style={{ borderRadius: 50 }}
                  size={'md'}
                  fontSize="16px"
                  m="20px auto 0"
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
          // onClick={submitForm}
          >
            See more
          </Button>
        </Container>
      </div>


      {/* plans */}
      <div className="plans-wrap">
        <Container>
          <Text
            fontSize={isSmallerThan767 ? "32px" : "64px"}
            fontWeight="700"
            lineHeight={isSmallerThan767 ? "40px" : "76px"}
            textAlign="center"
            color="#183553"
          >Find the Right Plan For Your <br /> Organization</Text>
          <div className="d-flex my-5 justify-content-center align-items-center flex-wrap">
            <div className="btn-list d-flex">
              <button onClick={handleClickOne} className={selectedButton === 1 ? 'donate-btn2 shadow' : 'donatee-btn'}>Monthly</button>
              <button onClick={handleClickTwo} className={selectedButton === 2 ? 'donate-btn2 shadow' : 'donatee-btn'}>Annual</button>
            </div>
            <p className="save-txt">Save 20% anually</p>
          </div>
          {selectedButton === 1 ? <MonthlyPlan /> : <AnualPlan />}
        </Container>
      </div>

      {/* testimonials */}
      <div
        className="mt-5"
        style={{ backgroundColor: "rgba(222, 227, 230, 0.5)" }}
      >
        <Container>
          <div className="text-center">
            <p className="review-txt pt-5">
              Hear What Our Partners Have to Say
            </p>
          </div>
          <Row className="mt-5 pb-5">
            <Col md={4}>

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
                    I was initially skeptical about a platform for giving. After
                    trying it for a few days, I realized how user-friendly it
                    was. I recommended Good Deeds to my daughter so she could
                    round up her 40 hours of community service without the fuss.
                    She loved it.
                  </p>
                  <div className="d-flex">
                    <div className="ms-5"><Image src={rev.src} alt={"Review"} /></div>
                    <div className="mt-4">
                      <p className="rev-txt1">Abe Evreniadis</p>
                      <p className="rev-txt2">Geneva Centre for Autism</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4}>

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
                    Thank you, Good Deeds Canada for joining the Partner for Life program. As it can often take more than one donor to save a life, Partners for Life brings people together with the common goal of supporting the most vulnerable people in our communities.
                  </p>
                  <div className="d-flex">
                    <div className="ms-5"><Image src={rev.src} alt={"Review"} /></div>
                    <div className="mt-4">
                      <p className="rev-txt1">Simran Dulay</p>
                      <p className="rev-txt2">Canadian Blood Services</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4}>
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
                  <div className="d-flex">
                    <div className="ms-5"><Image src={rev.src} alt={"Review"} /></div>
                    <div className="mt-4">
                      <p className="rev-txt1">Laina Mercer</p>
                      <p className="rev-txt2">Habitat for Humanity Canada</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  )
}
export default Charities;
