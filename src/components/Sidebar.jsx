import { Image } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import user from "../assets/imgs/user.png";
import home from "../assets/imgs/home.png";
import setting from "../assets/imgs/setting.png";
import volunteer from "../assets/imgs/volunteer.png";
import listing from "../assets/imgs/listing.png";
import Link from "next/link";
import donation from "../assets/imgs/donation.png";
import placeholder from "../assets/imgs/placeholder.png";
import axios from "axios";
import { accessToken, baseUrl } from "../components/Helper/index";

const Sidebar = (props) => {
  const [slug, setSlug] = useState([]);
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    axios
      .get(`${baseUrl}/organizations/${slug}`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
       
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);
  return (
    <>
      <div className="row container-fluid pe-0 m-0 pe-md-2 main-side">
        <div className="col-md-3 my-sidebar ps-0">
          <div className="sidebar shadow-lg p-4 mb-5 card rounded">
            <div className="main-round-img">
              <div className="side-profile-img">
                {!isLoaded && <img src={placeholder.src} alt="Loading..." />}
                <Image
                  // style={{ height: "165px", width: "340px" }}
                  className="img-fluid"
                  src={
                    // @ts-ignore: Unreachable code error
                    data?.profile_picture
                  }
                  alt={"image"}
                  onLoad={() => setIsLoaded(true)}
                  onError={() => setIsLoaded(true)}
                  style={{ display: isLoaded ? "block" : "none" }}
                />
              </div>
            </div>
            <div>
              <div className="org-txt mt-2">{data?.full_name}</div>
            </div>
            <ul className="sidebar-list">
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
            </ul>
          </div>
        </div>
        <div className="col-md-9">{props.children}</div>
      </div>
    </>
  );
};

export default Sidebar;
