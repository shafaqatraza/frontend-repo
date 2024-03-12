import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import good from "../../../assets/imgs/good.png";
import edit from "../../../assets/imgs/edit.png";
import {Image, Input } from "@chakra-ui/react";
import Link from "next/link";
import { Table, Upload } from "antd";
import { Modal } from "react-bootstrap";
import "antd/dist/antd.css";
import { FaCheck } from "react-icons/fa";
import Sidebar from "../../../components/Sidebar";
import axios from "axios";
import { accessToken, baseUrl} from "../../../components/Helper/index";
import placeholder from "../../../assets/imgs/placeholder.png";
import camera from "../../../assets/imgs/camera.png";
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/toast'
import profilTrash from '../../../assets/imgs/profile-trash.png'
import { HamburgerIcon } from "@chakra-ui/icons";
import Spinner from 'react-bootstrap/Spinner';
import Head from "next/head";
import fav from "../../../assets/imgs/favicon.ico"

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

interface FormErrors {
  full_name:boolean,
  business_number:boolean, 
  business_email:boolean, 
  about:boolean,
  website_url:boolean
  location:boolean,
}

const initialFormErrors: FormErrors = {
  full_name: false,
  business_number:false, 
  business_email:false, 
  about:false,
  website_url:false,
  location:false,
};

