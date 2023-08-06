import React, {useEffect, useState} from 'react'
import Navbar from "../../../../components/Navbar";
import { Footer } from "../../../../components/Footer";
import Sidebar from '../../../../components/Sidebar';
import back from "../../../../assets/imgs/back.png";
import { Image } from '@chakra-ui/react';
import Link from "next/link";
import axios from "axios";
import { accessToken, baseUrl, currentOrganization } from "../../../../components/Helper/index";
import { useRouter } from "next/router";
interface ApplicationData {
  application: any[]; // Assuming the application array contains any type of data
  applicant: {
    full_name: string;
    email: string;
  };
}
const CompletedApplication = () => {
  const router = useRouter();
  const { listing, application } = router.query;
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    application: [{}],
    applicant: {
      full_name: '',
      email: '',
    },
  });
  const [receiverId, setReceiverId] = useState<string | undefined>();
  const [formData, setFormData] = useState({
    receiver_id: '',
    listing_type: 'VolunteerListing',
  });
  useEffect(()=>{

    axios
      .get(
        `${baseUrl}/volunteer-applications/applicants/${application}/show?org=${// @ts-ignore: Unreachable code error
          currentOrganization?.slug}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken(),
            // 'Content-Type': 'application/x-www-form-urlencoded'
          },
        }
      )
      .then((res) => {
        setApplicationData(res.data);
        setReceiverId(res.data.applicant.id);
      })
      .catch((err) => {
        // console.log(err);
      });

  },[currentOrganization, application])
  console.log('appli', applicationData)
  useEffect(() => {
    if (receiverId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        receiver_id: receiverId,
      }));
    }
  }, [receiverId]);

  const handleApplicant = () => {
    // @ts-ignore: Unreachable code error
    const apiUrl = `${baseUrl}/messages/${listing}`;

    axios
      .post(apiUrl, formData, {
        headers: {
          Authorization: "Bearer " + accessToken(),
        },
      })
      .then((res) => {
        router.push(`/organization/inbox/all`);
      })
      .catch((err) => {
        // Handle any errors
      });
  };
  const questionStyle = {
    fontWeight: 'bold',
    color: '#183553',
    fontSize: '20px',
    marginBottom: '8px',
  };

  const answerStyle = {
    color: '#E27832',
    fontSize: '18px',
    marginBottom: '16px',
  };

  return (
    <>
    <Navbar/>
    <Sidebar>
      <div className="plan-main"></div>

        <div className='row'>
        <div className="col-md-1 mt-2">
        <Image alt='image' src={back.src}/>
        </div>
        <div className="col-md-2">
        <span className='app-txt'>Application</span>
        </div>
        </div>

        <div className='d-flex justify-content-end mt-4'>
          {/* <Link href="/"> */}
          <button onClick={handleApplicant} className='approve-btn me-3'>Contact Applicant</button>
          {/* </Link> */}
          <Link href="/completed-volunteer">
            <button className='canc-btn'>Mark as complete</button>
          </Link>
        </div>

        <div className="row">
          <div style={{backgroundColor:"#D9D9D9", height:"100%"}} className="col-md-10 mt-5 ms-5 mb-5">
            <p className='pt-5' style={{fontSize:"96px", textAlign:"center", fontWeight:"600", lineHeight:"117px"}}>Application</p>
            <div className='ms-4 mt-5'>
            {applicationData && applicationData.applicant.full_name? (
              <>
                <div>
                  <p>
                    <span style={questionStyle}>Name: </span>
                    <span style={answerStyle}>{applicationData?.applicant?.full_name}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span style={questionStyle}>Email: </span>
                    <span style={answerStyle}>{applicationData?.applicant?.email}</span>
                  </p>
                </div>
              </>
            ) : null}
              
              { applicationData &&
                applicationData.application && applicationData.application.map((question, index) => (
                  <>
                  
                    {question?.question_type == "Short Question" &&
                      <div>
                        <p style={questionStyle}>{question?.question}</p>
                        <p style={answerStyle}>{question?.answer}</p>
                      </div>
                    }
                    {question?.question_type === "Checkbox Question" && (
                      <div>
                        <p style={questionStyle}>{question?.question}</p>
                        {question.selected_options && Object.values(question.selected_options).length > 0 ? (
                        
                        <span>
                          {Object.values(question.selected_options).map((option, i) => (
                            <p style={answerStyle}>{i+1}: {option}</p>  
                            ))}
                        </span>
                        
                        ) : (
                          <p>No options selected.</p>
                        )}
                      </div>
                    )}
                    {question?.question_type === "Radio Button Question" || question?.question_type === "Ask Vaccination" && (
                      <div>
                        <p style={questionStyle}>{question?.question}</p>
                        {question.selected_option? (
                          <p style={answerStyle}> 1: {question.selected_option}</p>
                        ) : (
                          <p>No options selected.</p>
                        )}
                      </div>
                    )}

                    {question?.question_type === "Conditional Question" && (
                      <div>
                        <p style={questionStyle}>{question?.question}</p>
                        {question.selected_option? (
                          <p style={answerStyle}> 1: {question.selected_option}</p>
                        ) : (
                          <p>No options selected.</p>
                        )}
                        <p style={questionStyle}>{question?.conditional_question}</p>
                        <p style={answerStyle}>{question?.conditional_answer}</p>
                      </div>
                    )}

                    {question?.question_type == "Avaiability" &&
                      <div>
                        <p>
                          <span style={questionStyle}>{question?.question} </span>
                          <span style={answerStyle}>{question.selected_option}</span>
                        </p>
                        
                        <p>
                          <span style={questionStyle}>Date: </span>
                          <span style={answerStyle}>{question?.date_availability}</span>
                        </p>
                        <p style={questionStyle}>Availabilities</p>
                        {question.availabilities?.map((avaiability: any)=> (
                          <p style={answerStyle}>{avaiability?.day}: {avaiability.shifts}</p>
                        ))}
                      </div>
                    }

                    {question?.question_type == "Work Experience" &&
                      <div>
                        <p>
                          <span style={questionStyle}>Do you have experience working with {question?.question} </span>
                          <span style={answerStyle}>{question.selected_option}</span>
                        </p>
                        
                        <p>
                          <span style={answerStyle}>{question?.date_availability}</span>
                        </p>
                        <p style={questionStyle}>Experiences</p>
                        {question.work_experinces && Object.values(question.work_experinces).map((experience: any)=> (
                          <p style={answerStyle}>{experience}</p>
                        ))}
                      </div>
                    }
                  </>
              ))}

              

            
            </div>
          </div>
        </div>

    </Sidebar>
    <Footer/>
    </>
  )
}

export default CompletedApplication
