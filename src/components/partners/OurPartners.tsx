import { Image, Button } from "@chakra-ui/react";
import React from "react";
import part1 from "../../assets/imgs/part1.png";
import part2 from "../../assets/imgs/part2.png";
import part3 from "../../assets/imgs/part3.png";
import part4 from "../../assets/imgs/part4.png";
import partner1 from "../../assets/imgs/partner1.png";
import partner2 from "../../assets/imgs/partner2.png";
import partner3 from "../../assets/imgs/partner3.png";
import partner4 from "../../assets/imgs/partner4.png";
import partp1 from "../../assets/imgs/partp1.png";
import pennyearncreds from "../../assets/imgs/pennyearncreds.png";
import pennyshop from "../../assets/imgs/penyshop.png";
import { isLogin } from '../Helper/index'
import { useToast } from '@chakra-ui/toast'
import { useRouter } from 'next/router'

const ourPartners = () => {
  const toast = useToast()
  const router = useRouter()
  return (
    <>
      <div className="container">
        <div>
          <p className="text-center part-txt">Our Partners</p>
        </div>
        <div className="partners-img mt-5">
          <div className="row">
            <div className="col-md-3 d-flex justify-content-center">
              <Image className="mb-3 mt-3" src={part1.src} alt={"Partner1"} />
            </div>
            <div className="col-md-3 d-flex justify-content-center">
              <Image className="mb-3 mt-3" src={part2.src} alt={"Partner2"} />
            </div>
            <div className="col-md-4 d-flex justify-content-center">
              <Image
                style={{ width: "320px" }}
                className="mb-3 mt-3 img-fluid"
                src={part3.src}
                alt={"Partner3"}
              />
            </div>
            <div className="col-md-2 d-flex justify-content-center">
              <Image
                className="mb-3 mt-3 me-0 me-md-3"
                src={part4.src}
                alt={"Partner4"}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="row mt-5">
            <div className="col-md-4 part-card">
              <div className="d-flex justify-content-center">
                <div
                  className="card shadow border-0"
                  style={{ height: "423px", width: "301px", borderRadius: "10px" }}
                >
                  <div className="d-flex justify-content-center mt-3 mb-3s">
                    <Image
                      // style={{ maxWidth: "92px", height: "106px" }}
                      src={partp1.src}
                      alt={"Image"}
                    />
                  </div>
                  <div className="card-body">
                    <p
                      style={{
                        fontSize: "clamp(24px, 4vw, 32px)",
                        lineHeight: "clamp(20px, 3.5vw, 32px)",
                        fontWeight: "bold",
                        color: "#183553",
                        textAlign: "center",
                      }}
                    >
                      Give
                    </p>
                    <p style={{ color: "#183553" }} className="card-text text-center mt-3 mb-3">
                      Make a real difference in your community by listing your unwanted stuff or by providing a service.
                    </p>
                    <div className="d-flex justify-content-center mt-4">
                      <Button
                        variant={'solid'}
                        colorScheme={'orange'}
                        style={{ borderRadius: 50 }}
                        size={'md'}
                        fontSize="12px"
                        fontWeight="600"
                        width="170px"
                        maxW="100%"
                        onClick={
                          () => {
                            isLogin() ? router.push('/listing/create') : toast({ title: 'Please login to list an item', status: "error", position: 'top' })
                          }
                        }
                      >
                        Make a difference
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 part-card">
              <div className="d-flex justify-content-center">
                <div
                  className="card shadow border-0"
                  style={{ height: "423px", width: "301px", borderRadius: "10px" }}
                >
                  <div className="d-flex justify-content-center mt-3 mb-3s">
                    <Image
                      src={pennyearncreds.src}
                      alt={"Image"}
                    />
                  </div>
                  <div className="card-body">
                    <p
                      className="mt-3"
                      style={{
                        fontSize: "clamp(24px, 4vw, 32px)",
                        lineHeight: "clamp(20px, 3.5vw, 30px)",
                        fontWeight: "bold",
                        color: "#183553",
                        textAlign: "center",
                      }}
                    >
                      Earn
                    </p>
                    <p style={{ color: "#183553" }} className="card-text text-center mt-4">
                      Every Deed Dollar earned equals one dollar in value.
                    </p>
                    <div style={{ marginTop: "3.9rem" }} className="d-flex justify-content-center">
                      <a href="#need_more_credits">
                        <Button
                          variant={'solid'}
                          colorScheme={'orange'}
                          style={{ borderRadius: 50 }}
                          size={'md'}
                          fontSize="12px"
                          fontWeight="600"
                          width="170px"
                          maxW="100%"
                        >
                          Earn Rewards
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 part-card">
              <div className="d-flex justify-content-center">
                <div
                  className="card shadow border-0"
                  style={{ height: "423px", width: "301px", borderRadius: "10px" }}
                >
                  <div style={{ height: "180px" }} className="d-flex justify-content-center">
                    <Image
                      style={{ width: "183px" }}
                      src={pennyshop.src}
                      alt={"Image"}
                    />
                  </div>
                  <div className="card-body">
                    <p
                      style={{
                        fontSize: "clamp(24px, 4vw, 32px)",
                        lineHeight: "clamp(20px, 3.5vw, 30px)",
                        fontWeight: "bold",
                        color: "#183553",
                        textAlign: "center",
                      }}
                    >
                      Shop
                    </p>
                    <p style={{ color: "#183553" }} className="card-text text-center mt-4 mb-3">
                      Exchange your Deed Dollars for items or services in the marketplace.
                    </p>
                    <div style={{ marginTop: "2.7rem" }} className="d-flex justify-content-center">
                      {/* <a className="p-btn1 text-decoration-none" href="#how_it_works">Shop the Marketplace</a> */}
                      <Button
                        variant={'solid'}
                        colorScheme={'orange'}
                        style={{ borderRadius: 50 }}
                        size={'md'}
                        fontSize="12px"
                        fontWeight="600"
                        width="170px"
                        maxW="100%"
                        onClick={() => { router.push('/browse?type=offering') }}
                      >
                        Shop the Marketplace
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ourPartners;
