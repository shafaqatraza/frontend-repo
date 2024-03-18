// pages/not-authorized.js
import React, {useState, useEffect} from 'react'
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import Sidebar from "../../components/Sidebar.jsx";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from 'next/router';
import Head from "next/head";
import fav from "../../assets/imgs/favicon.ico"

const NotAuthorized = () => {
    const [show, setShow] = useState(false);
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div style={{overflowX:"hidden"}}>
            <Head>
                <title>Good Deeds | Organization Not-Authorized</title>
                <link rel="icon" href={fav.src}  />
            </Head>
            <Navbar/>
            <div className="row m-0">
                <button className="d-block d-lg-none fs-2 text-start ps-3 mt-3" onClick={() => setShow(!show)}><HamburgerIcon/></button>
                <div className="col-3 ps-0 organization-dash d-none d-lg-block">
                    <Sidebar></Sidebar>
                </div>
                {show && <div className="col-lg-3 px-0 wel-dashboard d-block d-lg-none">
                    <Sidebar></Sidebar>
                </div>
                }
                <div className="col">
                    <div className="centered-container">
                        <div className="access-denied-container">
                            <h1 className="access-denied-title">Not Authorized</h1>
                            <p className="access-denied-message">You are not authorized to access this page.</p>
                            <button className='create-list-btn mt-4' onClick={handleGoBack}>Go Back</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
        
    );
};

export default NotAuthorized;