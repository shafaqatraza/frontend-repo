import { Image } from "@chakra-ui/react";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from 'next/router'
import part3 from "../../assets/imgs/part3.png";
import heart from "../../assets/imgs/heart.png";
import part4 from "../../assets/imgs/part4.png";
import part1d from "../../assets/imgs/part1d.png";
import { useToast } from "@chakra-ui/toast";
import { isLogin } from '../Helper/index'
const SocialServices = () => {
  const router = useRouter()
  const toast = useToast();
  return (
    <>
      <div
        className="container-fluid"
        style={{ backgroundColor: "rgba(222, 227, 230, 0.5)" }}
      >
        <div className="container">
          <p className="paragraph pt-5">
            <span className="good-deeds">
              <span style={{ color: "#183553" }}>Need more</span>{" "}
              <span style={{ color: "#E27832" }}>Deed Dollars</span>
              <span style={{ color: "#183553" }}>?</span>
            </span>
          </p>
          <p className="our-platform mt-4 mb-5">
            Here are 3 simple ways to earn exclusive Deed Dollars:
          </p>
          <Row className="pb-5">
            <div className="d-flex justify-content-around flex-wrap">
              <div className="card-social res-card-soc">
                <p
                  style={{
                    fontSize: "clamp(20px, 2.5vw, 40px)",
                    lineHeight: "48px",
                    fontWeight: "600",
                    color: "#E27832",
                  }}
                  className="text-center mt-2"
                >
                  1
                </p>
                <p
                  style={{
                    fontSize: "clamp(16px, 1.4vw, 24px)",
                    lineHeight: "clamp(18px, 2.5vw, 26px)",
                    fontWeight: "600",
                  }}
                  className="text-center"
                >
                  List an item or service on the marketplace
                </p>
                <button className="donate-btn" onClick={() => { router.push('/browse?type=offering&activeTab=0') }} >List an item or service</button>
              </div>

              <div className="card-social res-card-soc">
                <p
                  style={{
                    fontSize: "clamp(20px, 2.5vw, 40px)",
                    lineHeight: "48px",
                    fontWeight: "600",
                    color: "#E27832",
                  }}
                  className="text-center mt-2"
                >
                  2
                </p>
                <p
                  style={{
                    fontSize: "clamp(16px, 1.4vw, 24px)",
                    lineHeight: "clamp(18px, 2.5vw, 26px)",
                    fontWeight: "600",
                  }}
                  className="text-center"
                >
                  Donate to one of our Charity partners and Good Deeds will
                  match your contribution in Deed Dollars.
                </p>
                <button className="donate-btn" onClick={() => { router.push('/browse?type=offering&activeTab=3') }}>Donate</button>
              </div>

              <div className="card-social res-card-soc">
                <p
                  style={{
                    fontSize: "clamp(20px, 2.5vw, 40px)",
                    lineHeight: "48px",
                    fontWeight: "600",
                    color: "#E27832",
                  }}
                  className="text-center mt-2"
                >
                  3
                </p>
                <p
                  style={{
                    fontSize: "clamp(16px, 1.4vw, 24px)",
                    lineHeight: "clamp(18px, 2.5vw, 26px)",
                    fontWeight: "600",
                  }}
                  className="text-center"
                >
                  Invite your friends and get 10 Deed Dollars
                </p>
                <button className="donate-btn" onClick={() => { isLogin() ? router.push('/profile') : toast({ title: "You need to login first, Please Login.", status: "error", position: 'top' }); }}>Invite</button>
              </div>
            </div>
          </Row>
        </div>
      </div>
      <div className="container">
        <div>
          <p className="good-deeds my-5 ms-4">
            <span style={{ color: "#183553" }}>How do we make</span>{" "}
            <span style={{ color: "#E27832" }}>money</span>
            <span style={{ color: "#183553" }}>?</span>
          </p>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="make-money-card">
              <p
                className="text-center mt-3"
                style={{
                  fontSize: "clamp(16px, 2.5vw, 32px )",
                  color: "#E27832",
                  fontWeight: "600",
                  lineHeight: "clamp(18px, 2.5vw, 38px)",
                }}
              >
                Paid Subscription
              </p>
              <p
                style={{
                  fontSize: "clamp(16px, 2.5vw, 32px )",
                  color: "#183553",
                  fontWeight: "600",
                  lineHeight: "clamp(18px, 2.5vw, 38px)",
                }}
                className="my-5 text-center"
              >
                Unleash the force of good. Our paid subscriptions empower credible organizations in their quest for volunteers and vital donations.
              </p>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="make-money-card mt-3 mt-md-0">
              <p
                className="text-center mt-3"
                style={{
                  fontSize: "clamp(16px, 2.5vw, 32px )",
                  color: "#E27832",
                  fontWeight: "600",
                  lineHeight: "clamp(18px, 2.5vw, 38px)",
                }}
              >
                Advertising
              </p>
              <p
                style={{
                  fontSize: "clamp(16px, 2.5vw, 32px )",
                  color: "#183553",
                  fontWeight: "600",
                  lineHeight: "clamp(18px, 2.5vw, 38px)",
                }}
                className="my-5 text-center"
              >
                Empower change through powerful partnerships. Ad fees from our dedicated corporate allies fuel our mission to create a better world.
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <p
            className="text-center my-5"
            style={{
              fontSize: "clamp(16px, 2.5vw, 32px )",
              color: "#183553",
              fontWeight: "600",
              lineHeight: "clamp(18px, 2.5vw, 38px)",
            }}
          >
            Fueling the spirit of giving. Good Deeds thrives on the generosity of our community. Donations flow freely, making a direct impact. Our subscribers power our platform, ensuring it remains vibrant and user-friendly. Together, we cultivate a haven of kindness where we all pay it forward.
          </p>
        </div>
      </div>
    </>
  );
};

export default SocialServices;

