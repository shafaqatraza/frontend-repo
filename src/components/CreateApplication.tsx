import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import Sidebar from "../components/Sidebar.jsx";
import { Row, Col, Container, Modal } from "react-bootstrap";
import { Image, Input, Textarea } from "@chakra-ui/react";
import trash from "../assets/imgs/trash.png";
import plus from "../assets/imgs/plus.png";
import cros from "../assets/imgs/cros.png";
import plustwo from "../assets/imgs/plustwo.png";
import CheckBox from "../components/CheckBox";
import RadioButtonQuestion from "../components/RadioButtonQuestion";
import ShortAnswer from "../components/ShortAnswer";
import Availability from "../components/Availability";
import AskExperience from "../components/AskExperience";
import axios from "axios";
import { accessToken, baseUrl } from "../components/Helper/index";
import { Select } from "antd";
import { useToast } from '@chakra-ui/toast'
import { useRouter } from 'next/router'

interface Option {
  label: string;
  value: string;
}
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

const CreateApplication = (props: Props) => {
  const [dataArray, setDataArray] = useState([]);
  const [organization, setOrganization] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [volundata, setVolunData] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const toast = useToast()
  const router = useRouter()

  // const [formData, setFormData] = useState({
  //   listing_id: null,
  //   tenant_module_id: 1,
  //   data: [],
  // });
  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleShowSuccess = () => setShowSuccess(true);
  const [isCreatingFrom, setIsCreatingFrom] = React.useState(false);
  

  const handleChildCheckbox = (childCheckbox: any) => {
    // @ts-ignore: Unreachable code error
    setDataArray((prevDataArray) => [
      ...prevDataArray,
      { type: "checkbox", value: childCheckbox },
    ]);
    // @ts-ignore: Unreachable code error
    setFormData((prevFormData) => {
      const updatedData = [...prevFormData.data, JSON.parse(childCheckbox)];
      return { ...prevFormData, data: updatedData };
    });
  };
  const [showCard, setShowcard] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [selectedComponents, setSelectedComponents] = useState<JSX.Element[]>(
    []
  );

  const handleButtonClick = () => {
    setShowcard(!showCard);
    setSelectedButton(null);
  };
// ===============================================================================================

  const [questions, setQuestions] = useState<{ id: string; type: string; type_id:number; html: JSX.Element }[]>([]);
  const [listingId, setListingId] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
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
  const handleInputChange = (id: string) => {
    setQuestionErrors((prevErrors) => ({
      ...prevErrors,
      [id]: false, // Reset the error state for the specific question ID
    }));
  };
console.log('questions', questions)
console.log('questionErrors', questionErrors)
  const handleSelectChange = (value: string) => {
    setListingId(value);
  };

  const handleAddOption = (id: string, options: Option[][]) => { // @ts-ignore: Unreachable code error
    if (options[id] && options[id].length < 10) {  
      setOptions((prevOptions) => {
        // Get the existing options array for the specific question ID, or initialize an empty array
        // @ts-ignore: Unreachable code error
        const questionOptions = prevOptions[id] || []; 
        const newOption = { label: `Option ${questionOptions.length + 1}`, value: "" };
    
        // Create a new options object with the updated options array for the specific question ID
        const updatedOptions = {
          ...prevOptions,
          [id]: [...questionOptions, newOption],
        };
    
        return updatedOptions;
      });
    }
  };
  
  const handleOptionChange = (id: string, index: number, value: string, options: Option[][]) => { // @ts-ignore: Unreachable code error
    if (options[id]) { 
      setOptions((prevOptions) => { // @ts-ignore: Unreachable code error
        const questionOptions = prevOptions[id] || []; 
        // @ts-ignore: Unreachable code error
        const updatedQuestionOptions = questionOptions.map((option, optionIndex) => { 
          if (optionIndex === index) {
            return { ...option, value: value };
          }
          return option;
        });
        const updatedOptions = {
          ...prevOptions,
          [id]: updatedQuestionOptions,
        };
        return updatedOptions;
      });
    }
  };
  
  const handleRemoveOption = (id: string, index: number, options: []) => { // @ts-ignore: Unreachable code error
    if (options[id] && options[id].length > 2) {
      const updatedOptions = {
        ...options, // @ts-ignore: Unreachable code error
        [id]: options[id].filter((option, i) => i !== index)
      };
      setOptions(updatedOptions);
    }
  };
  
  const handleDeleteComponent = (id: string) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = prevQuestions.filter((question) => question.id !== id);
      return updatedQuestions;
    });
  };
  
  const handleResetForm = () => {
    setQuestions([]);
    setOptions([]);
    setQuestionErrors({});
  }

