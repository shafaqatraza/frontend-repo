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
import { accessToken, baseUrl, currentOrganization } from "../../../components/Helper/index";
import { useToast } from '@chakra-ui/toast'
import Head from "next/head";
import fav from "../../../assets/imgs/favicon.ico"

const Listings = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const selectedTab = router.query.page;
  const [orgSlug, setOrgSlug] = useState("");
  const [orgType, setOrgType] = useState(null);
  const [userPermissions, setUserPermissions] = useState({
    role: '',
    permissions: [] as any
  });
  const toast = useToast()
  // @ts-ignore: 
  const organizationType = currentOrganization.type;

  useEffect( ()=> {
    if(organizationType === 'For-Profit Organization'){
      setSelectedButton(2)
    }

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

  }, [organizationType])

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
      <Head>
        {/* <title>Good Deeds | Profile</title> */}
        <title>Good Deeds | Organization Listings</title>
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
        <div className='d-flex justify-content-md-between justify-content-center pb-4 flex-wrap'>
          <div className="btn-list mt-5">
            <div className="d-flex">
              {organizationType !== 'For-Profit Organization' && (
                <button
                  onClick={handleClickOne}
                  className={
                    selectedButton === 1 ? "donate-btn2 shadow" : "donatee-btn"
                  }
                >
                  Donation Listing
                </button>
              )}
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
