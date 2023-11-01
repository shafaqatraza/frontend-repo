import React, {useEffect, useState} from 'react'
import Sidebar from '../../../components/Sidebar'
import Navbar from '../../../components/Navbar'
import { Footer } from '../../../components/Footer'
import { Table } from "antd";
import axios from "axios";
import { accessToken, baseUrl, currOrgSlug } from '../../../components/Helper/index'
import moment from 'moment';
import { HamburgerIcon } from "@chakra-ui/icons";
import { Button } from 'react-bootstrap';
import { useToast } from '@chakra-ui/toast'
import {
  Spinner,
  Center,
} from '@chakra-ui/react'

interface NotificationSettingType {
  news_and_updates: boolean,
  tips_and_tutorials: boolean,
  user_research: boolean,
  new_applicant: boolean,
  new_donation: boolean,
  new_favourite: boolean,
  in_app_notify: boolean,
  new_message: boolean
}

const NotificationSetting = () => {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [donationData, setDonationData] = useState([]);
  const [slug, setSlug] = useState("");
  const [show, setShow] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [notificationSetting, setNotificationSetting] = useState<NotificationSettingType>({
    news_and_updates: false,
    tips_and_tutorials: false,
    user_research: false,
    new_applicant: false,
    new_donation: false,
    new_favourite: false,
    in_app_notify: true,
    new_message: false
  });

  interface DataSourceType {
    key: string;
    user: string;
    date: string;
    amount: string;
  }


  useEffect( ()=> {
    axios
    .get(`${baseUrl}/organizations`, {
      headers: {
        Authorization: "Bearer " + accessToken(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => {
      setSlug(res.data[0].slug);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });

  }, [])


 



  const handleSaveSetting = (e: any) => {
    e.preventDefault();
    setIsUpdating(true);
  };


  return (
    <div style={{overflowX:"hidden"}}>
    <Navbar/>
    
    <div className="row m-0">
    <button className="d-block d-lg-none fs-2 text-start ps-3 mt-3" onClick={() => setShow(!show)}><HamburgerIcon/></button>
      <div className="col-3 ps-0 organization-dash d-none d-lg-block">
        <Sidebar>
        </Sidebar>
      </div>
      {show && <div className="col-lg-3 px-0 wel-dashboard d-block d-lg-none">
          <Sidebar>
          </Sidebar>
      </div>}
      
      <div className="col">
      {isLoading && (
        <Center h="900px">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="orange.200"
            color="orange.500"
            size="xl"
          />
        </Center>
      )}
      {!isLoading && ( 
        <>
        <div className="row">
          <div className='mt-md-5 mt-4'>
            <p style={{fontSize:"30px", fontWeight:"600", lineHeight:"37px"}} className='mt-md-5 text-center text-md-start'>Member Roles & Permissions</p>
          </div>
        <div className='col-md-10'></div>
          <div className="col-md-2">
            <div className="d-flex justify-content-center">
                <button type="submit" onClick={(e) => {handleSaveSetting(e)}} disabled={isUpdating} id="submit" className="btn-reset">
                    <span id="button-text">
                    {isUpdating ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div> : "Save"}
                    </span>
                </button>
            </div>
          </div>
        </div>
        <div className="row mt-5" style={{'backgroundColor': '#dee3e6', 'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'>Users</p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'>Member</p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'>Manager</p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'>Admin</p>
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row mt-3" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Create User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>View Users</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Update User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Delete User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        

        <div className="row mt-3" style={{'backgroundColor': '#dee3e6', 'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'>Roles</p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'></p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'></p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'></p>
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row mt-3" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Create User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>View Users</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Update User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Delete User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
       
        <div className="row mt-3" style={{'backgroundColor': '#dee3e6', 'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'>Listings</p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'></p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'></p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'></p>
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row mt-3" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Create User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>View Users</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Update User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Delete User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        

        <div className="row mt-3" style={{'backgroundColor': '#dee3e6', 'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'>Applications</p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'></p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'></p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'></p>
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row mt-3" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Create User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>View Users</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Update User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Delete User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>

        <div className="row mt-3" style={{'backgroundColor': '#dee3e6', 'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'>Messages</p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'></p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'></p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'></p>
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row mt-3" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Create User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>View Users</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Update User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Delete User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>


        <div className="row mt-3" style={{'backgroundColor': '#dee3e6', 'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'>Certificates</p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'></p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'></p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'></p>
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row mt-3" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Create User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>View Users</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Update User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Delete User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>

        <div className="row mt-3" style={{'backgroundColor': '#dee3e6', 'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'>Payments</p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'></p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'></p>
          </div>
          <div className='col-md-1'>
            <p style={{fontSize:"20px", fontWeight:"600"}} className='text-center text-md-start'></p>
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row mt-3" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Create User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>View Users</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Update User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="row mb-20" style={{'padding': 'inherit'}}>
          <div className='col-md-8'>
            <p style={{fontSize:"15px"}} className='text-center text-md-start'>Delete User</p>
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            /> 
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1 text-center'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
            />
          </div>
          <div className='col-md-1'></div>
        </div>
        </>
        )}
      </div>
      
    </div>
    
    <Footer/>
    </div>
  )
}

export default NotificationSetting
