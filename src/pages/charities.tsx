import React from 'react'
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import Charity from "../assets/imgs/Penny.png";
import { Image } from '@chakra-ui/react';
import part1 from "../assets/imgs/part1.png";
import part2 from "../assets/imgs/part2.png";
import part3 from "../assets/imgs/part3.png";
import part4 from "../assets/imgs/part4.png";
import partner1 from "../assets/imgs/partner1.png";
import partner2 from "../assets/imgs/partner2.png";
import partner3 from "../assets/imgs/partner3.png";
import partner4 from "../assets/imgs/partner4.png";
import Penny from "../assets/imgs/Penny.png";
import pennygovernment from "../assets/imgs/pennygovernment.png";
import pennyvolunteer from "../assets/imgs/pennyvolunteer.png";
import pennysports from "../assets/imgs/pennysports.png";
import pennyfundraising from "../assets/imgs/pennyfundraising.png";
import pennyevent from "../assets/imgs/pennyevent.png";
import pennyteaching from "../assets/imgs/pennyteaching.png";
import pennyenvironment from "../assets/imgs/pennyenvironment.png";
import pennyanimals from "../assets/imgs/pennyanimals.png";
import { Container, Row, Col } from "react-bootstrap";
import step1 from "../assets/imgs/step1.png";
import dashboard1 from "../assets/imgs/dashboard1.png";
import dashboard2 from "../assets/imgs/dashboard2.png";
import gooddeedspegiun from "../assets/imgs/gooddeedspegiun.png"
import gooddeedspegiun2 from "../assets/imgs/gooddeedspegiun2.png"
import rev from "../assets/imgs/rev.png";
import step2 from "../assets/imgs/step2.png";
import pennysearching2 from "../assets/imgs/pennysearching2.png";

