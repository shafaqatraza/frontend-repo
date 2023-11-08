import React, { useState, useEffect } from "react";
import { Image, Link } from "@chakra-ui/react";
import viewlogo from "../assets/imgs/viewlogo.png";
import deletelogo from "../assets/imgs/deletelogo.png";
import edit2 from "../assets/imgs/edit2.png";
import axios from "axios";
import { useToast } from '@chakra-ui/toast'
import { accessToken, baseUrl, currentOrganization } from "./Helper/index";

const VolunteerListing = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useToast()

  const getVolunteerListings = () => {
    axios
      .get(`${baseUrl}/volunteer-listings/all/${ // @ts-ignore: Unreachable code error
        currentOrganization?.slug}`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if(currentOrganization){
      setLoading(true)
      getVolunteerListings();
    }
  }, [currentOrganization]);

  const deleteVolunteer = (charity: any) => {
    setLoading(true)
    axios
      .delete(`${baseUrl}/volunteer-listings/${charity}/delete?org=${ // @ts-ignore: Unreachable code error
        currentOrganization?.slug}`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          // 'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
      .then((res) => {
        if (res.status === 200) {
          getVolunteerListings();
          toast({
            title: res.data.message,
            status: 'success'
          })
        }
      })
      .catch((err) => {
      });
  };
  return (
    <>
      <div className="row">
        {loading ? (
          <div
            style={{
              color: "#E27832",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <div className="spinner-border"></div>
          </div>
        ) : (
          data &&
          data.map((item, index) => (
            <div className="col-md-3 d-flex flex-wrap mt-4" key={index}>
              <div className="list-cards">
                <div className="position-relative">
                 <div className="li-car d-flex justify-content-center align-items-center">
                 <Image
                    className="img-fluid"
                    src={
                      // @ts-ignore: Unreachable code error
                      item?.thumbnail}
                  />
                 </div>
                 <div>
                {
                  // @ts-ignore: Unreachable code error
                  item.title
                }
              </div>
                  <div className="position-absolute top-0 end-0">
                    <div className="d-flex justify-content-end p-2">
                      <div className="d-flex align-items-center me-2">

                      <Link href={`listings/volunteer-listing/${ // @ts-ignore: Unreachable code error
                        item?.slug}`}>
                        <a>
                          <img src={viewlogo.src} />
                        </a>
                      </Link>
                      </div>
                      <div className="d-flex align-items-center me-2">
                      <Link href={`listings/volunteer-listing/${
                        // @ts-ignore: Unreachable code error
                        item?.slug}/update`}>
                        <a>
                          <img src={edit2.src} />
                        </a>
                      </Link>
                      </div>
                      <div className="d-flex align-items-center me-2">
                        <Image
                          onClick={(charity) =>
                            deleteVolunteer(
                              // @ts-ignore: Unreachable code error
                              item?.slug
                            )
                          }
                          src={deletelogo.src}
                        />
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="fw-bold">
                {/* {item.price} */}
                {/* <Image src={item?.path}/> */}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default VolunteerListing;
