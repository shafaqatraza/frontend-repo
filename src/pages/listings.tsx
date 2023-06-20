import React, {useState} from 'react'
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import Sidebar from "../components/Sidebar.jsx";
import { Link } from '@chakra-ui/react';
import VolunteerListing from '../components/VolunteerListing';
import DonationListing from '../components/DonationListing';

const Listings = () => {
  const [selectedButton, setSelectedButton] = useState(1);

  const handleClickOne = () => {
    setSelectedButton(1);
  };

  const handleClickTwo = () => {
    setSelectedButton(2);
  };

  return (
    <>
    <Navbar/>
    <Sidebar>
    <div className='d-flex justify-content-between flex-wrap'>
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
          <Link href='/create-listing'>
          <button className='create-list-btn'>Create Listing</button>
          </Link>
         </div>
    </div>
    {selectedButton === 1 ? <DonationListing /> : <VolunteerListing />}

    </Sidebar>
    <Footer/>
    </>
  )
}

export default Listings
