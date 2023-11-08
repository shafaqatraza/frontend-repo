import { Image } from "@chakra-ui/react";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import rev1 from "../../assets/imgs/review_one.jpg";
import rev2 from "../../assets/imgs/review_two.jpg";
import rev3 from "../../assets/imgs/review_three.jpg";

const Reviews = () => {
  return (
    <>
      <div
        className="mt-5 deeds-review"
        
      >
        <Container>
          <div className="text-center">
            <p className="review-txt pt-5">
              Hear What Our Partners and Users Have to Say
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
                    I was initially skeptical about a platform for giving. After trying it for a few days, I realized how user-friendly it was. I recommended Good Deeds to my daughter so she could round up her 40 hours of community service without the fuss. She loved it.
                  </p>
                  <div className="d-flex align-items-center justify-content-center mt-4">
                    <Image
                      src={rev1.src}
                      alt={"Review"}
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50px',
                        border: '2px solid #E27832'
                      }}
                    />
                    <div className="ms-3">
                      <p className="rev-txt1">Laina Mercer</p>
                      <p className="rev-txt2">Barrie, Ontario</p>
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
                    Good Deeds is simply perfect for someone like me who’s always looking for the next opportunity to help out. It was just the thing to bond with my son while we engaged in social work as a collective unit. Give it a try if you’re a volunteer with lots to give!
                  </p>
                  <div className="d-flex align-items-center justify-content-center mt-4">
                    <Image
                      src={rev2.src}
                      alt={"Review"}
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50px',
                        border: '2px solid #E27832'
                      }}
                    />
                    <div className="ms-3">
                      <p className="rev-txt1">Jake Masic</p>
                      <p className="rev-txt2">Brampton, Ontario</p>
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
                  <div className="d-flex align-items-center justify-content-center mt-4">
                    <Image
                      src={rev3.src}
                      alt={"Review"}
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50px',
                        border: '2px solid #E27832'
                      }}
                    />
                    <div className="ms-3">
                      <p className="rev-txt1">Abe Evreniadis</p>
                      <p className="rev-txt2">Geneva Centre for Autism</p>
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
