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

import { useToast } from "@chakra-ui/toast";
import NoImage from "../../src/assets/imgs/no-image.png";
import { isMobile } from "react-device-detect";
import { useMediaQuery } from "@chakra-ui/react";
import plus from "../../assets/imgs/plus.png";
import cros from "../../assets/imgs/cros.png";
import { v4 as uuidv4 } from 'uuid';
interface questionErrors{
  id: string
}

interface Question {
  is_deleted: boolean;
  is_required: boolean;
  is_new: boolean,
  question_id: number;
  question: string;
  conditional_question?: string,
  question_type_id: number;
  options?: Option[];
}

const VolunteerApplication = (props: Props) => {

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
  const [formSubmitted, setFormSubmitted] = useState(false);
 
  //------------------------------------------------------------------
  const [formData, setFormData] = useState([{
    question_type_id: 0
  }]);
  const [questions, setQuestions] = useState<{ id: string; type: number; is_deleted:boolean, type_id:number; html: JSX.Element }[]>([]);
  const [questionErrors, setQuestionErrors] = useState<{ [key: string]: boolean }>({});
  const [formQuestions, setFormQuestions] = useState<{ id: string; question: any }[]>([]);
  const [applicationFormData, setApplicationFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

//-----------------------------------------------------------------
  



  const availability = {
    Monday: { morning: false, afternoon: false, evening: false },
    Tuesday: { morning: false, afternoon: false, evening: false },
    Wednesday: { morning: false, afternoon: false, evening: false },
    Thursday: { morning: false, afternoon: false, evening: false },
    Friday: { morning: false, afternoon: false, evening: false },
    Saturday: { morning: false, afternoon: false, evening: false },
    Sunday: { morning: false, afternoon: false, evening: false },
  };

function handleAvailabilityCheckbox(question_id, day, timeOfDay, checked) {
  setApplicationFormData((prevFormData) => {
    // Find the index of the question_id in prevFormData
    const existingDataIndex = prevFormData.findIndex((data) => data.question_id === question_id);

    // If the question_id exists in prevFormData, update its availability_to
    if (existingDataIndex !== -1) {
      const updatedFormData = [...prevFormData];
      const existingAvailability = { ...updatedFormData[existingDataIndex]?.availability_to } || {};


      // Get the abbreviated day name (first 3 letters in lowercase)
      const abbreviatedDay = day.substring(0, 3).toLowerCase();

      // Check if the day entry exists in the availability_to object
      if (existingAvailability[`${abbreviatedDay}`]) {
        // If the day entry exists, update its value based on the checkbox status
        const currentShifts = existingAvailability[`${abbreviatedDay}`].split(',');
        if (checked) {
          // If the checkbox is checked, add the shift to the day's shifts
          currentShifts.push(timeOfDay);
        } else {
          // If the checkbox is unchecked, remove the shift from the day's shifts
          const shiftIndex = currentShifts.indexOf(timeOfDay);
          if (shiftIndex !== -1) {
            currentShifts.splice(shiftIndex, 1);
          }
        }

        // Update the day entry in the availability_to object
        if (currentShifts.length > 0) {
          existingAvailability[abbreviatedDay] = currentShifts.join(',');
        } else {
          // If there are no shifts in the day, delete the day entry from availability_to
          delete existingAvailability[abbreviatedDay];
        }
      } else {
        // If the day entry doesn't exist, create a new entry with the selected shift
        existingAvailability[abbreviatedDay] = timeOfDay;
      }

      updatedFormData[existingDataIndex].availability_to = existingAvailability;
      // ... Other code ...
      return updatedFormData;
    }

    // If the question_id doesn't exist in prevFormData, return the previous state unchanged
    return prevFormData;
  });
}

  const getListingDetails = useCallback(async (id) => {
    setIsLoading(true);
    let data = {};
    if (isLogin()) {
      data = await axios.get(`${baseUrl}/browse/volunteer-listings/${id}`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
        },
      });
    } else {
      data = await axios.get(`${baseUrl}/browse/volunteer-listings/${id}`);
    }
    if (data.status === 200) {
      setListingData(data.data.data);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
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
        setFormData(data.data.data);
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
    axios
      .get(`${baseUrl}/application-form/${router.query.id}/check`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        if(res.data === 1){
          setFormSubmitted(true)
        }else{
          setFormSubmitted(false)
        }
      })
      .catch((err) => {
      });
  }, [router.query.id]);


  useEffect(() => {
    if (router.query.id !== undefined && router.query.id !== "") {
      getListingDetails(router.query.id);
      setItemSlug(router.query.id);
      getApplicationForm(router.query.id)
    }
  }, [router.query, formSubmitted]);

  useEffect(() => {
    if (formSubmitted === false && router.query.id !== undefined && router.query.id !== "") {
      getApplicationForm(router.query.id)
    }
  }, [router.query, formSubmitted]);

  useEffect(() => {
    localStorage.removeItem("listingData");
  }, []);


  // const handleCheckboxChange = (question_id, optionId) => {
  //   setCheckboxAnswer((prevCheckboxAnswer) => {
  //     const existingQuestion = prevCheckboxAnswer.find(
  //       (question) => question.question_id === question_id
  //     );
  
  //     if (existingQuestion) {
  //       const updatedOptions = existingQuestion.selected_options.includes(optionId)
  //         ? existingQuestion.selected_options.filter((id) => id !== optionId)
  //         : [...existingQuestion.selected_options, optionId];
  
  //       const updatedQuestions = prevCheckboxAnswer.map((question) => {
  //         if (question.question_id === question_id) {
  //           return { ...question, selected_options: updatedOptions };
  //         }
  //         return question;
  //       });
  
  //       return updatedQuestions.filter((question) => question.selected_options.length > 0);
  //     } else {
  //       return [
  //         ...prevCheckboxAnswer,
  //         { question_id, selected_options: [optionId] },
  //       ];
  //     }
  //   });
  // };

  const handleShortAnswer = (question_id, answer, type) => {
    setApplicationFormData((prevFormData) => {
      const formDataIndex = prevFormData.findIndex((data) => data.question_id === question_id);
  
      if (formDataIndex !== -1) {
        // Question already exists in the array, update its answer based on the type
        const updatedFormData = [...prevFormData];
        if (type === "conditional") {
          updatedFormData[formDataIndex].conditional_answer = answer;
        } else if(type === "availability"){
          setQuestionErrors((prevErrors) => ({
            ...prevErrors,
            [`${question_id}-date`]: false, // Reset the error state for the specific question ID
          }));
          updatedFormData[formDataIndex].date_availability = answer;
        }else {
          setQuestionErrors((prevErrors) => ({
            ...prevErrors,
            [question_id]: false, // Reset the error state for the specific question ID
          }));
          updatedFormData[formDataIndex].answer = answer;
        }
        
        return updatedFormData;
      } else {
        // Question doesn't exist in the array, create a new entry based on the type
        if (type === "conditional") {
          return [...prevFormData, { question_id, conditional_answer: answer, selected_options: [] }];
        } else if(type === "availability"){
          return [...prevFormData, { question_id, date_availability: answer, selected_options: [], availability_to:[] }];
        } else {
          return [...prevFormData, { question_id, answer }];
        }
      }
    });
  };
  

  const handleCheckboxChange = (question_id, optionId) => {
    setApplicationFormData((prevFormData) => {
      const existingQuestion = prevFormData.find(
        (data) => data.question_id === question_id
      );
  
      if (existingQuestion) {
        const updatedOptions = existingQuestion.selected_options.includes(optionId)
          ? existingQuestion.selected_options.filter((id) => id !== optionId)
          : [...existingQuestion.selected_options, optionId];
          
        setQuestionErrors((prevErrors) => ({
          ...prevErrors,
          [question_id]: false, // Reset the error state for the specific question ID
        }));
        return prevFormData.map((data) =>
          data.question_id === question_id
            ? { ...data, selected_options: updatedOptions }
            : data
        );
        
      } else {
        return [
          ...prevFormData,
          { question_id, selected_options: [optionId] },
        ];
      }
    });
  };
  
  const handleRadioChange = (question_id:number, optionId:string, type:string) => {
    setApplicationFormData((prevFormData) => {
      // Check if the question_id exists in prevFormData
      const existingDataIndex = prevFormData.findIndex(
        (data) => data.question_id === question_id
      );
  
      // If the question_id exists, update the selected_options
      if (existingDataIndex !== -1) {
        const updatedFormData = prevFormData.map((data, index) =>
          index === existingDataIndex
            ? { ...data, selected_options: [optionId] }
            : data
        );
        setQuestionErrors((prevErrors) => ({
          ...prevErrors,
          [question_id]: false, // Reset the error state for the specific question ID
        }));
        return updatedFormData;
      }
      
      let newData;
      // If the question_id doesn't exist, add a new data object
      if(type === "conditional"){
        newData = {
          question_id: question_id,
          selected_options: [optionId],
          conditional_answer: '' 
        };
      }else if(type === "availability"){
        newData = {
          question_id: question_id,
          date_availability: '',
          selected_options: [optionId],
          availability_to: [] 
        };
      }else if(type === "experience"){
        newData = {
          question_id: question_id,
          selected_options: [optionId],
          work_experinces: []
        };
      }else{
        newData = {
          question_id: question_id,
          selected_options: [optionId]
        };
      }
      
      return [...prevFormData, newData];
    });
  };
  
  const handleWorkExperience = (question_id, experience_id, experience) => {
    setApplicationFormData((prevFormData) => {
      // Find the index of the question in the formData
      const questionIndex = prevFormData.findIndex((data) => data.question_id === question_id);

      if (questionIndex !== -1) {
        // Get the existing workExperiences for the current question
        const existingWorkExperiences = prevFormData[questionIndex].work_experiences || {};
  
        // Update the specific experience's value
        const updatedWorkExperiences = {
          ...existingWorkExperiences,
          [experience_id]: experience,
        };
  
        // Create a new formData array with the updated workExperiences
        const updatedFormData = [...prevFormData];
        updatedFormData[questionIndex].work_experiences = updatedWorkExperiences;
        setQuestionErrors((prevErrors) => ({
          ...prevErrors,
          [`${question_id}-experience`]: false, // Reset the error state for the specific question ID
        }));
        return updatedFormData;
      }
  
      // Question not found, return the previous formData as is
      return prevFormData;
    });
  };
  
  
  
  const handleAddExperience = (question_id, newExperienceKey) => {
    setApplicationFormData((prevFormData) => {
      const questionIndex = prevFormData.findIndex(
        (data) => data.question_id === question_id
      );

      if (questionIndex !== -1) {
        const updatedWorkExperiences = {
          ...prevFormData[questionIndex].work_experiences,
          [newExperienceKey]: '', // Add the new experience key with an empty string value
        };

        const updatedFormData = [...prevFormData];
        updatedFormData[questionIndex] = {
          ...updatedFormData[questionIndex],
          work_experiences: updatedWorkExperiences,
        };
        
        return updatedFormData;
      }

      // If the question_id doesn't exist, return the previous state
      return prevFormData;
    });
  };
  
  const handleRemoveExperience = (question_id, experienceKey) => {
    setApplicationFormData((prevFormData) => { 
      const questionIndex = prevFormData.findIndex(
        (data) => data.question_id === question_id
      );

      if (questionIndex !== -1) {
        const updatedWorkExperiences = { ...prevFormData[questionIndex].work_experiences };
        delete updatedWorkExperiences[experienceKey]; // Remove the experience with the specified key
        
        const updatedFormData = [...prevFormData];
        updatedFormData[questionIndex] = {
          ...updatedFormData[questionIndex],
          work_experiences: updatedWorkExperiences,
        };
      
        return updatedFormData;
      }

      // If the question_id doesn't exist, return the previous state
      return prevFormData;
    });
  };

  // ===============================================================================================

  const shortQuestionHTML = (id: string, questionErrors: any, formQuestions: any) => {
    const question_id = formQuestions[id].question_id;
    return (
      <Box pt={'20px'} pb={'30px'} px={'40px'} mb={'20px'} 
                        boxShadow={'0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px   1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)'} 
                        key={id}>
      <FormControl mb={'20px'} isRequired={formQuestions[id].is_required? true: false}>
        <FormLabel for={`question-${formQuestions[id].question_id}`} color="#000000" pb={'15px'} fontSize="16px" fontWeight={500}>
          {formQuestions[id].question}
        </FormLabel>
        <Input
          variant="filled"
          bg={'#F6F6F6'}
          border="1px"
          borderColor={'#E8E8E8'}
          className={`${questionErrors[question_id] ? 'input-error' : ''}`}
          // name={`question-${question.question_id}`}
          type="text"
          maxLength={255}
          placeholder="Begin typing here"
          onChange={(e) => handleShortAnswer(question_id, e.target.value)}
        />
        {questionErrors[question_id] && <p className="error-message">Please fill out the field.</p>}
      </FormControl>
      </Box>
    );
  };

  const checkboxQuestionHTML = (id: string, type_id: number, questionErrors: any, formQuestions: any) => {
    const question_id = formQuestions[id].question_id;
    return (
      <Box pt={'20px'} pb={'30px'} px={'40px'} mb={'20px'} 
                        boxShadow={'0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px   1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)'} 
                        key={id}>
      <FormControl isRequired={formQuestions[id].is_required ? true : false}>
        <FormLabel color="#000000" pb={'15px'} fontSize="16px" fontWeight={500}>
          {formQuestions[id].question}
        </FormLabel>
        <Stack>
          {formQuestions[id]?.options.length > 0 &&
            formQuestions[id]?.options.map((option, index) => {
              return (
                <Checkbox
                  key={index}
                  value={option.id}
                  onChange={() => handleCheckboxChange(question_id, option.id)}
                >
                  {option.option}
                </Checkbox>
              );
            })}
        </Stack>
        {// @ts-ignore: Unreachable code error
          questionErrors[question_id] && <p className="error-message">Please select at least one option.</p>}
      </FormControl>
      </Box>
    );
  };
  
  const radioQuestionHTML = (id: string, type_id: number, questionErrors: any, formQuestions: any, applicationFormData: any) => {
    const question_id = formQuestions[id].question_id;
    // Find the selected option ID for the current question in ApplicationFormData
    const selectedOptions = applicationFormData.find((data) => data.question_id === formQuestions[id].question_id)?.selected_options[0] || [];

    return (
      <Box pt={'20px'} pb={'30px'} px={'40px'} mb={'20px'} 
                        boxShadow={'0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px   1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)'} 
                        key={id}>
      <FormControl isRequired={formQuestions[id].is_required ? true : false}>
        <FormLabel color="#000000" pb={'15px'} fontSize="16px" fontWeight={500}>
          {formQuestions[id].question}
        </FormLabel>
        <RadioGroup
          onChange={(value) => handleRadioChange(formQuestions[id]?.question_id, value)} // Pass an array containing the selected option ID
          value={selectedOptions || ''} // Set the selected option using the selectedOptions array
        >
          <Stack>
            {formQuestions[id]?.options.length > 0 &&
              formQuestions[id]?.options.map((option, index) => {
                return (
                  <Radio value={option.id.toString()} key={index}>
                    {option.option}
                  </Radio>
                );
              })}
          </Stack>
          {// @ts-ignore: Unreachable code error
          questionErrors[question_id] && <p className="error-message">Please select an option.</p>}
        </RadioGroup>
      </FormControl>
      </Box>
    );
  };

  const conditionalQuestionHTML = (id: string, questionErrors: [], formQuestions: any, applicationFormData: any) => {
    const question_id = formQuestions[id].question_id;
    // Find the selected option ID for the current question in ApplicationFormData
    const selectedOptions = applicationFormData.find((data) => data.question_id === formQuestions[id].question_id)?.selected_options[0] || [];
    return (
      <Box pt={'20px'} pb={'30px'} px={'40px'} mb={'20px'} 
                        boxShadow={'0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px   1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)'} 
                        key={id}>
      <FormControl mb={'20px'} isRequired={formQuestions[id].is_required? true: false}>
        <FormLabel color="#000000" pb={'15px'} fontSize="16px" fontWeight={500}>
          {formQuestions[id].question}
        </FormLabel>
        <RadioGroup
          onChange={(value) => handleRadioChange(formQuestions[id]?.question_id, value, 'conditional')} // Pass an array containing the selected option ID
          value={selectedOptions || ''} // Set the selected option using the selectedOptions array
        >
          <Stack>
            {formQuestions[id]?.options.length > 0 &&
              formQuestions[id]?.options.map((option, index) => {
                return (
                  <Radio value={option.id.toString()} key={index}>
                    {option.option}
                  </Radio>
                );
              })}
          </Stack>
          {// @ts-ignore: Unreachable code error
          questionErrors[question_id] && <p className="error-message">Please select an option.</p>}
        </RadioGroup>
       
        <Text color="#000000" pb={'15px'} fontSize="16px" fontWeight={500}>
          {formQuestions[id].conditional_question}
        </Text>
        <Input
          variant="filled"
          bg={'#F6F6F6'}
          border="1px"
          borderColor={'#E8E8E8'}
          onChange={(e) => handleShortAnswer(formQuestions[id].question_id, e.target.value, 'conditional')}
          type="text"
          maxLength={255}
          placeholder="Begin typing here"
        />
        
      </FormControl>
      </Box>
    );
  };

  const askAvailabilityHTML = (id: string, questionErrors: any, formQuestions: any, applicationFormData: any, availability: any) => {
    const question_id = formQuestions[id].question_id;
    const selectedOptions = applicationFormData.find((data) => data.question_id === question_id)?.selected_options[0] || [];
    return (
      <>
      <p className="listing-txt mt-2 mb-3">Availability</p>
      <Box pt={'20px'} pb={'30px'} px={'40px'} mb={'20px'} 
                        boxShadow={'0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px   1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)'} 
                        key={id}>
      <FormControl isRequired={formQuestions[id].is_required ? true : false}>
        <FormLabel color="#000000" pb={'15px'} fontSize="16px" fontWeight={500}>
          {formQuestions[id].question}
        </FormLabel>
        <RadioGroup
          onChange={(value) => handleRadioChange(formQuestions[id]?.question_id, value, 'availability')} // Pass an array containing the selected option ID
          value={selectedOptions || ''} // Set the selected option using the selectedOptions array
        >
          <Stack>
            {formQuestions[id]?.options.length > 0 &&
              formQuestions[id]?.options.map((option, index) => {
                return (
                  <Radio value={option.id.toString()} key={index}>
                    {option.option}
                  </Radio>
                );
              })}
          </Stack>
          {// @ts-ignore: Unreachable code error
          questionErrors[question_id] && <p className="error-message">Please select an option.</p>}
        </RadioGroup>
      </FormControl>
      </Box>
      <Box pt={'20px'} pb={'30px'} px={'40px'} mb={'20px'} 
                        boxShadow={'0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px   1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)'} 
                        key={id}>
      <FormControl mb={'20px'} isRequired={formQuestions[id].is_required? true: false}>
        <FormLabel color="#000000" pb={'15px'} fontSize="16px" fontWeight={500}>
          Date I am available to start
        </FormLabel>
        <div className="col-md-10 mb-3">
        <Input
          variant="filled"
          bg={'#F6F6F6'}
          border="1px"
          borderColor={'#E8E8E8'}
          className={`${questionErrors[`${question_id}-date`] ? 'input-error' : ''}`}
          type="date"
          maxLength={255}
          placeholder="Begin typing here"
          onChange={(e) => handleShortAnswer(question_id, e.target.value, 'availability')}
        />
        {// @ts-ignore: Unreachable code error
          questionErrors[`${question_id}-date`] && <p className="error-message">Please select a date.</p>}
        </div>
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
                    checked={times.morning === true? "checked": null}
                    onChange={(e) => handleAvailabilityCheckbox(question_id, day, "morning", e.target.checked)}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={times.morning === true? "checked": null}
                    onChange={(e) => handleAvailabilityCheckbox(question_id, day, "afternoon", e.target.checked)}
                  />
                </td>
                <td className="ms-5">
                  <input
                    type="checkbox"
                    checked={times.morning === true? "checked": null}
                    onChange={(e) => handleAvailabilityCheckbox(question_id, day, "evening", e.target.checked)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {// @ts-ignore: Unreachable code error
          questionErrors[`${question_id}-shifts`] && <p className="error-message">Please select at least one shift for each day.</p>}
      </FormControl>
      </Box>
      </>
    );
  };

  const workExperienceHTML = (id: string, questionErrors: [], formQuestions: any, applicationFormData: any) => {
    const question_id = formQuestions[id].question_id;
    const selectedOptions = applicationFormData.find((data) => data.question_id === question_id)?.selected_options[0] || [];
    const formData = applicationFormData.find((data) => data.question_id === question_id);
    
    if (!formData) {
      return null; // or return some default JSX
    }

    // Extract the work experiences from the formData
    const workExperiences = formData.work_experiences || [];
    const experience_length = Object.keys(workExperiences).length +1;

    
    return(
      <>
      <p className="listing-txt mt-2 mb-3">Previous Work or Volunteer Experience</p>
      <Box pt={'20px'} pb={'30px'} px={'40px'} mb={'20px'} 
                        boxShadow={'0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px   1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)'} 
                        key={id}>
      <FormControl isRequired={formQuestions[id].is_required? true: false}>
        <FormLabel color="#000000" pb={'15px'} fontSize="16px" fontWeight={500}>
          Do you have experience working with {formQuestions[id].question}
        </FormLabel>
        <RadioGroup
          onChange={(value) => handleRadioChange(question_id, value, 'experience')} // Pass an array containing the selected option ID
          value={selectedOptions || ''} // Set the selected option using the selectedOptions array
        >
          <Stack>
            {formQuestions[id]?.options.length > 0 &&
              formQuestions[id]?.options.map((option, index) => {
                return (
                  <Radio value={option.id.toString()} key={index}>
                    {option.option}
                  </Radio>
                );
              })}
          </Stack>
          {// @ts-ignore: Unreachable code error
          questionErrors[question_id] && <p className="error-message">Please select an option.</p>}
        </RadioGroup>
        <Text color="#000000" pb={'10px'} fontSize="16px" fontWeight={500}>
          Prior Work Experiences
        </Text>
        {Object.keys(workExperiences).map((experienceName, index) => (
          <div className="d-flex align-items-center mb-3">
          <Textarea
              size='sm'
              placeholder='Please indicate workplace and duties'
              id={experienceName}
              value={workExperiences[experienceName]}
              onChange={(e)=>handleWorkExperience(question_id, experienceName, e.target.value)}
            />
            <Image
              className="ms-2 mt-2"
              src={cros.src}
              onClick={() => handleRemoveExperience(question_id, experienceName)}
            />
          </div>
        ))}
        {// @ts-ignore: Unreachable code error
          questionErrors[`${question_id}-experience`] && <p className="error-message">Please fill out the experience field.</p>}
        {/* Plus icon to add more textareas */}
        <div className="mt-2" onClick={() => handleAddExperience(question_id, uuidv4())}>
          <Image src={plus.src} color={"gray"}/>
        </div>
      </FormControl>
      </Box>
      </>
    );
  };

  const askVaccinationHTML = (id: string, questionErrors: [], formQuestions: any, applicationFormData:any) => {
    const question_id = formQuestions[id].question_id;
    const selectedOptions = applicationFormData.find((data) => data.question_id === formQuestions[id].question_id)?.selected_options[0] || [];
    return(
      <Box pt={'20px'} pb={'30px'} px={'40px'} mb={'20px'} 
                        boxShadow={'0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px   1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)'} 
                        key={id}>
      <FormControl isRequired={formQuestions[id].is_required? true: false}>
        <FormLabel color="#000000" pb={'15px'} fontSize="16px" fontWeight={500}>
          {formQuestions[id].question}
        </FormLabel>
        <RadioGroup
          onChange={(value) => handleRadioChange(formQuestions[id]?.question_id, value)} // Pass an array containing the selected option ID
          value={selectedOptions || ''} // Set the selected option using the selectedOptions array
        >
          <Stack>
            {formQuestions[id]?.options.length > 0 &&
              formQuestions[id]?.options.map((option, index) => {
                return (
                  <Radio value={option.id.toString()} key={index}>
                    {option.option}
                  </Radio>
                );
              })}
          </Stack>
          {// @ts-ignore: Unreachable code error
          questionErrors[question_id] && <p className="error-message">Please select an option.</p>}
        </RadioGroup>
      </FormControl>
      </Box>
    );
  };

  //================================================================================================
  const handleAddQuestion = (type: number, index: number, question_id:number, is_required:boolean) => {
    const id = 'question-' + index;
    let newQuestion: JSX.Element;
    let type_id: number;
  
    switch (type) {
      case 1:
        type_id = 1; // @ts-ignore: Unreachable code error
        newQuestion = (questionErrors, formQuestions) => shortQuestionHTML(id, questionErrors, formQuestions);
        setApplicationFormData((prevFormData) => [
          ...prevFormData,
          {
            question_id: question_id,
            answer: "",
            is_required: is_required,
            type_id: type
          },
        ]);
        break;
      case 2:
        type_id = 2; // @ts-ignore: Unreachable code error
        newQuestion = (questionErrors, formQuestions) => checkboxQuestionHTML(id, type_id, questionErrors, formQuestions);
        setApplicationFormData((prevFormData) => [
          ...prevFormData,
          {
            question_id: question_id,
            selected_options: [],
            is_required: is_required,
            type_id: type
          },
        ]);
        break;
      case 3:
        type_id = 3; // @ts-ignore: Unreachable code error
        newQuestion = (questionErrors, formQuestions, applicationFormData) => radioQuestionHTML(id, type_id, questionErrors, formQuestions, applicationFormData);
        setApplicationFormData((prevFormData) => [
          ...prevFormData,
          {
            question_id: question_id,
            selected_options: [],
            is_required: is_required,
            type_id: type
          },
        ]);
        break;
      case 4:
        type_id = 4; // @ts-ignore: Unreachable code error
        newQuestion = (questionErrors, formQuestions, applicationFormData) => conditionalQuestionHTML(id, questionErrors, formQuestions, applicationFormData);
        setApplicationFormData((prevFormData) => [
          ...prevFormData,
          {
            question_id: question_id,
            selected_options: [],
            conditional_answer: "", 
            is_required: is_required,
            type_id: type
          },
        ]);
        break;
      case 5:
        type_id = 5; // @ts-ignore: Unreachable code error
        newQuestion = (questionErrors, formQuestions, applicationFormData, availability) => askAvailabilityHTML(id, questionErrors, formQuestions, applicationFormData, availability);
        setApplicationFormData((prevFormData) => [
          ...prevFormData,
          {
            question_id: question_id,
            selected_options: [],
            date_availability: "", 
            availability_to: [],
            is_required: is_required,
            type_id: type
          },
        ]);
        break;
      case 6:
        type_id = 6; // @ts-ignore: Unreachable code error
        newQuestion = (questionErrors, formQuestions, applicationFormData) => workExperienceHTML(id, questionErrors, formQuestions, applicationFormData);
        setApplicationFormData((prevFormData) => [
          ...prevFormData,
          {
            question_id: question_id,
            selected_options: [],
            work_experiences: { [uuidv4()]: "" }, 
            is_required: is_required,
            type_id: type
          },
        ]);
        break;
      case 7:
        type_id = 7; // @ts-ignore: Unreachable code error
        newQuestion = (questionErrors, formQuestions, applicationFormData) => askVaccinationHTML(id, questionErrors, formQuestions, applicationFormData);
        setApplicationFormData((prevFormData) => [
          ...prevFormData,
          {
            question_id: question_id,
            selected_options: [],
            is_required: is_required,
            type_id: type
          },
        ]);
        break;
      default:
        return;
    }
    
    
    const question = {
      id: id,
      type: type,
      is_deleted: false,
      type_id: type_id,
      html: newQuestion,
    };
  
    setQuestions((prevQuestions) => [...prevQuestions, question]);
  };


  useEffect(() => {
	
    if(formData.length > 0){ 
    setQuestions([]); 
    setQuestionErrors({});
    setApplicationFormData([]);
    formData.forEach((question, index) => {
      let id = index+1;
      let key = 'question-'+id;
      let question_type_id = question.question_type_id;
      
      setFormQuestions((prevQuestions) => ({ 
        ...prevQuestions,  
        [key]: {
          ...question
        },
      }));
      
      if(question_type_id === 1){
        handleAddQuestion(question_type_id, index+1, question.question_id, question.is_required)
      }else if(question_type_id === 2){
        handleAddQuestion(question_type_id, index+1, question.question_id, question.is_required)
      }else if(question_type_id === 3){
        handleAddQuestion(question_type_id, index+1, question.question_id, question.is_required)
      }else if(question_type_id === 4){
        handleAddQuestion(question_type_id, index+1, question.question_id, question.is_required)
      }else if(question_type_id === 5){
        handleAddQuestion(question_type_id, index+1, question.question_id, question.is_required)
      }else if(question_type_id === 6){
        handleAddQuestion(question_type_id, index+1, question.question_id, question.is_required)
      }else if(question_type_id === 7){
        handleAddQuestion(question_type_id, index+1, question.question_id, question.is_required)
      }
      
    });
    
    }
}, [formData])

const submitApplicationForm = (e) => {
  e.preventDefault();
  setIsSubmitting(true)
  let hasErrors = false;

  Object.keys(applicationFormData).forEach((index) => {
    let question = applicationFormData[index];
    let question_id = question.question_id;

    if(question.is_required === 1){
      if(question.type_id == 1){
        
        if (question.answer == "") {
          setQuestionErrors((prevErrors) => ({
            ...prevErrors,
            [question_id]: true, // Set the error state for the specific question ID
          }));
          hasErrors = true;
        }

      }else if(question.type_id == 2 || question.type_id == 3 || question.type_id == 4 || question.type_id == 7){
        
        if (question.selected_options.length == 0) { 
          setQuestionErrors((prevErrors) => ({
            ...prevErrors,
            [question_id]: true,
          }));
          hasErrors = true;
        }

      }else if(question.type_id == 5){
        const options = question.selected_options;
        const date = question.date_availability;
        const shifts = question.availability_to;
        if (options.length == 0) { 
          setQuestionErrors((prevErrors) => ({
            ...prevErrors,
            [question_id]: true,
          }));
          hasErrors = true;
        }

        if (date == "") { 
          setQuestionErrors((prevErrors) => ({
            ...prevErrors,
            [`${question_id}-date`]: true,
          }));
          hasErrors = true;
        }

        if (Object.entries(shifts).length == 0) { 
          setQuestionErrors((prevErrors) => ({
            ...prevErrors,
            [`${question_id}-shifts`]: true,
          }));
          hasErrors = true;
        }

      }else if(question.type_id == 6){
        const options = question.selected_options;
        const work_experiences = question.work_experiences;
        if (options.length == 0) { 
          setQuestionErrors((prevErrors) => ({
            ...prevErrors,
            [question_id]: true,
          }));
          hasErrors = true;
        }
        // Check if any entry in the workExperiences object is empty
        const hasEmptyExperience = Object.values(work_experiences).some((experience) => experience === "");
   
        if(Object.entries(work_experiences).length && hasEmptyExperience) { 
          setQuestionErrors((prevErrors) => ({
            ...prevErrors,
            [`${question_id}-experience`]: true,
          }));
          hasErrors = true;
        }

      }
    }
  });
  // If there are errors, prevent form submission
  if (hasErrors) {
    toast({ position: "top", title: 'Please fill out the complete form.', status: "warning" })
    setIsSubmitting(false)
    return;
  }
  
  const combinedObject = {
    application_form_id: applicationFormId,
    data: [
      ...applicationFormData
    ]
  };
  
  axios
    .post(`${baseUrl}/application/store?org=${listingData?.organization.slug}`, combinedObject, {
      headers: {
        Authorization: "Bearer " + accessToken(),
      },
    })
    .then((response) => {
      toast({ position: "top", title: response.data.message, status: "success" })
      setFormSubmitted(true)
      setIsSubmitting(false)
    })
    .catch((error) => {
      toast({ position: "top", title: `${error.message.message}`, status: "error" })
    });

}

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
                      {listingData?.credit_amount ? `${listingData.credit_amount} Deed Dollars` : ''}
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
                {!formSubmitted?  
                <form onSubmit={submitApplicationForm}>
                  {questions.map((question) => ( // @ts-ignore: Unreachable code error
                    <>
                    
                    
                    {question.type === 1 ? ( // @ts-ignore: Unreachable code error
                        question.html(questionErrors, formQuestions)
                    ) :  question.type === 2 ? ( // @ts-ignore: Unreachable code error
                        question.html(questionErrors, formQuestions)
                    ) :  question.type === 3 ? ( // @ts-ignore: Unreachable code error
                        question.html(questionErrors, formQuestions, applicationFormData)
                    ) :  question.type === 4 ? ( // @ts-ignore: Unreachable code error
                        question.html(questionErrors, formQuestions, applicationFormData)
                    ) :  question.type === 5 ? ( // @ts-ignore: Unreachable code error
                        question.html(questionErrors, formQuestions, applicationFormData, availability)
                    ) :  question.type === 6 ? ( // @ts-ignore: Unreachable code error
                      question.html(questionErrors, formQuestions, applicationFormData)
                    ) :  question.type === 7 ? ( // @ts-ignore: Unreachable code error
                      question.html(questionErrors, formQuestions, applicationFormData)
                    ) : null }
                  </>
                  ))}
                  
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
                        disabled={isSubmitting}
                        onClick={submitApplicationForm}
                      >
                        {isSubmitting ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div> : "Submit"}
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
                        disabled={isSubmitting}
                        onClick={() =>
                          router.push(`/listing/${itemSlug}?type=volunteer`)
                        }
                      >
                        Cancel
                      </Button>
                    </Flex>
                  </Box>
                </form>
                : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{ /* Additional styling for the centered content */ }}>
                  Your application has been submitted.
                </div>
              </div>}
              </Box>
            </Container>

          </>
        )}
      </Box >
    </>
  );
};

export default VolunteerApplication;
