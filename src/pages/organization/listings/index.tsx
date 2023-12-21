import React, {useState, useEffect} from 'react'
import Navbar from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import Sidebar from "../../../components/Sidebar.jsx";
import { Link } from '@chakra-ui/react';
import VolunteerListing from '../../../components/VolunteerListing';
import DonationListing from '../../../components/DonationListing';
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from 'next/router';
import axios from "axios";
import { accessToken, baseUrl } from "../../../components/Helper/index";
import { useToast } from '@chakra-ui/toast'

const Listings = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const selectedTab = router.query.page;
  const [orgSlug, setOrgSlug] = useState("");
  const [userPermissions, setUserPermissions] = useState({
    role: '',
    permissions: [] as any
  });
  const toast = useToast()

  useEffect( ()=> {
    axios
    .get(`${baseUrl}/organizations`, {
      headers: {
        Authorization: "Bearer " + accessToken(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => {
      setOrgSlug(res.data[0].slug);

    })
    .catch((err) => {
      console.log(err);
    });

  }, [])

  function getPermissions(){ 
    const rolePermissionsString = localStorage.getItem('rolePermissions');
    if (rolePermissionsString !== null) {
      const rolePermissions = JSON.parse(rolePermissionsString);
      setUserPermissions(rolePermissions);
    }
  }

  useEffect( ()=> {
    getPermissions()
  }, [])

  useEffect(() => {
    if (selectedTab === 'volunteer') {
      setSelectedButton(2); 
    } else if (selectedTab === 'donation') {
      setSelectedButton(1); 
    }
  }, [selectedTab]);
  
  const handleClickOne = () => {
    getPermissions()
    setSelectedButton(1);
  };

  const handleClickTwo = () => {
    getPermissions()
    setSelectedButton(2);
  };


  function handleCreateListing(selectedButton: number){
    if(userPermissions?.role === 'Superadmin' 
      || (userPermissions?.permissions && userPermissions.permissions.includes(`${selectedButton === 1? 'create_donation_listings' : 'create_volunteer_listings'}`))){
        
      const btnRoute = `listings/create?type=${selectedButton === 1? 'donation' : 'volunteer'}`;
      router.push(btnRoute);
    }else{
      toast({ position: "top", title: "You don't have the necessary permissions.", status: "warning" })
    }
  }

  function handleCreateApplication(){
    if(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('create_applications'))){
      const btnRoute = `listings/create?type=volunteer&form=application`;
      router.push(btnRoute);
    }else{
      toast({ position: "top", title: "You don't have the necessary permissions.", status: "warning" })
    }
  }

  


  return (
    <div style={{overflowX:"hidden"}}>
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
        <div className='d-flex justify-content-md-between justify-content-center pb-4 flex-wrap'>
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
          <div className='mt-5 align-items-center d-flex'>
              <button className='create-list-btn' onClick={() => handleCreateListing(selectedButton)}>Create Listing</button>
            {selectedButton === 2 ? 
              <button className='create-list-btn ml-2' onClick={handleCreateApplication}>Create Application</button>
            :null}
          </div>
        </div>
        {selectedButton === 1 ? 
        <DonationListing 
          orgSlug = {orgSlug} 
          userPermissions = {userPermissions} 
        /> : <VolunteerListing 
          orgSlug = {orgSlug}
          userPermissions = {userPermissions} 
        />}
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Listings
