import { Image, Button } from "@chakra-ui/react";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import charity from "../../assets/imgs/Charity.png";
import fb from "../../assets/imgs/fblogo.png";
import tiktok from "../../assets/imgs/tiktoklogo.png";
import insta from "../../assets/imgs/instalogo.png";
import PropTypes from 'prop-types';

interface PlanProps {
  handleGetVolunteersAndDonorsClick: () => any; // Adjust the function type accordingly
  isLogin: () => any;
  organizationExists:any;
}

const Plan: React.FC<PlanProps> = ({ handleGetVolunteersAndDonorsClick, isLogin, organizationExists }) => {
  
  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: "#DEE3E680" }}>
        <div className="container nop">
          <div className="row pb-5 pt-md-3">
            <div className="col-lg-4">
            <p className="good-deeds d-block d-lg-none mt-5 ms-1"><span style={{ color: "#183553" }}>Calling all</span> <span style={{ color: "#E27832" }}>Charities</span> and <span style={{ color: "#E27832" }}>NPO’s</span><span style={{ color: "#183553" }}>:<br/> Need donations or volunteers?</span></p>
              <Image src={charity.src} className="m-auto m-lg-0 mt-lg-5 mt-xl-0 pt-md-4" alt={"Image"} />
              {(!isLogin() || organizationExists === 0) && (
                <Button
                  className="d-none d-lg-block nop-btn"
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
                  onClick={() => handleGetVolunteersAndDonorsClick() }
                  >
                    Click here to get volunteers and donors
                </Button>
              )}
            </div>
            <div className="col-lg-8 pe-lg-0 pe-1 ps-0 ps-lg-4 py-lg-5">
              <p className="good-deeds d-none d-lg-block"><span style={{ color: "#183553" }}>Calling all</span> <span style={{ color: "#E27832" }}>Charities</span><span style={{ color: "#183553" }}> and</span> <span style={{ color: "#E27832" }}>NPO’s</span><span style={{ color: "#183553" }}>: Need donations or volunteers?</span></p>
              <p className="our-platform d-none d-lg-block mt-4 mb-md-0">Unleash the potential of impact. Discover how Good Deeds amplifies charitable donations and maximizes cost savings for your organization. Unlock a world of diverse, dedicated volunteers, both skilled and unskilled, poised to join your noble cause.</p>
              <p className="our-platform d-block d-lg-none mb-md-0  px-3">Learn more about how Good Deeds can help increase charitable donations, and save your organization money by matching you with a wide range of skilled or unskilled volunteers.</p>
              {(!isLogin() || organizationExists === 0) && (
                <Button className="d-block d-lg-none mt-4 mb-5"
                  variant={'solid'}
                  colorScheme={'orange'}
                  style={{
                    borderRadius: '50px',
                    width: '100%',
                    maxWidth: '350px',
                  }}
                  height="46px"
                  fontSize='16px'
                  fontWeight="600"
                  color="#FFF"
                  padding={'5px'}
                  onClick={() => handleGetVolunteersAndDonorsClick() }
                  >
                    Click here to get volunteers and donors
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container social">
        <p className="good-deeds text-center"><span style={{ color: "#183553" }}>Join us on</span> <span style={{ color: "#E27832" }}>Social!</span></p>
        <div
          className="d-flex justify-content-center flex-wrap mt-md-5 mt-4"
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

// Define the PropTypes for the component
Plan.propTypes = {
  handleGetVolunteersAndDonorsClick: PropTypes.func.isRequired,
};

export default Plan;
