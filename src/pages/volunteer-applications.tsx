import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import back from "../assets/imgs/back.png";
import community from "../assets/imgs/community-focused.jpg";
import { Image, Input } from "@chakra-ui/react";
import { Table } from "antd";
import { Modal } from "react-bootstrap";
import "antd/dist/antd.css";
import Link from "next/link";
import axios from "axios";
import { accessToken, baseUrl } from "../components/Helper/index";
import { useRouter } from "next/router";

const VolunteerApplications = () => {
  const [volunteerData, setVolunteerData] = useState([]);
  const [applicantName, setApplicantName] = useState([]);
  const [volunteerName, setVolunteerName] = useState([]);
  const [volunteerSlug, setVolunteerSlug] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseUrl}/organizations`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setVolunteerData(res.data[0]?.slug);
      })
      .catch((err) => {
      });
    axios
      .get(`${baseUrl}/volunteer-applications/${volunteerData}`, {
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
  }, [volunteerData]);

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
      pathname: "/volunteer-applicants",
      query: { slug: `${volunteerData}` },
    });
  };
  return (
    <>
      <Navbar />
      <Sidebar>
        <div className="plan-main"></div>
        <div className="ms-2">
          <p className="info-txt">Volunteer Applications</p>
        </div>
        <div className="mt-4">
  <div className="row">
    {applicantName &&
      applicantName.map((item, index) => (
        <div className="col-md-4 mx-2" key={index}>
          <Link href={`/volunteer-applicants/${ // @ts-ignore: Unreachable code error
          item?.slug}`}>
            <a>
              <Image className="applicant-image" src={
                 // @ts-ignore: Unreachable code error
                item?.path} />
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
      </Sidebar>
      <Footer />
    </>
  );
};

export default VolunteerApplications;
