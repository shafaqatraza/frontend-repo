import React, {useState, useEffect} from 'react'
import { Footer } from "../../../../../components/Footer";
import Navbar from "../../../../../components/Navbar";
import Sidebar from "../../../../../components/Sidebar.jsx";
import UpdateListing from "../../../../../components/organization/listings/volunteer-listing/update-volunteer"
import UpdateApplication from "../../../../../components/organization/listings/volunteer-listing/update-application"

const EditVolunteerListing = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  const [showDiv, setShowDiv] = useState(true);
  const [showDiv2, setShowDiv2] = useState(false);

  const handleClickOne = () => {
    setSelectedButton(1);
    setShowDiv(true);
    setShowDiv2(false);
  };
 
  const handleClickTwo = () => {
    setSelectedButton(2);
    setShowDiv2(true)
    setShowDiv(false)

  };
  return (
    <div>
      <Navbar/>
      <Sidebar>
        <div className="btn-list mt-5">
          <div className="d-flex">
            <button className="donatee-btn">Donation Listing</button>
            <button className="donate-btn2 shadow">Volunteer Listing</button>
          </div>
        </div>
        <div className="row container-fluid main-side">
          <div className="col-md-8">
            <div className="d-flex mt-5">
              <div>
              <button onClick={handleClickOne} className="listing-txt">Update a Listing</button>
              {showDiv && <div className="h-r"></div>}
              </div>
              <div>
              <button onClick={handleClickTwo} className="listing-txt ms-5">Update an Application</button>
              {showDiv2 && <div className="h-r ms-5"></div>}
              </div>
            </div>
          </div> 
          {// @ts-ignore: Unreachable code error
          selectedButton === 1 ? <UpdateListing /> : <UpdateApplication />}
        </div>
      </Sidebar>
      <Footer/>
    </div>
  )
}

export default EditVolunteerListing
