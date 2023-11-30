import React, {useState} from "react";
import Navbar from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import Sidebar from "../../../components/Sidebar.jsx";
import back from "../../../assets/imgs/back.png";
import { Image } from "@chakra-ui/react";
import MonthlyPlan from "../../../components/organization/paymentplans/MonthlyPlan";
import AnualPlan from "../../../components/organization/paymentplans/AnualPlan";
import Link from "next/link";

const SelectPlan = () => {
  const [selectedButton, setSelectedButton] = useState(1);

  const handleClickOne = () => {
    setSelectedButton(1);
  }

  const handleClickTwo = () => {
    setSelectedButton(2);
  }
  return (
    <div style={{overflowX:"hidden"}}>
      <Navbar />
      <Sidebar>
        <div className="plan-main"></div>
        <div className="ms-2">
          <Link href={`/organization`}>
            <Image src={back.src} style={{ cursor: 'pointer' }} />
          </Link>
        </div>
        <div className="ms-5 mt-5">
          <p className="modal-txt ms-3">Select Plan</p>
        </div>
       <div className="d-flex flex-column flex-md-row">
       <div style={{marginLeft:"7rem"}} className="btn-list mt-5 select-plan-tabs">
            <div className="d-flex">
              <button onClick={handleClickOne} className={selectedButton === 1 ? 'donate-btn2 shadow' : 'donatee-btn'}>Monthly</button>
              <button onClick={handleClickTwo} className={selectedButton === 2 ? 'donate-btn2 shadow' : 'donatee-btn'}>Annual</button>
            </div>
          </div>
          <div className="mt-5 d-flex align-items-center justify-content-md-start justify-content-center ms-4">
            <p className="save-txt">Save 20% anually</p>
          </div>
       </div>
        {/* <button onClick={handleClickOne}>Component One</button>
      <button onClick={handleClickTwo}>Component Two</button> */}
      {selectedButton === 1 ? <MonthlyPlan /> : <AnualPlan />}
      </Sidebar>
      <Footer />
    </div>
  );
};

export default SelectPlan;
