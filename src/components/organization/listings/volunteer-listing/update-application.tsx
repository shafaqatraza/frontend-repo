import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Container, Modal } from "react-bootstrap";
import { Image, Input, Textarea } from "@chakra-ui/react";
import trash from "../../../../assets/imgs/trash.png";
import plus from "../../../../assets/imgs/plus.png";
import cros from "../../../../assets/imgs/cros.png";
import plustwo from "../../../../assets/imgs/plustwo.png";
import axios from "axios";
import { accessToken, baseUrl, currOrgSlug } from "../../../../components/Helper/index";
import { Select } from "antd";
import { useToast } from '@chakra-ui/toast'
import { useRouter } from 'next/router'


interface Props {
  name: string;
  age: number;
}
interface AvailabilityState {
  [day: string]: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
  };
}
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

interface Option {
  id: number;
  option: string;
  type: 'new' | 'old';
  is_deleted: boolean;
}

const CreateApplication = (props: Props) => {
  const [dataArray, setDataArray] = useState([]);
  const [volundata, setVolunData] = useState([]);
  const [applicationQuestions, setApplicationQuestions] = useState([{
    question_type_id: 0
  }]);
  const [successMessage, setSuccessMessage] = useState("");
  const [applicationFormId, setApplicationFormId] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const toast = useToast()
  const router = useRouter()
  if (!router) {
    return null;
  }

  const { slug } = router.query;

  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleShowSuccess = () => setShowSuccess(true);


  const [showCard, setShowcard] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleButtonClick = () => {
    setShowcard(!showCard);
    setSelectedButton(null);
  };
// ===============================================================================================
  
  const [questions, setQuestions] = useState<{ id: string; type: string; is_deleted:boolean, type_id:number; html: JSX.Element }[]>([]);

  const [availability, setAvailability] = useState<AvailabilityState>({
    Monday: { morning: false, afternoon: false, evening: false },
    Tuesday: { morning: false, afternoon: false, evening: false },
    Wednesday: { morning: false, afternoon: false, evening: false },
    Thursday: { morning: false, afternoon: false, evening: false },
    Friday: { morning: false, afternoon: false, evening: false },
    Saturday: { morning: false, afternoon: false, evening: false },
    Sunday: { morning: false, afternoon: false, evening: false },
  });
  const [questionErrors, setQuestionErrors] = useState<{ [key: string]: boolean }>({});
  const [previousQuestions, setPreviousQuestions] = useState<{ id: string; question: any }[]>([]);
  

  
  
  const handleInputChange = (id: string, value: string) => { 
    if(id.includes("conditional")){
      let splitString  = id.split("conditional-");
      id = splitString[1];
      setPreviousQuestions((prevQuestions) => ({
        ...prevQuestions,
        [id]: { // @ts-ignore: Unreachable code error
          ...prevQuestions[id], 
          conditional_question: value,
        },
      }));

      setQuestionErrors((prevErrors) => ({
        ...prevErrors,
        [`conditional-${id}`]: false, // Reset the error state for the specific question ID
      }));
    }else if(id.includes("option")){ 
      let splitString  = id.split("-option-");
      id = splitString[0];
      let optionIndex = splitString[1];
  
      setPreviousQuestions((prevQuestions) => {  // @ts-ignore: Unreachable code error
        const questionToUpdate = prevQuestions[id]; 
        if (!questionToUpdate) {
          return prevQuestions; // Question with the given ID not found, return the original state
        }
    
        // Create a new copy of the options array
        const updatedOptions = [...questionToUpdate.options]; // @ts-ignore: Unreachable code error
        updatedOptions[optionIndex] = { // @ts-ignore: Unreachable code error
          ...updatedOptions[optionIndex],
          option: value,
        };
    
        // Create a new copy of the question with the updated options
        const updatedQuestion = {
          ...questionToUpdate,
          options: updatedOptions,
        };
    
        // Create a new copy of the previousQuestions state with the updated question
        const updatedQuestions = {
          ...prevQuestions,
          [id]: updatedQuestion,
        };
    
        return updatedQuestions;
      });
      
      setQuestionErrors((prevErrors) => ({
        ...prevErrors,
        [`${id}-option-${optionIndex}`]: false, // Reset the error state for the specific question ID
      }));
    }else {
      setPreviousQuestions((prevQuestions) => ({
        ...prevQuestions,
        [id]: { // @ts-ignore: Unreachable code error
          ...prevQuestions[id],
          question: value,
        },
      }));

      setQuestionErrors((prevErrors) => ({
        ...prevErrors,
        [id]: false, // Reset the error state for the specific question ID
      }));
    }

  };

  const handleRequiredChange = (id: string, value:boolean) => {
    setPreviousQuestions((prevQuestions) => ({
      ...prevQuestions,
      [id]: { // @ts-ignore: Unreachable code error
        ...prevQuestions[id],
        is_required: value,
      },
    }));
  };
  
  useEffect(() => {
    // Get application-form data for specific listing.
    axios
      .get(`${baseUrl}/application-form/show/${slug}?org=${currOrgSlug}`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setApplicationQuestions(res.data.data)
        setApplicationFormId(res.data.application_form_id)
        setTotalApplications(res.data.applications)  
      })
      .catch((err) => {
      });
  }, [currOrgSlug, slug]);

  const handleAddOption = (id: string, previousQuestions: any) => {  // @ts-ignore: Unreachable code error
    // First, filter the options to get only non-deleted options
  const nonDeletedOptions = previousQuestions[id]?.options.filter( // @ts-ignore: Unreachable code error
    (option) => !option.is_deleted
  );

  // Get the length of the filtered array
  const nonDeletedOptionsLength = nonDeletedOptions.length;

    if (nonDeletedOptionsLength < 4) { 
      setPreviousQuestions((prevQuestions) => { // @ts-ignore: Unreachable code error
        const questionToUpdate = prevQuestions[id];
        if (!questionToUpdate) {
          return prevQuestions; // Question with the given ID not found, return the original state
        }
    
        // Create a new copy of the options array and add the new option
        const updatedOptions = [...questionToUpdate.options, { id: 0, option: "", type: "new", is_deleted:false }];
    
        // Create a new copy of the question with the updated options
        const updatedQuestion = {
          ...questionToUpdate,
          options: updatedOptions,
        };
    
        // Create a new copy of the previousQuestions state with the updated question
        const updatedQuestions = {
          ...prevQuestions,
          [id]: updatedQuestion,
        };
    
        return updatedQuestions;
      });
    }
  };

  
  const handleRemoveOption = (id: string, optionIndex: number, previousQuestions: []) => { // @ts-ignore: Unreachable code error
    
    setPreviousQuestions((prevQuestions) => { // @ts-ignore: Unreachable code error
      const questionToUpdate = prevQuestions[id];
      if (!questionToUpdate) {
        return prevQuestions; // Question with the given ID not found, return the original state
      }
      // @ts-ignore: Unreachable code error
      const options = questionToUpdate.options.map((option, index) => {
        if (index === optionIndex) {
          // Check the type of the option
          if (option.type === "old") {
            // If the type is 'old', set is_deleted to true
            return { ...option, is_deleted: true };
          } else {
            // If the type is 'new', remove the option from the options array
            return null;
          }
        }
        return option;
      }).filter(Boolean); // Remove null values from the array (options of type 'new')
  
      // Create a new copy of the question with the updated options
      const updatedQuestion = {
        ...questionToUpdate,
        options: options,
      };
  
      // Create a new copy of the previousQuestions state with the updated question
      const updatedQuestions = {
        ...prevQuestions,
        [id]: updatedQuestion,
      };
  
      return updatedQuestions;
    });
  };
  
  const handleDeleteComponent = (id: string) => {

    setPreviousQuestions((prevQuestions) => { // @ts-ignore: Unreachable code error
      const questionToDelete = prevQuestions[id];
      if (!questionToDelete) {
        return prevQuestions; // Question with the given ID not found, return the original state
      }
  
      // If is_new is true, remove the question from the previousQuestions array
      if (questionToDelete.is_new) { 
        const updatedQuestions = { ...prevQuestions }; 
        // @ts-ignore: Unreachable code error
        delete updatedQuestions[id];
        return updatedQuestions;
      }
  
      // If is_new is false, update is_deleted to true for the question
      return {
        ...prevQuestions,
        [id]: {
          ...questionToDelete,
          is_deleted: true,
        },
      };
    });

    setQuestions((prevQuestions) => {
      const updatedQuestions = prevQuestions.map((question) =>
        question.id === id ? { ...question, is_deleted: true } : question
      );
      return updatedQuestions;
    });
  };
  
  const handleResetForm = () => {
    setQuestions([]);
    setQuestionErrors({});
     // @ts-ignore: Unreachable code error 
    setPreviousQuestions((prevQuestions) => { 
      const updatedQuestions = {};
  
      for (const key in prevQuestions) {
        const question = prevQuestions[key]; 
        // @ts-ignore: Unreachable code error
        if (question.is_new) {
          // If is_new is true, skip the question (remove from previousQuestions)
          continue;
        }
  
        // If is_new is false, update is_deleted to true
        // @ts-ignore: Unreachable code error
        updatedQuestions[key] = {
          ...question,
          is_deleted: true,
        };
      }
  
      return updatedQuestions;
    });
      
  }

