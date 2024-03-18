import { Image } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import user from "../assets/imgs/user.png";
import home from "../assets/imgs/home.png";
import setting from "../assets/imgs/setting.png";
import volunteer from "../assets/imgs/volunteer.png";
import listing from "../assets/imgs/listing.png";
import Link from "next/link";
import donation from "../assets/imgs/donation.png";
import bill from "../assets/imgs/bill.png";
import placeholder from "../assets/imgs/placeholder.png";
import axios from "axios";
import { accessToken, baseUrl, currentOrganization } from "../components/Helper/index";
import Spinner from 'react-bootstrap/Spinner';

const Sidebar = (props) => {
  const [slug, setSlug] = useState([]);
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userPermissions, setUserPermissions] = useState('')
  const [organizationType, setOrganizationType] = useState('')
  
  
  
  useEffect(() => {
    if(!currentOrganization){
    axios
      .get(`${baseUrl}/organizations`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setSlug(res.data[0].slug);
        setData(res.data[0])
        setOrganizationType(res.data[0].type);

      })
      .catch((err) => {
        console.log(err);
      });
    }else{
      setOrganizationType(currentOrganization?.type);
      setSlug(currentOrganization.slug);
      setData(currentOrganization)
    }
  }, []);

 // mowofif982@picvw.com

  // useEffect (() => {
  //   if(slug !== ""){
  //     axios.get(`${baseUrl}/org-role-permissions/member?org=${slug}`, {
  //       headers: {
  //         Authorization: 'Bearer ' + accessToken(),
  //       }
  //     }).then((res) => {
  //       localStorage.setItem("rolePermissions", JSON.stringify(res.data));
  //       setUserPermissions(res.data)
  //     }).catch((err) => {
  //       // console.log(err);
  //     })
  //   }
  // }, [slug])



  useEffect(() => {
    setUserPermissions(JSON.parse(localStorage.getItem('rolePermissions')));
  }, [])
 
  return (
    <>
      <div className="row container-fluid pe-0 m-0 pe-md-2 main-side">
        <div className="col-md-3 my-sidebar ps-0">
          <div className="sidebar p-4 mb-5 card rounded">
            <div className="ps-2">
              <div className="main-round-img">
                <div className="side-profile-img">
                  {!isLoaded && <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>}
                  <Image
                    // style={{ height: "165px", width: "340px" }}
                    className="img-fluid"
                    src={
                      // @ts-ignore: Unreachable code error
                      data?.profile_picture
                    }
                    alt=""
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setIsLoaded(true)}
                    style={{display: isLoaded ? "block" : "none",height:"126px",width:"126px",objectFit:"cover",borderRadius:"50%"}}
                  />
                </div>
              </div>
              <div>
                <div className="org-txt mt-2">{data?.full_name}</div>
              </div>
              <ul className="sidebar-list mt-0">
                <li>
                  <div className="list-icon">
                    <div>
                      <Image src={home.src} alt={"user"} />
                    </div>

                    <div className="ms-3">
                      <Link href="/organization">
                        <a>Dashboard</a>
                      </Link>
                    </div>
                  </div>
                </li>
                {(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('view_profile'))) ? (
                <li>
                  <div className="list-icon">
                    <div>
                      <Image src={user.src} alt={"user"} />
                    </div>

                    <div className="ms-3">
                      <Link href="/organization/profile">
                        <a>Profile</a>
                      </Link>
                    </div>
                  </div>
                </li>
                ) : null}

                {(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && (userPermissions.permissions.includes('view_volunteer_listings') || userPermissions.permissions.includes('view_donation_listings')))) ? (
                <li>
                  <div className="list-icon">
                    <div>
                      <Image src={listing.src} alt={"user"} />
                    </div>

                    <div className="ms-3">
                      <Link href="/organization/listings">
                        <a>Listings</a>
                      </Link>
                    </div>
                  </div>
                </li>
                ) : null}
                {(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('view_volunteer_applications'))) ? (
                <li>
                  <div className="list-icon">
                    <div>
                      <Image src={volunteer.src} alt={"user"} />
                    </div>

                    <div className="ms-3">
                      <Link href="/organization/volunteer-applications">
                        <a>Volunteer Applications</a>
                      </Link>
                    </div>
                  </div>
                </li>
                ) : null}
                {((userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('view_donation_analytics'))) && organizationType !== 'For-Profit Organization') ? (
                  <li>
                    <div className="list-icon">
                      <div>
                        <Image src={donation.src} alt={"user"} />
                      </div>

                      <div className="ms-3">
                        <Link href="/organization/donation-analytics">
                          <a>Donation Analytics</a>
                        </Link>
                      </div>
                    </div>
                  </li>
                ) : null}
                {(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('view_donation_analytics'))) ? (
                <li>
                  <div className="list-icon">
                    <div>
                      <Image src={bill.src} alt={"user"} />
                    </div>

                    <div className="ms-3">
                      <Link href="/organization/billing-and-payments">
                        <a>Billing & Payments</a>
                      </Link>
                    </div>
                  </div>
                </li>
                ) : null}
                {(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('view_settings'))) ? (
                <li>
                  <div className="list-icon">
                    <div>
                      <Image src={setting.src} alt={"user"} />
                    </div>

                    <div className="ms-3">
                      <Link href="/organization/settings">
                        <a>Settings</a>
                      </Link>
                    </div>
                  </div>
                </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-9">{props.children}</div>
      </div>
    </>
  );
};

export default Sidebar;
