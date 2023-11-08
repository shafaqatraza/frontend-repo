import React, { useState, useEffect } from "react";
import viewlogo from "../assets/imgs/viewlogo.png";
import deletelogo from "../assets/imgs/deletelogo.png";
import edit2 from "../assets/imgs/edit2.png";
import charity from "../assets/imgs/Charity.png";
import { Image } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from '@chakra-ui/toast'
import { accessToken, baseUrl, currentOrganization } from "./Helper/index";
import Link from "next/link";


interface Donation {
  slug: string;
  title: string;
  price: number;
}


const DonationListing = () => {
  const [data, setData] = useState<Donation[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast()

  const getDonationListings = () => {
    axios
      .get(`${baseUrl}/donation-listings/all/${// @ts-ignore: Unreachable code error
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
      getDonationListings();
    }
  }, [currentOrganization]);

  const deleteDonation = (charity: any) => {
    setLoading(true)
    axios
      .delete(`${baseUrl}/donation-listings/${charity}/delete?org=${// @ts-ignore: Unreachable code error
        currentOrganization?.slug}`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          // 'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
      .then((res) => {
        if (res.status === 200) {
          getDonationListings();
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
          data?.map((item, index) => (
            <div className="col-md-3 d-flex flex-wrap mt-4" key={index}>
              <div className="list-cards-donation">
                <div className="position-relative">
                 <div className="li-car d-flex justify-content-center align-items-center">
                 <Image
                 src={
                 // @ts-ignore: Unreachable code error
                  item?.thumbnail}
/>
                 </div>
                 <div>
                {
                  // @ts-ignore: Unreachable code error
                  item?.title
                }
              </div>
                  <div className="position-absolute top-0 end-0">
                    <div className="d-flex justify-content-end p-2">
                      <div className="d-flex align-items-center me-2">
                      <Link href={`listings/donation-listing/${item?.slug}`}>
                        <a>
                          <img src={viewlogo.src} />
                        </a>
                      </Link>
                      </div>
                      <div className="d-flex align-items-center me-2">
                      <Link href={`listings/donation-listing/${item?.slug}/update`}>
                        <a>
                          <img src={edit2.src} />
                        </a>
                      </Link>
                      </div>
                      <div className="d-flex align-items-center me-2">
                        <Image
                          onClick={(charity) =>
                            deleteDonation(
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
              <div className="fw-bold">{/* {item.price} */}</div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default DonationListing;