const OrganizationInfo = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    // organization_type_id: 7,
    business_number: "",
    business_email: "",
    about: "",
    website_url: "",
    location: "",
    coordinates: "",
    profile_picture:"",
    new_thumbnail:"",
  });
  const [location, setLocation] = useState([])
  const [latLng, setLatLng] = useState({})
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeletingOrganization, setIsDeletingOrganization] = useState(false);
  const [image, setImage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [refresh, setRefresh] = useState(false)
  const [showActionCard, setShowActionCard] = useState(false);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [showCard, setShowCard] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false)
  const router = useRouter()
  const toast = useToast()

  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleShowSuccess = () => setShow(true);
  const [show, setShow] = useState(false);
  const [showtoggle, setShowtoggle] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [showModalup, setShowModalup] = useState(false);

  const handleCloseModalup = () => setShowModalup(false);
  const handleShowModalup = () => setShowModalup(true);
  const [slug, setSlug] = useState([]);
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [inviteData, setInviteData] = useState([]);
  const [packageData, setPackageData] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [orgSlug, setOrgSlug] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);
  const [userPermissions, setUserPermissions] = useState({
    role: '',
    permissions: [] as any
  });

  useEffect(() => {
    const rolePermissionsString = localStorage.getItem('rolePermissions');
    if (rolePermissionsString !== null) {
      const rolePermissions = JSON.parse(rolePermissionsString);
      setUserPermissions(rolePermissions);

      if (rolePermissions?.role !== 'Superadmin' && !rolePermissions?.permissions?.includes('view_profile')) {
        // router.push('/organization/access-denied');
        router.push('/organization');
      }
    }
  }, []);

  useEffect( ()=> {
    axios
    .get(`${baseUrl}/organizations`, {
      headers: {
        Authorization: "Bearer " + accessToken(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => {
      setOrgSlug(res.data[0].slug);
    })
    .catch((err) => {
      console.log(err);
    });

  }, [])

  const getInvitedMembers = () => {
    axios
    .get(`${baseUrl}/organizations/${orgSlug}/invitations`, {
      headers: {
        Authorization: "Bearer " + accessToken(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => {
      setInviteData(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(()=>{
    if(orgSlug){
      getInvitedMembers();

      axios
      .get(`${baseUrl}/organizations/${orgSlug}/invitations/statuses/all`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setStatuses(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }

  },[orgSlug])

  useEffect(() => {
    if(orgSlug){
    axios
      .get(`${baseUrl}/organizations/${orgSlug}`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setFormData(res.data.data);
        setData(res.data.data);
        setLocation(res.data.data.location)
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [orgSlug, refresh]);

  useEffect(() => {
    if(orgSlug){
      axios.get(`${baseUrl}/organization/subscriptions/subscribed-package?org=${orgSlug}`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((res)=>{
        setPackageData(res.data.data);

      }).catch((err)=>{
        console.log(err);
      })
    }
  }, [])


  const handleThumbnailClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = (event:any) => {
      const file = event.target.files[0];
      setImage(file);
      // @ts-ignore: Unreachable code error
      setThumbnail(URL.createObjectURL(file));
      // @ts-ignore: Unreachable code error
      setFormData({ ...formData, profile_picture: [file] });
    };
  };

  
  const handleChange = (address: any) => {
    setLocation(address)
  }

  const handleSelect = (address2: any) => { 
    setLocation(address2)
    geocodeByAddress(address2)
      .then((results: any) => getLatLng(results[0]))
      .then((coordinates: any) => 
        setFormData((prevFormData) => ({
          ...prevFormData,
          'location': address2,
          'coordinates': coordinates.lat+','+coordinates.lng 
        }))
      )
      .catch((error: any) => console.error('Error', error))
  }


  const handleSubmit = (e: any, type: string) => {
    e.preventDefault();
    setIsUpdating(true);
    let hasErrors = false;

    if(type === 'modalform'){
      if (!formData.full_name) {
        setFormErrors((prevErrors) => ({ ...prevErrors, ['full_name']: true}));
        hasErrors = true;
      }
    }else{

      if (!formData.business_email) {
        setFormErrors((prevErrors) => ({ ...prevErrors, ['business_email']: true}));
        hasErrors = true;
      }

      if (!formData.business_number) {
        setFormErrors((prevErrors) => ({ ...prevErrors, ['business_number']: true}));
        hasErrors = true;
      }
      
      if (!formData.location) {
        setFormErrors((prevErrors) => ({ ...prevErrors, ['location']: true}));
        hasErrors = true;
      }

      if (!formData.about) {
        setFormErrors((prevErrors) => ({ ...prevErrors, ['about']: true}));
        hasErrors = true;
      }

      if (!formData.website_url) {
        setFormErrors((prevErrors) => ({ ...prevErrors, ['website_url']: true}));
        hasErrors = true;
      }

      if (!location) {
        setFormErrors((prevErrors) => ({ ...prevErrors, ['location']: true}));
        hasErrors = true;
      }
    }
    
    if (hasErrors) {
      if(type === 'normalform'){
        toast({ position: "top", title: 'Please fill out the complete form.', status: "warning" })
      }
      setIsUpdating(false);
      return;
    }

    const form = new FormData();
    form.append("full_name", formData.full_name);
    form.append("business_number", formData.business_number);
    form.append("about", formData.about);
    form.append("location", formData.location);
    form.append("coordinates", formData.coordinates);
    form.append("website_url", formData.website_url);
    form.append("business_email", formData.business_email);
    form.append("new_thumbnail", formData.new_thumbnail);
    // form.append("organization_type_id" , formData.organization_type_id);
    
    axios
      .post(`${baseUrl}/organizations/${orgSlug}`, form, {
        headers: {
          Authorization: "Bearer " + accessToken(),
        },
      })
      .then((response) => {
        toast({ position: "top", title: response.data.message, status: "success" })
        // setShowSuccess(true);
        setIsUpdating(false);
        setRefresh(!refresh);
      })
      .catch((error) => {
        toast({ position: "top", title: error.response.data.message, status: "error" })
        // setShowSuccess(true);
        setIsUpdating(false);
      });
  };


  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: false}));
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const handleActionClick = (rowIndex: number) => {

    if (selectedRow === rowIndex) {
      setSelectedRow(-1);
      setShowCard(true); 
    } else {
      setSelectedRow(rowIndex);
      setShowCard(true);
    }
  };

  const editMember = (memberId: number) => {
    router.push(`/organization/profile/edit-member/${memberId}`)
  }

  const updateMemberStatus = (memberId: number, status: string) => {
    const form = new FormData();
    form.append("status", status);

    axios
      .post(
        `${baseUrl}/organizations/${orgSlug}/invitations/${memberId}/update-status`,
        form,
        {
          headers: {
            Authorization: "Bearer " + accessToken(),
            // 'Content-Type': 'application/x-www-form-urlencoded'
          },
        }
      )
      .then((res) => {
        setIsDeactivating(false);
        setSelectedRow(-1);
        getInvitedMembers();
        toast({ position: "top", title: res.data.message, status: "success" })
      })
      .catch((err) => {
        setIsDeactivating(false);
        toast({ position: "top", title: err.response.data.message, status: "error" })
        console.log(err);
      });
  }

  const removeMember = (memberId: number) => {
    axios
      .delete(
        `${baseUrl}/organizations/${orgSlug}/invitations/${memberId}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken(),
            // 'Content-Type': 'application/x-www-form-urlencoded'
          },
        }
      )
      .then((res) => {
        setSelectedRow(-1);
        getInvitedMembers();

        toast({ position: "top", title: res.data.message, status: "success" })
      })
      .catch((err) => {
        toast({ position: "top", title: err.response.data.message, status: "error" })
        console.log(err);
      });
  }


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: '',
      dataIndex: 'action',
      render: (text: string, record: any, rowIndex: number) => {
        return(
          <>
          {(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('update_users') && userPermissions.permissions.includes('delete_users'))) ? (
          <div className="ms-3">
            {record.role !== 'Superadmin' && (
              <button style={{ color: '#E27832', borderRight:'1px solid #0000001F' }} className="pe-4" onClick={() => handleActionClick(rowIndex)}>+ Action</button>
            )}
            
            {
              showCard && selectedRow === rowIndex && (
                <div style={{textAlign: 'left'}}>
                <div
                  className="card profile-action-card border-0"
                  style={{
                    top: '2px', 
                    left: "127px", 
                    textAlign: "left",
                    fontSize:"12px", 
                    padding: "5px", // @ts-ignore:
                    'text-align-last': 'start',
                  }}
                >
                  <button onClick={() => {editMember(record.id)}} className="action-card-button">Edit</button>
                  {record.status == 'Inactive'? (
                    <button onClick={() => updateMemberStatus(record.id, 'Active')} className="action-card-button">Activate User</button>
                  ):(
                    <button onClick={() => updateMemberStatus(record.id, 'Inactive')} className="action-card-button">Deactivate User</button>
                  )}
                  <button onClick={() => {removeMember(record.id)}} className="action-card-button">Remove From Account</button>
                  {/* {statuses && statuses.map((status, index) => (
                    (record.status === 'Active' && status.name !== 'Active') ||
                    (record.status === 'Inactive' && status.name !== 'Inactive') ? (
                      <button key={status.id} onClick={() => updateMemberStatus(record.id, status.id)} className="action-card-button">
                        {status.name}
                      </button>
                    ) : (
                      <button key={status.id} onClick={() => updateMemberStatus(record.id, status.id)} className="action-card-button">
                        {status.name}
                      </button>
                    )
                  ))} */}
                  
                </div>
                </div>
              )
            }
          </div>
          ) : null}
          </>
        );
      }
    },
    {
      title: () => (
        <div>
          {(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('create_users'))) ? (
          <Link href="/organization/profile/invite-user">
            <button className="up-btn">+ New</button>
          </Link>
          ) : null}
        </div>
      ),
      dataIndex: "New",
      key: "New",
    }
  ];


  const [hover, setHover] = useState(false); // Track the hover state
  const handleFileChange = (info: any) => {  
  
    const file = info.file.originFileObj;
    if (file) {
      // Update the formData with the new thumbnail file
      setFormData((prevFormData) => ({
        ...prevFormData,
        new_thumbnail: info.file.originFileObj,
      }));
      getBase64(file, (imageUrl: string) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          profile_picture: imageUrl, // Show the new thumbnail preview
        }));
      });
    }
  };
  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };


  const deleteOrganization = () => {
    setIsDeletingOrganization(true);
    axios
      .delete(
        `${baseUrl}/organizations/${orgSlug}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken()
          },
        }
      )
      .then((res) => {
        router.push('/')
        toast({ position: "top", title: res.data.message, status: "success" })
      })
      .catch((err) => {
        setIsDeletingOrganization(false);
        toast({ position: "top", title: err.response.data.message, status: "error" })
        console.log(err);
      });
  }

  function handleUpdatePaymentPlan(){
    if(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('update_payments'))){
      router.push('/organization/payment-plans');
    }else{
      toast({ position: "top", title: "You don't have the necessary permissions.", status: "warning" })
    }
  }

  

  return (
    <div style={{overflowX:"hidden"}}>
      <Head>
          <title>Good Deeds | Organization Profile</title>
          <link rel="icon" href={fav.src}  />
          <meta name="title" content="A marketplace of opportunity" />
          <meta name="description" content="A marketplace of opportunity. An online community of do-gooders; paying it forward, and getting rewarded." />
          <meta name="keywords" content="Marketplace, Goodddeds, Canada, Toronto, Ontario, Community" />
          <meta name="robots" content="index, follow" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English" />
          <meta name="revisit-after" content="1 days" />

          <meta property="og:title" content="A marketplace of opportunity" />
          <meta property="og:description" content="A marketplace of opportunity. An online community of do-gooders; paying it forward, and getting rewarded." />
          <meta property="og:image" content="/gd-favicon.ico" />
          {/* <meta property="og:url" content="" /> */}
          <meta property="og:site_name" content="Good Deeds" />

          <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=UA-230154537-1`}
          />
          <script
              dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'UA-230154537-1', {
                  page_path: window.location.pathname,
                  });
              `,
              }}
          />
      </Head>
      <Navbar />
      <Modal show={showSuccess} onHide={handleCloseSuccess} closeButton>
        <div className="p-3">
          <p className="modal-txt text-center p-5 mt-3">
            Organization Updated Successfully
          </p>
        </div>
        <div className="d-flex justify-content-center pb-5">
          <button onClick={handleCloseSuccess} className="modal-btn">
            Got it
          </button>
        </div>
      </Modal>
      <Modal show={show} onHide={handleClose} closeButton>
        <div className="p-3">
          <p className="modal-txt text-center p-5 mt-3">
            Are you sure you want to delete your account?
          </p>
        </div>
        <div className="d-flex justify-content-center pb-5">
          <button className="update-v-btn" onClick={handleClose}>No, I made a mistake</button>
         
          <button type="submit" onClick={deleteOrganization} disabled={isDeletingOrganization} id="submit" className="update-v-btn">
            <span id="button-text">
              {isDeletingOrganization ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden"></span></div> : "Yes, I'm sad to leave"}
            </span>
          </button>
        </div>
      </Modal>
      <Modal show={showModalup} onHide={handleCloseModalup} closeButton>
        <div className="p-3">
          <p className="modal-txt text-center p-5 mt-3">
            You purchase has been approved
          </p>
        </div>
        <div className="d-flex justify-content-center pb-5">
          <button className="modal-btn">Got it</button>
        </div>
      </Modal>
      <Modal show={showModal} onHide={handleCloseModal} closeButton>
        <div className="p-3">
          <p className="modal-txt text-center py-3">Edit Profile</p>
        </div>
        <div>
          <div className="input-group p-5">
            <input
              type="text"
              className={`form-control ${formErrors['full_name'] ? 'input-error' : ''}`}
              onChange={handleInputChange}
              name="full_name"
              style={{
                backgroundColor: "#E8E8E8",
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "20px",
              }}
              value={formData?.full_name || ""}
            />
            <button
              style={{ backgroundColor: "#E8E8E8", border: "0px solid grey" }}
              className="btn btn-outline-secondary"
              type="button"
            >
              <FaCheck />
            </button>
          </div>
          {/* {formErrors['full_name'] && <p className="error-message">Please fill out the field.</p>} */}
        </div>
        <div className="text-center">
          <p>Upload a logo/photo</p>
          <div className="d-flex justify-content-center mt-2">
            <Upload
              accept="image/*"
              customRequest={() => {}}
              onChange={(e) =>{handleFileChange(e)}}
              showUploadList={false}
            >
              <div
                className="upload-pic d-flex justify-content-center align-items-center"
                style={{
                  border: formData?.new_thumbnail
                    ? '2px solid #007BFF'
                    : '2px solid transparent',
                  borderRadius: '50%', // Change border radius to 50% for rounded shape
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                  position: 'relative',
                  width: '200px', // Specify a width and height for the container
                  height: '200px',
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                {formData?.profile_picture ? (
                  <img
                    src={formData?.profile_picture}
                    width={200}
                    height={200}
                    alt="Previous Thumbnail"
                  />
                ) : (
                  <img src={camera.src} alt="Thumbnail placeholder" />
                )}

                {hover && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: '#fff',
                      fontSize: '16px',
                    }}
                  >
                    Upload
                  </div>
                )}
              </div>
            </Upload>
          </div>
              
          <div className="d-flex justify-content-center mt-3">
            <Upload
              accept="image/*"
              customRequest={() => {}}
              onChange={(e) =>{handleFileChange(e)}}
              showUploadList={false}
            >
            <button className="replace-btn">Replace</button>
            </Upload>
          </div>
        </div>
        <div className="d-flex justify-content-center pb-5 mt-5">
          <button type="submit" onClick={(e) => {handleSubmit(e,'modalform')}} disabled={isUpdating} id="submit" className="btn-reset mb-5">
            <span id="button-text">
              {isUpdating ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div> : "Update"}
            </span>
          </button>
        </div>
      </Modal>
      <div className="row container-fluid main-side orgainization-profile m-0">
      <button className="d-block d-lg-none fs-2 text-start ps-3 mt-3" onClick={() => setShowtoggle(!showtoggle)}><HamburgerIcon/></button>
      <div className="col-lg-3 px-0 wel-dashboard d-none d-lg-block">
          <Sidebar>
          </Sidebar>
      </div>
        {showtoggle && <div className="col-lg-3 px-0 wel-dashboard d-block d-lg-none">
          <Sidebar>
          </Sidebar>
          </div>}
          <div className="col mt-5">
            <div className="main-org-img">
              <div className="org-img text-center position-relative mt-md-4 pt-md-3">
                <div className="org-prof-img">
                  {!isLoaded && <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>}
                  <Image
                    // style={{ height: "165px", width: "340px" }}
                    src={
                      // @ts-ignore: Unreachable code error
                      data?.profile_picture
                    }
                    alt=""
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setIsLoaded(true)}
                    className="img-fluid"
                    // style={{ display: isLoaded ? "block" : "none" }}
                   style={{display: isLoaded ? "block" : "none",height:"189px",width:"189px",objectFit:"cover",borderRadius:"50%"}}
                  />
                </div>
                {(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('update_profile'))) ? (
                <Image
                  src={edit.src}
                  onClick={handleShowModal}
                  className="position-absolute end-0 top-0"
                />
                ) : null}
              </div>
            </div>
            <div className="text-center">
              <p className="info-txt mt-2">
                {
                  // @ts-ignore: Unreachable code error
                  data?.full_name
                }
              </p>
            </div>
            <div className="row ps-3">
              <div className="col-md-6">
                <div className="mt-5 mb-4 pb-3">
                  <p className="info-txt" style={{fontSize:"30px"}}>Organization Info</p>
                </div>
                <div className="mt-4">
                  <form>
                     <div className="mb-3">
                      <label className="form-label " style={{fontSize:'20px', fontWeight:'500'}}>Email</label>
                      <Input
                        style={{ backgroundColor: "#F6F6F6", height:'50px' }}
                        type="email"
                        className={`form-control ${formErrors['business_email'] ? 'input-error' : ''}`}
                        value={formData?.business_email || ""}
                        onChange={handleInputChange}
                        name="business_email"
                        required
                      />
                      {formErrors['business_email'] && <p className="error-message">Please fill out the field.</p>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label " style={{fontSize:'20px', fontWeight:'500'}}>Address</label>
                      <PlacesAutocomplete
                      value={location}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                      onSelect={(e: React.ChangeEvent<HTMLInputElement>) => handleSelect(e)}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading
                      }: {
                        //Defining types of perameters
                        getInputProps: any;
                        suggestions: any[];
                        getSuggestionItemProps: any;
                        loading: boolean;
                      }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: 'Search address...',
                              className: 'location-search-input'
                            })}
                          />
                          <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                              const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item'
                              const style = suggestion.active
                                ? {
                                  backgroundColor: '#fafafa',
                                  cursor: 'pointer'
                                }
                                : {
                                  backgroundColor: '#ffffff',
                                  cursor: 'pointer'
                                }
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style
                                  })}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                      {formErrors['location'] && <p className="error-message">Please fill out the field.</p>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label " style={{fontSize:'20px', fontWeight:'500'}}>
                        Business Number
                      </label>
                      <Input
                        style={{ backgroundColor: "#F6F6F6", height:'50px' }}
                        type="text"
                        className={`form-control ${formErrors['business_number'] ? 'input-error' : ''}`}
                        value={formData?.business_number || ""}
                        onChange={handleInputChange}
                        name="business_number"
                        required
                      />
                      {formErrors['business_number'] && <p className="error-message">Please fill out the field.</p>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label" style={{fontSize:'20px', fontWeight:'500'}}>Website Url</label>
                      <Input
                        style={{ backgroundColor: "#F6F6F6", height:'50px' }}
                        type="text"
                        className={`form-control ${formErrors['website_url'] ? 'input-error' : ''}`}
                        value={formData?.website_url || ""}
                        onChange={handleInputChange}
                        name="website_url"
                        required
                      />
                      {formErrors['website_url'] && <p className="error-message">Please fill out the field.</p>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label " style={{fontSize:'20px', fontWeight:'500'}}>
                        Company Description
                      </label>
                      <textarea
                        style={{ backgroundColor: "#F6F6F6", }}
                        rows={3}
                        className={`form-control ${formErrors['about'] ? 'input-error' : ''}`}
                        value={formData?.about || ""}
                        onChange={handleInputChange}
                        name="about"
                        required
                      />
                      {formErrors['about'] && <p className="error-message">Please fill out the field.</p>}
                    </div>
                    {(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('update_profile'))) ? (
                    <div className="d-flex justify-content-end">
                      <button type="submit" onClick={(e) => {handleSubmit(e,'normalform')}} disabled={isUpdating} id="submit" className="btn-reset mb-5">
                        <span id="button-text">
                          {isUpdating ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div> : "Update"}
                        </span>
                      </button>
                    </div>
                    ) : null}
                  </form>
                  {(userPermissions?.role === 'Superadmin') ? (
                  <div className="d-flex align-items-center">
                    <button onClick={handleShow} className="del-btn">
                      Delete Account
                    </button>
                    <img src={profilTrash.src} style={{height:"20px"}} className="img-fluid ms-3"   alt=""/>
                  </div>
                  ) : null}
                  <div></div>
                </div>
              </div>
              <div className="col-md-6 pt-md-5">
                <p className="fw-bold text-center mt-5">
                  <div className="mt-5" style={{fontSize:'20px',fontWeight:'500'}}>Plan</div>
                </p>
                {Object.keys(packageData).length > 0 ? (
                <div className="d-flex justify-content-center">
                  <div
                    className="card bg-light border-0"
                    style={{
                      backgroundColor: "#F6F6F6",
                      width: "332px",
                      marginTop: "2rem",
                    }}
                  >
                    <div className="card-body text-center">
                      <p className="card-title mt-3 plan-txt">{
                      // @ts-ignore: Unreachable code error
                      packageData?.package_name}</p>
                      <p className=" mt-4 plan-txt2">
                        {
                        // @ts-ignore: Unreachable code error
                        packageData?.package_description}
                      </p>
                      <p className="mt-3">
                        <span className="plan-txt3">${
                        // @ts-ignore: Unreachable code error
                        parseInt(packageData?.package_amount)}</span>/month, billed
                        annually
                      </p>
                    </div>
                    <div className="ms-4 mt-3">
                      {
                            // @ts-ignore: Unreachable code error
                            packageData?.package_features?.map((item,index)=>(
                              <>
                              <div className="d-flex">
                              <span className="ms-2 pt-2">
                          <Image src={good.src} alt={"Plan"} />
                        </span>
                        <div className='free-txt4 pt-2 ms-2'>
                        {item}
                        </div>
                              </div>
                              </>
                            ))
                          }


                    </div>
                    <div className="btns d-flex justify-content-center">
                      <Link href="/organization/payment-plans">
                        <button className="up-btn mt-5 mb-5">Upgrade</button>
                      </Link>
                      <Link href="/organization/payment-plans">
                        <button className="ed-btn ms-3 mt-5 mb-5" onClick={handleUpdatePaymentPlan}>
                          Edit Payment
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                ) : (
                  <div className="d-flex justify-content-center mt-5">
                    <p className="fw-bold">No plan subscribed.</p>
                  </div>
                )}
              </div>
              {(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('view_users'))) ? (
              <>
              <div className="mt-5">
              <p className="info-txt mb-4" style={{color:"black",fontSize:"30px", fontWeight:"600"}}>Members</p>
                <Table dataSource={inviteData} className="table-responsive" columns={columns} />
              </div>
              </>
              ) : null}
            </div>
          </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrganizationInfo;
