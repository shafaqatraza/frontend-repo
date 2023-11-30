import {
  Button,
  Container,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Image,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'
import * as React from 'react'
import { useState, useEffect } from "react";
import { GoGlobe, GoPencil } from 'react-icons/go'
import { Rating } from '../Rating'
import { CardContent } from './CardContent'
import { CardHeader } from './CardHeader'
import { UserAvatar } from './UserAvatar'
import { UserCard } from './UserCard'
import { useClipboard, Input } from '@chakra-ui/react'
import Router from 'next/router'
import { getReferURL } from '../../components/Helper/index'
import { isMobile } from 'react-device-detect'
import { LinkIcon } from '@chakra-ui/icons'
import axios from "axios";
import { accessToken, baseUrl } from '../../components/Helper/index'
import { Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import camera from "../../assets/imgs/camera.png";
import { useToast } from '@chakra-ui/toast'
import { ReactNode } from 'react';
import location from '../../assets/imgs/location.png'
import copyLink from '../../assets/imgs/copylink.png'
import defaultprofile from '../../assets/imgs/profile/default-profile.png'


export const ProfileBanner = (props: any) => {
  const { profileData } = props
  const [orgData, setOrgData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleShowSuccess = () => setShowSuccess(true);
  const router = useRouter();
  const toast = useToast();
  const [image, setImage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    organization_type_id: 7,
    business_number: "",
    business_email: "",
    about: "",
    website_url: "",
    location: "",
    profile_picture: []
    // profile_picture:"https://logos-world.net/wp-content/uploads/2022/01/Canada-Goose-Logo.png",
    // cover_picture:"https://logos-world.net/wp-content/uploads/2022/01/Canada-Goose-Logo.png"

  });
  // console.log("dataatatatatat", profileData)
  let link = getReferURL(props.referCode)
  const { hasCopied, onCopy } = useClipboard(link)

  useEffect(() => {
    axios.get(`${baseUrl}/organizations`, {
      headers: {
        Authorization: 'Bearer ' + accessToken(),
        // 'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((res) => {
      // console.log(res);
      setOrgData(res.data);
      // console.log(orgData,"org")
      // console.log(orgData.length, "organizraon data")
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  const handleThumbnailClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      setImage(file);
      // @ts-ignore: Unreachable code error
      setThumbnail(URL.createObjectURL(file));
      // @ts-ignore: Unreachable code error
      // setFormData((prevFormData) => ({
      //   ...prevFormData,
      //   thumbnail: [file],
      // }));

      setFormData({ ...formData, profile_picture: [file] })
    };
    // input.click();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData, "form");
    const form = new FormData();
    form.append("full_name", formData.full_name);
    form.append("business_email", formData.business_email);
    form.append("business_number", formData.business_number);
    form.append("about", formData.about);
    form.append("website_url", formData.website_url);
    form.append("organization_type_id",
      // @ts-ignore: Unreachable code error
      formData.organization_type_id);
    form.append("location", formData.location);
    formData.profile_picture.forEach((file) => form.append("profile_picture", file));
    axios.post(`${baseUrl}/organizations`, form, {
      headers: {
        Authorization: 'Bearer ' + accessToken(),
      }
    })
      .then((response) => {
        console.log(response.data);
        setShowSuccess(true);
        setShow(false);
        setRefresh(!refresh);
        router.push("/organization")
        // Handle response data here
      })
      .catch((error) => {
        let errors = error.response?.data.errors;
        Object.entries(errors).map((error) => {
          toast({ title: error[1] as ReactNode, status: "error" });
        });
      });

  }

  return (
    <>
    <Container
      as={SimpleGrid}
      maxW={'10xl'}
      bg={'secondary.100'}
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 10, lg: 6 }}
      py={{ base: 10, sm: 10, lg: 12 }}
      px={{ base: 2, sm: 10, lg: 12 }}
      overflow="hidden"
      style={
        isMobile
          ? {
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
          }
          : { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }
      }
    >
      <Modal show={show} onHide={handleClose} closeButton>
        <div className="p-3">
          <p className="p-5 mt-3">
            <form>
              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                <Input
                  style={{ backgroundColor: "#E8E8E8" }}
                  type="email"
                  className="form-control"
                  value={formData.business_email}
                  onChange={(event) =>
                    setFormData({ ...formData, business_email: event.target.value })
                  }
                  name="business_email"
                  id="email"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Organization Name</label>
                <Input
                  style={{ backgroundColor: "#E8E8E8" }}
                  type="text"
                  className="form-control"
                  id="admin-name"
                  value={formData.full_name}
                  onChange={(event) =>
                    setFormData({ ...formData, full_name: event.target.value })
                  }
                  name="full_name"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Address</label>
                <Input
                  style={{ backgroundColor: "#E8E8E8" }}
                  type="text"
                  className="form-control"
                  id="address"
                  value={formData.location}
                  onChange={(event) =>
                    setFormData({ ...formData, location: event.target.value })
                  }
                  name="location"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">
                  Business Number
                </label>
                <Input
                  style={{ backgroundColor: "#E8E8E8" }}
                  type="text"
                  className="form-control"
                  id="business-number"
                  value={formData.business_number}
                  onChange={(event) =>
                    setFormData({ ...formData, business_number: event.target.value })
                  }
                  name="business_number"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Website Url</label>
                <Input
                  style={{ backgroundColor: "#E8E8E8" }}
                  type="tel"
                  className="form-control"
                  id="phone-number"
                  value={formData.website_url}
                  onChange={(event) =>
                    setFormData({ ...formData, website_url: event.target.value })
                  }
                  name="website_url"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">
                  Company Description
                </label>
                <textarea
                  style={{ backgroundColor: "#E8E8E8" }}
                  className="form-control"
                  id="company-description"
                  rows={3}
                  value={formData.about}
                  onChange={(event) =>
                    setFormData({ ...formData, about: event.target.value })
                  }
                  name="about"
                  required
                ></textarea>
              </div>
              <label
                style={{
                  fontWeight: "500",
                  fontSize: "20px",
                  lineHeight: "24px",
                }}
                className="form-label"
              >
                Upload a Profile Picture
              </label>
              <div className="upload-pic d-flex justify-content-center align-items-center">
                {thumbnail ? (
                  <Image src={thumbnail} width={200} height={200} />
                ) : (
                  <Image
                    src={camera.src}
                    onClick={handleThumbnailClick}
                    alt="
                 placeholder"
                  />
                )}
              </div>
              {/* <div className="mb-3">
                    <label className="form-label fw-bold">Password</label>
                    <Input
                      style={{ backgroundColor: "#E8E8E8" }}
                      type="password"
                      className="form-control"
                      id="password"
                      required
                    />
                  </div> */}
              <div className="d-flex justify-content-end">
                <button onClick={handleSubmit} type="submit" className="btn-reset mb-5">
                  Submit
                </button>
              </div>
            </form>
          </p>
        </div>
        <div className="d-flex justify-content-center pb-5">
          {/* <button onClick={handleClose} className="modal-btn">Got it</button> */}
        </div>
      </Modal>
      <Modal show={showSuccess} onHide={handleCloseSuccess} closeButton>
        <div className="p-3">
          <p className="modal-txt text-center p-5 mt-3">
            Organization Created Successfully
          </p>
        </div>
        <div className="d-flex justify-content-center pb-5">
          <button onClick={handleCloseSuccess} className="modal-btn">Got it</button>
        </div>
      </Modal>
      <UserCard position="relative" className="ms-lg-5">
        <Icon
          fontSize={30}
          as={GoPencil}
          color="grey"
          style={{
            cursor: 'pointer',
            backgroundColor: 'white',
            padding: 6,
            borderRadius: 50,
            bottom: 50,
            right: isMobile ? '0' : '15px',
            top: isMobile ? '-5%' : '15px',
            position: 'absolute'
          }}
          onClick={() =>
            Router.push({ pathname: `/edit-profile/${profileData.id}` })
          }
        />
        <Stack
          direction={{ base: 'column', xs: 'row' }}
          spacing={{ base: '4', md: '10' }}
          color="grey.100"
          style={
            isMobile ? { position: 'relative', left: '-8%', top: '-5px' } : {}
          }
        >
          <div>
          <UserAvatar
            style={{ marginRight: '20px' }}
            name={profileData.full_name || ''}
            // src="https://images.unsplash.com/photo-1506935077180-46af676a2f6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
            src={
              profileData.avatar !== null && profileData.avatar !== ''
                ? profileData.avatar
                : defaultprofile.src
            }
          //   isVerified
          />
            <p className='mt-2 mb-5 pb-sm-4 pb-5' style={{color:'#979797'}}>Bio</p>
            <p style={{color:'#979797'}}>URL</p>
          </div>
          <CardContent className="ms-md-4 ps-md-3">
            <CardHeader
              style={
                isMobile
                  ? {
                    position: 'relative',
                    right: '-10%'
                  }
                  : {}
              }
              title={profileData.user_profile.username || ''}
            />
            {/* <Text mt="1" fontWeight="medium">
            Creative Writer
          </Text> */}
            <Stack
              spacing="1"
              mt="2"
              color="grey.100"
              style={
                isMobile
                  ? {
                    position: 'relative',
                    right: '-10%'
                  }
                  : {}
              }
            >
              <HStack fontSize="sm">
                {/* <Icon as={GoGlobe} color="grey.100" /> */}
                <img src={location.src} width="15px" alt="" />
                <Text>{profileData.user_profile.location || ''}</Text>
              </HStack>
              <HStack>
                <Rating defaultValue={profileData.rating} size="sm" />
                <Link href={`/reviews/${profileData.user_profile.username}`}>
                  <Text fontSize={14}>{profileData.review_count} Reviews</Text>
                </Link>
              </HStack>
              <Text fontSize={14}>
                {props.listingDataLength} Listings |{' '}
                {props.transactionDataLength} Transactions
              </Text>
            </Stack>
            {isMobile ? (
              <div
                style={{
                  display: 'flex',
                  width: '100%'
                }}
              >
                <Text
                  fontSize={12}
                  fontWeight={500}
                  maxW={'80%'}
                  mt={5}
                  style={{
                    position: 'relative',
                    left: '-35%',
                    color: '#979797',
                    paddingTop: 0
                  }}
                >
                  Bio
                </Text>
                <Text
                  fontSize={14}
                  fontWeight={500}
                  maxW={'80%'}
                  mt={5}
                  style={{ left: '-15%', position: 'relative' }}
                >
                  {profileData.user_profile.bio}
                </Text>
              </div>
            ) : (
              <Text fontSize={14} fontWeight={500} maxW={'80%'} mt={5}>
                {profileData.user_profile.bio}
              </Text>
            )}
            {
              Array.isArray(orgData) && orgData.length > 0 ? (<Link href="/organization">
                <button className='mt-2 btn-organization'>My Organization</button>
              </Link>) : (<><button onClick={handleShow} className='mt-2 btn-organization'>Create Organization</button></>)
            }
            {profileData.user_profile.website_url !== null &&
              profileData.user_profile.website_url !== '' &&
              (isMobile ? (
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    paddingTop: 15
                  }}
                >
                  <Text
                    fontSize={12}
                    fontWeight={500}
                    maxW={'80%'}
                    style={{
                      position: 'relative',
                      left: '-35%',

                      color: '#979797',
                      paddingTop: 10
                    }}
                  >
                    URL
                  </Text>
                  <Text
                    style={{ left: '-18%', position: 'relative' }}
                    cursor={'pointer'}
                    _hover={{
                      textDecoration: 'underline'
                    }}
                    fontSize={14}
                    fontWeight={400}
                    mt={2}
                    maxW={'80%'}
                    overflow="hidden"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        if (
                          !profileData.user_profile.website_url.includes('http')
                        ) {
                          window.open(
                            'http://' + profileData.user_profile.website_url,
                            '_blank'
                          )
                        } else {
                          window.open(
                            profileData.user_profile.website_url,
                            '_blank'
                          )
                        }
                      }
                    }}
                  >
                    {profileData.user_profile.website_url}
                  </Text>
                </div>
              ) : (
                <Text
                  cursor={'pointer'}
                  _hover={{
                    textDecoration: 'underline'
                  }}
                  fontSize={14}
                  fontWeight={400}
                  mt={2}
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      if (
                        !profileData.user_profile.website_url.includes('http')
                      ) {
                        window.open(
                          'http://' + profileData.user_profile.website_url,
                          '_blank'
                        )
                      } else {
                        window.open(
                          profileData.user_profile.website_url,
                          '_blank'
                        )
                      }
                    }
                  }}
                >
                  {profileData.user_profile.website_url}
                </Text>
              ))}
          </CardContent>
        </Stack>
      </UserCard>
      <div
        className="my-auto"
        style={
          isMobile
            ? {
              borderRadius: 10,
              position: 'relative',
              bottom: '20%',
              zIndex: 100
            }
            : {}
        }
      >
        <HStack
          className="rounded py-4"
          shadow={'base'}
          bg="white"
          justify="space-around"
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: '4', md: '10' }}
          color="grey.100"
          // py={5}
          width={'100%'}
        >
          <VStack
            color="main.1000"
            style={isMobile ? { left: '5%', position: 'absolute' } : {}}
          >
            <Text fontSize={14}>You have</Text>
            <Text fontSize={30} color="primary.300" fontWeight={600}>
              {profileData.user_profile.credits || 0}
            </Text>

            <Text fontSize={14} className="text-center text-md-start">credits available</Text>
          </VStack>
          <VStack
            color="main.1000"
            style={
              isMobile
                ? {
                  right: '-11%',
                  position: 'relative'
                }
                : {}
            }
          >
            <Text fontSize={14} style={{ textAlign: 'center', width: '81%' }}>
              Invite your friends and get 10 deed dollars
            </Text>
            <Text fontSize={16} color="primary.300" fontWeight={600}>
              url link here
            </Text>

            <Button 
              onClick={onCopy}
              type="submit"
              colorScheme="custom"
              className="pe-md-4"
              fontSize="md"
              style={isMobile ? { borderRadius: 70 } : {}}
            >
              {isMobile ? <LinkIcon fontSize={'md'} mr={'5px'} /> : null}
              <img src={copyLink.src} width="15px" className="me-md-2 me-3" alt="" />
              Copy link {hasCopied ? 'Copied' : ''}
            </Button>
          </VStack>
        </HStack>
      </div>
    </Container>
    </>
  );
}
