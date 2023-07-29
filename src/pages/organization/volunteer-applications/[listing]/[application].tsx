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
    fontSize: '24px',
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
          <div style={{backgroundColor:"#D9D9D9", height:"800px"}} className="col-md-10 mt-5 ms-5 mb-5">
            <p className='pt-5' style={{fontSize:"96px", textAlign:"center", fontWeight:"600", lineHeight:"117px"}}>Application</p>
            <div className='ms-4 mt-5'>
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
              { applicationData &&
                applicationData.application && applicationData.application.map((question, index) => (
                  <>
                  
                    {question?.question_type == "Short Question" &&
                      <div>
                        <p style={questionStyle}>Q: {question?.question}</p>
                        <p style={answerStyle}>A: {question?.answer}</p>
                      </div>
                    }
                    {question?.question_type === "Checkbox Question" && (
                      <div>
                        <p style={questionStyle}>Q: {question?.question}</p>
                        {question.selected_options && Object.values(question.selected_options).length > 0 ? (
                          <p style={answerStyle}>
                            Options: {Object.values(question.selected_options).map((option, i) => option).join(", ")}
                          </p>
                        ) : (
                          <p>No options selected.</p>
                        )}
                      </div>
                    )}
                    {question?.question_type === "Radio Button Question" && (
                      <div>
                        <p style={questionStyle}>Q: {question?.question}</p>
                        {question.selected_option? (
                          <p style={answerStyle}> Options: {question.selected_option}</p>
                        ) : (
                          <p>No options selected.</p>
                        )}
                      </div>
                    )}

                    {question?.question_type === "Conditional Question" && (
                      <div>
                        <p style={questionStyle}>Q: {question?.question}</p>
                        {question.selected_option? (
                          <p style={answerStyle}> Options: {question.selected_option}</p>
                        ) : (
                          <p>No options selected.</p>
                        )}
                        <p style={questionStyle}>QQ: {question?.conditional_question}</p>
                        <p style={answerStyle}>QA: {question?.conditional_answer}</p>
                      </div>
                    )}

                    {question?.question_type == "Avaiability" &&
                      <div>
                        <p style={questionStyle}>Q: {question?.question}</p>
                        <p style={answerStyle}>A: {question?.answer}</p>
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
