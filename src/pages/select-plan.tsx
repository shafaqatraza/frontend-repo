import React, {useState} from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import Sidebar from "../components/Sidebar.jsx";
import back from "../assets/imgs/back.png";
import { Image } from "@chakra-ui/react";
import MonthlyPlan from "../components/MonthlyPlan";
import AnualPlan from "../components/AnualPlan";

const SelectPlan = () => {
  const [selectedButton, setSelectedButton] = useState(1);

  const handleClickOne = () => {
    setSelectedButton(1);
  }

  const handleClickTwo = () => {
    setSelectedButton(2);
  }
  return (
    <>
      <Navbar />
      <Sidebar>
        <div className="plan-main"></div>
        <div className="ms-2">
          <Image src={back.src}/>
        </div>
        <div className="ms-5 mt-5">
          <p className="modal-txt ms-3">Select Plan</p>
        </div>
       <div className="d-flex">
       <div style={{marginLeft:"7rem"}} className="btn-list mt-5">
            <div className="d-flex">
              <button onClick={handleClickOne} className={selectedButton === 1 ? 'donate-btn2 shadow' : 'donatee-btn'}>Monthly</button>
              <button onClick={handleClickTwo} className={selectedButton === 2 ? 'donate-btn2 shadow' : 'donatee-btn'}>Annual</button>
            </div>
          </div>
          <div className="mt-5 d-flex align-items-center ms-4">
            <p className="save-txt">Save 20% anually</p>
          </div>
       </div>
        {/* <button onClick={handleClickOne}>Component One</button>
      <button onClick={handleClickTwo}>Component Two</button> */}
      {selectedButton === 1 ? <MonthlyPlan /> : <AnualPlan />}
      </Sidebar>
      <Footer />
    </>
  );
};

export default SelectPlan;
