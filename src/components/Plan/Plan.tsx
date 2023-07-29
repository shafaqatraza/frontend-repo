import { Image, Button } from "@chakra-ui/react";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import charity from "../../assets/imgs/Charity.png";
import fb from "../../assets/imgs/fblogo.png";
import tiktok from "../../assets/imgs/tiktoklogo.png";
import insta from "../../assets/imgs/instalogo.png";
import { useRouter } from 'next/router'

const Plan = () => {
  const router = useRouter()
  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: "#DEE3E680" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Image src={charity.src} alt={"Image"} />
              <Button
                variant={'solid'}
                colorScheme={'orange'}
                style={{
                  borderRadius: '50px',
                  width: '100%',
                  maxWidth: '350px',
                  margin: '0 auto',
                }}
                height="46px"
                fontSize={['12px', '16px']}
                fontWeight="600"
                color="#FFF"
                padding={'5px'}
                onClick={() => { router.push('/charities') }}
                >
                  Click here to get volunteers and donors
                </Button>
            </div>
            <div className="col-md-8 py-5">
              <p className="good-deeds"><span style={{ color: "#183553" }}>Calling all</span> <span style={{ color: "#E27832" }}>Charities</span> and <span style={{ color: "#E27832" }}>NPO’s</span><span style={{ color: "#183553" }}>: Need donations or volunteers?</span></p>
              <p className="our-platform mt-4 mb-5 mb-md-0">Unleash the potential of impact. Discover how Good Deeds amplifies charitable donations and maximizes cost savings for your organization. Unlock a world of diverse, dedicated volunteers, both skilled and unskilled, poised to join your noble cause.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <p className="good-deeds text-center mt-5"><span style={{ color: "#183553" }}>Join us on</span> <span style={{ color: "#E27832" }}>Social!</span></p>
        <div
          className="d-flex justify-content-center flex-wrap mt-5 mb-5"
          style={{ gap: '2rem' }}
        >
          <a href="https://www.tiktok.com/@gooddeedsllc" target="_blank" rel="noopener noreferrer">
            <Image src={tiktok.src} alt="TikTok" />
          </a>
          <a href="https://www.instagram.com/gooddeedsllc/" target="_blank" rel="noopener noreferrer">
            <Image src={insta.src} alt="Instagram" />
          </a>
          <a href="https://www.facebook.com/gooddeeds.ca" target="_blank" rel="noopener noreferrer">
            <Image src={fb.src} alt="Facebook" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Plan;
