import {
  Box,
  Center,
  Spinner,
  Flex,
  GridItem,
  Text,
  Image,
  Skeleton,
  Tag,
  AspectRatio,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
  TagLabel,
  Icon,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Avatar,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Button,
  Divider,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  baseUrl,
  baseImgUrl,
  isLogin,
  accessToken,
  getLoginData,
} from "../Helper/index";
import Rec1 from "../../assets/imgs/Rec1.png";
import Rect2 from "../../assets/imgs/Rect2.png";
import Rect from "../../assets/imgs/Rect.png";
import Rect4 from "../../assets/imgs/Rect4.png";
import Re3 from "../../assets/imgs/Re3.png";
import pennyandstudents from "../../assets/imgs/pennyandstudents.png";
import { useRouter } from 'next/router'
import pennyanimals from "../../assets/imgs/Rect2.png";
import axios from "axios";
import ProductGrids from "../ProductGrids";
import { ProductSingleCard } from "../ProductSingleCard";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const VolunteerCategories = () => {
  const router = useRouter()
  const [hotDeals, setHotDeals] = useState([]);
  const [wihslistIds, setWishListIds] = useState([]);

  const getHotDeals = React.useCallback(async () => {
    let url = `${baseUrl}/listings/hot-deals`;
    const data = await axios.get(url);
    if (data.status === 200) {
      setHotDeals(data.data.data);
    }
  }, []);

  const addToWhishList = async (id) => {
    let fd = new FormData();
    fd.append('listing_id', id);
    const data = await axios.post(`${baseUrl}/user/wishlist/store?listing_id=${id}`, fd, {
      headers: {
        Authorization: "Bearer " + accessToken(),
      },
    });
    getWhishlistIds();

  }

  const removeFromWhiteList = async (id) => {
    let fd = new FormData();
    fd.append('listing_id', id)
    const data = await axios.delete(`${baseUrl}/user/wishlist/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken(),
      },
    });
    getWhishlistIds();
  }

  const getWhishlistIds = React.useCallback(async () => {
    let url = `${baseUrl}/user/wishlist`;
    const data = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + accessToken(),
      },
    });

    if (data.status === 200) {
      setWishListIds(data.data.data);
    }
  }, []);

  useEffect(() => {
    getHotDeals();
  }, []);

  const sliderData = [
    { id: 1, imageUrl: Rec1.src, title: 'Spa & Beauty' },
    { id: 2, imageUrl: Rect2.src, title: 'Health & Wellness' },
    { id: 3, imageUrl: Re3.src, title: 'Electronics' },
    { id: 4, imageUrl: Rect4.src, title: 'Clothing & Apparel' },
    { id: 5, imageUrl: Rect.src, title: 'Home Decor' },
  ];

  const settings = {
    dots: false,
    infinite: true,
    spaceBetween:15,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 10000,
    prevArrow: null, // Remove previous arrow
    nextArrow: null, // Remove next arrow
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="mt-5">
        <div className="container">
          <p className="ndollar-txt">What Deed Dollars Can Earn You</p>
          <p style={{ fontSize: "clamp(16px, 2.2vw + 0.9rem, 24px)", lineHeight: "29px", fontWeight: "700" }} className="mt-3">Trending Now</p>
          <Box mt={30} mb={50}>
            {/* <Text
              fontSize={"30px"}
              fontWeight={600}
              color={"#000000"}
              textTransform="capitalize"
              mb={50}
            >
              Other Popular Listings
            </Text> */}

            <ProductGrids>
              {hotDeals.map(
                (product, index) =>
                  index <= 4 && <ProductSingleCard
                    addToWhishList={(e) => addToWhishList(e)}
                    removeFromWhiteList={(e) => removeFromWhiteList(e)}
                    key={product.id}
                    product={product}
                    inWhishList={wihslistIds.some((o) => o.id === product.id)}
                  />
              )}
            </ProductGrids>
            {hotDeals.length === 0 &&
              <Center h={"150px"} >
                <Text>No Trending Item Found</Text>
              </Center>
            }

          </Box>
          <div className="popular-category">
          <p style={{ fontSize: "clamp(16px, 2.2vw + 0.9rem, 24px)", lineHeight: "29px", fontWeight: "700" }}>Popular Categories</p>
          <Slider {...settings}>
            {sliderData.map((category) => (
              <div key={category.id} className="position-relative text-center pe-md-4 pe-2 mt-3">
                <img src={category.imageUrl} className="w-100" alt={category.title} />
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    lineHeight: "16.94px",
                    color: "#000000",
                    textAlign: "center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                  }}
                >
                  {category.title}
                </p>
              </div>
            ))}
          </Slider>
        </div>
          {/* <div>
            <p style={{ fontSize: "clamp(16px, 2.2vw + 0.9rem, 24px)", lineHeight: "29px", fontWeight: "700" }} >Popular Categories</p>
            <div className="mt-3 mb-5 data-charity flex-wrap">
              <div className="position-relative">
                <Image src={Rec1.src} alt={"Image"} />
                <Text
                  fontSize="14px"
                  fontWeight="600"
                  lineHeight="16.94px"
                  color="#000000"
                  textAlign="center"
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                >Spa & Beauty </Text>
              </div>
              <div className="position-relative mt-3 mt-md-0">
                <Image src={Rect2.src} alt={"Image"} />
                <Text
                  fontSize="14px"
                  fontWeight="600"
                  lineHeight="16.94px"
                  color="#000000"
                  textAlign="center"
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                >Health & Wellness</Text>
              </div>
              <div className="position-relative mt-3 mt-md-0">
                <Image src={Re3.src} alt={"Image"} />
                <Text
                  fontSize="14px"
                  fontWeight="600"
                  lineHeight="16.94px"
                  color="#000000"
                  textAlign="center"
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                >Electronics</Text>
              </div>
              <div className="position-relative mt-3 mt-md-0">
                <Image src={Rect4.src} alt={"Image"} />
                <Text
                  fontSize="14px"
                  fontWeight="600"
                  lineHeight="16.94px"
                  color="#000000"
                  textAlign="center"
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                >Clothing & Apparel</Text>
              </div>
              <div className="position-relative mt-3 mt-md-0">
                <Image src={Rect.src} alt={"Image"} />
                <Text
                  fontSize="14px"
                  fontWeight="600"
                  lineHeight="16.94px"
                  color="#000000"
                  textAlign="center"
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                >Home Decor</Text>
              </div>

            </div>
          </div> */}
        </div>
        <div className="main-volunteer-section">
          <div className="container">
            <div className="d-flex row pt-5">
              <div className="col-md-7">
                <p className="good-deeds mb-4 mb-md-0 px-3"><span style={{ color: "#183553" }}>Seeking</span> <span style={{ color: "#E27832" }}>Volunteer</span> <span style={{ color: "#183553" }}>Hours for</span> <span style={{ color: "#E27832" }}>High</span> <span className="d-md-inline d-lg-block" style={{ color: "#E27832" }}>School graduation?</span></p>
              </div>
              <div className="col-md-5 d-flex align-items-end align-items-xxl-start">
                <Image src={pennyandstudents.src} alt="Image" />
              </div>
            </div>
            <div className="d-flex row">
              <div className="col-md-7">
                <p className="our-platform mt-md-3 mt-4 mb-5 px-3">High school students in Ontario need to complete 40 hours of volunteer service before graduation. Good Deeds provides a <span className="d-md-inline d-lg-block">remote and convenient solution for accumulating your <span className="d-md-inline d-lg-block">community hours.</span></span></p>
              </div>
              <div className="col-md-5 d-flex justify-content-center align-items-center">
                <button className="high-school-btn mb-5" onClick={() => { router.push('/students-landing') }}>High School Students Click Here</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VolunteerCategories;

