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

const CompletedApplication = () => {
  const router = useRouter();
  const { listing, application } = router.query;
  const [applicationData, setApplicationData] = useState({
    applicant: {
      full_name: '',
      email: ''
    }
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
        <p style={questionStyle}>Applicant Name</p>
        <p style={answerStyle}>{applicationData?.applicant?.full_name}</p>
      </div>

      <div>
        <p style={questionStyle}>Applicant Email</p>
        <p style={answerStyle}>{applicationData?.applicant?.email}</p>
      </div>

      <div>
        <p style={questionStyle}>Q: Date(s) of volunteer?</p>
        <p style={answerStyle}>A: June 15 - June 30, 2023</p>
      </div>

      <div>
        <p style={questionStyle}>Q: Total Hours Completed?</p>
        <p style={answerStyle}>A: 50 hours</p>
      </div>

      <div>
        <p style={questionStyle}>Q: Description of act?</p>
        <p style={answerStyle}>A: As a volunteer, I actively participated in organizing <span className='d-block'>and conducting community cleanup campaigns.</span></p>
      </div>

      {/* <div>
        <p style={questionStyle}>Q: Supervisor Full Name?</p>
        <p style={answerStyle}>A: Jane Smith</p>
      </div> */}

      {/* <div>
        <p style={questionStyle}>Q: Supervisor Email?</p>
        <p style={answerStyle}>A: janesmith@example.com</p>
      </div> */}

      <div>
        <p style={questionStyle}>Q: Organization Name?</p>
        <p style={answerStyle}>A: Humane Society</p>
      </div>
            </div>
          </div>

        </div>

    </Sidebar>
    <Footer/>
    </>
  )
}

export default CompletedApplication