const Charities = () => {
  return (
    <>
    <Navbar/>
    <div className="container">
        <div className="row">
          <div className="col-md-8 mt-5">
            <p className="good-deeds">Good Deeds connects <span className="you-motivated">you with motivated</span> <span className="volunteers">volunteers</span> <span className="and">and</span> <span className="donors">donors</span></p>
            <div className="mt-2 mb-2">
            <p className="our-platform">Our platform makes it effortless to manage and reward your donors and volunteers in one convenient place.</p>
            </div>
            <div className="mt-3 mb-3">
            <button className="try-button">Try for free for 30 days</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mt-5">
            <Image src={Charity.src} alt={"Charity"}/>
            </div>
          </div>
        </div>
      </div>
      {/* Our Partners Section */}
      <div className="container">
        <div>
          <p className="text-center part-txt">Our Partners</p>
        </div>
        <div className="partners-img mt-5">
          <div className="row">
            <div className="col-md-3 d-flex justify-content-center">
              <Image className="mb-3 mt-3" src={part1.src} alt={"Partner1"} />
            </div>
            <div className="col-md-3 d-flex justify-content-center">
              <Image className="mb-3 mt-3" src={part2.src} alt={"Partner2"} />
            </div>
            <div className="col-md-4 d-flex justify-content-center">
              <Image
                style={{ width: "320px" }}
                className="mb-3 mt-3 img-fluid"
                src={part3.src}
                alt={"Partner3"}
              />
            </div>
            <div className="col-md-2 d-flex justify-content-center">
              <Image
                className="mb-3 mt-3 me-0 me-md-3"
                src={part4.src}
                alt={"Partner4"}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="row mt-5">
            <div className="col-md-3 part-card">
              <div className="d-flex justify-content-center">
                <div
                  className="card border-1"
                  style={{ height: "410px", width: "252px" }}
                >
                  <div className="d-flex justify-content-center mt-3 mb-3s">
                    <Image
                      style={{ maxWidth: "92px", height: "106px" }}
                      src={partner1.src}
                      alt={"Image"}
                    />
                  </div>
                  <div className="card-body">
                    <p
                      className="mt-4"
                      style={{
                        fontSize: "clamp(16px, 1.5vw, 24px)",
                        lineHeight: "clamp(20px, 3.5vw, 30px)",
                        fontWeight: "bold",
                        color: "#212121",
                        textAlign: "center",
                      }}
                    >
                      Convenient Access
                    </p>
                    <p className="card-text text-center mt-4 mb-3">
                      Access Good Deeds’s diverse and growing database of
                      volunteers with varying levels of unique skills and
                      expertise based on your project needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 part-card">
              <div className="d-flex justify-content-center">
                <div
                  className="card border-1"
                  style={{ height: "410px", width: "252px" }}
                >
                  <div className="d-flex justify-content-center mt-3 mb-3s">
                    <Image
                      style={{ width: "92px", height: "106px" }}
                      src={partner2.src}
                      alt={"Image"}
                    />
                  </div>
                  <div className="card-body">
                    <p
                      className="mt-4"
                      style={{
                        fontSize: "clamp(16px, 1.5vw, 24px)",
                        lineHeight: "clamp(20px, 3.5vw, 30px)",
                        fontWeight: "bold",
                        color: "#212121",
                        textAlign: "center",
                      }}
                    >
                      Convenient Access
                    </p>
                    <p className="card-text text-center mt-4 mb-3">
                      Access Good Deeds’s diverse and growing database of
                      volunteers with varying levels of unique skills and
                      expertise based on your project needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 part-card">
              <div className="d-flex justify-content-center">
                <div
                  className="card border-1"
                  style={{ height: "410px", width: "252px" }}
                >
                  <div className="d-flex justify-content-center mt-3 mb-3s">
                    <Image
                      style={{ width: "106px", height: "106px" }}
                      src={partner3.src}
                      alt={"Image"}
                    />
                  </div>
                  <div className="card-body">
                    <p
                      className="mt-4"
                      style={{
                        fontSize: "clamp(16px, 1.5vw, 24px)",
                        lineHeight: "clamp(20px, 3.5vw, 30px)",
                        fontWeight: "bold",
                        color: "#212121",
                        textAlign: "center",
                      }}
                    >
                      Trusted Quality
                    </p>
                    <p className="card-text text-center mt-4 mb-3">
                      Our rate and review feature maintains trusted standards in
                      reliability, transparency, and accountability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 part-card">
              <div className="d-flex justify-content-center">
                <div
                  className="card border-1"
                  style={{ height: "410px", width: "252px" }}
                >
                  <div className="d-flex justify-content-center mt-3 mb-3s">
                    <Image
                      style={{ width: "112px", height: "92px" }}
                      src={partner4.src}
                      alt={"Image"}
                    />
                  </div>
                  <div className="card-body">
                    <p
                      className="mt-4"
                      style={{
                        fontSize: "clamp(16px, 1.5vw, 24px)",
                        lineHeight: "clamp(20px, 3.5vw, 30px)",
                        fontWeight: "bold",
                        color: "#212121",
                        textAlign: "center",
                      }}
                    >
                      Engaging Reward System
                    </p>
                    <p className="card-text text-center mt-4 mb-3">
                      Improve your volunteer engagement and retention with a
                      reward system where volunteers earn Deed Dollars for their
                      invaluable contributions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Volunteer Categories */}
      <div className="container mt-5">
        <div className="main-volunteer-section">
          <div className="mt-3">
            <p className="volun-txt text-center p-4">Volunteer Categories</p>
          </div>
          <div>
            <p className="text-center volun-txt2">
              I am Seeking Passionate Volunteers for...
            </p>
          </div>
          <div className="row volunteer-card-row1">
            <div
              className="card volunteer-card col-md-2 col-sm-4"
              style={{ height: "200px", width: "209px" }}
            >
              <div className="volunteer-card-body">
                <div className="d-flex justify-content-center">
                  <Image
                    style={{ width: "130px" }}
                    src={Penny.src}
                    alt={"Skilled Workers"}
                  />
                </div>
                <div>
                  <p className="text-center mt-1 skill-txt">Skilled Trades</p>
                </div>
              </div>
            </div>
            <div
              className="card volunteer-card col-md-2 col-sm-4"
              style={{ height: "200px", width: "209px" }}
            >
              <div className="volunteer-card-body">
                <div className="d-flex justify-content-center">
                  <Image
                    style={{ width: "130px" }}
                    src={pennygovernment.src}
                    alt={"Skilled Workers"}
                  />
                </div>
                <div>
                  <p className="text-center mt-1 skill-txt">Governance</p>
                </div>
              </div>
            </div>
            <div
              className="card volunteer-card col-md-2 col-sm-4"
              style={{ height: "200px", width: "209px" }}
            >
              <div className="volunteer-card-body d-flex justify-content-center align-items-center flex-column">
                <Image src={pennyvolunteer.src} alt={"Skilled Workers"} />
                <span className="text-center mb-2 skill-txt">
                  Community Service
                </span>
              </div>
            </div>
            <div
              className="card volunteer-card col-md-2 col-sm-4"
              style={{ height: "200px", width: "209px" }}
            >
              <div className="volunteer-card-body d-flex justify-content-center align-items-center flex-column">
                <Image
                  style={{ width: "130px" }}
                  src={pennysports.src}
                  alt={"Skilled Workers"}
                />
                <span className="text-center mb-2 skill-txt">
                  Sports and Recreation
                </span>
              </div>
            </div>
            <div
              className="card volunteer-card col-md-2 col-sm-4"
              style={{ height: "200px", width: "209px" }}
            >
              <div className="volunteer-card-body d-flex justify-content-center align-items-center flex-column">
                <Image
                  style={{ width: "130px" }}
                  src={pennyfundraising.src}
                  alt={"Skilled Workers"}
                />
                <span className="text-center mb-2 skill-txt">Fund Raising</span>
              </div>
            </div>
            <div
              className="card volunteer-card col-md-2 col-sm-4"
              style={{ height: "200px", width: "209px" }}
            >
              <div className="volunteer-card-body d-flex justify-content-center align-items-center flex-column">
                <Image
                  style={{ width: "130px" }}
                  src={pennyevent.src}
                  alt={"Skilled Workers"}
                />
                <span className="text-center mb-2 skill-txt">
                  Event Management
                </span>
              </div>
            </div>
            <div
              className="card volunteer-card col-md-2 col-sm-4"
              style={{ height: "200px", width: "209px" }}
            >
              <div className="volunteer-card-body d-flex justify-content-center align-items-center flex-column">
                <Image
                  style={{ width: "130px" }}
                  src={pennyteaching.src}
                  alt={"Skilled Workers"}
                />
                <span className="text-center mb-2 skill-txt">
                  Teaching and tutoring
                </span>
              </div>
            </div>
            <div
              className="card volunteer-card col-md-2 col-sm-4"
              style={{ height: "200px", width: "209px" }}
            >
              <div className="volunteer-card-body d-flex justify-content-center align-items-center flex-column">
                <Image
                  style={{ width: "130px" }}
                  src={pennyenvironment.src}
                  alt={"Skilled Workers"}
                />
                <span className="text-center mb-2 skill-txt">
                  Environmental Services
                </span>
              </div>
            </div>
            <div
              className="card volunteer-card col-md-2 col-sm-4"
              style={{ height: "200px", width: "209px" }}
            >
              <div className="volunteer-card-body d-flex justify-content-center align-items-center flex-column">
                <Image
                  style={{ width: "130px" }}
                  src={pennyevent.src}
                  alt={"Skilled Workers"}
                />
                <span className="text-center mb-2 skill-txt">
                  Hospital/ Senior Care
                </span>
              </div>
            </div>
            <div
              className="card volunteer-card col-md-2 col-sm-4"
              style={{ height: "200px", width: "209px" }}
            >
              <div className="volunteer-card-body d-flex justify-content-center align-items-center flex-column">
                <Image
                  style={{ width: "130px" }}
                  src={pennyanimals.src}
                  alt={"Skilled Workers"}
                />
                <span className="text-center mb-2 skill-txt">
                  Animal Services
                </span>
              </div>
            </div>
          </div>
          <div className="mt-5 pb-5 text-center">
            <button className="try-button">Get Started</button>
          </div>
        </div>
      </div>
      {/* Get Started */}
      <div className="mt-5 container">
        <p className="start-txt text-center">How to Get Started</p>
      </div>
      <Container>
        <Row>
          <Col md={10}>
            <div className="d-flex align-items-center justify-content-center mt-5">
              <div>
                <p className="step1-txt">Step 1</p>
                <img className="img-fluid" src={step1.src} alt="example" />
              </div>
              <div>
                <p className="mt-5 mb-2 step1-txt">Sign up</p>
                <hr className="hr-step1" style={{ height: "5px" }} />
                <p className="step1-txt2 mt-2">
                  Sign Up for Good deeds account
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={10}>
            <p className="step1-txt text-end mt-3">Step 2</p>
            <div className="d-flex align-items-center justify-content-end container mt-5">
              <div>
                <p className="mb-2 step1-txt">Add An Organization</p>

                <hr className="hr-step2" style={{ height: "5px" }} />

               <p className="step1-txt2 mt-2">
                  Create or Add an Organization to being <span className="d-block">creating listings for volunteers or donations!</span>
                </p>
              </div>
              <div>
                <img
                  src={step2.src}
                  alt="example"
                  className="img-fluid"
                />
              </div>
            </div>
          </Col>
        </Row>


        <Row>
          <Col md={10}>
            <div className="d-flex align-items-center justify-content-center mt-5">
              <div>
                <p className="step1-txt ms-0 ms-md-5 mt-4">Step 3</p>
                <img className="mt-5" src={gooddeedspegiun2.src} alt="example" />
              </div>
              <div className="mt-5">
                <p className="mt-5 mb-2 step1-txt">Set Up Your Dashboard</p>
                <hr className="hr-step1" style={{ height: "5px" }} />
                <p className="step1-txt2 mt-2">
                Organize your dashboard for easy visibility
<span className="d-block">and management of user donations and</span>
<span className="d-block">volunteer applications.</span>
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="d-flex justify-content-center mt-5">
              <div>
                <Image src={dashboard1.src} alt={"Dashboard one"} />
              </div>
              <div className="mt-5">
                <Image src={dashboard2.src} alt={"Dashboard tw0"} />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={10}>
            <p className="step1-txt text-end mt-3">Step 4</p>
            <div className="d-flex align-items-center justify-content-end container mt-5">
              <div>
                <p className="mb-2 step1-txt">Recruit Your Volunteer </p>

                <hr className="hr-step2" style={{ height: "5px" }} />

               <p className="step1-txt2 mt-2">
               Follow up with a selected volunteer application <span className="d-block">and start collaborating on your campaign!</span>
                </p>
              </div>
              <div>
                <img
                  src={pennysearching2.src}
                  alt="example"
                  className="img-fluid"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div
        className="mt-5"
        style={{ backgroundColor: "rgba(222, 227, 230, 0.5)" }}
      >
        <Container>
        <div className="text-center">
                <p className="review-txt pt-5">
                  Hear What Our Partners Have to Say
                </p>
              </div>
          <Row className="mt-5 pb-5">
            <Col md={4}>

              <div>
                <div className="card-review">
                  <div className="stars d-flex justify-content-center">
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                  </div>
                  <p className="review">
                    I was initially skeptical about a platform for giving. After
                    trying it for a few days, I realized how user-friendly it
                    was. I recommended Good Deeds to my daughter so she could
                    round up her 40 hours of community service without the fuss.
                    She loved it.
                  </p>
                  <div className="d-flex">
                    <div className="ms-5"><Image src={rev.src} alt={"Review"}/></div>
                    <div className="mt-4">
                      <p className="rev-txt1">Abe Evreniadis</p>
                      <p className="rev-txt2">Geneva Centre for Autism</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4}>

              <div>
                <div className="card-review">
                  <div className="stars d-flex justify-content-center">
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                  </div>
                  <p className="review">
                  Thank you, Good Deeds Canada for joining the Partner for Life program. As it can often take more than one donor to save a life, Partners for Life brings people together with the common goal of supporting the most vulnerable people in our communities.
                  </p>
                  <div className="d-flex">
                    <div className="ms-5"><Image src={rev.src} alt={"Review"}/></div>
                    <div className="mt-4">
                      <p className="rev-txt1">Simran Dulay</p>
                      <p className="rev-txt2">Canadian Blood Services</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div>
                <div className="card-review">
                  <div className="stars d-flex justify-content-center">
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                  </div>
                  <p className="review">
                  Our experience with Good Deeds has been nothing short of amazing. The partnership redefined the donation and volunteering process, setting the stage for new fundraising possibilities. We truly look forward to many more good years with Good Deeds.
                  </p>
                  <div className="d-flex">
                    <div className="ms-5"><Image src={rev.src} alt={"Review"}/></div>
                    <div className="mt-4">
                      <p className="rev-txt1">Laina Mercer</p>
                      <p className="rev-txt2">Habitat for Humanity Canada</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
            </div>
    <Footer/>
    </>
  )
}
export default Charities;
