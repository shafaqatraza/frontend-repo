import React, {useEffect, useState} from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Table } from "antd";
import axios from "axios";
import { accessToken, baseUrl, currOrgSlug } from '../../components/Helper/index'
import moment from 'moment';
import { HamburgerIcon } from "@chakra-ui/icons";
import Head from "next/head";
import fav from "../../assets/imgs/favicon.ico"

const DonationAnalytics = () => {
const [donationData, setDonationData] = useState([]);
const [slug, setSlug] = useState([]);
const [show, setShow] = useState(false);

interface DataSourceType {
  key: string;
  user: string;
  date: string;
  amount: string;
}


useEffect(() => {
  axios.get(`${baseUrl}/donation-analytics/${currOrgSlug}/all`,  {
    headers: {
      Authorization: 'Bearer ' + accessToken(),
      // 'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res)=>{
    setDonationData(res.data.data);
  }).catch((err)=>{
    console.log(err)
  })
}, [currOrgSlug])


interface ColumnsType {
  title: string;
  dataIndex: string;
  key: string;
}

const columns: ColumnsType[] = [
  {
    title: "User",
    dataIndex: "full_name",
    key: "full_name"
  },
  {
    title: "Date",
    dataIndex: "created_at",
    key: "created_at",
    // @ts-ignore: Unreachable code error
    render: (val) => moment(val).format('Do/MMMM/YYYY'),
  },
  {
    title: "Amount",
    dataIndex: `amount`,
    key: "amount",
    // @ts-ignore: Unreachable code error
    render: (value) => `$${value}`
  }
];


  return (
    <div style={{overflowX:"hidden"}}>
      <Head>
        {/* <title>Good Deeds | Profile</title> */}
        <title>Good Deeds | Organization Donation Analytics</title>
        <link rel="icon" href={fav.src}  />
        <meta name="title" content="A marketplace of opportunity" />
        <meta name="description" content="A marketplace of opportunity. An online community of do-gooders; paying it forward, and getting rewarded." />
        <meta name="keywords" content="Marketplace, Goodddeds, Canada, Toronto, Ontario, Community" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />

        <meta property="og:title" content="A marketplace of opportunity" />
        <meta property="og:description" content="A marketplace of opportunity. An online community of do-gooders; paying it forward, and getting rewarded." />
        <meta property="og:image" content="/gd-favicon.ico" />
        {/* <meta property="og:url" content="" /> */}
        <meta property="og:site_name" content="Good Deeds" />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=UA-230154537-1`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'UA-230154537-1', {
                        page_path: window.location.pathname,
                        });
                    `,
          }}
        />
      </Head>
    <Navbar/>
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
        <div className="row pb-4">
          <div className='mt-md-5 mt-4'>
            <p style={{fontSize:"30px", fontWeight:"600", lineHeight:"37px"}} className='mt-md-5 text-center text-md-start'>Donation Analytics</p>
          </div>
        <div className='col-md-10 mt-5'>
          <Table
          dataSource={donationData}
          columns={columns}
          pagination={false}
          className="custom-table"
        />
          </div>
          <div className="col-md-2">
            <p className='fw-bold mt-2'>Download List</p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default DonationAnalytics
