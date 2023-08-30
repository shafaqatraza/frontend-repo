import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Image,
  HStack,
  Input,
  InputGroup,
  Stack,
  Switch,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  CloseButton,
  TagRightIcon,
  Tag,
  TagLabel
} from '@chakra-ui/react';
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import step1 from "../../assets/imgs/step1.png";
import step2 from "../../assets/imgs/step2.png";
import dashboard1 from "../../assets/imgs/dashboard1.png";
import dashboard2 from "../../assets/imgs/dashboard2.png";
import signupmob from "../../assets/imgs/signupmob.png";
import exploreitems from "../../assets/imgs/exploreitems.png";
import pennyearning from "../../assets/imgs/pennyearning.png";
import conversation from "../../assets/imgs/conversation.png";
import pennysearchpegiun from "../../assets/imgs/pennysearchpegiun.png";
import penyshopping from "../../assets/imgs/penyshop.png";
import { useMediaQuery } from '@chakra-ui/react'

const GetStarted = () => {
  const [isSmallerThan767] = useMediaQuery('(max-width: 767px)')


  return (
    <>
      <div className="mt-5 container" id="how_it_works">
        <p className="start-txt text-center">How it Works</p>
      </div>
      {/* GetStarted section start */}
      <Container>
        <Box marginTop="90px">
          <Tabs>
            <Flex justify="center" className='mb-4'>
              <TabList
                bg="grey.200"
                color="grey.400"
                borderRadius="30px"
                borderColor="grey.300"
                borderWidth="1px"
                overflow="hidden"
                position="relative"
                fontWeight="bold"
                fontSize={isSmallerThan767 ? 12 : 16}
              // style={isSmallerThan767 ? { width: '100%', margin: "0 30px" } : {}}
              >
                <Tab
                  _focus={{ outline: 'none' }}
                  _selected={{ color: 'primary.300' }}
                  borderRadius="30px"
                  px={isSmallerThan767 ? 4 : 8}
                  fontWeight="600"
                  fontSize={isSmallerThan767 ? 12 : 16}
                // style={isSmallerThan767 ? { width: '50%' } : {}}
                // onClick={() => refreshFilter(0)}
                >
                  <Text zIndex="100">Receiving</Text>
                </Tab>
                <Tab
                  // style={isSmallerThan767 ? { width: '50%' } : {}}
                  fontSize={isSmallerThan767 ? 12 : 16}
                  _focus={{ outline: 'none' }}
                  _selected={{ color: 'orange.400' }}
                  borderRadius="30px"
                  px={isSmallerThan767 ? 4 : 8}
                  fontWeight="600"
                // onClick={() => refreshFilter(1)}
                >
                  <Text zIndex="100">Giving</Text>
                </Tab>
                <TabIndicator
                  bg="white"
                  h="100%"
                  borderRadius="30px"
                  position="absolute"
                  zIndex="10"
                />
              </TabList>
            </Flex>

            <TabPanels>
              <TabPanel>

                <Row>
                  <Col md={10}>
                    <div className="hiw-box-leftWrap">
                      <div>
                        <p className="step1-txt text-md-center">
                          Step 1
                        </p>
                        <img
                          className="mt-md-3 step-image"
                          src={pennysearchpegiun.src}
                          alt="example"
                          width="160px"
                          style={{ marginRight: '15px' }}
                        />
                      </div>
                      <div className="hiw-mt5 px-5 px-md-0">
                        <p className="hiw-mt5 mb-2 step1-txt ps-0 ps-md-5 d-none d-md-block">DISCOVER WITH EASE </p>
                        <p className="hiw-mt5 mb-2 step1-txt ps-0 ps-md-5 d-block d-md-none text-center fw-bold" style={{fontSize:"32px"}}>SEARCH</p>
                        <span className='hiw-divider'></span>
                        <p className="step1-txt2 mt-2 ps-0 ps-md-5 d-none d-md-block">
                          Begin your journey by searching for a specific item or service. Utilize our intuitive filters to narrow down your options swiftly. Sort categories by Deed Dollar value, location, and relevant keywords to find exactly what you need, effortlessly.
                        </p>
                        <p className="step1-txt2 mt-2 ps-0 ps-md-5 d-block d-md-none">
                        Narrow your search for a specific item or service with our user-friendly filters. Sort categories by Deed Dollar value, location, and keyword(s) to find what you need in no time.</p>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* <Row>
                  <Col md={12}>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                      <video width="600" controls>
                        <source src="mov_bbb.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </Col>
                </Row> */}

                <Row className='mt-5'>
                  <Col md={10}>
                    <div className="hiw-box-rightWrap">
                      <div className="col-md-7 ps-md-5">
                        <p className="mb-2 mt-5 step1-txt text-end d-none d-md-block me-md-4 pe-xxl-2">CONNECT AND EXCHANGE</p>
                        <p className="mb-2 mt-3 step1-txt text-center d-block d-md-none fw-bold" style={{fontSize:"32px"}}>CONTACT SELLER</p>
                        <div className='px-4 px-md-0'>
                          <span className='hiw-divider ms-md-2'></span>
                        </div>
                        <p className="step1-txt2 mt-2 d-none d-md-block ps-md-4">
                          Found something you desire? Take action by reaching out to the generous giver. Simply click the "contact" button and utilize our secure messaging system to arrange the details of your exchange. Forge connections, fulfill your wishes, and embrace the transformative power of giving and receiving.
                        </p>
                        <p className="step1-txt2 mt-2 d-block d-md-none px-5">
                        Found something you wanted? Hit the giver's "contact" button and arrange the details of your exchange via our secure messaging system.
                        </p>
                      </div>
                      <div className='px-3 px-md-0'>
                        <p className="step1-txt text-md-center">Step 2</p>
                        <img
                          src={conversation.src}
                          alt="example"
                          className="img-fluid step-image mt-md-3"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* <Row>
                  <Col md={12}>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                      <video width="600" controls>
                        <source src="mov_bbb.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </Col>
                </Row> */}
                <Row className='mt-5 mb-md-5 mb-4'>
                  <Col md={10}>
                    <div className="hiw-box-leftWrap">
                      <div>
                        <p className="step1-txt text-md-center">
                          Step 3
                        </p>
                        <img
                          className="mt-md-3 step-image"
                          src={penyshopping.src}
                          alt="penyshopping"
                          style={{ marginRight: '15px' }}
                        />
                      </div>
                      <div className="mt-0 mt-md-5 px-5 px-md-0">
                        <p className="hiw-mt5 mb-2 step1-txt ps-0 ps-md-5 d-none d-md-block">RECEIVE YOUR GIFT </p>
                        <p className=" mb-2 step1-txt ps-0 ps-md-5 d-block d-md-none text-center fw-bold" style={{fontSize:"32px"}}>COMPLETE</p>
                        <span className='hiw-divider'></span>
                        <p className="step1-txt2 mt-2 ps-0 ps-md-5 d-none d-md-block">
                          Exchange your Deed Dollars for the desired item or service. Solidify the process by reaching an agreement with the seller. Once both parties are in sync, savor the fulfillment of your gift. Embrace the joy of receiving and let gratitude fill your heart!
                        </p>
                        <p className="step1-txt2 mt-2 ps-0 ps-md-5 d-block d-md-none">
                        Exchange your Deed Dollars for the requested item or service. Complete the process by having both parties agree to the exchange. Enjoy your gift!
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* <Row>
                  <Col md={12}>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                      <video width="600" controls>
                        <source src="mov_bbb.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </Col>
                </Row> */}
              </TabPanel>

              <TabPanel>
                <Row>
                  <Col md={10}>
                    <div className="hiw-box-leftWrap">
                      <div className='d-flex d-md-block mt-3 mt-md-0 me-auto me-md-0'>
                        <p className="step1-txt text-md-center mt-3 mt-md-0 me-4 me-md-0">
                          Step 1
                        </p>
                        <img
                          className="mt-md-3 step-image ms-2 ms-md-0"
                          src={signupmob.src}
                          alt="signupmob"
                          style={{ marginRight: '15px' }}
                        />
                      </div>
                      <div className="hiw-mt5 px-5 px-md-0">
                        <p className="hiw-mt5 mb-2 step1-txt ps-0 ps-md-5 d-none d-md-block">JOIN THE MOVEMENT </p>
                        <p className="hiw-mt5 mb-2 step1-txt ps-0 ps-md-5 d-block d-md-none text-center fw-bold" style={{fontSize:"32px"}}>SIGN UP </p>
                        <span className='hiw-divider'></span>
                        <p className="step1-txt2 mt-2 ps-0 ps-md-5 d-none d-md-block">
                          Sign up for Good Deeds—it's free! Early subscribers receive 100 Deed Dollars for exclusive rewards, and earn 10 more for each referral. Unite for a purpose greater than ourselves and unlock a world of kindness.
                        </p>
                        <p className="step1-txt2 mt-2 ps-0 ps-md-5 d-block d-md-none">
                        Create an account with Good Deeds (it’s absolutely free!). Early subscribers will receive 100 exclusive Deed Dollars that they can exchange for real rewards on the platform. Plus, you receive 10 additional Deed Dollars for each Good Deeds referral.
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* <Row>
                  <Col md={12}>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                      <video width="600" controls>
                        <source src="mov_bbb.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </Col>
                </Row> */}

                <Row className='mt-5'>
                  <Col md={10}>
                    <div className="hiw-box-rightWrap">
                      <div className="col-md-6">
                        <p className="mb-2 mt-5 step1-txt text-end d-none d-md-block">MAKE AN IMPACT</p>
                        <p className="mb-2 mt-4 step1-txt text-center d-block d-md-none fw-bold" style={{fontSize:"32px"}}>LIST IT</p>
                        <div className='px-5 px-md-0'>
                          <span className='hiw-divider'></span>
                        </div>
                        <p className="step1-txt2 mt-2 d-none d-md-block">
                          List your donation or offer a meaningful service to your local community after creating your Good Deeds account. It's time to create ripples of positive change in your neighborhood.
                        </p>
                        <p className="step1-txt2 mt-2 d-block d-md-none px-5">
                        Once you’ve created your Good Deeds account, you may proceed to donate an item or provide a meaningful service to your local community.</p>
                      </div>
                      <div className='d-flex d-md-block'>
                        <p className="step1-txt text-center">Step 2</p>
                        <img
                          src={step1.src}
                          alt="penguin"
                          className="img-fluid step-image"
                          width="190px"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* <Row>
                  <Col md={12}>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                      <video width="600" controls>
                        <source src="mov_bbb.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </Col>
                </Row> */}

                <Row className='mt-5'>
                  <Col md={10}>
                    <div className="hiw-box-leftWrap">
                      <div className='position-relative'>
                        <p className="step1-txt text-center d-block d-md-none position-absolute mt-5 mt-md-0">
                          Step 3
                        </p>
                        <p className="step1-txt text-center d-none d-md-block mt-5 mt-md-0">
                          Step 3
                        </p>
                        <img
                          className="mt-3 step-image"
                          src={exploreitems.src}
                          alt="signupmob"
                        />
                      </div>
                      <div className="hiw-mt5 px-5 px-md-0">
                        <p className="hiw-mt5 mb-2 step1-txt ps-0 ps-md-5 d-none d-md-block">DISCOVER AND EMPOWER </p>
                        <p className="mt-1 mb-2 step1-txt ps-0 ps-md-5 d-block d-md-none text-center fw-bold"style={{fontSize:"32px"}}>BROWSE</p>
                        <span className='hiw-divider'></span>
                        <p className="step1-txt2 mt-2 ps-0 ps-md-5 d-none d-md-block">
                          Explore our vibrant marketplace, brimming with listings that cater to your desires and fulfill your needs. Empower yourself by finding the things you want and the services you need.
                        </p>
                        <p className="step1-txt2 mt-2 ps-0 ps-md-5 d-block d-md-none">
                        Browse through our marketplace listings to find things you want or services you need. </p>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* <Row>
                  <Col md={12}>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                      <video width="600" controls>
                        <source src="mov_bbb.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </Col>
                </Row> */}

                <Row className='mt-5  ms-xl-5 ps-xxl-3'>
                  <Col md={10}>
                    <div className="hiw-box-rightWrap">
                      <div className="col-md-7">
                        <p className="mb-2 mt-5 step1-txt text-end d-none d-md-block me-3 ps-1">CONNECT AND ENGAGE</p>
                        <p className="mb-2 mt-3 step1-txt text-center d-block d-md-none lh-sm fw-bold" style={{fontSize:"32px"}}>START A <br /> CONVERSATION</p>
                        <div className='px-5 px-md-0'>
                          <span className='hiw-divider'></span>
                        </div>
                        <p className="step1-txt2 mt-2 d-none d-md-block">
                          Initiate meaningful conversations using Good Deeds' secure, encrypted messaging service. Connect with sellers or recipients in private, where you can openly express your interest, discuss transaction details, and confidently finalize your impactful Good Deeds offer.
                        </p>
                        <p className="step1-txt2 mt-2 d-block d-md-none px-5">
                        Good Deeds’ encrypted messaging service allows you to communicate with another seller or recipient in privacy. Here, you can safely propose your interest and discuss the details of your Good Deeds transaction before finalizing an offer.</p>
                      </div>
                      <div className='position-relative col-md-3'>
                        <p className="step1-txt text-center d-none d-md-block">Step 4</p>
                        <p className="step1-txt text-center d-block d-md-none position-absolute">Step 4</p>
                        <img
                          src={conversation.src}
                          alt="penguin"
                          className="img-fluid step-image mt-2 mt-md-0"
                        // width="190px"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* <Row>
                  <Col md={12}>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                      <video width="600" controls>
                        <source src="mov_bbb.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </Col>
                </Row> */}
                <Row className='mt-5 mb-md-5 mb-4'>
                  <Col md={10}>
                    <div className="hiw-box-leftWrap">
                      <div className='position-relattive'>
                        <p className="step1-txt text-center d-none d-md-block">
                          Step 5
                        </p>
                        <p className="step1-txt d-block d-md-none position-absolute text-center">
                          Step 5
                        </p>
                        <img
                          className="mt-3 step-image"
                          src={conversation.src}
                          alt="signupmob"
                        />
                      </div>
                      <div className="hiw-mt5 ">
                        <p className="hiw-mt5 mb-2 step1-txt ps-0 ps-md-5 d-none d-md-block"> DO GOOD, BE REWARDED!  </p>
                        <p className="mb-2 step1-txt ps-0 ps-md-5 d-block d-md-none lh-sm text-center fw-bold" style={{fontSize:"30px"}}> CLOSE AN OFFER & <br /> GET REWARDED! </p>
                        <div className='px-5 px-md-0'>
                          <span className='hiw-divider'></span>
                        </div>
                        <p className="step1-txt2 mt-2 ps-0 ps-md-5 d-none d-md-block">
                          Reach a mutual agreement and seal the deal! Once both parties confirm the terms, the Good Deeds platform will process your Deed Dollars, validating the transaction. Ready for more impact? Simply repeat steps 2 or 3 to discover your next opportunity for Good Deeds. Embrace the joy of doing good, feel the satisfaction, and reap the rewards that follow!
                        </p>
                        <p className="step1-txt2 mt-2  ps-md-5 d-block d-md-none px-5">
                        Once both parties agree on the terms, it’s time to complete the transaction. The Good Deeds platform will process your Deed Dollars upon validating the confirmation from both users. Now repeat steps 2 or 3 to find your next Good Deeds opportunity. Do Good, feel better, and get rewarded!</p>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* <Row>
                  <Col md={12}>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                      <video width="600" controls>
                        <source src="mov_bbb.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </Col>
                </Row> */}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>


      </Container>
      {/* GetStarted section end */}
    </>
  );
};

export default GetStarted;
