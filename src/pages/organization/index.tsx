import React, { useEffect } from "react";
import { Footer } from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import user from "../../assets/imgs/user.png";
import userB from "../../assets/imgs/userB.png";
import heartB from "../../assets/imgs/heartB.png";
import heart from "../../assets/imgs/heart.png";
import home from "../../assets/imgs/home.png";
import setting from "../../assets/imgs/setting.png";
import volunteer from "../../assets/imgs/volunteer.png";
import listing from "../../assets/imgs/listing.png";
import donation from "../../assets/imgs/donation.png";
import giving from "../../assets/imgs/giving.png";
import { color, Image, Button } from "@chakra-ui/react";
import Candadogo from "../../assets/imgs/Canadogo.png";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import { accessToken, baseUrl } from "../../components/Helper/index";
import axios from "axios";
import { useRouter } from 'next/router'
import { HamburgerIcon } from "@chakra-ui/icons";

const organization = () => {
  const [user, setUser] = useState(null);
  const [slug, setSlug] = useState([]);
  const [organization, setOrganization] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);

  const [hours, setHours] = useState({});
  const router = useRouter()
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    axios
      .get(`${baseUrl}/profile/info`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          // 'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
      .then((response) => {
        const messageData = response.data.message;
        setUser(messageData);
      })
      .catch((err) => {
        console.log(err);
      });
    axios 
      .get(`${baseUrl}/organizations`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res.data[0]?.slug, "datatatata");
        setSlug(res.data[0]?.full_name);
        setOrganization(res.data[0]?.slug);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${baseUrl}/organizations/${organization}`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setSlug(res.data[0]?.full_name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${baseUrl}/volunteer-listings/all/${organization}`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res.data, "data");
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    axios.get(`${baseUrl}/organization/subscriptions/hours-data?org=${organization}`, {
      headers: {
        Authorization: "Bearer " + accessToken(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((res) => {
      setHours(res.data);
      if (res.data) {
        setSubscriptionLoading(false);
      }
    }).catch((err) => {
      // console.log(err.response.message,"mes");
      setSubscriptionLoading(false)
    })
  }, [organization]);
  

  
  return (
    <div>
      
      <Navbar />
      <div>
        <div className="row container-md-fluid main-side m-0 justify-content-center">
      <button className="d-block d-lg-none fs-2 text-start ps-3 mt-3" onClick={() => setShow(!show)}><HamburgerIcon/></button>
      <div className="col-lg-3 px-0 wel-dashboard d-none d-lg-block">
          <Sidebar>
          </Sidebar>
      </div>
        {show && <div className="col-lg-3 px-0 wel-dashboard d-block d-lg-none">
          <Sidebar>
          </Sidebar>
          </div>}
          
          <div className="col">
            <div className="row m-0 ">
              <div className="col-md-7 col-sm-6">
                <div className="px-5 pt-md-5 mt-4 pt-3 text-center text-md-start">
                  <span className="welc-txt">Welcome,</span>
                </div>
                <div className="px-5 text-center text-md-start">
                  <span className="welc-txt2">
                    {
                      // @ts-ignore: Unreachable code error
                      user?.username
                    }
                  </span>
                </div>
                <div className="card shadow border-0 mt-5">
                  <div className="text-center">
                    <p className="info-txt mt-3 mb-3">Information</p>
                    <div className="container mt-3">
                      <hr />
                    </div>
                  </div>
                  <br />
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 border-end">
                        <div className="d-flex">
                          <Image src={userB.src} alt={"user"} />
                          <p className="card-text ms-2">User</p>
                        </div>
                        
                        <p className="mt-3 card-txt">
                          {
                            // @ts-ignore: Unreachable code error
                            user?.username
                          }
                        </p>
                        <div className="mt-3">
                          <a className="orga-txt" href="/organization/profile">
                            Edit Profile
                          </a>
                        </div>
                        <div className="mt-3">
                          <Link href="/organization/profile">
                            <a className="orga-txt">
                              {
                                // @ts-ignore: Unreachable code error
                                slug?.full_name
                              }
                            </a>
                          </Link>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex">
                          <Image src={heartB.src} alt={"Organization"} />
                          <p className="card-text ms-2">Organization</p>
                        </div>
                        <p className="mt-3 card-txt">
                          {
                            // @ts-ignore: Unreachable code error
                            slug
                          }
                        </p>
                        <div className="mt-3">
                          <a className="orga-txt" href="/organization/profile">
                            Organization Setting
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="card shadow border-0 mb-5">
                    <div>
                      <p className="info-txt mt-3 mb-3 text-center">Postings</p>
                    </div>
                    <div className="row">
                      {loading ? (
                        <div
                          style={{
                            color: "#E27832",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                          }}
                        >
                          <div className="spinner-border"></div>
                        </div>
                      ) : (
                        data &&
                        data.slice(0, 2).map((item, index) => (
                          <div
                            className="col-md-6 d-flex justify-content-center flex-wrap mt-4"
                            key={index}
                          >
                            <div>
                              <div className="li-car m-auto">
                                <Image
                                  className="img-fluid "
                                  src={
                                    // @ts-ignore: Unreachable code error
                                    item?.thumbnail
                                  }
                                />
                              </div>
                              <div className="text-center mt-2">
                                {
                                  // @ts-ignore: Unreachable code error
                                  item?.title
                                }
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="text-center mt-5 mb-5">
                      <Button
                        variant={'solid'}
                        colorScheme={'orange'}
                        style={{ borderRadius: 50 }}
                        size={'md'}
                        fontSize="12px"
                        fontWeight="600"
                        width="170px"
                        maxW="100%"
                        onClick={() => { data?.length > 1 ? router.push('/organization/listings') : router.push('/organization/listings/create') }}
                      >
                        View Postings
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-sm-6 pt-5 giving-img">
                <Image src={giving.src} alt={"Giving"} className="pe-5" />
                <div className="card border-0 plan-card">
                  <div className="text-center">
                    <p className="p-txt mt-3">Plan</p>
                  </div>
                  {subscriptionLoading? (
                    <div
                      style={{
                        color: "#E27832",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                      }}
                      className="mb-5"
                    >
                      <div className="spinner-border"></div>
                    </div>
                    ):(
                      // @ts-ignore: Unreachable code error
                      hours && Object.keys(hours).length > 0 ? (
                        <div className="text-center p-txt2 mt-3">
                          {
                            // @ts-ignore: Unreachable code error
                            hours.used_hours}/{hours.total_hours} hours used
                          <div className="card-body">
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: `${
                                    // @ts-ignore: Unreachable code error
                                    hours.percentage}%`, backgroundColor: "#183553"
                                }}
                                aria-valuenow={25}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              ></div>
                            </div>
                            <Link href="/organization/payment-plans">
                              <button className="upgrade-btn d-block mx-auto mt-4 mb-3">
                                Upgrade
                              </button>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-center mt-3 p-txt2 mb-3">There is no plan subscribed</p>
                          <Link href="/organization/payment-plans">
                            <button className="upgrade-btn d-block mx-auto mt-4 mb-3">
                              Subscribe
                            </button>
                          </Link>
                        </>
                      )

                    )
                  }

                </div>
                <div className="card mb-5 shadow mt-5 border-0">
                  <p className="info-txt mt-1 text-center mt-4">Notifications</p>
                  <div className="container mt-4">
                    <hr />
                  </div>
                  <div>
                    <p className="p-txt3 mt-md-5 text-center mb-md-5 my-4 px-2 px-md-0 lh-sm">You're all caught up no notification at this time</p>
                  </div>
                  {/* <div className="d-flex justify-content-between container mt-2">
                    <div className="txt-p container">
                      <p className="p-txt3 mt-2">New Applicants</p>
                      <p>Volunteer Name Goes Here</p>
                    </div>
                    <div>
                      <button className="view-btn mb-4 mt-3">View</button>
                    </div>
                  </div>
                  <div className="container">
                    <hr />
                  </div>
                  <div className="d-flex justify-content-between container mt-2">
                    <div className="txt-p container">
                      <p className="p-txt3 mt-2">New Applicants</p>
                      <p>Volunteer Name Goes Here</p>
                    </div>
                    <div>
                      <button className="view-btn mb-4 mt-3">View</button>
                    </div>
                  </div>
                  <div className="container">
                    <hr />
                  </div>
                  <div className="d-flex justify-content-between container mt-2">
                    <div className="txt-p container">
                      <p className="p-txt3 mt-2">New Applicants</p>
                      <p>Volunteer Name Goes Here</p>
                    </div>
                    <div>
                      <button className="view-btn mb-4 mt-3">View</button>
                    </div>
                  </div>
                  <div className="container">
                    <hr />
                  </div>
                  <div className="d-flex justify-content-between container mt-2">
                    <div className="txt-p container">
                      <p className="p-txt3 mt-2">New Applicants</p>
                      <p>Volunteer Name Goes Here</p>
                    </div>
                    <div>
                      <button className="view-btn mb-4 mt-3">View</button>
                    </div>
                  </div>
                  <div className="container">
                    <hr />
                  </div>
                  <div className="d-flex justify-content-between container mt-2">
                    <div className="txt-p container">
                      <p className="p-txt3 mt-2">New Applicants</p>
                      <p>Volunteer Name Goes Here</p>
                    </div>
                    <div>
                      <button className="view-btn mb-4 mt-3">View</button>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default organization;
