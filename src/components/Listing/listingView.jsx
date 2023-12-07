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
import Head from "next/head";
import axios from "axios";
import {
  baseUrl,
  baseImgUrl,
  isLogin,
  accessToken,
  getLoginData,
  currentUserData
} from "../../components/Helper/index";
import { useRouter } from "next/router";
import Slider from "react-slick";
import ADSImage from "../../../src/assets/imgs/ads.png";
import BreadcrumbUI from "../../components/Breadcrumb";
import { ModalPopup } from "../../components/ModalPopup";
import { HiDotsVertical } from "react-icons/hi";
import { BsChatLeftDotsFill, BsPencilFill, BsShareFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { Rating } from "../../components/Rating";
import { GoGlobe, GoPencil } from "react-icons/go";
import { ImLocation } from "react-icons/im";
import { useToast } from "@chakra-ui/toast";
import { InnerSection } from "./innerSection";
import { ReportModal } from "./reportModal";
import { ReportThankYouModal } from "./reportThankYouModal";
import { DeleteModal } from "./deleteModal";
import NoImage from "../../../src/assets/imgs/no-image.png";
import { isMobile } from "react-device-detect";
import { useMediaQuery } from "@chakra-ui/react";
import { ShareListingSection } from "./shareListingSection";
import ProductGrids from "../ProductGrids";
import { ProductSingleCard } from "../ProductSingleCard";
// import { Carousel, Image } from 'antd';

const ListingView = (props) => {

  const [isSmallerThan450] = useMediaQuery("(max-width: 450px)");
  const router = useRouter();
  const toast = useToast();
  const [listingData, setListingData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalShow, setIsModalShow] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [isReportPost, setIsReportPost] = useState(false);
  const [isReportSubmitted, setIsReportSubmitted] = useState(false);
  const [isReportSubmitLoading, setIsReportSubmitLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [itemSlug, setItemSlug] = useState();
  const [itemType, setItemType] = useState();
  const [socialShareLinks, setSocialShareLinks] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [shareLoading, setShareLoading] = useState(false);
  const [hotDeals, setHotDeals] = useState([]);
  const [wihslistIds, setWishListIds] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function (i) {
      return (
        <a>
          <img
            src={`${listingData?.media[i].path}/${listingData?.media[i].image}`}
          />
        </a>
      );
    },
  };

  const getListingDetails = useCallback(async (id, type) => {
    setIsLoading(true);
    let data = {};
    if (type == 'service' || type == 'item') {
      try {
        if (isLogin()) {
          data = await axios.get(`${baseUrl}/listings/${id}`, {
            headers: {
              Authorization: "Bearer " + accessToken(),
            },
          });
        } else {
          data = await axios.get(`${baseUrl}/listings/${id}`);
        }

        if (data.status === 200) {
          setListingData(data.data.data);
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      }
      catch (e) {
        router.push("/browse?type=offering");
        setIsLoading(true);
      }
    } else if (type == 'volunteer') {
      try {
        if (isLogin()) {
          data = await axios.get(`${baseUrl}/browse/volunteer-listings/${id}`, {
            headers: {
              Authorization: "Bearer " + accessToken(),
            },
          });
        } else {
          data = await axios.get(`${baseUrl}/browse/volunteer-listings/${id}`);
        }

        if (data.status === 200) {
          setListingData(data.data.data);
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      }
      catch (e) {
        router.push("/browse?type=offering");
        setIsLoading(true);
      }
    } else if (type == 'donation') {
      try {
        if (isLogin()) {
          data = await axios.get(`${baseUrl}/browse/donation-listings/${id}`, {
            headers: {
              Authorization: "Bearer " + accessToken(),
            },
          });
        } else {
          data = await axios.get(`${baseUrl}/browse/donation-listings/${id}`);
        }

        if (data.status === 200) {
          setListingData(data.data.data);
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      }
      catch (e) {
        router.push("/browse?type=offering");
        setIsLoading(true);
      }
    }

  }, []);

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

  const handleDonateButtonClick = (url) => {
    if (!isLogin()) {
      toast({ title: "Please login for the donation", status: "error", position: "top" });
    }else{
      window.open(`${url}?username=${currentUserData?.user_profile?.username}&listing=${listingData.slug}`, '_blank');
    }   
  };

  useEffect(() => {
    // console.log("slug getting", router.query.id, router.query.type);
    if (router.query.id !== undefined && router.query.id !== "") {
      getListingDetails(router.query.id, router.query.type);
      setItemSlug(router.query.id);
      setItemType(router.query.type);
      getHotDeals();
      if (isLogin()) {
        getWhishlistIds();
      }
    }
  }, [router.query]);

  const onContactButtonClick = async () => {
    if (!isLogin()) {
      toast({
        title: "Please login for the contact",
        status: "error",
        position: "top",
      });
      localStorage.removeItem("listingData");
    } else {
      setIsContactLoading(true);
      const data = await axios.get(`${baseUrl}/user/info`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
        },
      });
      if (data.status === 200) {
        if (data.data.data?.user_profile) {
          let userCredit = data.data.data?.user_profile?.credits;

          if (userCredit >= listingData.credit_amount) {
            localStorage.setItem("listingData", JSON.stringify(listingData));
            localStorage.setItem("listingId", listingData.id);
            window.location.href = "/message";
          } else {
            setIsModalShow(true);
            localStorage.removeItem("listingData");
          }
        }
        setIsContactLoading(false);
      }
      setIsContactLoading(false);
    }
  };

  const submitReport = async (message) => {
    setIsReportSubmitLoading(true);

    let formData = new FormData();
    formData.append("message", message);
    try {
      let result = await axios.post(
        `${baseUrl}/listings/${listingData.id}/report`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + accessToken(),
          },
        }
      );

      setIsReportSubmitLoading(false);
      setIsReportPost(false);
      setIsReportSubmitted(true);
    } catch (e) {
      toast({
        title: "You're already reported.",
        status: "error",
        position: "top",
      });
      setIsReportSubmitLoading(false);
      setIsReportPost(false);
    }
  };

  const addOrRemoveFromWhishList = async (id, isAdd) => {
    let fd = new FormData();
    fd.append("listing_id", id);

    let data = {};
    if (isAdd) {
      var config = {
        method: "delete",
        url: `${baseUrl}/user/wishlist/delete/${id}`,
        headers: {
          Authorization: "Bearer " + accessToken(),
        },
      };

      data = await axios(config);

      setListingData({ ...listingData, is_bookmarked: false });
    } else {
      data = await axios.post(
        `${baseUrl}/user/wishlist/store?listing_id=${id}`,
        fd,
        {
          headers: {
            Authorization: "Bearer " + accessToken(),
          },
        }
      );
      setListingData({ ...listingData, is_bookmarked: true });
    }
  };

  const deletePost = async () => {
    var config = {
      method: "delete",
      url: `${baseUrl}/user/member-listings/${listingData.id}`,
      headers: {
        Authorization: "Bearer " + accessToken(),
      },
    };
    let data = await axios(config);
    if (data.status === 200) {
      toast({
        title: "Post deleted successfully",
        status: "success",
        position: "top",
      });
      router.push("/profile");
    }
  };

  const fetchShareLink = () => {
    setShareLoading(true);
    axios
      .get(`${baseUrl}/social-media-share/${itemSlug}`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
        },
      })
      .then((res) => {
        // console.log("share linsk", res.data);
        setSocialShareLinks(res?.data);
        setShareLoading(false);
      })
      .catch((err) => {
        console.log("Error getting share links", err.message);
        setShareLoading(false);
      });
  };

  useEffect(() => {
    localStorage.removeItem("listingData");
  }, []);

  // console.log('listing', listingData)

  const getMoreDeedDollars = () =>{
    window.location.href = "/browse?type=donation&activeTab=3";
  }


  return (
    <>
      <Box mt="20" mb="20">
        {isLoading && (
          <Center h={"300px"}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="orange.200"
              color="orange.500"
              size="xl"
            />
          </Center>
        )}
        {!isLoading && (
          <>
            <Box mx={[5, 5, 0, 0]}>
              <Head>
                <title>Good Deeds | {listingData?.title || "Good Deeds"}</title>
                <meta name="title" content={listingData?.title || "Good Deeds"} />
                <meta name="keywords" content={listingData?.keywords.map((keyword, index) => keyword.name)} />
                <meta
                  name="description"
                  content={listingData?.description || "Good Deeds"}
                />
                <meta
                  property="og:title"
                  content={listingData?.title || "Good Deeds"}
                />
                <meta
                  property="og:description"
                  content={listingData?.description || "Good Deeds"}
                />
                {/* <meta property="og:image" content={listingData?.media[0].path + '/' + listingData?.media[0].image} /> */}
              </Head>
              <Flex h={"100%"} direction={{ base: "column", lg: "row" }}>
                <Box mr={[0, 0, 10, 10]} ml={[0, 0, 10, 20]} w={["100%", "100%", "100%", "50%"]}>
                  <Flex justifyContent={"space-between"} mb={"5"}>
                    <BreadcrumbUI
                      data={[
                        {
                          label:
                            listingData.listing_type === "offering"
                              ? "Browse"
                              : "Browse",
                          // slug: `/browse?type=${listingData.listing_type}`,
                          slug: `/browse?type=offering`,
                        },
                        {
                          label:
                            listingData.post_type === "item"
                              ? "Items"
                              : listingData.post_type === "service"
                                ? "Services"
                                : listingData.post_type === "volunteer"
                                  ? "Volunteer"
                                  : "Donations",
                          slug: `/browse?type=offering&activeTab=${listingData.post_type === "item"
                            ? 0
                            : listingData.post_type === "service"
                              ? 1
                              : listingData.post_type === "volunteer"
                                ? 2
                                : 3}`,
                        },
                        {
                          label: listingData.title,
                          slug: `/listing/${listingData.id}`,
                        },
                      ]}
                    />
                    <Menu>
                      <MenuButton
                        _focus={{
                          boxShadow: "none",
                        }}
                      >
                        <Box
                          bg={"#eee"}
                          lineHeight={"15px"}
                          borderRadius={"50%"}
                          p={"3px"}
                          cursor={"pointer"}
                        >
                          <HiDotsVertical
                            color="#979797"
                            fontSize={"20px"}
                            fontWeight={800}
                          />
                        </Box>
                      </MenuButton>
                      <MenuList>
                        {isLogin() &&
                          listingData.added_by === getLoginData()?.id && (
                            <>
                              <MenuItem
                                alignItems={"center"}
                                onClick={() =>
                                  router.push(
                                    "/edit-listing/" +
                                    listingData.slug +
                                    "?from=view"
                                  )
                                }
                              >
                                <BsPencilFill />
                                &nbsp;&nbsp;Edit Post
                              </MenuItem>
                              <MenuItem
                                alignItems={"center"}
                                onClick={() => {
                                  if (isLogin()) {
                                    setShareModal(true);
                                    fetchShareLink();
                                  } else {
                                    toast({
                                      title:
                                        "Please login for the Report This Post",
                                      status: "error",
                                      position: "top",
                                    });
                                  }
                                }}
                              >
                                <BsShareFill />
                                &nbsp;&nbsp;Share
                              </MenuItem>
                              <MenuItem
                                alignItems={"center"}
                                onClick={() => setOpenDelete(true)}
                              >
                                <MdDelete />
                                &nbsp;&nbsp;Delete Post
                              </MenuItem>
                            </>
                          )}
                        {(getLoginData() === undefined ||
                          listingData.added_by !== getLoginData().id) && (
                            <>
                              <MenuItem
                                alignItems={"center"}
                                onClick={() => {
                                  if (isLogin()) {
                                    setIsReportPost(true);
                                  } else {
                                    toast({
                                      title:
                                        "Please login for the Report This Post",
                                      status: "error",
                                      position: "top",
                                    });
                                  }
                                }}
                              >
                                <BsChatLeftDotsFill />
                                &nbsp;&nbsp;Report Post
                              </MenuItem>
                              <MenuItem
                                alignItems={"center"}
                                onClick={() => {
                                  if (isLogin()) {
                                    setShareModal(true);
                                    fetchShareLink();
                                  } else {
                                    toast({
                                      title:
                                        "Please login for the Report This Post",
                                      status: "error",
                                      position: "top",
                                    });
                                  }
                                }}
                              >
                                <BsShareFill />
                                &nbsp;&nbsp;Share
                              </MenuItem>
                            </>
                          )}
                      </MenuList>
                    </Menu>
                  </Flex>

                  {shareModal && (
                    <ModalPopup
                      TitleModal="Share Listing"
                      show={shareModal}
                      size={"xl"}
                      setShow={(value) => {
                        setShareModal(value);
                      }}
                      body={
                        <ShareListingSection
                          socialShareLinks={socialShareLinks}
                          loading={shareLoading}
                          title={listingData.title}
                        />
                      }
                    />
                  )}
                  {listingData.post_type == 'item' || listingData.post_type == 'service' ?
                    (
                      <>
                        <Slider {...settings} className="listing-slider-wrap" style={{ margin: '0 0 110px 0' }}>
                          {listingData.media.length > 0 &&
                            listingData.media.map((media, index) => (
                              <div className="listing-images" key={index}>
                                <AspectRatio
                                  maxW="100%"
                                  height={isSmallerThan450 ? "240px" : "500px"}
                                  // maxHeight={isSmallerThan450 ? '240px' : '500px'}
                                  ratio={4 / 4}
                                  borderRadius={5}
                                  backgroundColor={"#ffffff"}
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                                  overflow="hidden"
                                  pt={'15px'}
                                >
                                  <Image
                                    position="static !important"
                                    objectFit="cover"
                                    w={"auto !important"}
                                    h={"100% !important"}
                                    maxHeight={
                                      isSmallerThan450
                                        ? "240px !important"
                                        : "500px !important"
                                    }
                                    src={`${media.path}/${media.image}`}
                                    alt={name}
                                    draggable="false"
                                    fallback={<Skeleton />}
                                    onClick={onOpen}
                                  />
                                </AspectRatio>
                                <Tag size='lg' bg={'#183553'} color="#FFF" fontSize={"12px"} fontWeight={'600'} borderRadius='full' position={'absolute'} top="0" left={'0'}>
                                  <TagLabel>{listingData.category.name}</TagLabel>
                                </Tag>
                                <IconButton
                                  isRound
                                  position={'absolute'} top="0" right={'0'}
                                  bg={"#F6F6F6"}
                                  color="gray.900"
                                  size="sm"
                                  className="mt-4 me-4"
                                  onClick={() => {
                                    if (!isLogin()) {
                                      toast({
                                        position: "top",
                                        title: "Please logged in for Add to favourites list",
                                        status: "error",
                                      });
                                    } else {
                                      addOrRemoveFromWhishList(
                                        listingData.id,
                                        listingData.is_bookmarked
                                      );
                                    }
                                  }}
                                  _hover={{ transform: "scale(1.1)" }}
                                  _focus={{ boxShadow: "none" }}
                                  sx={{ ":hover > svg": { transform: "scale(1.1)" } }}
                                  transition="all 0.15s ease"
                                  icon={
                                    <Icon
                                      as={listingData.is_bookmarked ? FaHeart : FiHeart}
                                      color="#979797"
                                      fontSize={18}
                                      transition="all 0.15s ease"
                                    />
                                  }
                                  boxShadow="base"
                                ></IconButton>
                              </div>
                            ))}
                          {listingData.media.length === 0 && (
                            <AspectRatio
                              maxW="100%"
                              maxH={isSmallerThan450 ? "240px" : "500px"}
                              ratio={4 / 4}
                            >
                              <Image
                                borderRadius={5}
                                objectFit="cover"
                                w={"100%"}
                                h={isSmallerThan450 ? "240px" : "500px"}
                                src={NoImage.src}
                                alt={"no Image"}
                                draggable="false"
                                fallback={<Skeleton />}
                              />
                            </AspectRatio>
                          )}
                        </Slider>

                        <Modal isOpen={isOpen} onClose={onClose} size="full">
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>{listingData.title}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              <div>
                                <Slider {...settings} className="listing-slider-wrap">
                                  {listingData.media.length > 0 &&
                                    listingData.media.map((media, index) => (
                                      <div className="listing-images" key={index}>
                                        <AspectRatio
                                          maxW="100%"
                                          height={isSmallerThan450 ? "240px" : "600px"}
                                          maxHeight={
                                            isSmallerThan450 ? "240px" : "600px"
                                          }
                                          ratio={4 / 3}
                                          borderRadius={5}
                                          backgroundColor={"#ffffff"}
                                          display="flex"
                                          justifyContent="center"
                                          alignItems="center"
                                          overflow="hidden"
                                        >
                                          <Image
                                            position="static !important"
                                            objectFit="cover"
                                            w={"auto !important"}
                                            h={"100% !important"}
                                            maxHeight={
                                              isSmallerThan450
                                                ? "240px !important"
                                                : "500px !important"
                                            }
                                            src={`${media.path}/${media.image}`}
                                            alt={name}
                                            draggable="false"
                                            fallback={<Skeleton />}
                                            onClick={onOpen}
                                          />
                                        </AspectRatio>
                                      </div>
                                    ))}
                                </Slider>
                              </div>
                            </ModalBody>
                          </ModalContent>
                        </Modal>
                      </>
                    ) :
                    (
                      <Box position={'relative'}>
                        <AspectRatio
                          maxW="100%"
                          maxH={isSmallerThan450 ? "240px" : "500px"}
                          ratio={4 / 4}
                        >
                          <Image
                            borderRadius={5}
                            objectFit="contain"
                            w={"100%"}
                            h={isSmallerThan450 ? "240px" : "500px"}
                            src={listingData.thumbnail}
                            alt={"no Image"}
                            draggable="false"
                            fallback={<Skeleton />}
                            pt={'15px'}
                          />
                        </AspectRatio>
                        <Tag size='lg' bg={'#183553'} color="#FFF" fontSize={"12px"} fontWeight={'600'} borderRadius='full' position={'absolute'} top="0" left={'0'}>
                          <TagLabel>{listingData.category}</TagLabel>
                        </Tag>
                      </Box>
                    )
                  }


                  {listingData.post_type == 'item' || listingData.post_type == 'service' ? (
                    <Flex mr={[0, 0, 10, 20]} mt={"10"} gap={'35px'} direction={{ base: "column", lg: "row" }}>
                      <Box w={["100%", "100%", "100%", "50%"]}>
                        <Accordion
                          allowToggle
                          defaultIndex={0}
                          borderTopColor={"transparent"}
                          borderBottomColor={"transparent"}
                        >
                          <AccordionItem>
                            <div>
                              <AccordionButton
                                borderBottom={"none"}
                                _focus={{ boxShadow: "none" }}
                              >
                                <Box textAlign="left" flex="1">
                                  <Flex>
                                    <Link
                                      href={`/profile/${listingData.bio.user_profile.username}`}
                                    >
                                      <Avatar
                                        borderWidth="2px"
                                        borderColor={"primary.300"}
                                        size="md"
                                        name="Kola Tioluwani"
                                        src={listingData.bio.avatar || ""}
                                      />
                                    </Link>

                                    <Box ml={5}>
                                      <Link
                                        href={`/profile/${listingData.bio.user_profile.username}`}
                                      >
                                        <Text fontSize={"16px"} fontWeight={"bold"}>
                                          {listingData.bio.user_profile.username ||
                                            ""}
                                        </Text>
                                      </Link>
                                      <HStack>
                                        <Rating
                                          defaultValue={listingData.bio.rating || 0}
                                          size="sm"
                                        />
                                        <Text fontSize={14}>
                                          {listingData.bio.no_of_reviews || 0}{" "}
                                          reviews
                                        </Text>
                                      </HStack>
                                    </Box>
                                  </Flex>
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </div>
                            <AccordionPanel pb={4}>
                              {listingData.bio.user_profile !== null && (
                                <>
                                  <Box ml={"65px"}>
                                    <Text fontSize={"16px"}>
                                      {listingData.total_transactions ?? 0}{" "}
                                      Transactions
                                    </Text>
                                    {listingData.location !== null &&
                                      listingData.location ? (
                                      <HStack fontSize="sm">
                                        <ImLocation fontSize={"16px"} />
                                        <Text fontSize={"16px"}>
                                          {`${listingData.city},` || ""}{" "}
                                          {`${listingData.state},` || ""}{" "}
                                          {listingData.country || ""}
                                        </Text>
                                      </HStack>
                                    ) : (
                                      <HStack fontSize="sm">
                                        <ImLocation fontSize={"16px"} />
                                        <Text fontSize={"16px"}>Virtual Deed</Text>
                                      </HStack>
                                    )}
                                  </Box>
                                </>
                              )}
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                        {/* <Box mr={[0, 0, "50px", "50px"]} ml={[0, 0, "50px", "50px"]} mt={10}> */}

                        {listingData &&
                          listingData?.transaction_status != null &&
                          listingData?.transaction_status != "Completed" ? (
                          <Button
                            mt={"5"}
                            colorScheme="orange"
                            size="lg"
                            w={"100%"}
                            fontSize="md"
                            loading={isContactLoading}
                            // disabled={isContactLoading}
                            disabled
                          >
                            This offering is currently pending
                          </Button>
                        ) : (
                          <>
                            {getLoginData() === undefined && (
                              <Button
                                type="submit"
                                mt={"5"}
                                colorScheme="orange"
                                size="lg"
                                w={"100%"}
                                borderRadius='100px'
                                fontSize="md"
                                loading={isContactLoading}
                                disabled={isContactLoading}
                                onClick={() => onContactButtonClick()}
                              >
                                Contact
                              </Button>
                            )}

                            {getLoginData() !== undefined &&
                              listingData.added_by !== getLoginData().id && (
                                <Button
                                  type="submit"
                                  mt={"5"}
                                  colorScheme="orange"
                                  size="lg"
                                  w={"100%"}
                                  borderRadius='100px'
                                  fontSize="md"
                                  loading={isContactLoading}
                                  disabled={isContactLoading}
                                  onClick={() => onContactButtonClick()}
                                >
                                  Contact
                                </Button>
                              )}
                          </>
                        )}

                      </Box>
                      <Box w={["100%", "100%", "100%", "50%"]}>
                        <Tabs isFitted variant="enclosed">
                          {/* <Flex justify="center"> */}
                          <TabList
                            bg="grey.200"
                            color="grey.400"
                            borderRadius="30px"
                            borderColor="grey.300"
                            borderWidth="1px"
                            overflow="hidden"
                            position="relative"
                            fontWeight="bold"
                            fontSize={16}
                          >
                            <Tab
                              _focus={{ outline: "none" }}
                              _selected={{ color: "primary.300" }}
                              borderRadius="30px"
                              px="8"
                            >
                              <Text zIndex="100"> Bio</Text>
                            </Tab>
                            <Tab
                              _focus={{ outline: "none" }}
                              _selected={{ color: "orange.400" }}
                              borderRadius="30px"
                              px="8"
                            >
                              <Text zIndex="100"> Transactions</Text>
                            </Tab>
                            <TabIndicator
                              bg="white"
                              h="100%"
                              color="red"
                              borderRadius="30px"
                              position="absolute"
                              zIndex="10"
                            />
                          </TabList>
                          {/* </Flex> */}
                          <TabPanels>
                            <TabPanel>
                              <Text
                                fontSize={14}
                                fontWeight={500}
                                mt={5}
                                color="#666666"
                              >
                                {listingData.bio.user_profile.bio}
                              </Text>

                              <Text
                                mt="5"
                                cursor={"pointer"}
                                _hover={{
                                  textDecoration: "underline",
                                }}
                                fontSize={14}
                                fontWeight={400}
                                onClick={() => {
                                  if (typeof window !== "undefined") {
                                    if (
                                      !listingData.bio.user_profile.website_url.includes(
                                        "http"
                                      )
                                    ) {
                                      window.open(
                                        "http://" +
                                        listingData.bio.user_profile
                                          .website_url,
                                        "_blank"
                                      );
                                    } else {
                                      window.open(
                                        listingData.bio.user_profile
                                          .website_url,
                                        "_blank"
                                      );
                                    }
                                  }
                                }}
                              >
                                {listingData.bio.user_profile
                                  .website_url &&
                                  (isMobile ? (
                                    <div style={{ display: "flex" }}>
                                      <Text pr={3} color="grey.400">
                                        Website
                                      </Text>
                                      <Text
                                        color="orange.400"
                                        overflow="hidden"
                                      >
                                        {
                                          listingData.bio.user_profile
                                            .website_url
                                        }
                                      </Text>
                                    </div>
                                  ) : (
                                    listingData.bio.user_profile
                                      .website_url
                                  ))}
                              </Text>
                            </TabPanel>
                            <TabPanel>
                              {listingData?.translations?.length ? (
                                listingData.translations &&
                                listingData.translations.map(
                                  (translation, index) => (
                                    <Box key={index}>
                                      <Flex
                                        justifyContent={"space-between"}
                                        alignItems={"center"}
                                      >
                                        <Box>
                                          <Text
                                            fontSize={"16px"}
                                            fontWeight={600}
                                          >
                                            {translation.listing_title}
                                          </Text>
                                          <Rating
                                            defaultValue={
                                              translation.buyer_rating
                                            }
                                          />
                                          <Text fontSize={"16px"}>
                                            {translation.buyer_name}
                                          </Text>
                                          <Text
                                            fontSize={"16px"}
                                            opacity={0.8}
                                          >
                                            {moment(
                                              translation.created_at
                                            ).fromNow()}
                                          </Text>
                                        </Box>
                                        <Box>
                                          <Text
                                            fontSize={30}
                                            color="primary.300"
                                            fontWeight={600}
                                          >
                                            +{translation.credits}
                                          </Text>
                                          <Text
                                            fontSize={16}
                                            textAlign={"right"}
                                            color="primary.300"
                                            fontWeight={600}
                                          >
                                            deed dollars
                                          </Text>
                                        </Box>
                                      </Flex>
                                      <Divider
                                        my="5"
                                        borderColor="grey.300"
                                      />
                                    </Box>
                                  )
                                )
                              ) : (
                                <Text
                                  fontSize={16}
                                  textAlign={"left"}
                                  fontWeight={600}
                                >
                                  There are no previous Transactions
                                </Text>
                              )}
                            </TabPanel>
                          </TabPanels>
                        </Tabs>
                      </Box>
                    </Flex>
                  ) :
                    <Flex mr={[0, 0, 10, 20]} mt={"10"} gap={'35px'} direction={{ base: "column", lg: "row" }}>
                      <Box w={["100%", "100%", "100%", "50%"]}>
                        <Accordion
                          allowToggle
                          defaultIndex={0}
                          borderTopColor={"transparent"}
                          borderBottomColor={"transparent"}
                        >
                          <AccordionItem>
                            <div>
                              <AccordionButton
                                borderBottom={"none"}
                                _focus={{ boxShadow: "none" }}
                              >
                                <Box textAlign="left" flex="1">
                                  <Flex>
                                    <Link
                                      href={`#`}
                                    >
                                      <Avatar
                                        borderWidth="2px"
                                        borderColor={"primary.300"}
                                        size="md"
                                        name="Kola Tioluwani"
                                        src={listingData.thumbnail || ""}
                                      />
                                    </Link>

                                    <Box ml={5}>
                                      <Link
                                        href={`#`}
                                      >
                                        <Text fontSize={"16px"} fontWeight={"bold"}>
                                          {listingData.organization?.name || ""}
                                        </Text>
                                      </Link>
                                      <HStack>
                                        <Rating
                                          defaultValue={0}
                                          size="sm"
                                        />
                                        <Text fontSize={14}>
                                          0 reviews
                                        </Text>
                                      </HStack>
                                    </Box>
                                  </Flex>
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </div>
                            {/* <AccordionPanel pb={4}>
                              <Box ml={"65px"}>
                                <Text fontSize={"16px"}>
                                  0 Transactions
                                </Text>
                              </Box>
                            </AccordionPanel> */}
                          </AccordionItem>
                        </Accordion>
                        {/* <Box mr={[0, 0, "50px", "50px"]} ml={[0, 0, "50px", "50px"]} mt={10}> */}
                        {/* {listingData.post_type == 'volunteer' ?
                          <Button
                            type="submit"
                            mt={"5"}
                            colorScheme="orange"
                            size="lg"
                            w={"100%"}
                            borderRadius='100px'
                            fontSize="md"
                            loading={isContactLoading}
                            disabled={isContactLoading}
                            onClick={() => onContactButtonClick()}
                          >
                            Contact
                          </Button>
                          :
                          null} */}

                      </Box>

                    </Flex>
                  }
                </Box>
                {listingData.post_type == 'item' || listingData.post_type == 'service' ?
                  <Box w={["100%", "100%", "100%", "50%"]} mr={[0, 0, 10, 20]}>
                    <Flex justifyContent={"space-between"} mt={28}>
                      <Text
                        fontSize={"30px"}
                        fontWeight={600}
                        color={"#000000"}
                        textTransform="capitalize"
                      >
                        {listingData.title}
                      </Text>
                      <Text fontSize={"14px"} fontWeight={400} color={"#979797"}>
                        {listingData.updated_at}
                      </Text>
                    </Flex>
                    <Flex justifyContent={"space-between"} mt={"10px"}>
                      <Text fontSize={"24px"} color="orange.500" fontWeight="700">
                        {listingData.credit_amount} Deed Dollars
                      </Text>

                      {/* <IconButton
                      isRound
                      bg={"#F6F6F6"}
                      color="gray.900"
                      size="sm"
                      onClick={() => {
                        if (!isLogin()) {
                          toast({
                            position: "top",
                            title: "Please logged in for Add to favourites list",
                            status: "error",
                          });
                        } else {
                          addOrRemoveFromWhishList(
                            listingData.id,
                            listingData.is_bookmarked
                          );
                        }
                      }}
                      _hover={{ transform: "scale(1.1)" }}
                      _focus={{ boxShadow: "none" }}
                      sx={{ ":hover > svg": { transform: "scale(1.1)" } }}
                      transition="all 0.15s ease"
                      icon={
                        <Icon
                          as={listingData.is_bookmarked ? FaHeart : FiHeart}
                          color="#979797"
                          fontSize={18}
                          transition="all 0.15s ease"
                        />
                      }
                      boxShadow="base"
                    ></IconButton> */}
                    </Flex>
                    {listingData.location !== null && listingData.location ? (
                      <Text fontSize={"14px"} fontWeight={400}>
                        {`${listingData.city},` || ""}{" "}
                        {`${listingData.state},` || ""} {listingData.country || ""}
                      </Text>
                    ) : (
                      <Text fontSize={"14px"} fontWeight={400}>Virtual Deed</Text>
                    )}
                    {/* <Text fontSize={'14px'}>
                    {`${listingData.city},` || ''} {`${listingData.state},` || ''} {listingData.country || ''}
                  </Text> */}
                    <Text mt={"20px"}>
                      {listingData.category !== null && (
                        <Tag
                          size={"md"}
                          px={4}
                          py={"5px"}
                          mr={"3"}
                          mb={1}
                          key={listingData.category.id}
                          fontSize={"14px"}
                          bg={"#F6F6F6"}
                          borderRadius={"10px"}
                          color={"rgba(0, 0, 0, 0.77)"}
                          border={"none"}
                        >
                          <TagLabel>{listingData.category.name}</TagLabel>
                        </Tag>
                      )}
                      {listingData.experties_level !== null && (
                        <Tag
                          size={"md"}
                          px={4}
                          py={"5px"}
                          mr={"3"}
                          mb={1}
                          key={listingData.experties_level.id}
                          fontSize={"14px"}
                          bg={"#F6F6F6"}
                          borderRadius={"10px"}
                          color={"rgba(0, 0, 0, 0.77)"}
                          border={"none"}
                        >
                          <TagLabel>{listingData.experties_level.name}</TagLabel>
                        </Tag>
                      )}
                      {listingData.item_condition !== null && (
                        <Tag
                          size={"md"}
                          px={4}
                          py={"5px"}
                          mr={"3"}
                          mb={1}
                          key={listingData.item_condition.id}
                          fontSize={"14px"}
                          bg={"#F6F6F6"}
                          borderRadius={"10px"}
                          color={"rgba(0, 0, 0, 0.77)"}
                          border={"none"}
                        >
                          <TagLabel>{listingData.item_condition.name}</TagLabel>
                        </Tag>
                      )}

                      {listingData.keywords.length > 0 &&
                        listingData.keywords.map((item) => (
                          <Tag
                            size={"md"}
                            px={4}
                            py={"5px"}
                            mr={"3"}
                            mb={1}
                            key={item.id}
                            fontSize={"14px"}
                            bg={"#F6F6F6"}
                            borderRadius={"10px"}
                            color={"rgba(0, 0, 0, 0.77)"}
                            border={"none"}
                          >
                            <TagLabel>{item.name}</TagLabel>
                          </Tag>
                        ))}
                    </Text>
                    <Text mt={"20px"}>{listingData.description}</Text>
                    {!(listingData.added_by === getLoginData()?.id) && (
                      <>
                        <Flex gap={'20px'} mt={'70px'} justifyContent={["center", "center", "center", "start"]}>
                          <Button
                            type="submit"
                            fontSize='16px'
                            fontWeight='600'
                            bg='#E27832'
                            _hover={{ bg: '#E27832' }}
                            _active={{ bg: '#E27832' }}
                            _focus={{ bg: '#E27832' }}
                            width={"190px"}
                            height="67px"
                            borderRadius='100px'
                            color='#fff'
                            loading={isContactLoading}
                            disabled={isContactLoading}
                            onClick={() => onContactButtonClick()}
                          >
                            Get Now
                          </Button>
                          <Button
                            type="submit"
                            fontSize='16px'
                            fontWeight='600'
                            bg='#183553'
                            _hover={{ bg: '#183553' }}
                            _active={{ bg: '#183553' }}
                            _focus={{ bg: '#183553' }}
                            width={"190px"}
                            height="67px"
                            color='#fff'
                            borderRadius='100px'
                            loading={isContactLoading}
                            disabled={isContactLoading}
                            onClick={() => getMoreDeedDollars()}
                          > 
                            Get More Deed <br />Dollars
                          </Button>
                        </Flex>
                        {/* <AspectRatio
                        mt={'32px'}
                        ratio={4 / 4}
                        w={"365px"}
                        maxW={'100%'}
                        h={"410px"}
                      >
                        <Image
                          objectFit="cover"
                          w={"100%"}
                          src={ADSImage.src}
                          alt={"no Image"}
                          draggable="false"
                          fallback={<Skeleton />}
                        />
                      </AspectRatio> */}
                      </>
                    )}
                  </Box>
                  :
                  <Box w={["100%", "100%", "100%", "50%"]} mr={[0, 0, 10, 20]}>
                    <Flex justifyContent={"space-between"} mt={28}>
                      <Text
                        fontSize={"30px"}
                        fontWeight={600}
                        color={"#000000"}
                        textTransform="capitalize"
                      >
                        {listingData.title}
                      </Text>
                    </Flex>
                    <Flex justifyContent={"space-between"} mt={"10px"}>
                      <Text fontSize={"24px"} color="orange.500" fontWeight="700">
                        {listingData.credit_amount ? `${listingData.credit_amount} Deed Dollars` : ''}
                      </Text>
                    </Flex>
                    {listingData.organization?.address !== null ? (
                      <Text fontSize={"14px"} fontWeight={400}>
                        {listingData.organization?.address}
                      </Text>
                    ) : (
                      <Text fontSize={"14px"} fontWeight={400}>Virtual Deed</Text>
                    )}

                    <Text mt={"20px"}>

                      {listingData.keywords.length > 0 &&
                        listingData.keywords.map((item) => (
                          <Tag
                            size={"md"}
                            px={4}
                            py={"5px"}
                            mr={"3"}
                            mb={1}
                            key={item.id}
                            fontSize={"14px"}
                            bg={"#F6F6F6"}
                            borderRadius={"10px"}
                            color={"rgba(0, 0, 0, 0.77)"}
                            border={"none"}
                          >
                            <TagLabel>{item.name}</TagLabel>
                          </Tag>
                        ))}
                    </Text>
                    <Text mt={"20px"}>{listingData.description}</Text>
                    {listingData.post_type == 'volunteer' ?
                      <Flex gap={'20px'} mt={'70px'} justifyContent={["center", "center", "center", "start"]}>
                        <Button
                          as={'a'}
                          type="submit"
                          fontSize='16px'
                          fontWeight='600'
                          bg='#E27832'
                          _hover={{ bg: '#E27832', color: '#fff' }}
                          _active={{ bg: '#E27832' }}
                          _focus={{ bg: '#E27832' }}
                          width={"290px"}
                          height="51px"
                          borderRadius='100px'
                          color='#fff'
                          loading={isContactLoading}
                          disabled={isContactLoading}
                          onClick={() => router.push(`/volunteer/${listingData.slug}?type=${listingData.post_type}`)}
                        >
                          Apply Now
                        </Button>
                      </Flex>
                      :
                      <Flex gap={'20px'} mt={'70px'} justifyContent={["center", "center", "center", "start"]}>
                        <Button
                          type="submit"
                          fontSize='16px'
                          fontWeight='600'
                          bg='#E27832'
                          _hover={{ bg: '#E27832' }}
                          _active={{ bg: '#E27832' }}
                          _focus={{ bg: '#E27832' }}
                          width={"290px"}
                          height="51px"
                          borderRadius='100px'
                          color='#fff'
                          loading={isContactLoading}
                          disabled={isContactLoading}
                          onClick={() => handleDonateButtonClick(listingData.url_to_donate)}
                        >
                          Donate Now
                        </Button>
                      </Flex>
                    }


                  </Box>
                }
              </Flex>

              {isModalShow && (
                <ModalPopup
                  TitleModal="Your don't have enough deed dollars"
                  show={isModalShow}
                  size={"xs"}
                  setShow={(value) => {
                    setIsModalShow(value);
                  }}
                  body={
                    <InnerSection
                      // image={Img1.src}
                      lastStep={false}
                      para="Complete a deed or invite friends to earn more deed dollars"
                      show={isModalShow}
                      setIsModalShow={setIsModalShow}
                    />
                  }
                />
              )}
              {isReportPost && (
                <ReportModal
                  show={isReportPost}
                  setShow={() => setIsReportPost(false)}
                  size={"xl"}
                  onReportSubmit={(e) => submitReport(e)}
                  isReportSubmitLoading={isReportSubmitLoading}
                />
              )}

              {isReportSubmitted && (
                <ReportThankYouModal
                  show={isReportSubmitted}
                  setShow={() => setIsReportSubmitted(false)}
                  size={"xl"}
                />
              )}

              {openDelete && (
                <DeleteModal
                  show={openDelete}
                  setShow={() => setOpenDelete(false)}
                  size={"xs"}
                  deletePost={(e) => deletePost(e)}
                />
              )}
            </Box>
            {!(listingData.added_by === getLoginData()?.id) && (
              <Box mr={[0, 0, 10, 20]} ml={[0, 0, 10, 20]} mt={50}>
                <Text
                  fontSize={"30px"}
                  fontWeight={600}
                  color={"#000000"}
                  textTransform="capitalize"
                  mb={50}
                >
                  Other Popular Listings
                </Text>

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
                    <Text>No Hot Deals found.</Text>
                  </Center>
                }

              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default ListingView;
