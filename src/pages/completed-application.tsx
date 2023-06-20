import React, {useEffect, useState} from 'react'
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import Sidebar from '../components/Sidebar';
import back from "../assets/imgs/back.png";
import { Image } from '@chakra-ui/react';
import Link from "next/link";
import axios from "axios";
import { accessToken, baseUrl } from "../components/Helper/index";
import { useRouter } from "next/router";

const CompletedApplication = () => {
  const [organizationSlug, setOrganizationSlug] = useState([]);
  const router = useRouter();
  const { slug } = router.query;
  useEffect(()=>{
    axios
      .get(`${baseUrl}/organizations`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(slug,"slugggggggggggggggggggggg");
        console.log(res.data[0]?.slug, "datatatata");
        setOrganizationSlug(res.data[0]?.slug);
      })
      .catch((err) => {
        console.log(err);
      });
  },[slug])
  const [formData, setFormData] = useState({
    receiver_id: 2,
    listing_type: "VolunteerListing",
    tenant_module_id : 10

  });

  const handleApplicant = () =>{
    axios.post(`${baseUrl}/messages/${organizationSlug}`, formData, {
      headers: {
        Authorization: "Bearer " + accessToken(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((res)=>{
      router.push("/organization/inbox/all");
    }).catch((err)=>{
      console.log(err);

    })
  }
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
            <p className='pt-5' style={{fontSize:"96px", textAlign:"center", fontWeight:"600", lineHeight:"117px"}}>Completed Application</p>
          </div>
        </div>

    </Sidebar>
    <Footer/>
    </>
  )
}

export default CompletedApplication
