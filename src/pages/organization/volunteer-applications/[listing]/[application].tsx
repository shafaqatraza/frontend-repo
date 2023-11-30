import React, {useEffect, useState} from 'react'
import Navbar from "../../../../components/Navbar";
import { Footer } from "../../../../components/Footer";
import Sidebar from '../../../../components/Sidebar';
import back from "../../../../assets/imgs/back.png";
import { Center, Image } from '@chakra-ui/react';
import Link from "next/link";
import axios from "axios";
import { accessToken, baseUrl, currOrgSlug } from "../../../../components/Helper/index";
import { useRouter } from "next/router";
import { useToast } from '@chakra-ui/toast'
interface ApplicationData {
  application: any[]; // Assuming the application array contains any type of data
  applicant: {
    full_name: string;
    email: string;
  };
}

const CompletedApplication = () => {
  const router = useRouter();
  const toast = useToast()
  const { listing, application } = router.query;
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    application: [{}],
    applicant: {
      full_name: '',
      email: '',
    },
  });

  const [receiverId, setReceiverId] = useState<string | undefined>();
  const [isContacting, setIsContacting] = React.useState(false); 
  const [isCertificateExists, setIsCertificateExists] = React.useState(false); 
  const [isMarkCompleteBtnClicked, setIsMarkCompleteBtnClicked] = React.useState(false); 
  const [isCertificateBtnClicked, setIsCertificateBtnClicked] = React.useState(false); 
  const [isChecking, setIsChecking] = React.useState(false); 
  const [formData, setFormData] = useState({
    receiver_id: '',
    listing_type: 'VolunteerListing',
  });
  const [userPermissions, setUserPermissions] = useState({
    role: '',
    permissions: [] as any
  });

  function getPermissions(){ 
    const rolePermissionsString = localStorage.getItem('rolePermissions');
    if (rolePermissionsString !== null) {
      const rolePermissions = JSON.parse(rolePermissionsString);
      setUserPermissions(rolePermissions);
    }
  }

  useEffect( ()=> {
    getPermissions()
  }, [])

  useEffect(()=>{
 
    if(application && currOrgSlug){
      setIsMarkCompleteBtnClicked(true);
      setIsChecking(true)
      axios
        .get(
          `${baseUrl}/volunteer-certificates/${application}/certificate-exists?org=${currOrgSlug}`,
          {
            headers: {
              Authorization: "Bearer " + accessToken(),
              // 'Content-Type': 'application/x-www-form-urlencoded'
            },
          }
        )
        .then((res) => {
          if(res.data === 1){
            setIsCertificateExists(true)
          }
          setIsMarkCompleteBtnClicked(false);
          setIsChecking(false)
        })
    }
    
    if(application && currOrgSlug){
      axios
        .get(
          `${baseUrl}/volunteer-applications/applicants/${application}/show?org=${currOrgSlug}`,
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
    }

  },[currOrgSlug, application])

  useEffect(() => {
    if (receiverId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        receiver_id: receiverId,
      }));
    }
  }, [receiverId]);

  const handleApplicant = () => {
    if(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('create_messages'))){
    setIsContacting(true);
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
        setIsContacting(false);
      });
    }else{
      toast({ position: "top", title: "You don't have the necessary permissions.", status: "warning" })
      return;
    }
  };

  const markAsComplete = () =>{
    if(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('create_certificates'))){
      setIsMarkCompleteBtnClicked(true);
      router.push(`/organization/volunteer-applications/${listing}/${application}/mark-as-complete`);
    }else{
      toast({ position: "top", title: "You don't have the necessary permissions.", status: "warning" })
      return;
    }
  }

  const viewCertificate = () =>{
    if(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('view_certificates'))){
    setIsCertificateBtnClicked(true);
    router.push(`/organization/volunteer-applications/${listing}/${application}/certification`);
    }else{
      toast({ position: "top", title: "You don't have the necessary permissions.", status: "warning" })
      return;
    }
  }
  

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
        <Link href={`/organization/volunteer-applications/${listing}`}>
          <Image src={back.src} style={{ cursor: 'pointer' }} />
        </Link>
        </div>
        <div className="col-md-2">
        <span className='app-txt'>Application</span>
        </div>
        </div>

        <div className='d-flex justify-content-end mt-4'>
          {/* <Link href="/"> */}
          <button onClick={handleApplicant} className='approve-btn me-3'>
            {isContacting ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div> : "Contact Applicant"}
            
          </button>
          {/* </Link> */}
          {isCertificateExists? 
            <button onClick={viewCertificate} className='canc-btn'>
              {isCertificateBtnClicked ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden"></span></div> : "View Certificate"}
            </button>
          : 
            <button onClick={markAsComplete} className='canc-btn' disabled={isChecking}>
              {isMarkCompleteBtnClicked ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden"></span></div> : "Mark as complete"}
            </button>
          }

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
            ) : (
              <div style={{ color: "#E27832", display: "flex", justifyContent: "center", alignItems: "center" }} className='mb-3'>
                <div className="spinner-border"></div>
              </div>
            )}
              
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
                          {Object.values(question.selected_options).map((option, i) => ( // @ts-ignore: Unreachable code error
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
                          <span style={questionStyle}>Start Date: </span>
                          <span style={answerStyle}>{question?.date_availability}</span>
                        </p>
                        <p>
                          <span style={questionStyle}>End Date: </span>
                          <span style={answerStyle}>{question?.end_date}</span>
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
