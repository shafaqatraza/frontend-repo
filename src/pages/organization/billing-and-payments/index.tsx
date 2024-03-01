import React, { useEffect } from "react";
import { Footer } from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import BillingAndPayments from '../../../components/organization/billing-and-payments/BillingAndPayments';

import { useState} from "react";
import Sidebar from "../../../components/Sidebar";
import { accessToken, baseUrl, currOrgId, currOrgSlug } from "../../../components/Helper/index";
import axios from "axios";
import { useRouter } from 'next/router'
import { HamburgerIcon } from "@chakra-ui/icons";
import { useToast } from '@chakra-ui/toast'


const organization = () => {
  const toast = useToast()
  const [organization, setOrganization] = useState([]);
  const router = useRouter()
  const [show, setShow] = React.useState(false);
  const [userPermissions, setUserPermissions] = useState({
    role: '',
    permissions: [] as any
  });
  const [connectAccountId, setConnectAccountId] = useState("");
  
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
    if (currOrgSlug !== "") {
      axios.get(`${baseUrl}/billing-and-payments/stripe-connect-account/${currOrgSlug}`, {
        headers: {
          Authorization: 'Bearer ' + accessToken(),
        }
      })
        .then((res) => {
          setConnectAccountId(res.data.account_id);
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server responded with an error:', error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', error.message);
          }

        });
    }
  }, [currOrgSlug]);
  

useEffect(() => {
  const fetchData = async () => {
    // Extract parameters from the query string
    const code = router.query.code;
    if(code){
      try {
        // Make a request to your backend API with the extracted parameters
        const response = await fetch(`${baseUrl}/organization/connect-account/callback`, {
          method: 'POST',
          headers: {
            Authorization: "Bearer " + accessToken(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ currOrgId, code }),
        });

        if (response.ok) {
            // Handle success (e.g., display a success message to the user)
            const data = await response.json();
            setConnectAccountId(data.account_id);
            toast({ position: "top", title: "Connect account created successfully", status: "success" })
            
        } else {
            // Handle error (e.g., display an error message to the user)
            console.error('Error creating connect account', response.statusText);
        }

        // Process the response if needed
      } catch (error) {
        console.error('Error calling connect-account-redirect API:', error);
      }
    }
  };

  fetchData(); // Call the async function immediately
}, [router.query.state, router.query.code]); // Dependency array includes the parameters

  return (
    <div style={{overflowX:"hidden"}}>
        <Navbar />
        <div>
            <div className="row container-md-fluid main-side m-0 justify-content-center">
                <button className="d-block d-lg-none fs-2 text-start ps-3 mt-3" onClick={() => setShow(!show)}><HamburgerIcon/></button>
                <div className="col-3 ps-0 organization-dash d-none d-lg-block">
                    <Sidebar>
                    </Sidebar>
                </div>
                {show && 
                <div className="col-lg-3 px-0 wel-dashboard d-block d-lg-none">
                    <Sidebar>
                    </Sidebar>
                </div>
                }
                
                <BillingAndPayments connectAccountId = {connectAccountId} />
          
            </div>
        </div>
        <Footer />
    </div>
  );
};

export default organization;
