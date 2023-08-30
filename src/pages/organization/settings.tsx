import React from 'react'
import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { useRouter } from "next/router";
import { HamburgerIcon } from "@chakra-ui/icons";

const Settings = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  return (
    <>
      <Navbar />
      <div className="row m-0">
      <button className="d-block d-lg-none fs-2 text-start ps-3 mt-3" onClick={() => setShow(!show)}><HamburgerIcon/></button>
        <div className="col-lg-3 ps-0 organization-dash d-none d-lg-block">
          <Sidebar>
          </Sidebar>
        </div>
        {show && <div className="col-lg-3 px-0 wel-dashboard d-block d-lg-none">
          <Sidebar>
          </Sidebar>
          </div>}
        <div className="col pb-4">
          <div className='plan-main'></div>
          <div className='mt-2 ms-2'>
            <p className='ms-md-5 text-center text-md-start' style={{ fontSize: "30px", fontWeight: "600", lineHeight: "37px" }}>Settings</p>
          </div>
          <div className="row mx-0 mt-5">
            <div onClick={() => router.push("/organization/profile")} style={{ cursor: "pointer" }} className="col-md-4">
              <p className='set-p-1'>Business Info</p>
              <p className='mt-2'>Edit your business name, <span className='d-block'>and logo</span></p>
            </div>
            <div onClick={() => router.push("../edit-payment")} style={{ cursor: "pointer" }} className="col-md-4">
              <p className='set-p-1'>Billing and Payments</p>
              <p>Invoices and Payment details <span className='d-block'>on file</span></p>
            </div>
            <div onClick={() => router.push("/payment")} style={{ cursor: "pointer" }} className="col-md-4">
              <p className='set-p-1'>Site member settings</p>
              <p>Invoices and Payment details  <span className='d-block'>on file</span></p>
            </div>
          </div>
          <div className='row mx-0 mt-5'>
            <div onClick={() => router.push("/organization/profile")} style={{ cursor: "pointer" }} className="col-md-4">
              <p className='set-p-1'>Manage Plan</p>
              <p className='mt-2'>Edit your business name, <span className='d-block'>logo or change your plan.</span></p>
            </div>
            <div onClick={() => router.push("/payment")} style={{ cursor: "pointer" }} className="col-md-4">
              <p className='set-p-1'>Roles & Permissions</p>
              <p className='mt-2'>Invoices and Payment details  <span className='d-block'>on file</span></p>
            </div>
          </div>
          <div onClick={() => router.push("/organization")} style={{ cursor: "pointer" }} className="row mx-0 mt-5">
            <p className='set-p-1'>Notifications</p>
            <p>Choose what notifications <span className='d-block'>you get from Good Deeds</span></p>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}

export default Settings
