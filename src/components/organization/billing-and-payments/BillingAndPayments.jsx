import React, {useState, useEffect} from "react";
import { useRouter } from 'next/router';

const BillingAndPayments = () => {
  const router = useRouter();

  const [userPermissions, setUserPermissions] = useState({
    role: '',
    permissions: []
  });
  
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
    router.push('/organization/billing-and-payments/donation-payouts/payout-method');
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
                    <div className="mt-3 mb-3 ml-7">
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
                <div className="card mb-5 shadow mt-5 border-0">
                    <div className="mt-3 mb-3 ml-7">
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
    </div>
    </>
  );
};

export default BillingAndPayments;
