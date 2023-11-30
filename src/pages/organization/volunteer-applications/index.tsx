import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import { Footer } from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import back from "../assets/imgs/back.png";
import community from "../assets/imgs/community-focused.jpg";
import { Image, Input } from "@chakra-ui/react";
import { Table } from "antd";
import { Modal } from "react-bootstrap";
import "antd/dist/antd.css";
import Link from "next/link";
import axios from "axios";
import { accessToken, baseUrl } from "../../../components/Helper/index";
import { useRouter } from "next/router";
import { HamburgerIcon } from "@chakra-ui/icons";

const VolunteerApplications = () => {
  const [orgSlug, setOrgSlug] = useState('');
  const [applicantName, setApplicantName] = useState([]);
  const [volunteerName, setVolunteerName] = useState([]);
  const [volunteerSlug, setVolunteerSlug] = useState([]);
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    axios
      .get(`${baseUrl}/organizations`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setOrgSlug(res.data[0]?.slug);
      })
      .catch((err) => {
      });
  }, []);
  
  useEffect(() => {
    if(orgSlug){
      axios
        .get(`${baseUrl}/volunteer-applications/${orgSlug}`, {
          headers: {
            Authorization: "Bearer " + accessToken(),
            // 'Content-Type': 'application/x-www-form-urlencoded'
          },
        })
        .then((res) => {
          setApplicantName(res.data.data);
          setVolunteerName(res.data.data)
        })
        .catch((err) => {
        });
    }
  }, [orgSlug]);

  // useEffect(() => {
  //   volunteerName.map((item, index) => {
  //       // @ts-ignore: Unreachable code error
  //     setVolunteerSlug(item?.slug);
  //     return <div key={index}>...</div>;
  //   });
  // }, [volunteerName]);

  const router = useRouter();
  const handleClick = (event: any) => {
    event.preventDefault();
    router.push({
      pathname: "volunteer-applications/applicants",
      query: { slug: `${orgSlug}` },
    });
  };
  return (
    <div style={{overflowX:"hidden"}}>
      <Navbar />
      <div className="row m-0">
      <button className="d-block d-lg-none fs-2 text-start ps-3 mt-3" onClick={() => setShow(!show)}><HamburgerIcon/></button>
        <div className="col-3 ps-0 organization-dash d-none d-lg-block">
          <Sidebar>
          </Sidebar>
        </div>
        {show && <div className="col-lg-3 px-0 wel-dashboard d-block d-lg-none">
          <Sidebar>
          </Sidebar>
      </div>}
        <div className="col">
          <div className="plan-main"></div>
          <div className="ms-2">
            <p className="info-txt text-center text-md-start">Volunteer Applications</p>
          </div>
          <div className="mt-4">
            <div className="row m-0 text-center text-md-start">
              {applicantName &&
                applicantName.map((item, index) => (
                  <div className="col-md-4 mx-2" key={index}>
                    <Link href={`volunteer-applications/${ // @ts-ignore: Unreachable code error
                    item?.slug}`}>
                      <a className="">
                        <Image className="applicant-image m-auto mx-md-0 my-3" src={
                          // @ts-ignore: Unreachable code error
                          `${item?.path}/${item?.image}`} />
                      </a>
                    </Link>
                    <div>{
                    // @ts-ignore: Unreachable code error
                    item?.title}</div>
                    <div>
                      <p className="fw-bold">
                        {
                        // @ts-ignore: Unreachable code error
                        item?.applications_count} Applicants
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="mt-3">
            {/* <Table columns={columns} dataSource={dataSource} /> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VolunteerApplications;
