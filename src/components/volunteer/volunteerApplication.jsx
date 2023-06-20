import {
  Box,
  Center,
  Spinner,
  Flex,
  Text,
  Image,
  Skeleton,
  Tag,
  Container,
  AspectRatio,
  TagLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Button,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Radio, RadioGroup, Stack, Checkbox, Textarea
} from "@chakra-ui/react";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Head from "next/head";
import axios from "axios";
import {
  baseUrl,
  baseImgUrl,
  isLogin,
  accessToken,
  getLoginData,
} from "../Helper/index";
import { useRouter } from "next/router";
import Slider from "react-slick";
// import ADSImage from "../../../src/assets/imgs/ads.png";
// import BreadcrumbUI from "../Breadcrumb";
// import { ModalPopup } from "../ModalPopup";
// import { HiDotsVertical } from "react-icons/hi";
// import { BsChatLeftDotsFill, BsPencilFill, BsShareFill } from "react-icons/bs";
// import { MdDelete } from "react-icons/md";
// import moment from "moment";
// import { FaHeart } from "react-icons/fa";
// import { FiHeart } from "react-icons/fi";
// import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
// import { Rating } from "../Rating";
// import { GoGlobe, GoPencil } from "react-icons/go";
// import { ImLocation } from "react-icons/im";
import { useToast } from "@chakra-ui/toast";
import NoImage from "../../../src/assets/imgs/no-image.png";
import { isMobile } from "react-device-detect";
import { useMediaQuery } from "@chakra-ui/react";
// import QuestionAnswer from "./questionAnswer";
// import ProductGrids from "../ProductGrids";
// import { ProductSingleCard } from "../ProductSingleCard";
// import { Carousel, Image } from 'antd';

