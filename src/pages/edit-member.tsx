import React from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import user from "../assets/imgs/user.png";
import home from "../assets/imgs/home.png";
import setting from "../assets/imgs/setting.png";
import volunteer from "../assets/imgs/volunteer.png";
import listing from "../assets/imgs/listing.png";
import back from "../assets/imgs/back.png";
import donation from "../assets/imgs/donation.png";
import Link from "next/link";
import { Image, Input } from "@chakra-ui/react";
import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";

// import { Input } from 'react-bootstrap';

const EditMember = () => {
  return (
    <>
      <Navbar />
      <div className="row container-fluid main-side">
        <div className="col-md-4 my-sidebar">
          <div className="sidebar shadow-lg p-5 mb-5 card rounded">
            <div className="main-round-img">
              <div className="round-img"></div>
            </div>
            <div>
              <div className="org-txt">Organization Name</div>
            </div>
            <ul>
              <li>
                <div className="list-icon">
                  <div>
                    <Image src={home.src} alt={"user"} />
                  </div>

                  <div className="ms-3">
                    <span>Dashboard</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="list-icon">
                  <div>
                    <Image src={user.src} alt={"user"} />
                  </div>

                  <div className="ms-3">
                    <Link href="/organization-info">
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
                    <span>Listings</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="list-icon">
                  <div>
                    <Image src={volunteer.src} alt={"user"} />
                  </div>

                  <div className="ms-3">
                    <span>Volunteer Applications</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="list-icon">
                  <div>
                    <Image src={donation.src} alt={"user"} />
                  </div>

                  <div className="ms-3">
                    <span>Donation Analytics</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="list-icon">
                  <div>
                    <Image src={setting.src} alt={"user"} />
                  </div>

                  <div className="ms-3">
                    <span>Settings</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-8">
          <div className="empty-div"></div>
          <div className="d-flex align-items-center">
          <Image src={back.src}/>
            <p className="modal-txt ms-5">Edit Member</p>
          </div>
          <div className="col-md-5">
            <form>
              <div className="mb-3 mt-5">
                <label className="form-label fw-bold">Name</label>
                <Input
                  style={{ backgroundColor: "#E8E8E8" }}
                  type="email"
                  className="form-control"
                  id="email"
                  required
                  placeholder="Name"
                />
              </div>
              <div className="mb-3 mt-3">
                <label className="form-label fw-bold">Email</label>
                <Input
                  style={{ backgroundColor: "#E8E8E8" }}
                  type="email"
                  className="form-control"
                  id="email"
                  required
                  placeholder="Email"
                />
              </div>
            </form>
          </div>
          <hr />
          <Container>
            <p
              className="mt-4"
              style={{ fontSize: "20px", lineHeight: "25px", fontWeight: 500 }}
            >
              Roles(s)*
            </p>
            <p
              style={{ fontSize: "14px", lineHeight: "22px", fontWeight: 500 }}
            >
              Select one role for the person you’re inviting
            </p>
          </Container>
          <Container>
            <div className="d-flex mt-3">
              <div>
                <Form.Check
                  type="radio"
                  name="radio-group"
                  id="radio-option-1"
                />
              </div>
              <div>
                <p
                  className="ms-2"
                  style={{
                    fontSize: "20px",
                    lineHeight: "25px",
                    fontWeight: 500,
                  }}
                >
                  Admin (Co-owner)
                </p>
                <p
                  className="ms-2"
                  style={{
                    fontSize: "14px",
                    lineHeight: "22px",
                    fontWeight: 500,
                  }}
                >
                  Has full access to manage, edit & publish, edit users,
                  including billing, inviting people, but cannot delete site
                </p>
              </div>
            </div>
          </Container>
          <Container>
            <div className="d-flex mt-3">
              <div>
                <Form.Check
                  type="radio"
                  name="radio-group"
                  id="radio-option-1"
                />
              </div>
              <div>
                <p
                  className="ms-2"
                  style={{
                    fontSize: "20px",
                    lineHeight: "25px",
                    fontWeight: 500,
                  }}
                >
                  User
                </p>
                <p
                  className="ms-2"
                  style={{
                    fontSize: "14px",
                    lineHeight: "22px",
                    fontWeight: 500,
                  }}
                >
                  Has access to manage, edit & publish, but cannot edit users,
                  billing, invite people, or delete site
                </p>
              </div>
            </div>
          </Container>
          <Container>
            <div className="col-md-10 mt-5">
              <button className="float-end save-btn-edit">Save</button>
            </div>
          </Container>
          <div></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditMember;
