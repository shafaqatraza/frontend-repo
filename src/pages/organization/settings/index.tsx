import React from 'react'
import { useState, useEffect } from 'react'
import Sidebar from '../../../components/Sidebar'
import Navbar from '../../../components/Navbar'
import { Footer } from '../../../components/Footer'
import { useRouter } from "next/router";
import { HamburgerIcon } from "@chakra-ui/icons";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Icon } from '@chakra-ui/react';
import { FaLock } from 'react-icons/fa';

const Settings = () => {
  const [modalshow, setmodalShow] = useState(false);
  const [userPermissions, setUserPermissions] = useState({
    role: '',
    permissions: [] as any
  });

  const handleClose = () => setmodalShow(false);
  const handleShow = () => setmodalShow(true);
  const [show, setShow] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const rolePermissionsString = localStorage.getItem('rolePermissions');
    if (rolePermissionsString !== null) {
      const rolePermissions = JSON.parse(rolePermissionsString);
      setUserPermissions(rolePermissions);

      if (rolePermissions?.role !== 'Superadmin' && !rolePermissions?.permissions?.includes('view_settings')) {
        // router.push('/organization/access-denied');
        router.push('/organization');
      }
    }
  }, []);

  return (
    <div style={{overflowX:"hidden"}}>
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
            <p style={{ fontSize: "30px", fontWeight: "600", lineHeight: "37px" }}>Settings</p>
          </div>
          <div className="row mx-0 mt-5">
            {(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('view_profile'))) ? (
            <div onClick={() => router.push("/organization/profile")} style={{ cursor: "pointer" }} className="col-md-4">
              <p className='set-p-1'>Business Info</p>
              <p className='mt-2'>Edit company information  <span className='d-block'>and change logo</span></p>
            </div>
            ) : null}
            {(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('view_payments'))) ? (
            <div onClick={() => router.push("")} style={{ cursor: "pointer" }} className="col-md-4">
              <p className='set-p-1'>Billing and Payments</p>
              <p>View invoices and modify  <span className='d-block'>payment details</span></p>
            </div>
            ) : null}
            {/* <div onClick={() => router.push("/payment")} style={{ cursor: "pointer" }} className="col-md-4">
              <p className='set-p-1'>Member Login & Security</p>
              <p>Manage site members’ login, <span className='d-block'>sign up, profiles, and security</span></p>
            </div> */}
          </div>
          <div className='row mx-0 mt-5'>
            {(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('update_payments'))) ? (
            <div onClick={() => router.push("/organization/payment-plans")} style={{ cursor: "pointer" }} className="col-md-4">
              <p className='set-p-1'>Manage Plan</p>
              <p className='mt-2'>Upgrade or modify your <span className='d-block'>plan</span></p>
            </div>
            ) : null}
            {(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('view_roles_permissions'))) ? (
            <div onClick={() => router.push("/organization/settings/roles-and-permissions")} style={{ cursor: "pointer" }} className="col-md-4">
              <p className='set-p-1'>Member Roles & Permissions</p>
              <p className='mt-2'>Invite people to work on this  <span className='d-block'>site and set their permissions</span></p>
            </div>
            ) : null}
          </div>
          {(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('view_notifications'))) ? (
          <div onClick={() => router.push("/organization/settings/notifications")} style={{ cursor: "pointer" }} className="row mx-0 mt-5">
            <p className='set-p-1'>Notifications <span className='ms-1'><Icon as={FaLock} width={"12px"}/></span></p>
            <p>Choose what notifications <span className='d-block'>you get from Good Deeds</span></p>
          </div>
          ) : null}
        </div>
      </div>
      <Modal show={modalshow} onHide={handleClose}>
        <Modal.Header closeButton className='py-2'>
          <Modal.Title className='fs-5'>Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body className='fs-6'>Comming Soon</Modal.Body>
      </Modal>
      <Footer />
    </div>
  )
}

export default Settings
