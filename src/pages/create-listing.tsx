import React, { useState } from "react";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CreateDonationListing from "../components/CreateDonationListing"
import CreateVolunteerListing from "../components/CreateVolunteerListing"

const CreateListing = () => {
  const [selectedButton, setSelectedButton] = useState(1);

  const handleClickOne = () => {
    setSelectedButton(1);
  };

  const handleClickTwo = () => {
    setSelectedButton(2);
  };
  return (
    <>
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
        {selectedButton === 1 ? <CreateDonationListing /> : <CreateVolunteerListing />}
      </Sidebar>
      <Footer />
    </>
  );
};

export default CreateListing;
