import React, {useState, useEffect} from "react";
import Link from "next/link";
import { Image, Input } from "@chakra-ui/react";
import back from "../../../assets/imgs/back.png";
import { FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import { accessToken, baseUrl, currOrgSlug } from "../../../components/Helper/index";
import axios from "axios";

const DonationPayoutsTenure = (props) => {
    const { donationmonth, start_date, end_date, currPayoutMethod } = props;
    const [donations, setDonations] = useState([]);
    const [showDiv, setShowDiv] = useState(true);
    const [showDiv2, setShowDiv2] = useState(false);

    console.log('start_date', start_date, 'end_date', end_date)

    useEffect(() => {
        if(currOrgSlug){
          axios
            .get(
              `${baseUrl}/billing-and-payments/donation-payouts/tenure?org=${currOrgSlug}&start_date=${start_date}&end_date=${end_date}`,
              {
                headers: {
                  Authorization: "Bearer " + accessToken()
                },
              }
            )
            .then((res) => {
                setDonations(res.data.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
    
      }, [currOrgSlug]);

    const itemsPerPageOptions = [3, 5, 10];
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(donations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, donations.length);

    const currentData = donations.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1); // Reset to the first page when changing items per page
    };

  return (
    <>
    <div className="col">
    <div className="row pb-4 mt-3">
            <div className='mt-md-5 d-flex align-items-center'>
                <Link href={`/organization/billing-and-payments/donation-payouts`}>
                    <Image src={back.src} style={{ cursor: 'pointer' }} />
                </Link>
                <p style={{ fontSize:"30px", fontWeight:"600", lineHeight:"37px", marginLeft: "15px", color: '#22a0fb' }} className='text-center text-md-start'>{donationmonth}</p>
            </div>
        </div>
        <div className="row">
            <div className="col-md-11 col-sm-6 pt-5">
                <div className="card mb-1 shadow mt-3 border-0">
                    <div className="mt-3 mb-3 ml-7">
                        <div className="row">
                            <div className="col-md-10">
                                <div className="pt-3">
                                    <p style={{fontSize:"25px", fontWeight:"600", lineHeight:"37px"}} className='text-center text-md-start'>Total Amount Paid</p>
                                </div>
                                <div className='mt-2 mb-1 align-items-center d-flex'>
                                    <p style={{ fontSize:"25px", fontWeight:"600", lineHeight:"37px", color: "#e27832" }}>$0.00 CAD</p>
                                </div>
                                <div className='mt-2 mb-3 align-items-center d-flex'>
                                    <p>Sent Dec 1, 2023 via bank account ***{currPayoutMethod}</p>
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
                    <div className="mt-3 mb-3 ml-7 mr-7">
                        <div className="row">
                            <div className="col-md-12">
                            <table className="table">
                            <thead style={{ backgroundColor: '#dee3e6 !important' , height: '50px' }}>
                                <tr>
                                    <th>Date</th>
                                    <th>Donor</th>
                                    <th>Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentData.map((rowData, index) => (
                                    <tr key={index}>
                                    <td>{rowData.created_at}</td>
                                    <td>{rowData.full_name}</td>
                                    <td>${rowData.amount}</td>
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
                                <span>{`${startIndex + 1}-${endIndex} of ${donations.length}`}</span>
                                <FaChevronLeft
                                    className={`ml-2 ${currentPage === 1 ? 'disabled' : ''}`}
                                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                    style={{ marginRight: '1cm', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
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
    </div>
    </>
  );
};

export default DonationPayoutsTenure;
