import React, {useEffect, useState} from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Table } from "antd";
import axios from "axios";
import { accessToken, baseUrl, currOrgSlug } from '../../components/Helper/index'
import moment from 'moment';

const DonationAnalytics = () => {
const [donationData, setDonationData] = useState([]);

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
    <Sidebar>
     <div className="row">
      <div className='mt-5'>
        <p style={{fontSize:"30px", fontWeight:"600", lineHeight:"37px"}} className='mt-5'>Donation Analytics</p>
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
    </Sidebar>
    <Footer/>
    </>
  )
}

export default DonationAnalytics
