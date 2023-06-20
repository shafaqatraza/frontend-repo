import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Image } from '@chakra-ui/react';
import back from "../assets/imgs/back.png";
import certLogo from "../assets/imgs/certLogo.png";
import { useRouter } from 'next/router';
import axios from "axios";
import { accessToken, baseUrl } from "../components/Helper/index";

const Certification = () => {
  const [organizationName, setOrganizationName] = useState([]);
  const router = useRouter();
  const formData = router.query;
  useEffect(()=>{
    axios
      .get(`${baseUrl}/organizations`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res.data, "datatatata");
        setOrganizationName(res.data[0]?.full_name);
      })
      .catch((err) => {
        console.log(err);
      });
  },[])
  return (
    <>
    {console.log(formData, "jdjdjdj")
    }
    <Navbar/>
    <Sidebar>
    <div className="plan-main"></div>
        <div className="row">
          <div className="col-md-1 mt-2">
            <Image alt="image" src={back.src} />
          </div>
          <div className="col-md-2">
            <span className="app-txt">Certification</span>
          </div>
        </div>
        <div className='d-flex justify-content-end mt-5'>
          <button className='update-v-btn'>Send</button>
        </div>
        <div className='card shadow mt-5 p-3'>
          <div className='cert-card p-3'>
            <p className='cert-txt'>CERTIFICATE</p>
            <p className='cert-txt2'>OF VOLUNTEER</p>
            <p className='text-center mt-5'>This certificate is proudly presented to</p>
            <p className='cert-txt3'>{formData.fullName}</p>
            <p className='text-center'>Description of Volunteer Position</p>
            <p className='text-center'>{formData.description}</p>
            <p className='fw-bold text-center mt-5'>For the completion of {formData.hours} Hours</p>
            <div className='float-end mt-4'>
            <p>{organizationName}</p>
            <p>{formData.supervisorFullName}</p>
            <p>{formData.supervisorEmail}</p>
          </div>
          <div className='d-flex mt-5'>
            <Image src={certLogo.src}/>
          </div>
          </div>
        </div>
    </Sidebar>
    <Footer/>
    </>
  )
}

export default Certification