// ===============================================================================================
  const shortQuestionHTML = (id: string, questionErrors: any, previousQuestions: any) => {
  return (
    <Row key={id}>
      <Col md={12}>
        <div className="card shadow p-4 mt-3">
          <p className="listing-txt">Question</p>
          <div>
            <Input
              style={{ backgroundColor: "#E8E8E8" }}
              type="text"
              className={`form-control mt-2 ${questionErrors[id] ? 'input-error' : ''}`}
              id={id}
              placeholder="Question"
              value={previousQuestions[id]?.question}
              required
              onChange={(e) => handleInputChange(id, e.target.value)}
            />
            {// @ts-ignore: Unreachable code error
            questionErrors[id] && <p className="error-message">Please fill out the field.</p>}
          </div>
          <div className="form-check form-switch d-flex justify-content-end mt-3">
            <input
              className="form-check-input me-3 mt-2"
              type="checkbox"
              checked={previousQuestions[id]?.is_required == 1 ? true: false}
              onChange={(e) => handleRequiredChange(id, e.target.checked)}
              id={`is_required-${id}`}
            />
            <label className="form-label me-3 mt-1">Required</label>
            <span className="mt-1 index" onClick={() => handleDeleteComponent(id)}>
              <Image src={trash.src} />
            </span>
          </div>
        </div>
      </Col>
    </Row>
  );
  };

  const checkboxAndRadioQuestionHTML = (id: string, type_id: number, questionErrors: any, previousQuestions: any) => {
    return (
      <Row> 
        <Col md={12}>
          <div className="card shadow p-4 mt-3">
          <p className="listing-txt">Question</p>
            <Input
              style={{ backgroundColor: "#E8E8E8" }}
              type="text"
              className={`form-control mt-2 ${questionErrors[id] ? 'input-error' : ''}`}
              id={id}
              value={previousQuestions[id]?.question}
              placeholder="Question" // @ts-ignore: Unreachable code error
              onChange={(e) => handleInputChange(id, e.target.value)}
            />
            {// @ts-ignore: Unreachable code error
            questionErrors[id] && <p className="error-message">Please fill out the field.</p>}
            {// @ts-ignore: Unreachable code error
            previousQuestions[id] && // @ts-ignore: Unreachable code error
            previousQuestions[id].options.reduce((acc, option, index) => {
              if (!option.is_deleted) {
                acc.push(
                <div key={index}>
                  <div className="d-flex align-items-center mt-3">
                    <input
                      className="mt-1"
                      style={{ height: "18px", width: "18px" }}
                      type={type_id == 2? "checkbox": "radio"}
                      disabled
                    />
                    <input
                      id={`option-${index}`}
                      type="text"
                      value={option.option}
                      style={{ width: "80%" }}
                      className={`border-bottom-input ms-3 mt-1 ${// @ts-ignore: Unreachable code error
                        questionErrors[`${id}-option-${index}`] ? 'option-error' : ''}`}
                      placeholder={`Option ${index+1}`}
                      onChange={(event) => {
                        // handleOptionChange(id, index, event.target.value, options)
                        handleInputChange(`${id}-option-${index}`, event.target.value);
                      }}
                      required
                    />
                    <Image
                      className="ms-2 mt-2"
                      src={cros.src}
                      onClick={() => handleRemoveOption(id, index, previousQuestions)}
                    />
                  </div>
                </div>
                );
              }
              return acc;
              }, [])
            }
            <div className="mt-2 mb-2">
              <Image src={plus.src} onClick={() => handleAddOption(id, previousQuestions)} />
            </div>
            <div className="form-check form-switch d-flex justify-content-end mt-3">
              <input
                className="form-check-input me-3 mt-2"
                type="checkbox"
                checked={previousQuestions[id]?.is_required ==1 ? true: false}
                onChange={(e) => handleRequiredChange(id, e.target.checked)}
                id={`is_required-${id}`}
              />
              <label className="form-label me-3 mt-1">Required</label>
              <span className="mt-1 index" onClick={() => handleDeleteComponent(id)}>
                <Image src={trash.src} />
              </span>
            </div>
          </div>
        </Col>
      </Row>
    );
  };
  
  const conditionalQuestionHTML = (id: string, questionErrors: [], previousQuestions: any) => {
  
    return (
      <Row> 
        <Col md={12}>
          <div className="card shadow p-4 mt-3">
          <p className="listing-txt">Question</p>
            <Input
              style={{ backgroundColor: "#E8E8E8" }}
              type="text" // @ts-ignore: Unreachable code error
              className={`form-control mt-2 ${questionErrors[id] ? 'input-error' : ''}`}
              id={id}
              placeholder="Question"
              value={previousQuestions[id]?.question}
              onChange={(e) => handleInputChange(id, e.target.value)}
            /> 
            {// @ts-ignore: Unreachable code error
            questionErrors[id] && <p className="error-message">Please fill out the field.</p>}
            {// @ts-ignore: Unreachable code error
            previousQuestions[id] && // @ts-ignore: Unreachable code error
            previousQuestions[id].options.reduce((acc, option, index) => {
              if (!option.is_deleted) {
                acc.push(
                <div key={index}>
                  <div className="d-flex align-items-center mt-3">
                    <input
                      className="mt-1"
                      style={{ height: "18px", width: "18px" }}
                      type="radio"
                      disabled
                    />
                    <input
                      id={`option-${index}`}
                      type="text"
                      value={option.option}
                      style={{ width: "80%" }}
                      className={`border-bottom-input ms-3 mt-1 ${// @ts-ignore: Unreachable code error
                        questionErrors[`${id}-option-${index}`] ? 'option-error' : ''}`}
                      placeholder={`Option ${index+1}`}
                      onChange={(event) => {
                        handleInputChange(`${id}-option-${index}`, event.target.value);
                      }}
                      required
                    />
                    {/* <Image
                      className="ms-2 mt-2"
                      src={cros.src}
                      onClick={() => handleRemoveOption(id, index, options)}
                    /> */}
                  </div>
                </div>
                );
              }
              return acc;
              }, [])
            }
            {/* <div className="mt-2 mb-2">
              <Image src={plus.src} onClick={() => handleAddOption(id, options)} />
            </div> */}
            <Input
              style={{ backgroundColor: "#E8E8E8" }}
              type="text"
              className={`form-control mt-4 ${// @ts-ignore: Unreachable code error
                questionErrors[`conditional-${id}`] ? 'input-error' : ''}`}
              id={`conditional-${id}`}
              placeholder="Conditional Question"
              value={previousQuestions[id]?.conditional_question}
              onChange={(e) => handleInputChange(`conditional-${id}`, e.target.value)}
            />
            {// @ts-ignore: Unreachable code error
            questionErrors[`conditional-${id}`] && <p className="error-message">Please fill out the field.</p>}
            <div className="form-check form-switch d-flex justify-content-end mt-3">
              <input
                className="form-check-input me-3 mt-2"
                type="checkbox"
                checked={previousQuestions[id]?.is_required == 1 ? true: false}
                onChange={(e) => handleRequiredChange(id, e.target.checked)}
                id={`is_required-${id}`}
              />
              <label className="form-label me-3 mt-1">Required</label>
              <span className="mt-1 index" onClick={() => handleDeleteComponent(id)}>
                <Image src={trash.src} />
              </span>
            </div>
          </div>
        </Col>
      </Row>
    );
  };

  const askAvailabilityHTML = (id: string, previousQuestions: any) => {
    return (
      <Row>
        <Col md={12}>
          <p className="listing-txt mt-2">Availability</p>
          <div className="card shadow p-4 mt-3">
            <p className="fw-bold">* I am available and agree to commit to:</p>
            {// @ts-ignore: Unreachable code error
            previousQuestions[id] && // @ts-ignore: Unreachable code error
            previousQuestions[id].options.reduce((acc, option, index) => {
              if (!option.is_deleted) {
                acc.push(
                <div key={index}>
                  <div className="d-flex align-items-center mt-3">
                    
                    <input
                      className="mr-2"
                      style={{ height: "18px", width: "18px" }}
                      type="radio"
                      disabled
                    />
                    <span style={// @ts-ignore: Unreachable code error
                      {"font-size": "16px"} }>{option.option}</span>
                  </div>
                </div>
                );
              }
              return acc;
              }, [])
            }
            <div className="form-check form-switch d-flex justify-content-end mt-3">
            <input
              className="form-check-input me-3 mt-2"
              type="checkbox"
              checked={previousQuestions[id]?.is_required == 1 ? true: false}
              onChange={(e) => handleRequiredChange(id, e.target.checked)}
              id={`is_required-${id}`}
            />
            <label className="form-label me-3 mt-1">Required</label>
            <span className="mt-1 index" onClick={() => handleDeleteComponent(id)}>
              <Image src={trash.src} />
            </span>
          </div>
          </div>
          <div className="card shadow p-4 mt-3">
            <div>
              <p className="fw-bold fs-5">Date I am available to start</p>
            </div>
            <div className="col-md-10">
              <Input
                style={{ backgroundColor: "#E8E8E8", height: "50px" }}
                type="date"
                className="form-control mt-2"
                placeholder="Begin Typing Here"
                disabled
              />
            </div>
            <div>
              <p className="fw-bold fs-5 mt-2">*Availability to</p>
            </div>
            <div className="mt-4">
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
                      <td> <input type="checkbox" checked={times.morning} disabled /></td>
                      <td> <input type="checkbox" checked={times.afternoon} disabled /></td>
                      <td className="ms-5"> <input type="checkbox" checked={times.evening} disabled /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Col>
      </Row>  
    );
  };

  const workExperienceHTML = (id: string, questionErrors: [], previousQuestions: any) => {
    return(
      <>
      <Row>
        <Col md={12}>
          <p className="listing-txt mt-4">Previous Work or Volunteer Experience</p>
          <div className="card shadow p-4 mt-4 mb-4">
            <div className="row">
              <div className="col-md-6">
                <p className="fw-bold">* Do you have experience working with</p>
              </div>
              <div className="col-md-6">
                <Input 
                  type="text" 
                  style={{ backgroundColor: "#E8E8E8" }} 
                  placeholder="Begin Typing here" 
                  id={id} // @ts-ignore: Unreachable code error
                  value={previousQuestions[id]?.question} // @ts-ignore: Unreachable code error
                  className={`${questionErrors[id] ? 'input-error' : ''}`}
                  onChange={(e) => handleInputChange(id, e.target.value)}
                />
              </div>
              {// @ts-ignore: Unreachable code error
              questionErrors[id] && <p className="error-message">Please fill out the field.</p>}
            </div>
            
            {// @ts-ignore: Unreachable code error
             previousQuestions[id] && // @ts-ignore: Unreachable code error
             previousQuestions[id].options.reduce((acc, option, index) => {
               if (!option.is_deleted) {
                 acc.push(
                <div key={index}>
                  <div className="d-flex align-items-center mt-3">
                    
                    <input
                      className="mr-2"
                      style={{ height: "18px", width: "18px" }}
                      type="radio"
                      disabled
                    />
                    <span style={// @ts-ignore: Unreachable code error
                      {"font-size": "16px"} }>{option.option}</span>
                  </div>
                </div>
                );
              }
              return acc;
              }, [])
            }
            <div className="form-check form-switch d-flex justify-content-end mt-3">
            <input
              className="form-check-input me-3 mt-2"
              type="checkbox"
              checked={previousQuestions[id]?.is_required == 1 ? true: false}
              onChange={(e) => handleRequiredChange(id, e.target.checked)}
              id={`is_required-${id}`}
            />
            <label className="form-label me-3 mt-1">Required</label>
            <span className="mt-1 index" onClick={() => handleDeleteComponent(id)}>
              <Image src={trash.src} />
            </span>
          </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className="card shadow pt-4">
            <p className="listing-txt ms-4">Prior Work Experience</p>
            <div className="d-flex">
              <div className="col-md-10 ps-4 pt-2">
                <textarea
                  style={{ backgroundColor: "#E8E8E8" }}
                  rows={4}
                  className="form-control mt-2"
                  id="phone-number"
                  placeholder="Please indicate workplace and duties"
                  disabled
                />
              </div>
            </div>
            <div className="p-4">
              <Image src={plus.src} color={"gray"}/>
            </div>
          </div>
        </Col>
      </Row>
      </>
    );
  };

  const askVaccinationHTML = (id: string, questionErrors: [], previousQuestions: any) => {
    return(
      <>
      <Row>
        <Col md={12}>
          <div className="card shadow pt-4 p-4 mt-4">
          <p className="fw-bold">* Are you fully vacination against COVID-19 (2 doses)</p>
            <div className="checkbox-container d-flex flex-column mt-3 ms-3">
            {// @ts-ignore: Unreachable code error
            previousQuestions[id] && // @ts-ignore: Unreachable code error
            previousQuestions[id].options.reduce((acc, option, index) => {
              if (!option.is_deleted) {
                acc.push(
                <div key={index}>
                  <div className="d-flex align-items-center mt-3">
                    
                    <input
                      className="mr-2"
                      style={{ height: "18px", width: "18px" }}
                      type="radio"
                      disabled
                    />
                    <span style={// @ts-ignore: Unreachable code error
                      {"font-size": "16px"} }>{option.option}</span>
                  </div>
                </div>
                );
              }
              return acc;
              }, [])
            }
            </div>
            <div className="form-check form-switch d-flex justify-content-end mt-3">
            <input
              className="form-check-input me-3 mt-2"
              type="checkbox"
              checked={previousQuestions[id]?.is_required == 1 ? true: false}
              onChange={(e) => handleRequiredChange(id, e.target.checked)}
              id={`is_required-${id}`}
            />
            <label className="form-label me-3 mt-1">Required</label>
            <span className="mt-1 index" onClick={() => handleDeleteComponent(id)}>
              <Image src={trash.src} />
            </span>
          </div>
          </div>
        </Col>
      </Row>
      </>
    );
  };
  
