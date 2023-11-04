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
  const [orgRolesPermissions, setOrgRolesPermissions] = useState([]);
  const [slug, setSlug] = useState("");
  const [show, setShow] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [checkboxState, setCheckboxState] = useState({});
  const [permissionsLength, setPermissionsLength] = useState(0);
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

    })
    .catch((err) => {
      console.log(err);
    });

  }, [])



  useEffect( ()=> {
    if(slug){
        axios
        .get(`${baseUrl}/org-role-permissions?org=${slug}`, {
            headers: {
                Authorization: "Bearer " + accessToken(),
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then((res) => {

            // Iterate through the permissions and group them by group_name
            const initialCheckboxState = {};
            
            setPermissionsLength(Object.keys(res.data.permissions).length)

            for (const groupName in res.data.permissions) {
                if (Object.prototype.hasOwnProperty.call(res.data.permissions, groupName)) {
                  const group = res.data.permissions[groupName];
            
                  // Iterate through the permissions in the group
                  for (const permission of group) {
                    // Initialize an object for the permission with roleInfo
                    const permissionInfo = {};
            
                    for (const role in permission.roleInfo) {
                      if (Object.prototype.hasOwnProperty.call(permission.roleInfo, role)) {
                        // Use the role name (e.g., 'Admin', 'Manager', 'Member') as the key
                        // and the roleInfo value as the value
                        permissionInfo[role] = permission.roleInfo[role];
                      }
                    }
            
                    // Use the permission ID as the key and the roleInfo object as the value
                    initialCheckboxState[permission.id] = permissionInfo;
                  }
                }
            }

            setCheckboxState(initialCheckboxState);
            setOrgRolesPermissions(res.data);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
        });
    }

  }, [slug])
  
  function handleCheckboxChange(permissionId, role, isChecked) {
    setCheckboxState((prevState) => ({
      ...prevState,
      [permissionId]: {
        ...prevState[permissionId],
        [role]: isChecked,
      },
    }));
  }
 

  const handleSaveSetting = (e: any) => {
    e.preventDefault();
    if(slug){
        setIsUpdating(true);
        axios.post(`${baseUrl}/org-role-permissions/attach?org=${slug}`, checkboxState, {
            headers: {
                Authorization: "Bearer " + accessToken(),
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then((response) => { 
            setIsUpdating(false);
            
            toast({ position: "top", title: response.data.message, status: "success" });
        })
        .catch((error) => {
            setIsUpdating(false);
            console.error('Error saving data:', error);
            toast({ position: "top", title: 'Something went wrong, please try later.', status: "error" });
        });
    }else{
        setIsUpdating(false);
        toast({ position: "top", title: 'Something went wrong.', status: "warning" });
    }
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
        <div className='col-md-9'></div>
          <div className="col-md-2">
            <div className="d-flex justify-content-center">
                <button type="submit" onClick={(e) => {handleSaveSetting(e)}} disabled={isUpdating} id="submit" className="btn-reset mt-4 mt-md-0">
                    <span id="button-text">
                    {isUpdating ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div> : "Save"}
                    </span>
                </button>
            </div>
          </div>
        </div>
        <div className='ps-md-4 ps-2 ps-lg-0 pe-md-4 pe-2 permission-category'>
            {orgRolesPermissions?.permissions && Object.keys(orgRolesPermissions.permissions).map((groupIndex, index) => (
                <>
                <div className={`row ${index === 0 ? 'mt-5' : 'mt-3'} py-1 permission-heading`} style={{'backgroundColor': '#dee3e6', 'padding': 'inherit'}}>
                    <div className='col-md-7 col-5'>
                    <p style={{fontSize:"19px", fontWeight:"600"}} className='text-start'>{groupIndex}</p>
                    </div>
                    { index == 0 &&(
                        <>
                        <div className='col-md-1 col-2 px-0'>
                        <p style={{fontSize:"19px", fontWeight:"600"}} className='text-center text-md-start'>Member</p>
                        </div>
                        <div className='col-md-2 col-3'>
                        <p style={{fontSize:"19px", fontWeight:"600"}} className='text-center'>Manager</p>
                        </div>
                        <div className='col-md-1 col-2 px-0'>
                        <p style={{fontSize:"19px", fontWeight:"600"}} className='text-center'>Admin</p>
                        </div>
                        </>
                    )}
                </div>
                <div className={`row mt-3 ${permissionsLength === index+1 ? 'mb-5 pb-4' : ''}`}  style={{'padding': 'inherit'}}>
                    {orgRolesPermissions.permissions[groupIndex].map((permission) => (
                        <>
                        <div className='col-md-7 col-5'>
                            <p style={{fontSize:"15px"}} className='textstart'>{permission.title}</p>
                        </div>
                        <div className='col-md-1 col-2 text-center'>
                        <input
                            className="mt-2"
                            style={{ height: "18px", width: "18px" }}
                            type="checkbox"
                            name='news_and_updates'
                            checked={checkboxState[permission.id].Member}
                            onChange={(e) => handleCheckboxChange(permission.id, 'Member', e.target.checked)}
                        /> 
                        </div>
                        <div className='col-md-2 col-3 text-center'>
                        <input
                            className="mt-2"
                            style={{ height: "18px", width: "18px" }}
                            type="checkbox"
                            name='news_and_updates'
                            checked={checkboxState[permission.id].Manager}
                            onChange={(e) => handleCheckboxChange(permission.id, 'Manager', e.target.checked)}
                        />
                        </div>
                        <div className='col-md-1 col-2 text-center'>
                        <input
                            className="mt-2"
                            style={{ height: "18px", width: "18px" }}
                            type="checkbox"
                            name='news_and_updates'
                            checked={checkboxState[permission.id].Admin}
                            onChange={(e) => handleCheckboxChange(permission.id, 'Admin', e.target.checked)}
                        />
                        </div>
                        </>
                    ))}
                    <div className='col-md-1'></div>
                </div>
                </>
            ))}
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
