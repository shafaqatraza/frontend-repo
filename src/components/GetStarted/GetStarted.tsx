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
      <Container>
        <Box marginTop="90px">
          <Tabs>
            <Flex justify="center">
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
                        <p className="step1-txt text-center">
                          Step 1
                        </p>
                        <img
                          className="mt-3 step-image"
                          src={pennysearchpegiun.src}
                          alt="example"
                          width="160px"
                          style={{ marginRight: '15px' }}
                        />
                      </div>
                      <div className="hiw-mt5">
                        <p className="hiw-mt5 mb-2 step1-txt ps-0 ps-md-5">DISCOVER WITH EASE </p>
                        <span className='hiw-divider'></span>
                        <p className="step1-txt2 mt-2 ps-0 ps-md-5">
                          Begin your journey by searching for a specific item or service. Utilize our intuitive filters to narrow down your options swiftly. Sort categories by Deed Dollar value, location, and relevant keywords to find exactly what you need, effortlessly.
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                      <video width="600" controls>
                        <source src="mov_bbb.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md={10}>
                    <div className="hiw-box-rightWrap">
                      <div className="col-md-6">
                        <p className="mb-2 mt-5 step1-txt text-right">CONNECT AND EXCHANGE</p>
                        <span className='hiw-divider'></span>
                        <p className="step1-txt2 mt-2">
                          Found something you desire? Take action by reaching out to the generous giver. Simply click the "contact" button and utilize our secure messaging system to arrange the details of your exchange. Forge connections, fulfill your wishes, and embrace the transformative power of giving and receiving.
                        </p>
                      </div>
                      <div>
                        <p className="step1-txt text-center">Step 2</p>
                        <img
                          src={conversation.src}
                          alt="example"
                          className="img-fluid step-image mt-3"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                      <video width="600" controls>
                        <source src="mov_bbb.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={10}>
                    <div className="hiw-box-leftWrap">
                      <div>
                        <p className="step1-txt text-center">
                          Step 3
                        </p>
                        <img
                          className="mt-3 step-image"
                          src={penyshopping.src}
                          alt="penyshopping"
                          style={{ marginRight: '15px' }}
                        />
                      </div>
                      <div className="hiw-mt5">
                        <p className="hiw-mt5 mb-2 step1-txt ps-0 ps-md-5">RECEIVE YOUR GIFT </p>
                        <span className='hiw-divider'></span>
                        <p className="step1-txt2 mt-2 ps-0 ps-md-5">
                          Exchange your Deed Dollars for the desired item or service. Solidify the process by reaching an agreement with the seller. Once both parties are in sync, savor the fulfillment of your gift. Embrace the joy of receiving and let gratitude fill your heart!
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                      <video width="600" controls>
                        <source src="mov_bbb.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </Col>
                </Row>
              </TabPanel>

              <TabPanel>
                <Row>
                  <Col md={10}>
                    <div className="hiw-box-leftWrap">
                      <div>
                        <p className="step1-txt text-center">
                          Step 1
                        </p>
                        <img
                          className="mt-3 step-image"
                          src={signupmob.src}
                          alt="signupmob"
                          style={{ marginRight: '15px' }}
                        />
                      </div>
                      <div className="hiw-mt5">
                        <p className="hiw-mt5 mb-2 step1-txt ps-0 ps-md-5">JOIN THE MOVEMENT </p>
                        <span className='hiw-divider'></span>
                        <p className="step1-txt2 mt-2 ps-0 ps-md-5">
                          Sign up for Good Deeds—it's free! Early subscribers receive 100 Deed Dollars for exclusive rewards, and earn 10 more for each referral. Unite for a purpose greater than ourselves and unlock a world of kindness.
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                      <video width="600" controls>
                        <source src="mov_bbb.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md={10}>
                    <div className="hiw-box-rightWrap">
                      <div className="col-md-6">
                        <p className="mb-2 mt-5 step1-txt text-right">MAKE AN IMPACT</p>
                        <span className='hiw-divider'></span>
                        <p className="step1-txt2 mt-2">
                          List your donation or offer a meaningful service to your local community after creating your Good Deeds account. It's time to create ripples of positive change in your neighborhood.
                        </p>
                      </div>
                      <div>
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
                <Row>
                  <Col md={12}>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                      <video width="600" controls>
                        <source src="mov_bbb.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md={10}>
                    <div className="hiw-box-leftWrap">
                      <div>
                        <p className="step1-txt text-center">
                          Step 3
                        </p>
                        <img
                          className="mt-3 step-image"
                          src={exploreitems.src}
                          alt="signupmob"
                        />
                      </div>
                      <div className="hiw-mt5">
                        <p className="hiw-mt5 mb-2 step1-txt ps-0 ps-md-5">DISCOVER AND EMPOWER </p>
                        <span className='hiw-divider'></span>
                        <p className="step1-txt2 mt-2 ps-0 ps-md-5">
                          Explore our vibrant marketplace, brimming with listings that cater to your desires and fulfill your needs. Empower yourself by finding the things you want and the services you need.
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                      <video width="600" controls>
                        <source src="mov_bbb.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md={10}>
                    <div className="hiw-box-rightWrap">
                      <div className="col-md-6">
                        <p className="mb-2 mt-5 step1-txt text-right">CONNECT AND ENGAGE</p>
                        <span className='hiw-divider'></span>
                        <p className="step1-txt2 mt-2">
                          Initiate meaningful conversations using Good Deeds' secure, encrypted messaging service. Connect with sellers or recipients in private, where you can openly express your interest, discuss transaction details, and confidently finalize your impactful Good Deeds offer.

                        </p>
                      </div>
                      <div>
                        <p className="step1-txt text-center">Step 4</p>
                        <img
                          src={conversation.src}
                          alt="penguin"
                          className="img-fluid step-image"
                        // width="190px"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                      <video width="600" controls>
                        <source src="mov_bbb.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={10}>
                    <div className="hiw-box-leftWrap">
                      <div>
                        <p className="step1-txt text-center">
                          Step 5
                        </p>
                        <img
                          className="mt-3 step-image"
                          src={pennyearning.src}
                          alt="signupmob"
                        />
                      </div>
                      <div className="hiw-mt5">
                        <p className="hiw-mt5 mb-2 step1-txt ps-0 ps-md-5"> DO GOOD, BE REWARDED!  </p>
                        <span className='hiw-divider'></span>
                        <p className="step1-txt2 mt-2 ps-0 ps-md-5">
                          Reach a mutual agreement and seal the deal! Once both parties confirm the terms, the Good Deeds platform will process your Deed Dollars, validating the transaction. Ready for more impact? Simply repeat steps 2 or 3 to discover your next opportunity for Good Deeds. Embrace the joy of doing good, feel the satisfaction, and reap the rewards that follow!
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                      <video width="600" controls>
                        <source src="mov_bbb.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </Col>
                </Row>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>


      </Container>
    </>
  );
};

export default GetStarted;
