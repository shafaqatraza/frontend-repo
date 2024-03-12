import React, { useState, useEffect } from "react";
import { Footer } from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import CreateDonationListing from "../../../components/CreateDonationListing"
import CreateVolunteerListing from "../../../components/CreateVolunteerListing"
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/toast'
import Head from "next/head";
import fav from "../../../assets/imgs/favicon.ico"

const CreateListing = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  const router = useRouter();
  const toast = useToast()
  const selectedListing = router.query.type;
  const selectedForm = router.query.form;
  const [userPermissions, setUserPermissions] = useState({
    role: '',
    permissions: [] as any
  });

  useEffect( ()=> {
    const rolePermissionsString = localStorage.getItem('rolePermissions');
    if (rolePermissionsString !== null) {
      const rolePermissions = JSON.parse(rolePermissionsString);
      setUserPermissions(rolePermissions);
    }
  }, [])

  useEffect(() => {
    if (selectedListing === 'volunteer') {
      setSelectedButton(2); 
    } else if (selectedListing === 'donation') {
      setSelectedButton(1); 
    }
  }, [selectedListing]);
  
  const handleClickOne = () => {
    if(userPermissions?.role === 'Superadmin' 
      || (userPermissions?.permissions && userPermissions.permissions.includes('create_donation_listings'))){
        setSelectedButton(1);
      }else{
        toast({ position: "top", title: "You don't have the necessary permissions.", status: "warning" })
      }
  };

  const handleClickTwo = () => {
    if(userPermissions?.role === 'Superadmin' 
      || (userPermissions?.permissions && userPermissions.permissions.includes('create_volunteer_listings'))){
        setSelectedButton(2);
    }else{
      toast({ position: "top", title: "You don't have the necessary permissions.", status: "warning" })
    }
  };
  return (
    <>
      <Head>
        <title>Good Deeds | Organization Create Listing</title>
        <link rel="icon" href={fav.src}  />
      </Head>
      <Navbar />
      <Sidebar>
        <div className="btn-list mt-5">
          <div className="d-flex">
            <button
              onClick={handleClickOne}
              className={
                selectedButton === 1 ? "donate-btn2 shadow" : "donatee-btn"
              }
            >
              Donation Listing
            </button>
            <button
              onClick={handleClickTwo}
              className={
                selectedButton === 2 ? "donate-btn2 shadow" : "donatee-btn"
              }
            >
              Volunteer Listing
            </button>
          </div>
        </div>
        {selectedButton === 1 ? <CreateDonationListing /> : <CreateVolunteerListing selectedForm = {selectedForm} userPermissions = {userPermissions} />}
      </Sidebar>
      <Footer />
    </>
  );
};

export default CreateListing;