// ===============================================================================================

const handleAddQuestion = (type: string, question_length: number, is_new:boolean) => {
  const id = 'question-' + question_length;
  let newQuestion: JSX.Element;
  let type_id: number;

  // Check if the question type is AskAvailability or WorkExperience
  if (type === 'AskAvailability' || type === 'WorkExperience') {
    // Check if the question already exists in the questions array
    const exists = questions.some((question) => question.type === type && !question.is_deleted);
    if (exists) {
      toast({ position: "top", title: `You cannot add ${type === 'AskAvailability' ? '(Ask Availability)' : '(Work Experience)'} more than once.`, status: "warning" });
      return;
    }
  }
  // Define the newComponent object
  const newComponent: { [key: string]: Question } = {
    [id]: {
      is_deleted: false,
      is_required: false,
      is_new: is_new,
      question_id: 0,
      question_type_id: 0,
      question: "",
    },
  };

  switch (type) {
    case 'ShortQuestion':
      type_id = 1; // @ts-ignore: Unreachable code error
      newQuestion = (questionErrors, previousQuestions) => shortQuestionHTML(id, questionErrors, previousQuestions);
      newComponent[id].question_type_id = type_id;
      break;
    case 'CheckboxQuestion':
      type_id = 2; // @ts-ignore: Unreachable code error
      newQuestion = (questionErrors, previousQuestions) => checkboxAndRadioQuestionHTML(id, type_id, questionErrors, previousQuestions);
      newComponent[id].question_type_id = type_id;
      newComponent[id].options = [
        { id: 0, option: '', type: 'new', is_deleted: false },
        { id: 0, option: '', type: 'new', is_deleted: false },
      ];
      break;
    case 'RadioButtonQuestion':
      type_id = 3; // @ts-ignore: Unreachable code error
      newQuestion = (questionErrors, previousQuestions) => checkboxAndRadioQuestionHTML(id, type_id, questionErrors, previousQuestions);
      newComponent[id].question_type_id = type_id;
      newComponent[id].options = [
        { id: 0, option: '', type: 'new', is_deleted: false },
        { id: 0, option: '', type: 'new', is_deleted: false },
      ];
      break;
    case 'ConditionalQuestion':
      type_id = 4; // @ts-ignore: Unreachable code error
      newQuestion = (questionErrors, previousQuestions) => conditionalQuestionHTML(id, questionErrors, previousQuestions);
      newComponent[id].question_type_id = type_id;
      newComponent[id].conditional_question = "";

      newComponent[id].options = [
        { id: 0, option: '', type: 'new', is_deleted: false },
        { id: 0, option: '', type: 'new', is_deleted: false },
      ];
      break;
    case 'AskAvailability':
      type_id = 5; // @ts-ignore: Unreachable code error
      newQuestion = (previousQuestions) => askAvailabilityHTML(id, previousQuestions);
      newComponent[id].question_type_id = type_id;
      newComponent[id].options = [
        { id: 0, option: 'Yes', type: 'new', is_deleted: false },
        { id: 0, option: 'No', type: 'new', is_deleted: false },
      ];
      break;
    case 'WorkExperience':
      type_id = 6; // @ts-ignore: Unreachable code error
      newQuestion = (questionErrors, previousQuestions) => workExperienceHTML(id, questionErrors, previousQuestions);
      newComponent[id].question_type_id = type_id;
      newComponent[id].options = [
        { id: 0, option: 'Yes', type: 'new', is_deleted: false },
        { id: 0, option: 'No', type: 'new', is_deleted: false },
      ];
      break;
    case 'AskVaccination':
      type_id = 7; // @ts-ignore: Unreachable code error
      newQuestion = (questionErrors, previousQuestions) => askVaccinationHTML(id, questionErrors, previousQuestions);
      newComponent[id].question_type_id = type_id;
      newComponent[id].question = 'Are you fully vacination against COVID-19 (2 doses)';
      newComponent[id].options = [
        { id: 0, option: 'Yes', type: 'new', is_deleted: false },
        { id: 0, option: 'No', type: 'new', is_deleted: false },
      ];
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

  if(is_new){
    //Add the new component to the previousQuestions array
    setPreviousQuestions((prevQuestions) => ({
      ...prevQuestions,
      ...newComponent,
    }));
  }

  setQuestions((prevQuestions) => [...prevQuestions, question]);
};


  const handleSubmit = (event: any) => { 
    event.preventDefault();
    let hasErrors = false; // Validate the form and set error states for questions with empty values

    // Iterate over each question
    Object.keys(previousQuestions).forEach((questionId) => { // @ts-ignore: Unreachable code error
      const question = previousQuestions[questionId];
      if (question.question_type_id === 1) { 

        if (!question.question) {
          setQuestionErrors((prevErrors) => ({
            ...prevErrors,
            [questionId]: true, // Set the error state for the specific question ID
          }));
          hasErrors = true;
        }
      }else if (question.question_type_id === 2 || question.question_type_id === 3) { 
    
        if (!question.question) {
          setQuestionErrors((prevErrors) => ({
            ...prevErrors,
            [questionId]: true, // Set the error state for the specific question ID
          }));
          hasErrors = true;
        }

        const optionsArr = question.options? question.options : [];
        // @ts-ignore: Unreachable code error
        optionsArr.forEach((option, optIndex) => {
          if (!option.option) {
            setQuestionErrors((prevErrors) => ({
              ...prevErrors,
              [`${questionId}-option-${optIndex}`]: true, 
            }));
            hasErrors = true;
          }
        });

      }else if (question.question_type_id === 4) {

        if (!question.question) {
          setQuestionErrors((prevErrors) => ({
            ...prevErrors,
            [questionId]: true, // Set the error state for the specific question ID
          }));
          hasErrors = true;
        }

        if (!question.conditional_question) {
          setQuestionErrors((prevErrors) => ({
            ...prevErrors,
            [`conditional-${questionId}`]: true, // Set the error state for the specific question ID
          }));
          hasErrors = true;
        }

        // @ts-ignore: Unreachable code error
        const optionsArr = question.options? question.options : [];
        // @ts-ignore: Unreachable code error
        optionsArr.forEach((option, optIndex) => {
          if (!option.option) {
            setQuestionErrors((prevErrors) => ({
              ...prevErrors,
              [`${questionId}-option-${optIndex}`]: true, 
            }));
            hasErrors = true;
          }
        });

      }else if (question.question_type_id === 5 || question.question_type_id === 6) { 
          if (!question.question) {
            setQuestionErrors((prevErrors) => ({
              ...prevErrors,
              [questionId]: true, // Set the error state for the specific question ID
            }));
            hasErrors = true;
          }

        const optionsArr = question.options? question.options : [];
        // @ts-ignore: Unreachable code error
        optionsArr.forEach((option, optIndex) => {
          if (!option.option) {
            setQuestionErrors((prevErrors) => ({
              ...prevErrors,
              [`${questionId}-option-${optIndex}`]: true, 
            }));
            hasErrors = true;
          }
        });
      }
    });

    // If there are errors, prevent form submission
    if (hasErrors) {
      toast({ position: "top", title: 'Please fill out the complete form.', status: "warning" })
      return;
    }

    const formData = {
      listing_id: slug,
      data: previousQuestions
    }

    axios
      .post(`${baseUrl}/application-form/update/${applicationFormId}?org=${currOrgSlug}`, formData, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          // 'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
      .then((response) => {
        // setSuccessMessage(response.data.message);
        // setShowSuccess(true);
        toast({ position: "top", title: response.data.message, status: "success" })
        // router.push('/organization/listings');
      })
      .catch((error) => { 
        // Handle error here
        // toast({ position: "top", title: "Something went wrong, please try again.", status: "error" })
      });

  };
  
  useEffect(() => {
	
      if(applicationQuestions.length > 0){ 
			setQuestions([]); 
			setQuestionErrors({});
      
			applicationQuestions.forEach((question, index) => {
        let id = index+1;
        let key = 'question-'+id;
				let type = question.question_type_id;
        setPreviousQuestions((prevQuestions) => ({ 
          ...prevQuestions,  
          [key]: {
            ...question,
            is_deleted: false,
            is_new: false,
          },
        }));

				if(type === 1){
					handleAddQuestion("ShortQuestion", id, false)
				}else if(type === 2){
					handleAddQuestion("CheckboxQuestion", id, false)
				}else if(type === 3){
					handleAddQuestion("RadioButtonQuestion", id, false)
				}else if(type === 4){
					handleAddQuestion("ConditionalQuestion", id, false)
				}else if(type === 5){
					handleAddQuestion("AskAvailability", id, false)
				}else if(type === 6){
					handleAddQuestion("WorkExperience", id, false)
				}else if(type === 7){
					handleAddQuestion("AskVaccination", id, false)
				}
				
			});
			
      }
  }, [applicationQuestions])

  return (
    <>
      <Modal show={showSuccess} onHide={handleCloseSuccess} closeButton>
        <div className="p-3">
          <p className="modal-txt text-center p-5 mt-3">
            Application form Created Successfully
          </p>
        </div>
        <div className="d-flex justify-content-center pb-5">
          <button onClick={handleCloseSuccess} className="modal-btn">
            Got it
          </button>
        </div>
      </Modal>
      
      <Row>
        <Col md="6">
          <form onSubmit={handleSubmit}>
              {questions.map((question, index) => (
                <div key={question.id} className="component-container">
                
                {   !question.is_deleted && question.type === 'ShortQuestion' ? ( // @ts-ignore: Unreachable code error
                    question.html(questionErrors, previousQuestions)
                ) : !question.is_deleted &&  question.type === 'CheckboxQuestion' ? ( // @ts-ignore: Unreachable code error
                    question.html(questionErrors, previousQuestions)
                ) : !question.is_deleted &&  question.type === 'RadioButtonQuestion' ? ( // @ts-ignore: Unreachable code error
                    question.html(questionErrors, previousQuestions)
                ) : !question.is_deleted &&  question.type === 'ConditionalQuestion' ? ( // @ts-ignore: Unreachable code error
                    question.html(questionErrors, previousQuestions)
                ) : !question.is_deleted &&  question.type === 'AskAvailability' ? ( // @ts-ignore: Unreachable code error
                    question.html(previousQuestions)
                ) : !question.is_deleted &&  question.type === 'WorkExperience' ? ( // @ts-ignore: Unreachable code error
                  question.html(questionErrors, previousQuestions)
                ) : !question.is_deleted &&  question.type === 'AskVaccination' ? ( // @ts-ignore: Unreachable code error
                  question.html(questionErrors, previousQuestions)
                ) : null }
              </div>
              ))}
              {totalApplications == 0? (
                  <button
                    type="submit"
                    className="update-v-btn mb-5 mt-5 col-md-2 ms-3"
                    onClick={handleSubmit}
                    disabled={questions.length === 0}
                  >
                    Update
                  </button>
              ): (
                <div className="mb-10 mt-3">
                  <span>You can't update the the form.</span>
                </div>
              )}
              
          </form>
        </Col>
        <Col md="6">
          <Row>
            <Col md="12">
              <div className="d-flex justify-content-left col-md-8">
                <p className="listing-txt ms-3"></p>
                <button className="update-v-btn" onClick={handleResetForm}>Reset</button>
              </div>
            </Col>
            <Col md="12">
            <div className="d-flex">
              <div
                style={{ width: "27px", height: "117px" }}
                className="card shadow mt-3"
              >
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <Image src={plus.src} style={{ width: "16px", height: "16px" }} />
                </div>
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <Image
                    src={plustwo.src}
                    style={{ width: "16px", height: "16px" }}
                  />
                </div>
              </div>
              <div className="mt-3 col-md-8">
                <button
                  onClick={handleButtonClick}
                  className="add-question ms-3"
                  type="button"
                >
                  Add Question
                </button>
                {showCard && (
                  <div
                    style={{ width: "250px", height: "262px" }}
                    className="card ques-card shadow mt-2"
                  >
                    <button onClick={()=> handleAddQuestion("ShortQuestion", Object.keys(previousQuestions).length+1, true)} className="ques-card-button"> Short Question </button>
                    <button onClick={()=> handleAddQuestion("CheckboxQuestion", Object.keys(previousQuestions).length+1, true)} className="ques-card-button" > Checkbox Question </button>
                    <button onClick={()=> handleAddQuestion("RadioButtonQuestion", Object.keys(previousQuestions).length+1, true)} className="ques-card-button"> Radio Button Question</button>
                    <button onClick={()=> handleAddQuestion("ConditionalQuestion", Object.keys(previousQuestions).length+1, true)} className="ques-card-button">Conditional Question </button>
                    <button onClick={()=> handleAddQuestion("AskAvailability", Object.keys(previousQuestions).length+1, true)} className="ques-card-button"> Ask Availability </button>
                    <button onClick={()=> handleAddQuestion("WorkExperience", Object.keys(previousQuestions).length+1, true)} className="ques-card-button"> Work Experience </button>
                    <button onClick={()=> handleAddQuestion("AskVaccination", Object.keys(previousQuestions).length+1, true)} className="ques-card-button">Ask Vaccination </button>
                  </div>
                )}
              </div>
            </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default CreateApplication;
