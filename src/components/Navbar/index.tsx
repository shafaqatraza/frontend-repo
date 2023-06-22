import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Stack,
  Input,
  Text,
  Avatar,
  Spacer,
  Spinner
} from '@chakra-ui/react'
import { ReactNode, useEffect, useState, useCallback, useRef } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Modal } from "react-bootstrap";
import { FiHeart, FiMessageSquare, FiLogIn } from 'react-icons/fi'
import { NavbarDrawer } from './drawer'
import { useMediaQuery } from '@chakra-ui/react'
import Image from 'next/image'
import logo from '../../assets/imgs/gooddeeds-logo.png'
import logoHorizontal from '../../assets/imgs/logo/newlogo.png'
const Links = ['Dashboard', 'Projects', 'Team']
import { MyModal } from '../MyModal'
import { useRouter } from 'next/router'

import { SignupModal } from '../onboarding/Signup/SignupModal'
import { Step1 } from '../createProfileModels/step1'
import { Step1Form } from '../createProfileModels/step1Form'
import { LoginForm } from '../onboarding/Login/LoginForm'
import { ForgotPasswordModal } from '../onboarding/Login/ForgotPassword/ForgotPasswordModal'
import { ForgotPassword } from '../onboarding/Login/ForgotPassword/ForgotPasswordForm'
import { SignupForm } from '../onboarding/Signup/SignupForm'
import { SignUpVerificationModal } from '../onboarding/Signup/Verification/VerificationModal'
import { SignUpVerificationForm } from '../onboarding/Signup/Verification/VerificationForm'
import { Step2Form } from '../createProfileModels/step2/step2Form'
import { WelcomeScreen1 } from '../createProfileModels/welcomeScreen/screen1'
import { InnerSection } from '../createProfileModels/welcomeScreen/innerSection'
import NoImage from '../../assets/imgs/no-image.png'
import gdlogo from '../../assets/imgs/gdlogopegiun.png'
import explorepegiun from '../../assets/imgs/explorepegiun.png'
import exchangepegiun from '../../assets/imgs/exchangepegiun.png'
import camera from "../../assets/imgs/camera.png";
import { useToast } from '@chakra-ui/toast'

import Head from "next/head";

import {

  baseImgUrl,
  userId,
  listingData,
  removeListinData,
  notificationHandler,
  currentOrganization,
} from '../../components/Helper/index';
// import Img1 from '../../assets/imgs/screen1.png'
import Img1 from '../../assets/imgs/logo/mainlogo.png'
import Img2 from '../../assets/imgs/screen2.png'
import Img3 from '../../assets/imgs/screen3.png'
import Img4 from '../../assets/imgs/screen4.png'
import { isLogin, Logout, GOOGLE_API_KEY, accessToken, baseUrl, totalMessageNotification, getLoginData } from '../Helper/index'
import { isMobile } from 'react-device-detect'
import axios from 'axios'
import Pusher from 'pusher-js'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Pusher_key } from '../../../config'
// import { useToast } from '@chakra-ui/toast'



interface ModelType {
  login: boolean
  forgotPassword: boolean
  signUp: boolean
  drawer: boolean
  signUpVerification: boolean
  step1: boolean
  step2: boolean,
  welcomeScreen1: boolean
  welcomeScreen2: boolean
  welcomeScreen3: boolean
  welcomeScreen4: boolean
}

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: 'gray.700'
    }}
    href={'#'}
  >
    {children}
  </Link>
)

