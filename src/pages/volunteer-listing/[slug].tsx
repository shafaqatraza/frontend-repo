import React, {useEffect, useState} from "react";
import Sidebar from "../../components/Sidebar";
import { Footer } from "../../components/Footer";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { accessToken, baseUrl } from "../../components/Helper/index";
import { useRouter } from "next/router";
import { Image } from "@chakra-ui/react";
import goforw from "../../assets/imgs/goforw.png"
import threedot from "../../assets/imgs/threedot.png"

const VolunteerListingView = () => {
  const [organizationSlug, setOrganizationSlug] = useState([]);
  const [donationData, setDonationData] = useState([]);
  const router = useRouter();
  const { slug } = router.query;
  useEffect(() => {
    axios
      .get(`${baseUrl}/organizations`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res.data[0]?.slug, "datatatata");
        setOrganizationSlug(res.data[0]?.slug);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(
        `${baseUrl}/volunteer-listings/${slug}/show?org=${organizationSlug}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken(),
            // 'Content-Type': 'application/x-www-form-urlencoded'
          },
        }
      )
      .then((res) => {
        console.log(res.data.data, "new api");
        setDonationData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [organizationSlug]);
  return (
    <>
      <Navbar />
      <Sidebar>
       <div className="d-flex justify-content-between">
       <div className="mt-5 d-flex align-items-center">
          <span>Volunteer Listing</span>
          <span className="ms-3 me-3"><Image src={goforw.src}/></span>
          <span>
          {
              // @ts-ignore: Unreachable code error
              donationData?.title}
          </span>
        </div>
        {/* <div className="mt-5 three-dot">
          <Image className="three-img" src={threedot.src}/>
        </div> */}
       </div>
        <div>
          <div>
           <div style={{ height: '500px', maxWidth: '100%' }} className="d-flex justify-content-center">
           <Image style={{ maxWidth: '100%', height: 'auto' }} className="img-fluid" src={
            // @ts-ignore: Unreachable code error
            donationData.thumbnail}/>
           </div>
            <div className="mt-2 ms-3 d-flex justify-content-between">
             <p style={{fontSize:"16px"}} className="fw-bold">
             {
              // @ts-ignore: Unreachable code error
              donationData?.title}
             </p>
             <p style={{fontSize:"16px", color:"grey"}}>
             {
              // @ts-ignore: Unreachable code error
              donationData?.created_at_human_diff}
             </p>
            </div>
            <div>
            <p className="ms-3" style={{fontSize:"18px", color:"#E27832"}}>
             {
              // @ts-ignore: Unreachable code error
              donationData?.credit_amount} Credits
             </p>
             <p className="ms-3" style={{fontSize:"14px"}}>
             Virtual Deed
             </p>
            </div>
          </div>
        </div>
      </Sidebar>
      <Footer />
    </>
  );
};

export default VolunteerListingView;
