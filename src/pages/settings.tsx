import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import { useRouter } from "next/router";

const Settings = () => {
  const router = useRouter();
  return (
    <>
    <Navbar/>
    <Sidebar>
      <div className='plan-main'></div>
      <div className='mt-2 ms-2'>
        <p className='ms-5' style={{fontSize:"30px", fontWeight:"600", lineHeight:"37px"}}>Settings</p>
      </div>
      <div className="row mt-5">
        <div onClick={()=>router.push("/organization-info")} style={{cursor:"pointer"}} className="col-md-4">
          <p className='set-p-1'>Business Info</p>
          <p className='mt-2'>Edit your business name, <span className='d-block'>and logo</span></p>
        </div>
        <div onClick={()=>router.push("/payment")} style={{cursor:"pointer"}} className="col-md-4">
          <p className='set-p-1'>Billing and Payments</p>
          <p>Invoices and Payment details <span className='d-block'>on file</span></p>
        </div>
        <div onClick={()=>router.push("/payment")} style={{cursor:"pointer"}} className="col-md-4">
          <p className='set-p-1'>Site member settings</p>
          <p>Invoices and Payment details  <span className='d-block'>on file</span></p>
        </div>
      </div>
      <div className='row mt-5'>
        <div onClick={()=>router.push("/organization-info")}  style={{cursor:"pointer"}} className="col-md-4">
          <p className='set-p-1'>Manage Plan</p>
          <p className='mt-2'>Edit your business name, <span className='d-block'>and logo</span></p>
        </div>
        <div onClick={()=>router.push("/payment")} style={{cursor:"pointer"}} className="col-md-4">
          <p className='set-p-1'>Roles & Permissions</p>
          <p className='mt-2'>Invoices and Payment details  <span className='d-block'>on file</span></p>
        </div>
      </div>
      <div onClick={()=>router.push("/organization")} style={{cursor:"pointer"}} className="row mt-5">
        <p className='set-p-1'>Notifications</p>
        <p>Choose what notifications <span className='d-block'>you get from Good Deeds</span></p>
      </div>
    </Sidebar>
    <Footer/>
    </>
  )
}

export default Settings
