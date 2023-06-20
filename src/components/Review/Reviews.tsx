import { Image } from "@chakra-ui/react";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import rev from "../../assets/imgs/rev.png";

const Reviews = () => {
  return (
    <>
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
            <Col className="rev-col" md={4}>

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
            <Col className="rev-col" md={4}>

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
            <Col className="rev-col" md={4}>
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
    </>
  );
};

export default Reviews;
