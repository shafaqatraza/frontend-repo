import React, {useEffect, useState} from "react";
import Sidebar from "../../../../components/Sidebar";
import { Footer } from "../../../../components/Footer";
import Navbar from "../../../../components/Navbar";
import axios from "axios";
import { accessToken, baseUrl, currentOrganization } from "../../../../components/Helper/index";
import { useRouter } from "next/router";
import { Image } from "@chakra-ui/react";
import goforw from "../../../../assets/imgs/goforw.png"
import threedot from "../../../../assets/imgs/threedot.png"

const VolunteerListingView = () => {
  const [volunteerData, setVolunteerData] = useState([]);
  const router = useRouter();
  const { slug } = router.query;
  const [error, setError] = useState(null);
  useEffect(() => {
    if(slug !== undefined){
      setError(null);
      axios
        .get(
          `${baseUrl}/volunteer-listings/${slug}/show?org=${// @ts-ignore: Unreachable code error
            currentOrganization?.slug}`,
          {
            headers: {
              Authorization: "Bearer " + accessToken(),
              // 'Content-Type': 'application/x-www-form-urlencoded'
            },
          }
        )
        .then((res) => {
          setVolunteerData(res.data.data);
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);
          } else {
            setError("Error occurred while fetching volunteer data.");
          }
        });
    }else{
      return
    }
  }, [slug, currentOrganization]);

  if (error) {
    return <div>Error: {error}</div>;
  }

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
              volunteerData?.title}
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
            volunteerData.thumbnail}/>
           </div>
            <div className="mt-2 ms-3 d-flex justify-content-between">
             <p style={{fontSize:"16px"}} className="fw-bold">
             {
              // @ts-ignore: Unreachable code error
              volunteerData?.title}
             </p>
             <p style={{fontSize:"16px", color:"grey"}}>
             {
              // @ts-ignore: Unreachable code error
              volunteerData?.created_at_human_diff}
             </p>
            </div>
            <div>
            <p className="ms-3" style={{fontSize:"18px", color:"#E27832"}}>
             {
              // @ts-ignore: Unreachable code error
              volunteerData?.credit_amount} Deed Dollars
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
