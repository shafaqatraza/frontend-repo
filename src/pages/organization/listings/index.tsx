import React, {useState, useEffect} from 'react'
import Navbar from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import Sidebar from "../../../components/Sidebar.jsx";
import { Link } from '@chakra-ui/react';
import VolunteerListing from '../../../components/VolunteerListing';
import DonationListing from '../../../components/DonationListing';
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from 'next/router';
const Listings = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const selectedTab = router.query.page;

  useEffect(() => {
    if (selectedTab === 'volunteer') {
      setSelectedButton(2); 
    } else if (selectedTab === 'donation') {
      setSelectedButton(1); 
    }
  }, [selectedTab]);
  
  const handleClickOne = () => {
    setSelectedButton(1);
  };

  const handleClickTwo = () => {
    setSelectedButton(2);
  };

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
              <Link href='listings/create'>
                    <button className='create-list-btn'>Create Listing</button>
                </Link>
            </div>
        </div>
        {selectedButton === 1 ? <DonationListing /> : <VolunteerListing />}
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Listings
