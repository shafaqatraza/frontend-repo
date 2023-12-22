import React, {useState, useEffect} from "react";
import Link from "next/link";
import { Image, Input } from "@chakra-ui/react";
import back from "../../../assets/imgs/back.png";
import { FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import DonationPayoutsMonth from "./DonationPayoutsMonth";
import { useRouter } from 'next/router'
import { accessToken, baseUrl, currOrgSlug } from "../../Helper/index";
import axios from "axios";

const DonationPayouts = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  const [showDiv, setShowDiv] = useState(true);
  const [currentPayoutMethod, setCurrentPayoutMethod] = useState("XX");
  const [donationPayouts, setDonationPayouts] = useState([]);

  const router = useRouter()
  const { donationmonth, start_date ,end_date, currPayoutMethod} = router.query;
  const currentDate = new Date();
  const estimatedPayoutDate = new Date();
  estimatedPayoutDate.setDate(currentDate.getDate() + 15);
 
  useEffect(() => {
    if(currOrgSlug){
      axios
        .get(
          `${baseUrl}/billing-and-payments/donation-method/current-payout-method?org=${currOrgSlug}`,
          {
            headers: {
              Authorization: "Bearer " + accessToken()
            },
          }
        )
        .then((res) => {
            setCurrentPayoutMethod(res.data.data.lastTwoDigits);
        })
        .catch((err) => {
          console.log(err);
        });

        axios
        .get(
          `${baseUrl}/billing-and-payments/donation-payouts?org=${currOrgSlug}`,
          {
            headers: {
              Authorization: "Bearer " + accessToken()
            },
          }
        )
        .then((res) => {
            setDonationPayouts(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

  }, [currOrgSlug]);


const itemsPerPageOptions = [3, 5, 10];
const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
const [currentPage, setCurrentPage] = useState(1);

const totalPages = Math.ceil(donationPayouts.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = Math.min(startIndex + itemsPerPage, donationPayouts.length);

const currentData = donationPayouts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  const handlePayoutMethod = () => {
    router.push('/organization/billing-and-payments/donation-payouts/payout-method');
  };
  

  return (
    <>
    {donationmonth ? (
        <DonationPayoutsMonth 
            donationmonth = {donationmonth} 
            start_date = {start_date}
            end_date = {end_date}
            currPayoutMethod = {currPayoutMethod}
        />
    ) : (
        <div className="col">
        <div className="row pb-4 mt-3">
            <div className='mt-md-5 d-flex align-items-center'>
                <Link href={`/organization/billing-and-payments`}>
                    <Image src={back.src} style={{ cursor: 'pointer' }} />
                </Link>
                <p style={{ fontSize:"30px", fontWeight:"600", lineHeight:"37px", marginLeft: "15px" }} className='text-center text-md-start'>Donation Payouts</p>
            </div>
            </div>
        <div className="row">
            <div className="col-md-11 col-sm-6 pt-5">
                <div className="card mb-1 shadow mt-3 border-0">
                    <div className="mt-3 mb-3" style={{marginLeft:"28px"}}>
                        <div className="row">
                            <div className="col-md-10">
                                <div className="pt-3">
                                    <p style={{fontSize:"25px", fontWeight:"600", lineHeight:"37px"}} className='text-center text-md-start'>Payouts</p>
                                </div>
                                <div className='mt-2 mb-4 align-items-center d-flex'>
                                    <p>Estimated Payout Date: {estimatedPayoutDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} via bank account (***{currentPayoutMethod})</p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="pt-3" style={{ color: '#0393fb'}}>
                                    <Link href={`/organization/donation-analytics`}>View Donations</Link>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-md-11 col-sm-6 pt-1">
                <div className="card mb-3 shadow mt-3 border-0">
                    <div className="mt-3 mb-3" style={{marginLeft:"28px", marginRight: "28px"}}>
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table">
                                    <tbody>
                                    {currentData.map((rowData, index) => (
                                        
                                        <tr>
                                            <div 
                                                onClick={() => {
                                                    router.push(`/organization/billing-and-payments/donation-payouts?donationmonth=${encodeURIComponent(rowData.label)}&start_date=${encodeURIComponent(rowData.startDate)}&end_date=${encodeURIComponent(rowData.endDate)}&currPayoutMethod=${encodeURIComponent(currentPayoutMethod)}`);
                                                }}
                                            >
                                                
                                                <td className="hover-link">{rowData.label}</td>
                                            </div>
                                        </tr>
                                        
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-end align-items-center">
                                <span>Rows per page: {itemsPerPage}</span>
                                <Dropdown className="ml-2 mr-10">
                                    <Dropdown.Toggle variant=""></Dropdown.Toggle>

                                    <Dropdown.Menu style={{ maxHeight: '150px', overflowY: 'auto', minWidth: 'unset', width: 'auto' }}>
                                        {itemsPerPageOptions.map((option, index) => (
                                            <Dropdown.Item key={index} onClick={() => handleItemsPerPageChange(option)} style={{ fontSize: '14px' }}>
                                                {option}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <span>{`${startIndex + 1}-${endIndex} of ${donationPayouts.length}`}</span>
                                <FaChevronLeft
                                    className={`${currentPage === 1 ? 'disabled' : ''}`}
                                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                    style={{ marginRight: '1cm', marginLeft: '8px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                                    title={currentPage === 1 ? 'Already on the first page' : 'Go to the previous page'}
                                />
                                <FaChevronRight
                                    className={`ml-2 ${currentPage === totalPages ? 'disabled' : ''}`}
                                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                                    style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                                    title={currentPage === totalPages ? 'Already on the last page' : 'Go to the next page'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>          

        <div className="row">
            <div className="col-md-11 col-sm-6 pt-1">
                <div className="card mb-5 shadow mt-3 border-0">
                    <div className="mt-3 mb-3" style={{marginLeft:"28px"}}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="pt-3">
                                    <p style={{fontSize:"25px", fontWeight:"800", lineHeight:"37px"}} className='text-center text-md-start'>Current Payout Method</p>
                                </div>
                                <div className='mt-2 mb-4 align-items-center'>
                                    <p className="p-txt2">Bank account</p>
                                    <p className="p-txt2">***{currentPayoutMethod}</p>
                                    <p className="p-txt2">Payouts will be deposited in CAD</p>
                                </div>
                                <div className='mt-2 mb-4 align-items-center d-flex'>
                                    <p className="p-txt2">Transfers may take 1-7 business days</p>
                                </div>
                                <div className='mt-4 align-items-center d-flex'>
                                    <button className='billing-payments-btn' onClick={ () => handlePayoutMethod() } >Manage Payout Method</button>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        </div>  
    )}
    </>
  );
};

export default DonationPayouts;