// ===============================================================================================
  const shortQuestionHTML = (id: string, questionErrors: []) => {
  return (
    <Row key={id}>
      <Col md={12}>
        <div className="card shadow p-4 mt-3">
          <p className="listing-txt">Question</p>
          <div>
            <Input
              style={{ backgroundColor: "#E8E8E8" }}
              type="tel"
              className={`form-control mt-2 ${ // @ts-ignore: Unreachable code error
                questionErrors[id] ? 'input-error' : ''}`}
              id={id}
              placeholder="Question"
              required
              onChange={(e) => handleInputChange(id)}
            />
            {// @ts-ignore: Unreachable code error
            questionErrors[id] && <p className="error-message">Please fill out the field.</p>}
          </div>
          <div className="form-check form-switch d-flex justify-content-end mt-3">
            <input
              className="form-check-input me-3 mt-2"
              type="checkbox"
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

  const checkboxAndRadioQuestionHTML = (id: string, type_id: number, options: [], questionErrors: []) => {
    return (
      <Row> 
        <Col md={12}>
          <div className="card shadow p-4 mt-3">
          <p className="listing-txt">Question</p>
            <Input
              style={{ backgroundColor: "#E8E8E8" }}
              type="tel"
              className={`form-control mt-2 ${// @ts-ignore: Unreachable code error
                questionErrors[id] ? 'input-error' : ''}`}
              id={id}
              placeholder="Question" // @ts-ignore: Unreachable code error
              onChange={(e) => handleInputChange(id, e.target.value)}
            />
            {// @ts-ignore: Unreachable code error
            questionErrors[id] && <p className="error-message">Please fill out the field.</p>}
            {// @ts-ignore: Unreachable code error
            options[id] &&
            // @ts-ignore: Unreachable code error
              options[id].map((option, index) => (
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
                      value={option.value}
                      style={{ width: "80%" }}
                      className={`border-bottom-input ms-3 mt-1 ${// @ts-ignore: Unreachable code error
                        questionErrors[`${id}-option-${index}`] ? 'option-error' : ''}`}
                      placeholder={`Option ${index+1}`}
                      onChange={(event) => {
                        handleOptionChange(id, index, event.target.value, options)
                        handleInputChange(`${id}-option-${index}`);
                        
                      }}
                      required
                    />
                    <Image
                      className="ms-2 mt-2"
                      src={cros.src}
                      onClick={() => handleRemoveOption(id, index, options)}
                    />
                  </div>
                </div>
              ))}
            <div className="mt-2 mb-2">
              <Image src={plus.src} onClick={() => handleAddOption(id, options)} />
            </div>
            <div className="form-check form-switch d-flex justify-content-end mt-3">
              <input
                className="form-check-input me-3 mt-2"
                type="checkbox"
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
  
  const conditionalQuestionHTML = (id: string, options: [], questionErrors: []) => {
  
    return (
      <Row> 
        <Col md={12}>
          <div className="card shadow p-4 mt-3">
          <p className="listing-txt">Question</p>
            <Input
              style={{ backgroundColor: "#E8E8E8" }}
              type="text"
              className={`form-control mt-2 ${ // @ts-ignore: Unreachable code error
                questionErrors[id] ? 'input-error' : ''}`}
              id={id}
              placeholder="Question"
              onChange={(e) => handleInputChange(id)}
            />
            {// @ts-ignore: Unreachable code error
            questionErrors[id] && <p className="error-message">Please fill out the field.</p>}
            {// @ts-ignore: Unreachable code error
            options[id] &&
            // @ts-ignore: Unreachable code error
              options[id].map((option, index) => (
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
                      value={option.value}
                      style={{ width: "80%" }}
                      className={`border-bottom-input ms-3 mt-1 ${// @ts-ignore: Unreachable code error
                        questionErrors[`${id}-option-${index}`] ? 'option-error' : ''}`}
                      placeholder={`Option ${index+1}`}
                      onChange={(event) => {
                        handleOptionChange(id, index, event.target.value, options)
                        handleInputChange(`${id}-option-${index}`)
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
              ))}
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
              onChange={(e) => handleInputChange(`conditional-${id}`)}
            />
            {// @ts-ignore: Unreachable code error
            questionErrors[`conditional-${id}`] && <p className="error-message">Please fill out the field.</p>}
            <div className="form-check form-switch d-flex justify-content-end mt-3">
              <input
                className="form-check-input me-3 mt-2"
                type="checkbox"
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

  const askAvailabilityHTML = (id: string, options: [], questionErrors: []) => {
    return (
      <Row>
        <Col md={12}>
          <p className="listing-txt mt-2">Availability</p>
          <div className="card shadow p-4 mt-3">
            <div className="row">
              <div className="col-md-6">
                <p className="fw-bold">* I am available and agree to commit to:</p>
              </div>
              <div className="col-md-6">
                <Input 
                  type="text" 
                  style={{ backgroundColor: "#E8E8E8" }} 
                  placeholder="Begin Typing here" 
                  id={`ask-availability-${id}`}
                  // @ts-ignore:
                  className={`${questionErrors[`ask-availability-${id}`] ? 'input-error' : ''}`}
                  onChange={(e) => handleInputChange(`ask-availability-${id}`)}
                />
              </div>
              {// @ts-ignore:
              questionErrors[`ask-availability-${id}`] && <p className="error-message">Please fill out the field.</p>}
            </div>

            {// @ts-ignore: 
            options[id] &&
            // @ts-ignore: 
              options[id].map((option, index) => (
                <div key={index}>
                  <div className="d-flex align-items-center mt-3">
                    
                    <input
                      className="mr-2"
                      style={{ height: "18px", width: "18px" }}
                      type="radio"
                      disabled
                    />
                    <span style={// @ts-ignore: 
                      {"font-size": "16px"} }>{option.value}</span>
                  </div>
                </div>
              ))}
            <div className="form-check form-switch d-flex justify-content-end mt-3">
            <input
              className="form-check-input me-3 mt-2"
              type="checkbox"
              id={`is_required-${id}`}
              checked
              disabled
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
              <div className="row">
                <div className="col-md-6">
                  <label><b> Start Date </b></label>
                  <input
                    type="date"
                    className="form-control mt-2"
                    placeholder="Select Start Date"
                    style={{ height: "50px" }}
                   disabled
                  />
                </div>
                <div className="col-md-6">
                  <label><b> End Date </b></label>
                  <input
                    type="date"
                    className="form-control mt-2"
                    placeholder="Select End Date"
                    style={{ height: "50px" }}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="fw-bold fs-5 mt-2">*Availability to</p>
            </div>
            <form className="mt-4">
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
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={times.afternoon}
                          disabled
                        />
                      </td>
                      <td className="ms-5">
                        <input
                          type="checkbox"
                          checked={times.evening}
                          disabled
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
          </div>
        </Col>
      </Row>  
    );
  };

  const workExperienceHTML = (id: string, options: [], questionErrors: []) => {
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
                  id={`work-experience-${id}`}
                  // @ts-ignore: Unreachable code error
                  className={`${questionErrors[`work-experience-${id}`] ? 'input-error' : ''}`}
                  onChange={(e) => handleInputChange(`work-experience-${id}`)}
                />
              </div>
              
              {// @ts-ignore: Unreachable code error
              questionErrors[`work-experience-${id}`] && <p className="error-message">Please fill out the field.</p>}
            </div>
            
            {// @ts-ignore: Unreachable code error
            options[id] &&
            // @ts-ignore: Unreachable code error
              options[id].map((option, index) => (
                <div key={index}>
                  <div className="d-flex align-items-center mt-3">
                    
                    <input
                      className="mr-2"
                      style={{ height: "18px", width: "18px" }}
                      type="radio"
                      disabled
                    />
                    <span style={ // @ts-ignore: Unreachable code error
                      {"font-size": "16px"} }>{option.value}</span>
                  </div>
                </div>
              ))}
            <div className="form-check form-switch d-flex justify-content-end mt-3">
              <input
                className="form-check-input me-3 mt-2"
                type="checkbox"
                id={`is_required-${id}`}
                checked
                disabled
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

  const askVaccinationHTML = (id: string, options: []) => {
    return(
      <>
      <Row>
        <Col md={12}>
          <div className="card shadow pt-4 p-4 mt-4">
          <p className="fw-bold">* Are you fully vacination against COVID-19 (2 doses)</p>
            <div className="checkbox-container d-flex flex-column mt-3 ms-3">
            {// @ts-ignore: Unreachable code error
            options[id] &&
            // @ts-ignore: Unreachable code error
              options[id].map((option, index) => (
                <div key={index}>
                  <div className="d-flex align-items-center mt-3">
                    
                    <input
                      className="mr-2"
                      style={{ height: "18px", width: "18px" }}
                      type="radio"
                      disabled
                    />
                    <span style={ // @ts-ignore: Unreachable code error
                      {"font-size": "16px"} }>{option.value}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="form-check form-switch d-flex justify-content-end mt-3">
              <input
                className="form-check-input me-3 mt-2"
                type="checkbox"
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

const handleAddQuestion = (type: string, length:any) => {

  const id = length == null? 'question-' + questions.length: 'question-' + length;
  let newQuestion: JSX.Element;
  let type_id: number;

  // Check if the question type is AskAvailability or WorkExperience
  if (type === 'AskAvailability' || type === 'WorkExperience' || type === 'AskVaccination') {
    // Check if the question already exists in the questions array
    const exists = questions.some((question) => question.type === type);
    if (exists) {
      toast({ position: "top", title: `You cannot add ${
        type === 'AskAvailability' ? '(Ask Availability)' :
        type === 'WorkExperience' ? '(Work Experience)' :
        type === 'AskVaccination' ? '(Ask Vaccination)' : ''} more than once.`, status: "warning" });
      return;
    }
  }

  switch (type) {
    case 'ShortQuestion':
      type_id = 1; // @ts-ignore: Unreachable code error
      newQuestion = (questionErrors) => shortQuestionHTML(id, questionErrors);
      break;
    case 'CheckboxQuestion':
      type_id = 2; // @ts-ignore: Unreachable code error
      newQuestion = (options, questionErrors) => checkboxAndRadioQuestionHTML(id, type_id, options, questionErrors);

      setOptions((prevOptions) => ({
        ...prevOptions,
        [id]: [
          { label: 'Option 1', value: '' },
          { label: 'Option 2', value: '' },
        ],
      }));
      break;
    case 'RadioButtonQuestion':
      type_id = 3; // @ts-ignore: Unreachable code error
      newQuestion = (options, questionErrors) => checkboxAndRadioQuestionHTML(id, type_id, options, questionErrors);

      setOptions((prevOptions) => ({
        ...prevOptions,
        [id]: [
          { label: 'Option 1', value: '' },
          { label: 'Option 2', value: '' },
        ],
      }));
      break;
    case 'ConditionalQuestion':
      type_id = 4; // @ts-ignore:
      newQuestion = (options, questionErrors) => conditionalQuestionHTML(id, options, questionErrors);

      setOptions((prevOptions) => ({
        ...prevOptions,
        [id]: [
          { label: 'Option 1', value: '' },
          { label: 'Option 2', value: '' },
        ],
      }));
      break;
    case 'AskAvailability':
      type_id = 5; // @ts-ignore:
      newQuestion = (options, questionErrors) => askAvailabilityHTML(id, options, questionErrors);

      setOptions((prevOptions) => ({
        ...prevOptions,
        [id]: [
          { label: 'Yes', value: 'Yes' },
          { label: 'No', value: 'No' },
        ],
      }));
      break;
    case 'WorkExperience':
      type_id = 6; // @ts-ignore:
      newQuestion = (options, questionErrors) => workExperienceHTML(id, options, questionErrors);

      setOptions((prevOptions) => ({
        ...prevOptions,
        [id]: [
          { label: 'Yes', value: 'Yes' },
          { label: 'No', value: 'No' },
        ],
      }));
      break;
    case 'AskVaccination':
      type_id = 7; // @ts-ignore:
      newQuestion = (options) => askVaccinationHTML(id, options);

      setOptions((prevOptions) => ({
        ...prevOptions,
        [id]: [
          { label: 'Yes', value: 'Yes' },
          { label: 'No', value: 'No' },
        ],
      }));
      break;
    default:
      return;
  }

  const question = {
    id: id,
    type: type,
    type_id: type_id,
    html: newQuestion,
  };

  setQuestions((prevQuestions) => [...prevQuestions, question]);
};

  useEffect(() => {
    axios
      .get(`${baseUrl}/organizations`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setOrganization(res.data[0]?.slug);
        // @ts-ignore: Unreachable code error
        // setFormData({ ...formData, org_slug: organization });
      })
      .catch((err) => {
      });
  }, [organization]);

  const handleSubmit = (event: any) => { 
    event.preventDefault();
    let hasErrors = false; // Validate the form and set error states for questions with empty values
    setIsCreatingFrom(true)
    if (!listingId) {
      setQuestionErrors((prevErrors) => ({
        ...prevErrors,
        ['listing_id']: true, // Set the error if listing_id empty.
      }));
      hasErrors = true;
    }
    
    // Create an array to store the short question data
    const allQuestions: { question_type_id: number; question: string; is_required: number }[] = [];
    // Iterate over each question
    questions.forEach((question, index) => {
      if (question.type === 'ShortQuestion') { 
        // Get the question input field value
        const questionInput = document.getElementById(question.id) as HTMLInputElement;
        const questionValue = questionInput ? questionInput.value : '';

        // Get the is_required checkbox value
        const requiredCheckbox = document.getElementById(`is_required-${question.id}`) as HTMLInputElement;
        const isRequired = requiredCheckbox.checked ? 1 : 0 ;

        if (!questionValue) {
          setQuestionErrors((prevErrors) => ({
            ...prevErrors,
            [question.id]: true, // Set the error state for the specific question ID
          }));
          hasErrors = true;
        }
    
        // Create an object for the short question data
        const questionData = {
          question_type_id: question.type_id,
          question: questionValue,
          is_required: isRequired,
        };
        
        // Add the short question data to the array
        allQuestions.push(questionData);
      }else if (question.type === 'CheckboxQuestion' || question.type === 'RadioButtonQuestion') { 
        // Get the question input field value
        const questionInput = document.getElementById(question.id) as HTMLInputElement;
        const questionValue = questionInput ? questionInput.value : '';

        if (!questionValue) {
          setQuestionErrors((prevErrors) => ({
            ...prevErrors,
            [question.id]: true, // Set the error state for the specific question ID
          }));
          hasErrors = true;
        }

        // Get the is_required checkbox value
        const requiredCheckbox = document.getElementById(`is_required-${question.id}`) as HTMLInputElement;
        const isRequired = requiredCheckbox.checked ? 1 : 0 ;

        // Get the checkbox options
        // @ts-ignore: Unreachable code error
        const optionsArr = options[`${question.id}`]? options[`${question.id}`] : [];
        // @ts-ignore: Unreachable code error
        optionsArr.forEach((option, optIndex) => {
          if (!option['value']) {
            setQuestionErrors((prevErrors) => ({
              ...prevErrors,
              [`${question.id}-option-${optIndex}`]: true, 
            }));
            hasErrors = true;
          }
        });

        // Create an object for the short question data
        const questionData = {
          question_type_id: question.type_id,
          question: questionValue,
          is_required: isRequired,
          options:optionsArr
        };
        
        // Add the short question data to the array
        allQuestions.push(questionData);
      }else if (question.type === 'ConditionalQuestion') {
        // Get the question input field value
        const questionInput = document.getElementById(question.id) as HTMLInputElement;
        const questionValue = questionInput ? questionInput.value : '';

        // Get the conditional question input field value
        const conditionalQuestionInput = document.getElementById(`conditional-${question.id}`) as HTMLInputElement;
        const conditionalQuestionValue = conditionalQuestionInput ? conditionalQuestionInput.value : '';
        
        // Get the is_required checkbox value
        const requiredCheckbox = document.getElementById(`is_required-${question.id}`) as HTMLInputElement;
        const isRequired = requiredCheckbox.checked ? 1 : 0 ;

        // Get the checkbox options
        // @ts-ignore: Unreachable code error
        const optionsArr = options[`${question.id}`]? options[`${question.id}`] : [];

        if (!questionValue) {
          setQuestionErrors((prevErrors) => ({
            ...prevErrors,
            [question.id]: true, // Set the error state for the specific question ID
          }));
          hasErrors = true;
        }

        if (!conditionalQuestionValue) {
          setQuestionErrors((prevErrors) => ({
            ...prevErrors,
            [`conditional-${question.id}`]: true, // Set the error state for the specific question ID
          }));
          hasErrors = true;
        }
        // @ts-ignore: Unreachable code error
        optionsArr.forEach((option, optIndex) => {
          if (!option['value']) {
            setQuestionErrors((prevErrors) => ({
              ...prevErrors,
              [`${question.id}-option-${optIndex}`]: true, 
            }));
            hasErrors = true;
          }
        });

        // Create an object for the short question data
        const questionData = {
          question_type_id: question.type_id,
          question: questionValue,
          is_required: isRequired,
          options:optionsArr,
          conditional_question: conditionalQuestionValue
        };
        
        // Add the short question data to the array
        allQuestions.push(questionData);
      }else if (question.type === 'AskAvailability' || question.type === 'WorkExperience') { 
        // Get the question input field value
        let completeQuestion;
        if(question.type === 'WorkExperience'){
          const questionInput = document.getElementById(`work-experience-${question.id}`) as HTMLInputElement;
          const questionValue = questionInput ? questionInput.value : '';
          completeQuestion = `Do you have experience working with ${questionValue}`;
          
          if (!questionValue) {
            setQuestionErrors((prevErrors) => ({
              ...prevErrors,
              [`work-experience-${question.id}`]: true, // Set the error state for the specific question ID
            }));
            hasErrors = true;
          }

        }else{
          const questionInput = document.getElementById(`ask-availability-${question.id}`) as HTMLInputElement;
          const questionValue = questionInput ? questionInput.value : '';
          completeQuestion = `I am available and agree to commit to: ${questionValue}`;

          if (!questionValue) {
            setQuestionErrors((prevErrors) => ({
              ...prevErrors,
              [`ask-availability-${question.id}`]: true, 
            }));
            hasErrors = true;
          }
        }

        // Get the checkbox options
        // @ts-ignore: Unreachable code error
        const optionsArr = options[`${question.id}`]? options[`${question.id}`] : [];

        // Create an object for the short question data
        const questionData = {
          question_type_id: question.type_id,
          question: completeQuestion,
          is_required: 1,
          options:optionsArr
        };
        
        // Add the short question data to the array
        allQuestions.push(questionData);
      }
    });

    // If there are errors, prevent form submission
    if (hasErrors) {
      toast({ position: "top", title: 'Please fill out the complete form.', status: "warning" })
      setIsCreatingFrom(false)
      return;
    }

    const formData = {
      listing_id: listingId,
      data: allQuestions
    }
    
    axios
      .post(`${baseUrl}/application-form/store?org=${organization}`, formData, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          // 'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
      .then((response) => {
        // setSuccessMessage(response.data.message);
        // setShowSuccess(true);
        setIsCreatingFrom(false)
        toast({ position: "top", title: response.data.message, status: "success" })
        router.push('/organization/listings?page=volunteer');
      })
      .catch((error) => { 
        // Handle error here
        setIsCreatingFrom(false)
        toast({ position: "top", title: "Something went wrong, please try again.", status: "error" })
      });

  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/volunteer-listings/all/${organization}`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setVolunData(res.data.data);
      })
      .catch((err) => {
      });
  }, [organization]);

  useEffect(() => {
      handleAddQuestion("AskAvailability", 0);
      handleAddQuestion("WorkExperience", 1);
      handleAddQuestion("AskVaccination", 2);
    
  }, []);

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
        <Col className="md-6">
          <div className="card shadow mt-3 p-4">
            <div className="mt-2">
              <label
                style={{
                  fontWeight: "500",
                  fontSize: "20px",
                  lineHeight: "24px",
                }}
                className="form-label"
              > Select Volunteer Listing</label>
              <div className="col-md-12">
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  className={`form-control mt-2 ${questionErrors["listing_id"] ? 'input-error' : ''}`}
                  placeholder="Search volunteer listing"
                  optionFilterProp="children"
                  value={listingId}
                  id="listing_id"
                  onChange={(e) => {
                    handleSelectChange(e);
                    handleInputChange('listing_id');
                  }}
                  onSearch={(value) => setInputValue(value)}
                  filterOption={(input, option) =>
                    // @ts-ignore: Unreachable code error
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {volundata.map((item) => ( // @ts-ignore: Unreachable code error
                    <Option key={item.id} value={item.id}>
                      {// @ts-ignore: Unreachable code error
                      item.title}
                    </Option>
                  ))}
                </Select>
              </div>
              {questionErrors["listing_id"] && <p className="error-message">Please select volunteer listing.</p>}
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md={12}>
              {questions.map((question, index) => (
                <div key={question.id} className="component-container">
              
                {question.type === 'ShortQuestion' ? ( // @ts-ignore:
                    question.html(questionErrors)
                ) : question.type === 'CheckboxQuestion' ? ( // @ts-ignore:
                    question.html(options, questionErrors)
                ) : question.type === 'RadioButtonQuestion' ? (// @ts-ignore:
                    question.html(options, questionErrors)
                ) : question.type === 'ConditionalQuestion' ? (// @ts-ignore:
                    question.html(options, questionErrors)
                ) : question.type === 'AskAvailability' ? (// @ts-ignore:
                    question.html(options, questionErrors)
                ) : question.type === 'WorkExperience' ? (// @ts-ignore:
                  question.html(options, questionErrors)
                ) : question.type === 'AskVaccination' ? (// @ts-ignore:
                  question.html(options)
                ) : null }
              </div>
              ))}
                  <button type="submit" onClick={handleSubmit} disabled={isCreatingFrom} id="submit" className="update-v-btn mb-5 mt-5 col-md-2 ms-3" disabled={questions.length === 0}>
                    <span id="button-text">
                      {isCreatingFrom ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div> : "Submit"}
                    </span>
                  </button>
              </Col>
            </Row>
          </form>
        </Col>
        <Col className="md-6">
          <Row>
            <Col md="12">
              <div className="d-flex justify-content-left col-md-8">
                <p className="listing-txt ms-3"></p>
                <button className="update-v-btn" onClick={handleResetForm}>Reset</button>
              </div>
            </Col>
            <Col className="md-12">
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
                      <button onClick={()=> handleAddQuestion("ShortQuestion", null)} className="ques-card-button"> Short Question </button>
                      <button onClick={()=> handleAddQuestion("CheckboxQuestion", null)} className="ques-card-button" > Checkbox Question </button>
                      <button onClick={()=> handleAddQuestion("RadioButtonQuestion", null)} className="ques-card-button"> Radio Button Question</button>
                      <button onClick={()=> handleAddQuestion("ConditionalQuestion", null)} className="ques-card-button">Conditional Question </button>
                      <button onClick={()=> handleAddQuestion("AskAvailability", null)} className="ques-card-button"> Ask Availability </button>
                      <button onClick={()=> handleAddQuestion("WorkExperience", null)} className="ques-card-button"> Work Experience </button>
                      <button onClick={()=> handleAddQuestion("AskVaccination", null)} className="ques-card-button"> Ask Vaccination </button>
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
