import React, {useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Table } from "antd";
import axios from "axios";
import { accessToken, baseUrl } from '../components/Helper/index'
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
  axios.get(`${baseUrl}/donation-analytics/alkhidmat-welfare/all`,  {
    headers: {
      Authorization: 'Bearer ' + accessToken(),
      // 'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res)=>{
    console.log(res.data.data, "response")
    setDonationData(res.data.data);
  }).catch((err)=>{
    console.log(err)
  })
}, [])
// const dataSource: DataSourceType[] = [
//   {
//     key: "1",
//     user: "John",
//     date: "2022-01-01",
//     amount: "$100.00"
//   },
//   {
//     key: "2",
//     user: "Mary",
//     date: "2022-01-02",
//     amount: "$50.00"
//   },
//   {
//     key: "3",
//     user: "Bob",
//     date: "2022-01-03",
//     amount: "$75.00"
//   },
//   {
//     key: "4",
//     user: "Alice",
//     date: "2022-01-04",
//     amount: "$200.00"
//   },
//   {
//     key: "5",
//     user: "Charlie",
//     date: "2022-01-05",
//     amount: "$150.00"
//   }
// ];

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
