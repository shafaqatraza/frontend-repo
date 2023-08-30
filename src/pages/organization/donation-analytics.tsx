import React, {useEffect, useState} from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Table } from "antd";
import axios from "axios";
import { accessToken, baseUrl, currOrgSlug } from '../../components/Helper/index'
import moment from 'moment';
import { HamburgerIcon } from "@chakra-ui/icons";

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
    <>
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
        <div>
          <p className='fw-bold mt-2'>Filter: by range (month/day/year)/ amount/ username / location</p>
        </div>
          </div>
          <div className="col-md-2">
            <p className='fw-bold mt-2'>Download List</p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default DonationAnalytics
