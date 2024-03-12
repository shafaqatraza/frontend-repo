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
import Head from "next/head";
import fav from "../../../assets/imgs/favicon.ico"
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
  new_message: boolean,
  [key: string]: boolean
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
    in_app_notify: false,
    new_message: false
  });

  interface DataSourceType {
    key: string;
    user: string;
    date: string;
    amount: string;
  }

  const [userPermissions, setUserPermissions] = useState({
    role: '',
    permissions: [] as any
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
    })
    .catch((err) => {
      console.log(err);
    });

  }, [])

  useEffect( ()=> {
    if(slug !== ""){
      axios
      .get(`${baseUrl}/notification-settings/${slug}`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        
        if(res.data.data){
          setNotificationSetting(res.data.data);
        }
        
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    }

  }, [slug])


  const toggleNotificationSetting = (settingName: string) => {
    setNotificationSetting((prevSettings) => ({
      ...prevSettings,
      [settingName as keyof NotificationSettingType]: !prevSettings[settingName as keyof NotificationSettingType],
    }));
  };

  const handleSaveSetting = (e: any) => {
    if(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('update_notifications'))){
      e.preventDefault();
      setIsUpdating(true);

      // Prepare the notification settings data to be sent
      const notificationSettingsData = {
        news_and_updates: notificationSetting.news_and_updates,
        tips_and_tutorials: notificationSetting.tips_and_tutorials,
        user_research: notificationSetting.user_research,
        new_applicant: notificationSetting.new_applicant,
        new_donation: notificationSetting.new_donation,
        new_favourite: notificationSetting.new_favourite,
        in_app_notify: notificationSetting.in_app_notify,
        new_message: notificationSetting.new_message,
      };

      // Send a POST request to your Laravel API
      fetch(`${baseUrl}/notification-settings/${slug}/update`, {
        method: 'POST',
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(notificationSettingsData),
      })
        .then((response) => {
          if (!response.ok) {
            toast({ position: 'top', title: 'Failed to save notification settings', status: 'warning' })
            throw new Error('Failed to save notification settings');
            
          }
          return response.json();
        })
        .then((data) => {
          // Handle the API response (if needed)
          toast({ position: 'top', title: 'Notification settings saved successfully', status: 'success' })
          console.log('Notification settings saved successfully', data);
        })
        .catch((error) => {
          // Handle errors here
          toast({ position: 'top', title: 'Error saving notification settings', status: 'error' })
          console.error('Error saving notification settings:', error);
        })
        .finally(() => {
          setIsUpdating(false);
        });
    }else{
      toast({ position: "top", title: "You don't have the necessary permissions.", status: "warning" })
      return;
    }
  };


  return (
    <div style={{overflowX:"hidden"}}>
    <Head>
        <title>Good Deeds | Organization Notification-Settings</title>
        <link rel="icon" href={fav.src}  />
    </Head>
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
            <p style={{fontSize:"30px", fontWeight:"600", lineHeight:"37px"}} className='mt-md-5 text-center text-md-start'>Notifications</p>
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
        <div className="row">
          <div className='col-md-12'>
            <p style={{fontSize:"23px", fontWeight:"600", lineHeight:"37px"}} className='text-center text-md-start'>Email Notifications</p>
            <p className='mt-2' style={{fontSize:"15px"}}>Get emails to find out what's going on when you're not online. You can turn them off anytime.</p>
          </div>
        </div>
        <div className="line"></div>
        <div className="row">
          <div className='col-md-4'>
            <p style={{fontSize:"30px", fontWeight:"600", lineHeight:"37px"}} className='text-center text-md-start'>Notifications from us</p>
            <p className='mt-2'>Receive the latest news, </p>
            <p className='mt-2'>updates, and tutorials from us.</p>
          </div>
          <div className='col-md-6'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='news_and_updates'
                checked={notificationSetting?.news_and_updates === true}
                onChange={() => toggleNotificationSetting("news_and_updates")}
            /> 
            <h3 className="notification-heading">News and Updates</h3>
            <p className="notification-description">
                News about product and feature updates and promotions
            </p>

            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='tips_and_tutorials'
                checked={notificationSetting?.tips_and_tutorials === true}
                onChange={() => toggleNotificationSetting("tips_and_tutorials")}
            /> 
            <h3 className="notification-heading">Tips and Tutorials</h3>
            <p className="notification-description">
                Tips on getting more out of Good Deeds
            </p>

            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='user_research'
                checked={notificationSetting?.user_research === true}
                onChange={() => toggleNotificationSetting("user_research")}
            /> 
            <h3 className="notification-heading">User research</h3>
            <p className="notification-description">
                Get involved in your beta testingprogram or participate in paid product user research
            </p>
          </div>
        </div>
        <div className="line"></div>

        <div className="row">
          <div className='col-md-4'>
            <p style={{fontSize:"30px", fontWeight:"600", lineHeight:"37px"}} className='text-center text-md-start'>Listing Notifications</p>
            <p className='mt-2'>Receive the latest news, </p>
            <p className='mt-2'>updates, and tutorials from us.</p>
          </div>
          <div className='col-md-6'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='new_applicant'
                checked={notificationSetting?.new_applicant === true}
                onChange={() => toggleNotificationSetting("new_applicant")}
            /> 
            <h3 className="notification-heading">New Applicants</h3>
            <p className="notification-description">
                New applicant on a listing
            </p>

            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='new_donation'
                checked={notificationSetting?.new_donation === true}
                onChange={() => toggleNotificationSetting("new_donation")}
            /> 
            <h3 className="notification-heading">New Donation</h3>
            <p className="notification-description">
                New donation
            </p>

            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='new_favourite'
                checked={notificationSetting?.new_favourite === true}
                onChange={() => toggleNotificationSetting("new_favourite")}
            /> 
            <h3 className="notification-heading">New Favourite</h3>
            <p className="notification-description">
                Listing was favourited
            </p>
          </div>
        </div>
        <div className="line"></div>

        <div className="row">
          <div className='col-md-4'>
            <p style={{fontSize:"30px", fontWeight:"600", lineHeight:"37px"}} className='text-center text-md-start'>In-App Notifications</p>
            <p className='mt-2'>Get in-app notifications to find out what's </p>
            <p className='mt-2'>going on when you're online.</p>
          </div>
          <div className='col-md-8'>

            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="radio"
                name='in_app_notify'
                value='on'
                checked={notificationSetting.in_app_notify}
                onChange={() => setNotificationSetting({ ...notificationSetting, in_app_notify: true })}
            /> ON
            <br></br>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="radio"
                name='in_app_notify'
                value='off'
                checked={!notificationSetting.in_app_notify}
                onChange={() => setNotificationSetting({ ...notificationSetting, in_app_notify: false })}
            /> OFF

          </div>
        </div>
        <div className="line"></div>

        <div className="row">
          <div className='col-md-4'>
            <p style={{fontSize:"30px", fontWeight:"600", lineHeight:"37px"}} className='text-center text-md-start'>Chat Messages</p>
            <p className='mt-2'>These are chat message </p>
            <p className='mt-2'>notifications</p>
          </div>
          <div className='col-md-6'>
            <input
                className="mt-2"
                style={{ height: "18px", width: "18px" }}
                type="checkbox"
                name='new_message'
                checked={notificationSetting?.new_message === true}
                onChange={() => toggleNotificationSetting("new_message")}
            /> 
            <h3 className="notification-heading">Message Notifications</h3>
            <p className="notification-description">
                New messages in your inbox
            </p>
          </div>
        </div>
        <div className="line mb-20"></div>
        </>
        )}
      </div>
      
    </div>
    
    <Footer/>
    </div>
  )
}

export default NotificationSetting
