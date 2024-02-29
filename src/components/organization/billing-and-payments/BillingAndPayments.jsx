import React, {useState, useEffect} from "react";
import { useRouter } from 'next/router';
import { accessToken, baseUrl, currOrgId, currOrgSlug} from '../../Helper/index'
import axios from 'axios';
import { useToast } from '@chakra-ui/toast'
import StripeIcon from '../../../assets/imgs/stripe/stripe-icon.png'
import StripeLogo from '../../../assets/imgs/stripe/stripe-logo-blue.png'
import {
  Box,
  Flex,
  Divider,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Center,
  Stack,
  Image,
  CheckCircleIcon
} from "@chakra-ui/react";
const BillingAndPayments = () => {
  const router = useRouter();
  const toast = useToast()
  const [userPermissions, setUserPermissions] = useState({
    role: '',
    permissions: []
  });
  const [loading, setLoading] = useState(true); 
  const [isAccountConnected, setIsAccountConnected] = useState(false);
  const [account, setAccount] = useState(false);
  const [connectAccountData, setConnectAccountData] = useState("");
  
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

  function handleDonationPayouts(){
    if(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('create_applications'))){
      const btnRoute = `billing-and-payments/donation-payouts`;
      router.push(btnRoute);
    }else{
      toast({ position: "top", title: "You don't have the necessary permissions.", status: "warning" })
    }
  }

  const handlePayoutMethod = () => {
    router.push('/organization/payment-plans');
  };

//   useEffect(() => {  
//     if (connectAccountData == "") {
//         try {
// 			axios.get(`${baseUrl}/billing-and-payments/stripe-connect-account/${currOrgSlug}`,
// 				{
// 				headers: {
// 					Authorization: "Bearer " + accessToken(),
// 					'Content-Type': 'application/json',
// 				},
// 				})
// 				.then((res) => {
// 					if (res.status === 200) {  // Check HTTP status directly
					
// 						setConnectAccountData(res.data.account_id);
// 						setAccount(true);
// 					} else {
// 						console.error('Error fetching connect account data:', res.status);
// 					}
// 				})
// 				.catch((err) => {});

				
//         } catch (error) {
//             console.error('Error fetching connect account data', error);
//         }
//     }
// }, [currOrgSlug]);

console.log('111111',isAccountConnected,  connectAccountData);
const handleCreateAccount = async () => {
  try {
    const response = await fetch(`${baseUrl}/organization/create-stripe-link`, {
      method: 'POST',
      headers: {
        Authorization: "Bearer " + accessToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currOrgId }),
    });

    if (!response.ok) {
      toast({ position: "top", title: "Something gone wrong, please try again later.", status: "error" })
      // throw new Error('Could not create Stripe link');
    }

    // Retrieve the OAuth link from the response
    const { url } = await response.json();

    // Redirect the user to the OAuth link
    window.location.href = url;
  } catch (error) {
    console.error('Error creating connect account link', error);
  }
};

  return (
    <>
    <div className="col">
        <div className="row pb-4">
            <div className='mt-md-5 mt-4'>
                <p style={{fontSize:"30px", fontWeight:"600", lineHeight:"37px"}} className='mt-md-5 text-center text-md-start'>Billing and Payments</p>
            </div>
        </div>
        <div className="row">
            <div className="col-md-5 col-sm-6 pt-5">
                <div className='mt-md-5 mt-4'>
                    <p style={{fontSize:"25px", fontWeight:"600", lineHeight:"37px"}} className='mt-md-5 text-center text-md-start'>Billing</p>
                </div>
            </div>
            <div className="col-md-6 col-sm-6 pt-5 ">
                <div className="card mb-5 shadow mt-5 border-0">
                    <div className="mt-3 mb-3" style={{marginLeft:"28px"}}>
                        <div className="pt-3">
                            <p>Manage your billing information and your plan</p>
                        </div>
                        <div className='mt-4 align-items-center d-flex'>
                            <button className='billing-payments-btn' onClick={handlePayoutMethod}>View Billing Information</button>
                        </div>
                    </div>
                </div>
            </div>
            <hr style={{ borderTop: "2px solid #000", width: "100%", margin: "0 auto", fontWeight: "bold" }} />
        </div>
        <div className="row">
            <div className="col-md-5 col-sm-6">
                <div className='mt-md-5 mt-4'>
                    <p style={{fontSize:"25px", fontWeight:"600", lineHeight:"37px"}} className='mt-md-5 text-center text-md-start'>Donation Payouts</p>
                </div>
            </div>
            <div className="col-md-6 col-sm-6">
                <div className="card mb-3 shadow mt-5 border-0">
                    <div className="mt-3 mb-3" style={{marginLeft:"28px"}}>
                        <div className="pt-3">
                            <p>View monthly donor payouts and manage banking details</p>
                        </div>
                        <div className='mt-4 align-items-center d-flex'>
                            <button className='billing-payments-btn' onClick={ () => handleDonationPayouts() } >Manage Payouts</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-5 col-sm-6">
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="card mb-5 shadow border-0">
                <div className="mt-3 mb-3" style={{ margin: "28px" }}>
                  <div className="pt-2 pb-2">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-4">
                            <div className="">
                              <Image
                                boxSize="90%"
                                objectFit="cover"
                                src={StripeIcon.src}
                                alt={'stripe icon'}
                                borderRadius={5}
                              />
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="mt-1 mb-2 pb-2">
                              <Image
                                boxSize="100%"
                                width={"40%"}
                                objectFit="cover"
                                src={StripeLogo.src}
                                alt={'stripe icon'}
                                borderRadius={5}
                              />
                            </div>
                            <div className="mt-2 mb-1 mt-2">
                              <p>**************4563</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 d-flex justify-content-end align-items-center">
					  <button className='stripe-connect' onClick={() => handleCreateAccount()}>Connect</button>
					  	{/* {connectAccountData 1? (
							<button className='stripe-connect'>Connected
								<CheckCircleIcon boxSize={6} color="green.500" />
							</button>
						):(
							<button className='stripe-connect' onClick={() => handleCreateAccount()}>Connect</button>
						)} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default BillingAndPayments;
