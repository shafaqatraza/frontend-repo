import React, {useState, useEffect} from "react";
import CreateListing from "../components/CreateListing"
import CreateApplication from "../components/CreateApplication"
import { useToast } from '@chakra-ui/toast'

const Listings = (props) => {
  const {selectedForm, userPermissions} = props; 
  const [selectedButton, setSelectedButton] = useState(1);
  const [showDiv, setShowDiv] = useState(true);
  const [showDiv2, setShowDiv2] = useState(false);
  const toast = useToast()

  const handleClickOne = () => {

    if(userPermissions?.role === 'Superadmin' 
      || (userPermissions?.permissions && userPermissions.permissions.includes('create_volunteer_listings'))){
        setSelectedButton(1);
        setShowDiv(true);
        setShowDiv2(false);
    }else{
      toast({ position: "top", title: "You don't have the necessary permissions.", status: "warning" })
    }
  };

  const handleClickTwo = () => {
    if(userPermissions?.role === 'Superadmin' 
      || (userPermissions?.permissions && userPermissions.permissions.includes('create_applications'))){
      setSelectedButton(2);
      setShowDiv2(true)
      setShowDiv(false)
    }else{
      toast({ position: "top", title: "You don't have the necessary permissions.", status: "warning" })
    }
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
            <button onClick={handleClickTwo} className="listing-txt ms-5">Create Application Form</button>
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
