import React, { useState, useEffect } from "react";
import { Image, Link } from "@chakra-ui/react";
import viewlogo from "../assets/imgs/viewlogo.png";
import deletelogo from "../assets/imgs/deletelogo.png";
import edit2 from "../assets/imgs/edit2.png";
import axios from "axios";
import { useToast } from '@chakra-ui/toast'
import { useRouter } from 'next/router';
import { accessToken, baseUrl, currentOrganization } from "./Helper/index";

interface Volunteer {
  slug: string;
  title: string;
  price: number;
}

const VolunteerListing = (props: any) => {
  const {orgSlug, userPermissions} =props;
  const [data, setData] = useState<Volunteer[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast()
  const [accessDenied, setAccessDenied] = useState(false)
  const router = useRouter();

  const getVolunteerListings = () => {
    axios
      .get(`${baseUrl}/volunteer-listings/all/${ // @ts-ignore: Unreachable code error
        orgSlug}`, {
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
    if(orgSlug !== "" && userPermissions?.role === 'Superadmin' || orgSlug !== "" && (userPermissions?.permissions && userPermissions.permissions.includes('view_volunteer_listings'))){
      setLoading(true)
      getVolunteerListings();
      setAccessDenied(false)
    }else{
      setAccessDenied(true)
    }
  }, [orgSlug, userPermissions]);

  const deleteVolunteer = (charity: any) => {
    if(userPermissions?.role !== 'Superadmin' || !(userPermissions?.permissions && userPermissions.permissions.includes('delete_volunteer_listings'))){
      toast({ position: "top", title: "You don't have the necessary permissions.", status: "warning" })
      return;
    }

    setLoading(true)
    axios
      .delete(`${baseUrl}/volunteer-listings/${charity}/delete?org=${ // @ts-ignore: Unreachable code error
        orgSlug}`, {
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

  const handleUpdateVolunteer = (listingSlug: string) => { console.log('userPermissions', userPermissions)
    if(userPermissions?.role === 'Superadmin' || (userPermissions?.permissions && userPermissions.permissions.includes('update_volunteer_listings'))){
      const updateRoute = `listings/volunteer-listing/${listingSlug}/update`;
      router.push(updateRoute); 
    }else{
      toast({ position: "top", title: "You don't have the necessary permissions.", status: "warning" })
    }
  }

  return (
    <>
    {accessDenied? (
       <div className="access-denied-container">
        <h1 className="access-denied-title">Access Denied</h1>
        <p className="access-denied-message">You don't have the necessary permissions to access volunteer listings.</p>
      </div>
    ):(

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
                        <a>
                          <img src={edit2.src} onClick={()=> handleUpdateVolunteer(item?.slug)} />
                        </a>
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
    )}
    </>
  );
};

export default VolunteerListing;
