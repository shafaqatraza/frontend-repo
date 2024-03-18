import React, { useEffect } from "react";
import { Footer } from "../../../../components/Footer";
import Navbar from "../../../../components/Navbar";
import PayoutMethodForm from "../../../../components/organization/billing-and-payments/PayoutMethodForm";
import { useState} from "react";
import Sidebar from "../../../../components/Sidebar";
import { accessToken, baseUrl } from "../../../../components/Helper/index";
import axios from "axios";
import { useRouter } from 'next/router'
import { HamburgerIcon } from "@chakra-ui/icons";
import { useToast } from '@chakra-ui/toast'
import Head from "next/head";
import fav from "../../../../assets/imgs/favicon.ico"
import { DonationGuard } from '../../../../components/Guards';
const Tenure  = () => {
  const toast = useToast()
  const [organization, setOrganization] = useState([]);
  const router = useRouter()
  const { tenure } = router.query;
  const [show, setShow] = React.useState(false);
  const [userPermissions, setUserPermissions] = useState({
    role: '',
    permissions: [] as any
  });
console.log('aaaaaaaaaaa', tenure)

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

  return (
    <DonationGuard>
    <div style={{overflowX:"hidden"}}>
        <Head>
          <title>Good Deeds | Organization Manage Payout Method</title>
          <link rel="icon" href={fav.src}  />
        </Head>
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
            
                <PayoutMethodForm/>

                
            </div>
        </div>
        <Footer />
    </div>
    </DonationGuard>
  );
};

export default Tenure ;