const VolunteerApplication = (props) => {

  const [isSmallerThan450] = useMediaQuery("(max-width: 450px)");
  const router = useRouter();
  const toast = useToast();
  const [listingData, setListingData] = useState({});
  const [applicationForm, setApplicationForm] = useState([]);
  const [applicationFormId, setApplicationFormId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [itemSlug, setItemSlug] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [shortQuestion, setShortQuestion] = useState([]);
  const [radioAnswer, setRadioAnswer] = useState([]);
  const [checkboxAnswer, setCheckboxAnswer] = useState([]);
  const [conditionalAnswer, setConditionalAnswer] = useState([]);
  const [workExpAnswer, setWorkExpAnswer] = useState([]);
  // console.log("listingData", listingData.organization.slug);

  const submitApplicationForm = (e) => {
    e.preventDefault();
    const combinedArray = [
      ...shortQuestion,
      ...radioAnswer,
      ...checkboxAnswer,
      ...conditionalAnswer,
      ...workExpAnswer
    ];

    const combinedObject = {
      application_form_id: applicationFormId,
      data: [
        ...combinedArray
      ]
    };
    // console.log('url post', `${baseUrl}/application/store?org=lawyers-association`)
    axios
      .post(`${baseUrl}/application/store?org=${listingData?.organization.slug}`, combinedObject, {
        headers: {
          Authorization: "Bearer " + accessToken(),
        },
      })
      .then((response) => {
        connsole.log('form submit =>', response)
      })
      .catch((error) => {
        console.log("error form =>", error);
        toast({ position: "top", title: `${error.message.message}`, status: "error" })
      });

    console.log('Combined array:', combinedArray);
    console.log('Answer array:', combinedObject);
  }

  const [availability, setAvailability] = useState({
    Monday: { morning: false, afternoon: false, evening: false },
    Tuesday: { morning: false, afternoon: false, evening: false },
    Wednesday: { morning: false, afternoon: false, evening: false },
    Thursday: { morning: false, afternoon: false, evening: false },
    Friday: { morning: false, afternoon: false, evening: false },
    Saturday: { morning: false, afternoon: false, evening: false },
    Sunday: { morning: false, afternoon: false, evening: false },
  });

  function handleChange(
    e,
    day,
    timeOfDay
  ) {
    setAvailability((prevState) => ({
      ...prevState,
      [day]: { ...prevState[day], [timeOfDay]: e.target.checked },
    }));
  }

  // console.log('availability', availability)

  const getListingDetails = useCallback(async (id) => {
    setIsLoading(true);
    let data = {};
    // try {
    if (isLogin()) {
      data = await axios.get(`${baseUrl}/browse/volunteer-listings/${id}`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
        },
      });
    } else {
      data = await axios.get(`${baseUrl}/browse/volunteer-listings/${id}`);
    }
    // console.log("listinnnnnngggg", data.data.data)
    if (data.status === 200) {
      setListingData(data.data.data);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
    // }
    // catch (e) {
    //   router.push("/browse?type=offering");
    //   setIsLoading(true);
    // }


  }, []);

  const getApplicationForm = useCallback(async (id) => {
    setIsLoading(true);
    let data = {};
    try {
      data = await axios.get(`${baseUrl}/application-form/${id}`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
        },
      });
      if (data.status === 200) {
        setApplicationForm(data.data.data);
        setApplicationFormId(data?.data?.application_form_id);

        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    }
    catch (e) {
      router.push("/browse?type=offering");
      setIsLoading(true);
    }

  }, []);

  useEffect(() => {
    // console.log("slug FF", router.query.id);
    if (router.query.id !== undefined && router.query.id !== "") {
      getListingDetails(router.query.id);
      setItemSlug(router.query.id);
      getApplicationForm(router.query.id)
    }
  }, [router.query]);


  useEffect(() => {
    localStorage.removeItem("listingData");
  }, []);


  const handleCheckboxChange = (question_id, optionId) => {
    const existingQuestion = checkboxAnswer.find(
      (question) => question.question_id === question_id
    );

    if (existingQuestion) {
      const updatedOptions = existingQuestion.selected_options.includes(optionId)
        ? existingQuestion.selected_options.filter((id) => id !== optionId)
        : [...existingQuestion.selected_options, optionId];

      const updatedQuestions = checkboxAnswer.map((question) => {
        if (question.question_id === question_id) {
          return { ...question, selected_options: updatedOptions };
        }
        return question;
      });

      setCheckboxAnswer(updatedQuestions.filter((question) => question.selected_options.length > 0));
    } else {
      setCheckboxAnswer([
        ...checkboxAnswer,
        { question_id, selected_options: [optionId] },
      ]);
    }
  };


  return (
    <>
      <Box mt="20" mb="20">
        {isLoading && (
          <Center h={"300px"}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="orange.200"
              color="orange.500"
              size="xl"
            />
          </Center>
        )}
        {!isLoading && (
          <>
            <Box mx={[5, 5, 0, 0]}>
              <Head>
                <title>Good Deeds | {listingData?.title || "Good Deeds"}</title>
                <meta name="title" content={listingData?.title || "Good Deeds"} />
                {/* <meta name="keywords" content={listingData?.keywords.map((keyword, index) => keyword.name)} /> */}
                <meta
                  name="description"
                  content={listingData?.description || "Good Deeds"}
                />
                <meta
                  property="og:title"
                  content={listingData?.title || "Good Deeds"}
                />
                <meta
                  property="og:description"
                  content={listingData?.description || "Good Deeds"}
                />
                {/* <meta property="og:image" content={listingData?.media[0].path + '/' + listingData?.media[0].image} /> */}
              </Head>
              <Flex h={"100%"} direction={{ base: "column", lg: "row" }}>
                <Box mr={[0, 0, 10, 10]} ml={[0, 0, 10, 20]} w={["100%", "100%", "100%", "50%"]}>

                  <Box position={'relative'}>
                    <AspectRatio
                      maxW="100%"
                      maxH={isSmallerThan450 ? "240px" : "500px"}
                      ratio={4 / 4}
                    >
                      <Image
                        borderRadius={5}
                        objectFit="contain"
                        w={"100%"}
                        h={isSmallerThan450 ? "240px" : "500px"}
                        src={listingData.thumbnail}
                        alt={"no Image"}
                        draggable="false"
                        fallback={<Skeleton />}
                        pt={'15px'}
                      />
                    </AspectRatio>
                    <Tag size='lg' bg={'#183553'} color="#FFF" fontSize={"12px"} fontWeight={'600'} borderRadius='full' position={'absolute'} top="0" left={'0'}>
                      <TagLabel>{listingData.category}</TagLabel>
                    </Tag>
                  </Box>


                </Box>
                <Box w={["100%", "100%", "100%", "50%"]} mr={[0, 0, 10, 20]}>
                  <Flex justifyContent={"space-between"} mt={28}>
                    <Text
                      fontSize={"30px"}
                      fontWeight={600}
                      color={"#000000"}
                      textTransform="capitalize"
                    >
                      {listingData?.title}
                    </Text>
                  </Flex>
                  <Flex justifyContent={"space-between"} mt={"10px"}>
                    <Text fontSize={"24px"} color="orange.500" fontWeight="700">
                      {listingData?.credit_amount ? `${listingData.credit_amount} Credits` : ''}
                    </Text>
                  </Flex>
                  {listingData?.organization?.address !== null ? (
                    <Text fontSize={"14px"} fontWeight={400}>
                      {listingData?.organization?.address}
                    </Text>
                  ) : (
                    <Text fontSize={"14px"} fontWeight={400}>Virtual Deed</Text>
                  )}

                  <Text mt={"20px"}>

                    {listingData?.keywords?.length > 0 &&
                      listingData.keywords.map((item) => (
                        <Tag
                          size={"md"}
                          px={4}
                          py={"5px"}
                          mr={"3"}
                          mb={1}
                          key={item.id}
                          fontSize={"14px"}
                          bg={"#F6F6F6"}
                          borderRadius={"10px"}
                          color={"rgba(0, 0, 0, 0.77)"}
                          border={"none"}
                        >
                          <TagLabel>{item.name}</TagLabel>
                        </Tag>
                      ))}
                  </Text>
                  <Text mt={"20px"}>{listingData.description}</Text>
                </Box>
              </Flex>

            </Box>

            <Container mt={20} maxW='100%' w={'650px'}>
              <Box>
                <Text
                  fontSize={"30px"}
                  fontWeight={600}
                  color={"#000000"}
                  textTransform="capitalize"
                  textAlign={'center'}
                  mb={50}
                >
                  Application
                </Text>

                {applicationForm &&
                  applicationForm?.map((question, index) => {
                    return (
                      <>
                        <Box pt={'20px'} pb={'30px'} px={'40px'} mb={'20px'} boxShadow={'0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px   1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)'} key={index}>
                          {question.question_type_id === 1 &&
                            <FormControl mb={'20px'} >
                              <FormLabel for={`question-${question.question_id}`} color="#000000" pb={'15px'} fontSize="16px" fontWeight={500}>
                                {question.question}
                              </FormLabel>
                              <Input
                                variant="filled"
                                bg={'#F6F6F6'}
                                border="1px"
                                borderColor={'#E8E8E8'}
                                // name={`question-${question.question_id}`}
                                type="text"
                                maxLength={255}
                                placeholder="Begin typing here"
                                onChange={(e) => setShortQuestion((shortQuestion) => {
                                  if (e.target.value === '') {
                                    return shortQuestion.filter((obj) => obj.question_id !== question.question_id);
                                  } else {
                                    return shortQuestion
                                      .filter((obj) => obj.question_id !== question.question_id)
                                      .concat({ question_id: question.question_id, answer: e.target.value });
                                  }
                                })}
                              />
                            </FormControl>
                          }
                          {question.question_type_id === 2 &&
                            <FormControl isRequired>
                              <FormLabel color="#000000" pb={'15px'} fontSize="16px" fontWeight={500}>
                                {question.question}
                              </FormLabel>
                              <Stack>
                                {question?.options.length > 0 &&
                                  question?.options.map((option, index) => {
                                    return <Checkbox value={option.id} key={index}
                                      // onChange={
                                      //   (e) => {
                                      //     e.target.checked ?
                                      //       setCheckboxAnswer(prevState =>
                                      //         checkboxAnswer.length > 0 ?
                                      //           checkboxAnswer.map(
                                      //             (singleAnswer) => singleAnswer.question_id === question.question_id ?
                                      //               { question_id: question.question_id, selected_options: singleAnswer.selected_options.filter(obj => obj !== option.id).concat(option.id) }
                                      //               :
                                      //               [...prevState, { question_id: question.question_id, selected_options: [option.id] }]
                                      //           )
                                      //           :
                                      //           [{ question_id: question.question_id, selected_options: [option.id] }]
                                      //       )
                                      //       :
                                      //       setCheckboxAnswer(
                                      //         checkboxAnswer.map(
                                      //           (singleAnswer) => singleAnswer.question_id === question.question_id &&
                                      //             { question_id: question.question_id, selected_options: singleAnswer.selected_options.filter(obj => obj !== option.id) }
                                      //         )
                                      //       )
                                      //   }
                                      // }
                                      onChange={() => handleCheckboxChange(question?.question_id, option.id)}
                                    // checked={
                                    //   checkboxAnswer.find(
                                    //     (question) =>
                                    //       question.question_id === 1 &&
                                    //       question.checkboxAnswer.includes(1)
                                    //   ) !== undefined
                                    // }
                                    > {option.option}</Checkbox>
                                  })
                                }
                              </Stack>
                            </FormControl>
                          }
                          {question.question_type_id === 3 &&
                            <FormControl isRequired>
                              <Text color="#000000" pb={'15px'} fontSize="16px" fontWeight={500}>
                                {question.question}
                              </Text>
                              <RadioGroup
                                onChange={(value) => {
                                  setRadioAnswer(radioAnswer.length > 0 ?
                                    radioAnswer.filter(obj => obj.question_id !== question.question_id).concat({ question_id: question.question_id, selected_options: [parseInt(value)] }) : [{ question_id: question.question_id, selected_options: [parseInt(value)] }])
                                }}
                              // value={radioAnswer.selected_options}
                              >
                                <Stack>
                                  {question?.options.length > 0 &&
                                    question?.options.map((option, index) => {
                                      return <Radio value={option.id}>{option.option}</Radio>
                                    })
                                  }
                                </Stack>
                              </RadioGroup>
                            </FormControl>
                          }
                          {question.question_type_id === 4 &&
                            <FormControl mb={'20px'} isRequired>
                              <Text color="#000000" pb={'15px'} fontSize="16px" fontWeight={500}>
                                {question.question}
                              </Text>
                              <RadioGroup
                                pb={'15px'}
                                onChange={(value) => {
                                  setConditionalAnswer(prevAnswers => {
                                    const existingAnswer = prevAnswers.find(obj => obj.question_id === question.question_id);
                                    const updatedAnswer = {
                                      question_id: question.question_id,
                                      selected_options: [parseInt(value)],
                                      conditional_answer: ''
                                    };

                                    if (existingAnswer) {
                                      return prevAnswers.map(obj =>
                                        obj.question_id === question.question_id ? updatedAnswer : obj
                                      );
                                    } else {
                                      return [...prevAnswers, updatedAnswer];
                                    }
                                  });
                                }}
                              // value={value}
                              >
                                <Stack>
                                  {question?.options.length > 0 &&
                                    question?.options.map((option, index) => {
                                      return <Radio value={option.id}>{option.option}</Radio>
                                    })
                                  }
                                </Stack>
                              </RadioGroup>
                              {/* {conditionalAnswer.length > 0 &&
                                conditionalAnswer.map((singleAnswer) => singleAnswer.question_id === question.question_id &&
                                  singleAnswer.selected_options === 'Yes' &&
                                  <> */}
                              <Text color="#000000" pb={'15px'} fontSize="16px" fontWeight={500}>
                                {question.conditional_question}
                              </Text>
                              <Input
                                variant="filled"
                                bg={'#F6F6F6'}
                                border="1px"
                                borderColor={'#E8E8E8'}
                                onChange={(e) => {
                                  setConditionalAnswer(prevAnswers => {
                                    return prevAnswers.map(obj => {
                                      if (obj.question_id === question.question_id) {
                                        return {
                                          ...obj,
                                          conditional_answer: e.target.value
                                        };
                                      }
                                      return obj;
                                    });
                                  });
                                }}
                                type="text"
                                maxLength={255}
                                placeholder="Begin typing here"
                              />
                              {/* </>
                                )
                              } */}

                            </FormControl>
                          }
                          {question.question_type_id === 5 &&
                            <FormControl mb={'20px'} isRequired>
                              <Text color="#000000" pb={'15px'} fontSize="16px" fontWeight={500}>
                                {question.question}
                              </Text>
                              <RadioGroup
                                pb={'15px'}
                              // onChange={setValue}
                              // value={value}
                              >
                                <Stack>
                                  {question?.options.length > 0 &&
                                    question?.options.map((option, index) => {
                                      return <Radio value={option.option}>{option.option}</Radio>
                                    })
                                  }
                                </Stack>
                              </RadioGroup>
                              <Text color="#000000" pb={'15px'} fontSize="16px" fontWeight={500}>
                                Availability to
                              </Text>
                              <table className="col-md-12">
                                <thead>
                                  <tr>
                                    <th></th>
                                    <th style={{ marginLeft: "20px" }}>Morning</th>
                                    <th>Afternoon</th>
                                    <th>Evening</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Object.entries(availability).map(([day, times]) => (
                                    <tr key={day}>
                                      <td>{day}</td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={times.morning}
                                          onChange={(e) => handleChange(e, day, "morning")}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={times.afternoon}
                                          onChange={(e) => handleChange(e, day, "afternoon")}
                                        />
                                      </td>
                                      <td className="ms-5">
                                        <input
                                          type="checkbox"
                                          checked={times.evening}
                                          onChange={(e) => handleChange(e, day, "evening")}
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </FormControl>
                          }
                          {question.question_type_id === 6 &&
                            <FormControl isRequired>
                              <Text color="#000000" pb={'15px'} fontSize="16px" fontWeight={500}>
                                {question.question}
                              </Text>
                              <RadioGroup
                                pb={'15px'}
                                onChange={(value) => {
                                  setWorkExpAnswer(prevAnswers => {
                                    const existingAnswer = prevAnswers.find(obj => obj.question_id === question.question_id);
                                    const updatedAnswer = {
                                      question_id: question.question_id,
                                      selected_options: [parseInt(value)],
                                      work_experinces: [existingAnswer ? existingAnswer.work_experinces : '']
                                    };

                                    if (existingAnswer) {
                                      return prevAnswers.map(obj =>
                                        obj.question_id === question.question_id ? updatedAnswer : obj
                                      );
                                    } else {
                                      return [...prevAnswers, updatedAnswer];
                                    }
                                  });
                                }}
                              >
                                <Stack>
                                  {question?.options.length > 0 &&
                                    question?.options.map((option, index) => {
                                      return <Radio value={option.id} key={index}>{option.option}</Radio>;
                                    })}
                                </Stack>
                              </RadioGroup>
                              <Text color="#000000" pb={'10px'} fontSize="16px" fontWeight={500}>
                                Explain
                              </Text>
                              <Textarea
                                size='sm'
                                placeholder='Begin typing here'
                                onChange={(e) => {
                                  setWorkExpAnswer(prevAnswers => {
                                    return prevAnswers.map(obj => {
                                      if (obj.question_id === question.question_id) {
                                        return {
                                          ...obj,
                                          work_experinces: [e.target.value]
                                        };
                                      }
                                      return obj;
                                    });
                                  });
                                }}
                              />
                            </FormControl>
                          }
                        </Box >

                      </>
                    )
                  })
                }

                {applicationForm &&
                  <Box Box mt={'30px'} px={'40px'}>
                    <Flex gap={'20px'} justifyContent={'center'}>
                      <Button
                        type="submit"
                        fontSize='14px'
                        fontWeight='600'
                        bg='#E27832'
                        _hover={{ bg: '#E27832' }}
                        _active={{ bg: '#E27832' }}
                        _focus={{ bg: '#E27832' }}
                        width={"150px"}
                        height="35px"
                        borderRadius='100px'
                        color='#fff'
                        // loading={isContactLoading}
                        // disabled={isContactLoading}
                        onClick={submitApplicationForm}
                      >
                        Submit
                      </Button>
                      <Button
                        type="submit"
                        fontSize='14px'
                        fontWeight='600'
                        bg='#183553'
                        _hover={{ bg: '#183553' }}
                        _active={{ bg: '#183553' }}
                        _focus={{ bg: '#183553' }}
                        width={"150px"}
                        height="35px"
                        color='#fff'
                        borderRadius='100px'
                        // loading={isContactLoading}
                        // disabled={isContactLoading}
                        onClick={() =>
                          router.push(`/listing/${itemSlug}?type=volunteer`)
                        }
                      >
                        Cancel
                      </Button>
                    </Flex>
                  </Box>
                }



                {/* {applicationForm.length > 0 &&
                  applicationForm?.map((question, index) => {
                    <QuestionAnswer question={question} key={index} />
                  })
                } */}

              </Box>
            </Container>

          </>
        )}
      </Box >
    </>
  );
};

export default VolunteerApplication;
