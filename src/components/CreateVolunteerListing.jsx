import React, {useState, useEffect} from "react";
import CreateListing from "../components/CreateListing"
import CreateApplication from "../components/CreateApplication"

const Listings = (props) => {
  const {selectedForm} = props; 
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

  useEffect(() => {
    if(selectedForm){
      if (selectedForm === 'application') {
        handleClickTwo(); 
      } else if (selectedForm === 'volunteer') {
        handleClickOne(); 
      }
    }
  }, [selectedForm]);

  return (
    <>
      <div className="row container-fluid main-side">
        <div className="col-md-8">
          <div className="d-flex mt-5">
            <div>
            <button onClick={handleClickOne} className="listing-txt">Create a Listing</button>
            {showDiv && <div className="h-r"></div>}
            </div>
            <div>
            <button onClick={handleClickTwo} className="listing-txt ms-5">Create an Application</button>
            {showDiv2 && <div className="h-r ms-5"></div>}
            </div>
          </div>
        </div>
        {selectedButton === 1 ? <CreateListing /> : <CreateApplication />}
      </div>
    </>
  );
};

export default Listings;