export default function Navbar(props: any) {

  // console.log('getLoginData', getLoginData())

  // const audio= new Audio('https://drive.google.com/uc?export=download&id=1M95VOpto1cQ4FQHzNBaLf0WFQglrtWi7');

  const musicPlayers = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("https://drive.google.com/uc?export=download&id=1M95VOpto1cQ4FQHzNBaLf0WFQglrtWi7") : undefined
  );
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const [isChatLoading, setIsChatLoading] = useState(true)
  const [chatList, setChatList] = useState(0)
  const [conversations, setConversations] = useState()
  const toast = useToast()
  const [isSmallerThan850] = useMediaQuery('(max-width: 850px)');
  const [isSmallerThan991] = useMediaQuery('(max-width: 991px)');
  const [isSmallerThan767] = useMediaQuery('(max-width: 767px)');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showCreateOrg, setShowCreateOrg] = useState(false);
  const [orgData, setOrgData] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [image, setImage] = useState(null);

  const [showModel, setShowModel] = useState<ModelType>({
    login: false,
    forgotPassword: false,
    signUp: false,
    drawer: false,
    signUpVerification: false,
    step1: false,
    step2: false,
    welcomeScreen1: false,
    welcomeScreen2: false,
    welcomeScreen3: false,
    welcomeScreen4: false
  })

  const [formData, setFormData] = useState({
    full_name: "",
    organization_type_id: 7,
    business_number: "",
    business_email: "",
    about: "",
    website_url: "",
    location: "",
    profile_picture: []
  });

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

  const submitCreateOrganization = (e: any) => {
    e.preventDefault();
    // console.log(formData, "form");
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
        // console.log('org res', response.data);
        setShowSuccess(true);
        setShowCreateOrg(false);
        router.push("/organization")
        // Handle response data here
      })
      .catch((error) => {
        console.log('errrr org', error.response.data.message);
        toast({ title: error?.response?.data.message, status: "error" })

        // let errors = error.response?.data.errors;
        // Object.entries(errors).map((error) => {
        //   toast({ title: error[1], status: "error" })
        //   // console.log('single error', error)
        // });

      });

  }

  const closeCreateOrgModal = () => {
    setShowCreateOrg(false)
  }

  const closeCreateOrgSuccessModal = () => {
    setShowSuccess(false)
  }

  const [data, setData] = useState<any>({
    username: '',
    bio: '',
    location: '',
    website_url: '',
    avatar: null,
    refer: '',
    email: '',
  })
  const [refer, setRefer] = useState<any>('')
  const [isRefer, setIsRefer] = useState<boolean>(true);

  useEffect(() => {

    if (
      router.query.signup !== undefined &&
      router.query.signup !== null &&
      router.query.signup === 'true'
    ) {
      let dubShow = { ...showModel }
      dubShow.signUp = true
      setShowModel(dubShow)
      router.replace(`/${router.pathname}`, undefined, { shallow: true })
    }
    if (
      router.query.isCompleted !== undefined &&
      router.query.isCompleted !== null &&
      router.query.isCompleted === 'false'
    ) {
      let dubShow = { ...showModel }
      dubShow.login = true
      setShowModel(dubShow)
      router.replace(`/${router.pathname}`, undefined, { shallow: true })
    }


    if (
      router.query.refer !== undefined &&
      router.query.refer !== null &&
      router.query.refer !== ''
    ) {
      Logout()


      if (isRefer) {
        setIsRefer(false)
        setRefer(router.query.refer)
        setTimeout(() => {
          localStorage.setItem('referCode', `${router.query.refer}`)
          let dubShow = { ...showModel }
          dubShow.signUp = true
          setShowModel(dubShow)
          router.replace(`/${router.pathname}`, undefined, { shallow: true })
        }, 1000)


      }

    }

  }, [router.query])


  useEffect(() => {

    if (isLogin()) {
      getChats()
      axios.get(`${baseUrl}/organizations`, {
        headers: {
          Authorization: 'Bearer ' + accessToken(),
        }
      }).then((res) => {
        setOrgData(res.data);
      }).catch((err) => {
        console.log(err);
      })
    }

  }, [])

  useEffect(() => {

    // let tmpLoginData = JSON.parse(localStorage.getItem('loggedInUser'));
    Pusher.logToConsole = true;
    var pusher = new Pusher(`${Pusher_key}`, {
      cluster: 'mt1'
    });
    var channel = pusher.subscribe('new_message_notification_' + userId);
    channel.bind('notification', function (data: any) {
      musicPlayers.current?.play();
      // toast('You have a new message.');
      setConversations(data?.newChat)
      setChatList(chatList + 1)
    });


  }, [])



  const getChats = async () => {
    await axios
      .get(baseUrl + '/member/chats/latest-count', {
        headers: {
          Authorization: `Bearer ${accessToken()}`
        }
      })
      .then((res) => {
        // setIsChatLoading(false)
        setChatList(res.data)
      })
      .catch((error) => {
        // setIsChatLoading(true)
      })
  }




  return (
    <>
      <Box bg="grey.100" p={4} boxShadow="base" position="relative">
        {/* <ToastContainer /> */}
        <Head>
          <script src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}></script>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-171667765-1"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-171667765-1')', { page_path: window.location.pathname });
            `,
            }}
          />

        </Head>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          {isSmallerThan991 &&
            <Center>
              <HStack spacing={8} alignItems={'center'}>
                <NavbarDrawer show={showModel} setShowModel={setShowModel} />
                {isSmallerThan850 && (
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "10px",
                  }}>
                    <Link href="/">
                      <Image src={logo} alt="GoodDeeds" width={49} height={49} />
                    </Link>
                  </div>
                )}
              </HStack>
            </Center>
          }
          {showModel.login && (
            <MyModal
              show={showModel}
              setShow={setShowModel}
              TitleModal="Login In"
              body={<LoginForm show={showModel} setShowModel={setShowModel} />}
            />
          )}
          {showModel.forgotPassword && (
            <ForgotPasswordModal
              show={showModel.forgotPassword}
              setShow={(value: boolean) => {
                let dubShow = { ...showModel }
                dubShow.forgotPassword = value
                setShowModel(dubShow)
              }}
              goBack={() => {
                let dubShow = { ...showModel }
                dubShow.forgotPassword = false
                dubShow.login = true
                setShowModel(dubShow)
              }}
              TitleModal="Forgot Password"
              body={<ForgotPassword show={showModel} setShowModel={setShowModel} />}
            />
          )}
          {showModel.signUp && (
            <SignupModal
              show={showModel}
              setShow={setShowModel}
              TitleModal="Sign up and receive 100 credits"
              body={
                <SignupForm
                  userData={data}
                  setUserData={setData}
                  show={showModel}
                  setShowModel={setShowModel}
                  refer={refer}
                />
              }
            />
          )}
          {showModel.signUpVerification && (
            <SignUpVerificationModal
              show={showModel.signUpVerification}
              setShow={(value: boolean) => {
                let dubShow = { ...showModel }
                dubShow.signUpVerification = value
                setShowModel(dubShow)
              }}
              goBack={() => {
                let dubShow = { ...showModel }
                dubShow.signUpVerification = false
                dubShow.signUp = true
                setShowModel(dubShow)
              }}
              body={
                <SignUpVerificationForm
                  data={data}
                  setData={setData}
                  show={showModel}
                  setShowModel={setShowModel} />
              }
            />
          )}
          {showModel.step1 && (
            <Step1
              show={showModel.step1}
              setShow={(value: boolean) => {
                let dubShow = { ...showModel }
                dubShow.step1 = value
                setShowModel(dubShow)
              }}
              goBack={() => {
                let dubShow = { ...showModel }
                dubShow.step2 = false
                dubShow.step1 = true
                setShowModel(dubShow)
              }}
              TitleModal="Create Profile"
              currentStep={1}
              body={
                showModel.step1 && (
                  <Step1Form
                    data={data}
                    setData={setData}
                    show={showModel}
                    setShowModel={setShowModel}
                  />
                )
              }
            />
          )}

          {showModel.step2 && (
            <Step1
              show={showModel.step2}
              setShow={(value: boolean) => {
                let dubShow = { ...showModel }
                dubShow.step2 = value
                setShowModel(dubShow)
              }}
              goBack={() => {
                let dubShow = { ...showModel }
                dubShow.step2 = false
                dubShow.step1 = true
                setShowModel(dubShow)
              }}
              TitleModal="Create Profile"
              currentStep={2}
              body={
                <Step2Form
                  data={data}
                  setData={setData}
                  show={showModel}
                  setShowModel={setShowModel}
                />
              }
            />
          )}

          {showModel.welcomeScreen1 && (
            <WelcomeScreen1
              show={showModel.welcomeScreen1}
              setShow={(value: any) => {
                let dubShow = { ...showModel }
                dubShow.welcomeScreen1 = value
                setShowModel(dubShow)
              }}
              TitleModal={`Welcome to Good Deeds!`}
              body={
                <InnerSection
                  currentStep={1}
                  image={gdlogo.src}
                  lastStep={false}
                  //   para="Good Deeds is the world’s first free-to-use
                  // marketplace that promotes and rewards acts of kindness."
                  show={showModel}
                  setShowModel={setShowModel}
                  goNext={() => {
                    let dubShow = { ...showModel }
                    dubShow.welcomeScreen1 = false
                    dubShow.welcomeScreen2 = true
                    setShowModel(dubShow)
                  }}
                />
              }
            />
          )}

          {showModel.welcomeScreen2 && (
            <WelcomeScreen1
              show={showModel.welcomeScreen2}
              setShow={(value: any) => {
                let dubShow = { ...showModel }
                dubShow.welcomeScreen2 = value
                setShowModel(dubShow)
              }}
              TitleModal="Explore or offer items
              and services"
              body={
                <InnerSection
                  currentStep={2}
                  lastStep={false}
                  image={explorepegiun.src}
                  para="In exchange for donating things that you no longer need, providing a free service or experience or volunteering, you earn deed dollars that can be used to acquire things you need."
                  show={showModel}
                  setShowModel={setShowModel}
                  goNext={() => {
                    let dubShow = { ...showModel }
                    dubShow.welcomeScreen2 = false
                    dubShow.welcomeScreen3 = true
                    setShowModel(dubShow)
                  }}
                />
              }
            />
          )}
          {showModel.welcomeScreen3 && (
            <WelcomeScreen1
              show={showModel.welcomeScreen3}
              setShow={(value: any) => {
                let dubShow = { ...showModel }
                dubShow.welcomeScreen3 = value
                setShowModel(dubShow)
              }}
              TitleModal="Exchanging items and services"
              body={
                <InnerSection
                  currentStep={3}
                  image={exchangepegiun.src}
                  para="Receive or provide your items and services in person or remotely. Don't worry — your credits are pending until the transaction successfully happens."
                  show={showModel}
                  setShowModel={setShowModel}
                  goNext={() => {
                    let dubShow = { ...showModel }
                    dubShow.welcomeScreen3 = false
                    dubShow.welcomeScreen4 = true
                    setShowModel(dubShow)
                  }}
                  lastStep={true}
                />
              }
            />
          )}

          {!isSmallerThan850 && (
            <Center >
              <Link href="/">
                <Image
                  src={logoHorizontal}
                  alt="GoodDeeds"
                  width={206}
                  height={80}
                />
              </Link>
            </Center>
          )}

          <Flex alignItems={'center'}>
            {!isSmallerThan991 &&
              <Flex>
                <Link href="/" style={{ color: "black", margin: "0 2rem", fontWeight: "700", fontSize: "16px" }}>Home</Link>
                <Box position="relative">
                  <Link style={{ color: "black", margin: "0 2rem", fontWeight: "700", fontSize: "16px" }} onClick={() => setOpenDropdown(!openDropdown)} > Discover </Link>
                  {openDropdown &&
                    <Stack direction={'column'} position='absolute' w={'220px'} bg={'#FFF'} top="45px">
                      <Link href="/about" style={{ color: "black", margin: "0 2rem 1rem", fontWeight: "500", fontSize: "14px" }}>About us</Link>
                      <Link href="/browse?type=offering&activeTab=0" style={{ color: "black", margin: "0 2rem 1rem", fontWeight: "500", fontSize: "14px" }}>Items</Link>
                      <Link href="/browse?type=offering&activeTab=1" style={{ color: "black", margin: "0 2rem 1rem", fontWeight: "500", fontSize: "14px" }}>Services</Link>
                      <Link href="/browse?type=offering&activeTab=3" style={{ color: "black", margin: "0 2rem 1rem", fontWeight: "500", fontSize: "14px" }}>Donate</Link>
                      <Link href="/browse?type=offering&activeTab=2" style={{ color: "black", margin: "0 2rem 1rem", fontWeight: "500", fontSize: "14px" }}>Volunteer</Link>
                      <Link href="#" style={{ color: "black", margin: "0 2rem 1rem", fontWeight: "500", fontSize: "14px" }}>40 Hours Program</Link>
                      <Link href="/blog" style={{ color: "black", margin: "0 2rem 1rem", fontWeight: "500", fontSize: "14px" }}>Blog</Link>
                    </Stack>
                  }
                </Box>
                {/* <Stack direction={'row'} spacing={4}>
                  <Box>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                      <PopoverTrigger>
                        <Link
                          style={{ color: "black", margin: "0 2rem", fontWeight: "700", fontSize: "16px" }}
                        >
                          Discover
                        </Link>
                      </PopoverTrigger>
                      <PopoverContent
                        border={0}
                        boxShadow={'sm'}
                        // bg={popoverContentBgColor}
                        p={4}
                        rounded={'sm'}
                      // maxW={'200px'}
                      >
                        <Stack>
                          <Link href="/browse?type=offering&activeTab=0" style={{ color: "black", margin: "0 2rem 1rem", fontWeight: "500", fontSize: "14px" }}>Items</Link>
                          <Link href="/browse?type=offering&activeTab=1" style={{ color: "black", margin: "0 2rem 1rem", fontWeight: "500", fontSize: "14px" }}>Services</Link>
                          <Link href="/browse?type=offering&activeTab=3" style={{ color: "black", margin: "0 2rem 1rem", fontWeight: "500", fontSize: "14px" }}>Donate</Link>
                          <Link href="/browse?type=offering&activeTab=2" style={{ color: "black", margin: "0 2rem 1rem", fontWeight: "500", fontSize: "14px" }}>Volunteer</Link>
                          <Link href="#" style={{ color: "black", margin: "0 2rem 1rem", fontWeight: "500", fontSize: "14px" }}>40 Hours Program</Link>
                          <Link href="/blog" style={{ color: "black", margin: "0 2rem 1rem", fontWeight: "500", fontSize: "14px" }}>Blog</Link>
                        </Stack>
                      </PopoverContent>
                    </Popover>
                  </Box>
                </Stack> */}
                <Link href="/charities" style={{ color: "black", margin: "0 2rem", fontWeight: "700", fontSize: "16px" }}>Organization</Link>
                <Link href="/contact-us" style={{ color: "black", margin: "0 2rem", fontWeight: "700", fontSize: "16px" }}>Contact</Link>
              </Flex>
            }
            {!isLogin() && (
              <Button
                variant={'solid'}
                colorScheme={'orange'}
                style={{ borderRadius: 50 }}
                size={'md'}
                ml={4}
                onClick={() => {
                  let dubShow = { ...showModel }
                  dubShow.login = true
                  setShowModel(dubShow)
                }}
              >
                Login
              </Button>
            )}
            {/* {!isSmallerThan850 && (
                <Button
                  variant={'solid'}
                  colorScheme={'orange'}
                  style={{ borderRadius: 16 }}
                  size={'sm'}
                  mr={4}
                  ml={2}
                  onClick={() => {
                    if (isLogin()) {
                      router.push('/listing/create')
                    } else {
                      let dubShow = { ...showModel }
                      dubShow.login = true
                      setShowModel(dubShow)
                    }
                  }}
                >
                  <AddIcon /> &nbsp;Create a listing
                </Button>
              )} */}

            {isLogin() && (
              <Flex alignItems={'center'}>
                <div
                  style={
                    isMobile ? { display: 'flex', alignItems: 'center' } : {}
                  }
                >

                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}
                      _focus={{
                        boxShadow: 'none'
                      }}
                      onClick={() => {
                        router.push('/bookmarks?type=offering')
                      }}
                    >
                      <FiHeart
                        size={23}
                        style={{ marginRight: 5, marginLeft: 5, color: '#000' }}
                      />
                    </MenuButton>
                    {/* <MenuList>
                    <Link href="/bookmarks?type=wanted">
                      <MenuItem>Wanted</MenuItem>
                    </Link>
                    <MenuDivider />
                    <Link href="/bookmarks?type=offering">
                      <MenuItem>Offering</MenuItem>
                    </Link>
                    <MenuDivider />
                  </MenuList> */}
                  </Menu>

                  <Menu>

                    {/* {
                // @ts-ignore: Unreachable code error
                currentOrganization?.slug? */}
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      position={'relative'}
                      minW={0}
                      _focus={{
                        boxShadow: 'none'
                      }}
                      onClick={() => {
                        router.push('/organization/inbox/all')
                      }}
                    >
                      <>
                        {chatList == 0 ?
                          null
                          :
                          <Badge colorScheme='red' position={'absolute'} top={'-7px'}>
                            {chatList}
                          </Badge>
                        }

                        <FiMessageSquare
                          size={23}
                          style={{ marginRight: 5, marginLeft: 5, color: 'red' }}
                        />
                      </>
                    </MenuButton>
                    {/* : */}
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      position={'relative'}
                      minW={0}
                      _focus={{
                        boxShadow: 'none'
                      }}
                      onClick={() => {
                        router.push('/message')
                      }}
                    >
                      <>
                        {chatList == 0 ?
                          null
                          :
                          <Badge colorScheme='red' position={'absolute'} top={'-7px'}>
                            {chatList}
                          </Badge>
                        }

                        <FiMessageSquare
                          size={23}
                          style={{ marginRight: 5, marginLeft: 5, color: '#000' }}
                        />
                      </>

                    </MenuButton>
                    {/* } */}

                    {/* <MenuList>
                    {isChatLoading && (
                      <Center>
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="orange.200"
                          color="orange.500"
                          size="xl"
                        />
                      </Center>
                    )}
                    {!isChatLoading && (
                      chatList.map((singleChat, index) => {
                        return (
                          <>
                            <Link href="/message">
                              <MenuItem>
                                <Flex>
                                  <Avatar src={singleChat.receiver.avatar_url} />
                                  <Box ml='3'>
                                    <Text fontWeight='bold'>
                                      {singleChat.receiver.name}
                                    </Text>
                                    <Text fontSize='sm'>This is message from the sender...</Text>
                                    <Text fontSize='xs'>
                                      {singleChat.last_msg_at}
                                    </Text>
                                  </Box>
                                </Flex>
                              </MenuItem>
                            </Link>
                            <MenuDivider />
                          </>
                        )
                      })
                    )}

                    <Link href="/message">
                      <Center color='orange'>
                        See more chats
                      </Center>
                    </Link>

                  </MenuList> */}
                  </Menu>

                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}
                      _focus={{
                        boxShadow: 'none'
                      }}
                    >

                      <img src={isLogin() &&
                        getLoginData()?.avatar !== null && getLoginData()?.avatar !== ''
                        ? getLoginData()?.avatar
                        : 'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png'
                      } style={{ borderRadius: '50px', border: '2px solid black', width: '30px', height: '30px', objectFit: 'cover' }} />
                    </MenuButton>
                    <MenuList px={'10px'}>
                      <Link href="/profile"
                        _hover={{
                          textDecoration: 'none',
                          color: '#dd6b20'
                        }}>
                        <MenuItem>My Profile</MenuItem>
                      </Link>
                      {Array.isArray(orgData) && orgData.length > 0 ?
                        <Link href="/organization"
                          _hover={{
                            textDecoration: 'none',
                            color: '#dd6b20'
                          }} >
                          <MenuItem>Switch to Organization</MenuItem>
                        </Link>
                        :
                        <Link
                          href='javascript:void(0)'
                          onClick={() => setShowCreateOrg(true)}
                          _hover={{
                            textDecoration: 'none',
                            color: '#dd6b20'
                          }} >
                          <MenuItem>Add an Organization</MenuItem>
                        </Link>
                      }

                      {/* <MenuDivider /> */}
                      {/* <Link href="/about">
                      <MenuItem>About</MenuItem>
                    </Link>
                    <MenuDivider />
                    <Link href="/how-to-use">
                      <MenuItem>How to use</MenuItem>
                    </Link>
                    <MenuDivider /> */}
                      <Link
                        onClick={() => {
                          Logout()
                          router.push('/')
                        }}
                        _hover={{
                          textDecoration: 'none',
                          color: '#dd6b20'
                        }}
                      >
                        <MenuItem>Logout</MenuItem>
                      </Link>

                      <Text
                        p={'0.4rem 0.8rem'}
                        fontWeight={700}
                        color={'#E27832'}
                      >
                        {getLoginData()?.user_profile !== null ? `${getLoginData()?.user_profile.credits} CREDITS` : ""}

                      </Text>

                      <Button
                        variant={'solid'}
                        colorScheme={'orange'}
                        style={{ borderRadius: '10px' }}
                        h={'37px'}
                        mt={'10px'}
                        size={'sm'}
                        w={'100%'}
                        onClick={() => {
                          if (isLogin()) {
                            router.push('/listing/create')
                          } else {
                            let dubShow = { ...showModel }
                            dubShow.login = true
                            setShowModel(dubShow)
                          }
                        }}
                      //   leftIcon={<AddIcon />}
                      >
                        Create a listing
                      </Button>
                    </MenuList>
                  </Menu>
                </div>
                {/* {!isSmallerThan850 && (
                <Button
                  variant={'solid'}
                  colorScheme={'orange'}
                  style={{ borderRadius: 16 }}
                  size={'sm'}
                  mr={4}
                  ml={4}
                  onClick={() => {
                    if (isLogin()) {
                      router.push('/listing/create')
                    } else {
                      let dubShow = { ...showModel }
                      dubShow.login = true
                      setShowModel(dubShow)
                    }
                  }}
                //   leftIcon={<AddIcon />}
                >
                  <AddIcon /> &nbsp;Create a listing
                </Button>
              )} */}
              </Flex>
            )}

          </Flex>


        </Flex>

        <Modal show={showCreateOrg} onHide={closeCreateOrgModal} >
          <div className="p-3">
            <div className="p-5 mt-3">
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
                      alt="Thumbnail placeholder"
                      width={39}
                      height={36}
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
                  <button onClick={submitCreateOrganization} type="submit" className="btn-reset mb-5">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="d-flex justify-content-center pb-5">
            {/* <button onClick={handleClose} className="modal-btn">Got it</button> */}
          </div>
        </Modal>
        <Modal show={showSuccess} onHide={closeCreateOrgSuccessModal} >
          <div className="p-3">
            <p className="modal-txt text-center p-5 mt-3">
              Organization Created Successfully
            </p>
          </div>
          <div className="d-flex justify-content-center pb-5">
            <button onClick={() => setShowSuccess(false)} className="modal-btn">Got it</button>
          </div>
        </Modal>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}
