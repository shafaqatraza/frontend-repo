import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Badge,
  Stack,
  Text,
} from '@chakra-ui/react'

import { ReactNode, useEffect, useState, useRef } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { FiHeart, FiMessageSquare, FiLogIn, FiBell } from 'react-icons/fi'
import { NavbarDrawer } from './drawer'
import { useMediaQuery } from '@chakra-ui/react'
import Image from 'next/image'
import logo from '../../assets/imgs/gooddeeds-logo.png'
import logoHorizontal from '../../assets/imgs/logo/newlogo.png'
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
import NoImage from '../../assets/imgs/profile/default-profile.png'
import gdlogo from '../../assets/imgs/gdlogopegiun.png'
import explorepegiun from '../../assets/imgs/explorepegiun.png'
import exchangepegiun from '../../assets/imgs/exchangepegiun.png'
import { formatDistanceToNow, format } from 'date-fns';
import Head from "next/head";
import { useOrganizationFormContext } from '../organizationForm/organizationFormContext';
import { isLogin, Logout, GOOGLE_API_KEY, accessToken, baseUrl, getLoginData } from '../Helper/index'
import { isMobile } from 'react-device-detect'
import axios from 'axios'
import Pusher from 'pusher-js'
import { Pusher_key } from '../../../config'
import {
  userId,
  currentOrganization,
  currOrgId,
  currOrgSlug
} from '../../components/Helper/index';

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
const Links = ['Dashboard', 'Projects', 'Team']
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

interface Notification {
  id: number;
  message: any;
  created_at_for_humans: any;
  created_at: any;
}


export default function Navbar(props: any) {
  
  const musicPlayers = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("https://drive.google.com/uc?export=download&id=1M95VOpto1cQ4FQHzNBaLf0WFQglrtWi7") : undefined
  );
 
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const [isChatLoading, setIsChatLoading] = useState(true)
  const [chatList, setChatList] = useState(0)
  const [organizationNotifications, setOrganizationNotifications] = useState(0)
  const [notificationsCount, setNotificationsCount] = useState(0)
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isSmallerThan850] = useMediaQuery('(max-width: 850px)');
  const [isSmallerThan991] = useMediaQuery('(max-width: 991px)');
  const [isSmallerThan767] = useMediaQuery('(max-width: 767px)');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [orgData, setOrgData] = useState([]);
  const [orgSlug, setOrgSlug] = useState("");
  const [orgId, setOrgId] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [image, setImage] = useState(null);
  const [isOrganization, setIsOrganization] = useState(false);
  const { openModal } = useOrganizationFormContext();
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

  // if (typeof window !== 'undefined') {
	// 	var currOrg = JSON.parse(localStorage.getItem('currentOrganization'));
	// }

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

      if(orgData.length == 0 && isLogin()){
        axios.get(`${baseUrl}/organizations`, {
          headers: {
            Authorization: 'Bearer ' + accessToken(),
          }
        }).then((res) => {
          setOrgData(res.data);
          setOrgSlug(res.data[0].slug)
          setOrgId(res.data[0].id)
        }).catch((err) => {})
      }

      if (router.asPath.startsWith('/organization')) {
        if (isLogin()) {
            setIsOrganization(true);
        }else{
          router.push("/");
        }
      }else{ 
        getChats()
      }

    if(currOrgId){
      getOrganizationNotifications()
    }

  }, [isLogin()])

  useEffect (() => {
    if(orgSlug !== ""){
      axios.get(`${baseUrl}/org-role-permissions/member?org=${orgSlug}`, {
        headers: {
          Authorization: 'Bearer ' + accessToken(),
        }
      }).then((res) => {
        localStorage.setItem("rolePermissions", JSON.stringify(res.data));
      }).catch((err) => {
        // console.log(err);
      })
    }
  }, [orgSlug])

  useEffect(() => {

    // let tmpLoginData = JSON.parse(localStorage.getItem('loggedInUser'));
      Pusher.logToConsole = false;
      var pusher = new Pusher(`${Pusher_key}`, {
        cluster: 'mt1'
      });
  
      if(currOrgId){
        var channel2 = pusher.subscribe('new_notification_organization_'+ currOrgId);
        channel2.bind('NewNotificationOrganization', function(data: any) {
            musicPlayers.current?.play();
            setOrganizationNotifications(prevCount => prevCount + 1);
        });
  
        var channel3 = pusher.subscribe('notifications_organization_'+ currOrgId);
        channel3.bind('OrganizationNotifications', function(data: any) {
            setOrganizationNotifications(data.notifications_count);
        });

      }else{
        var channel = pusher.subscribe('new_message_notification_'+userId);
        channel.bind('notification', function(data: any) {
          musicPlayers.current?.play();
          setChatList(prevCount => prevCount + 1)
        });
  
        var channel4 = pusher.subscribe('notifications_member_'+ userId);
        channel4.bind('MemberNotifications', function(data: any) {
          setChatList(data.notifications_count);
        });
      }
    }, [])
    

    useEffect(() => {
      if(isLogin()){
        axios.get(`${baseUrl}/notifications`, {
          headers: {
            Authorization: 'Bearer ' + accessToken(),
          }
        })
        .then((res) => { 
          // Assuming res.data.notifications is an array of notifications
          const newVolunteerNotifications = res.data.data.volunteer_notifications.map((notification: Notification) => ({
            id: notification.id,
            message: notification.message, 
            created_at_for_humans: notification.created_at_for_humans,
            created_at: notification.created_at,
          }));
          
          const newDonationNotifications = res.data.data.donation_notifications.map((notification: Notification) => ({
            id: notification.id,
            message: notification.message,
            created_at_for_humans: notification.created_at_for_humans,
            created_at: notification.created_at,
          }));

          // Combine both arrays
          const combinedNotifications = [...newVolunteerNotifications, ...newDonationNotifications];

          // Sort the combined array based on created_at in descending order
          const sortedNotifications = combinedNotifications.sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          });

          // Update the notifications state with the sorted array
          setNotifications(sortedNotifications);
    
          // Update the notification count
          setNotificationsCount(res.data.data.total_new_notifications);
        })
        .catch((err) => {
          console.error('Error fetching notifications:', err);
        });
      }
    }, []);

    
    


    useEffect(() => {
      // Enable console logging for Pusher
      Pusher.logToConsole = false;
  
      // Initialize Pusher with your API key and cluster
      var pusher = new Pusher(`${Pusher_key}`, {
        cluster: 'mt1',
      });
  
      // Subscribe to the channel if orgId is available
      if (orgId) {
        var newVolunteer = `new_volunteer_notification_${orgId}`;
        var newVolunteerChannel = pusher.subscribe(newVolunteer);
  
        // Bind to the event on the channel
        newVolunteerChannel.bind('NewVolunteer', (data: any) => { 
          musicPlayers.current?.play();
          const timestampString = data.notification.created_at;
          const parsedTimestamp = Date.parse(timestampString);

          const oldTimestamp = new Date(parsedTimestamp);
          const timeDifference = formatDistanceToNow(oldTimestamp, { addSuffix: true });

          // Add the new notification to the array
          const newNotification = {
            id: data.notification.id, 
            message: data.notification.content,
            created_at_for_humans: timeDifference, 
            created_at: format(new Date(data.notification.created_at), 'yyyy-MM-dd HH:mm:ss'),
          };
  
          // @ts-ignore:
          setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
  
          // Update the notification count
          setNotificationsCount((prevCount) => prevCount + 1);
        });
  
        // Clean up the subscription when the component unmounts
        return () => {
          pusher.unsubscribe(newVolunteer);
        };
      }
      
    }, [orgId, Pusher_key]);
    // console.log('Notifications', notifications)
   useEffect(() => {

    // Initialize Pusher with your API key and cluster
    var pusher = new Pusher(`${Pusher_key}`, {
      cluster: 'mt1',
    });
    
    if (orgId) {
      var newDonation = `new_donation_notification_${orgId}`;
      var newDonationChannel = pusher.subscribe(newDonation);

      // Bind to the event on the channel
      newDonationChannel.bind('NewDonation', (data: any) => { 
        musicPlayers.current?.play();
        const timestampString = data.notification.created_at;
        const parsedTimestamp = Date.parse(timestampString);

        const oldTimestamp = new Date(parsedTimestamp);
        const timeDifference = formatDistanceToNow(oldTimestamp, { addSuffix: true });

        // Add the new notification to the array
        const newNotification = {
          id: data.notification.id,
          message: data.notification.content,
          created_at_for_humans: timeDifference,
          created_at: format(new Date(data.notification.created_at), 'yyyy-MM-dd HH:mm:ss'),
        };

        // @ts-ignore:
        setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);

        // Update the notification count
        setNotificationsCount((prevCount) => prevCount + 1);
      });

      // Clean up the subscription when the component unmounts
      return () => {
        pusher.unsubscribe(newDonation);
      };
    }
    
  }, [orgId, Pusher_key]);


  const getChats = async () => {
    if (isLogin()) {
    await axios
      .get(baseUrl + '/member/chats/latest-count', {
        headers: {
          Authorization: `Bearer ${accessToken()}`
        }
      })
      .then((res) => {
        setChatList(res.data)
      })
      .catch((error) => {
      })
    }
  }

  const getOrganizationNotifications = async () => {
    if(currOrgSlug){
      await axios
      .get(baseUrl + '/organizations/notifications/check?org='+currOrgSlug, {
        headers: {
          Authorization: `Bearer ${accessToken()}`
        }
      })
      .then((res) => {
        setOrganizationNotifications(res.data.has_new_notifications);
      })
      .catch((error) => {
      })
    }
    
  }

  const openOrganization = () => {
    if (isMobile) {
      router.push('/donor-management-portal');
    } else {
      router.push('/organization');
    }
  };

  const handleLogout = async () => {
    try {
      await Logout();
      router.push('/'); // Redirect after successful logout
    } catch (error) {
      // Handle logout errors appropriately, e.g., display an error message
      console.error('Logout error:', error);
    }
  };


  return (
    <>
      <Box bg="grey.100" p={4} boxShadow="base" position="relative">
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
              TitleModal="Login"
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
              TitleModal="Sign up and receive 100 deed dollars"
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
                  para="In exchange for donating things that you no longer need, providing a free service or experience or volunteering, you earn virtual deed dollars that can be used to acquire things you need."
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
                  para="Receive or provide your items and services in person or remotely. Don't worry — your deed dollars are pending until the transaction successfully happens."
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
                  width={150}
                  height={80}
                  className="py-3"
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
                    <Stack direction={'column'} position='absolute' w={'220px'} bg={'#FFF'} top="45px" background="#fff" zIndex="999">
                      <Link href="/about" style={{ color: "black", margin: "0 2rem 1rem", fontWeight: "500", fontSize: "14px" }}>About us</Link>
                      <Link href="/browse?type=offering&activeTab=0" style={{ color: "black", margin: "0 2rem 1rem", fontWeight: "500", fontSize: "14px" }}>Items</Link>
                      <Link href="/browse?type=offering&activeTab=1" style={{ color: "black", margin: "0 2rem 1rem", fontWeight: "500", fontSize: "14px" }}>Services</Link>
                      <Link href="/browse?type=donation&activeTab=3" style={{ color: "black", margin: "0 2rem 1rem", fontWeight: "500", fontSize: "14px" }}>Donate</Link>
                      <Link href="/browse?type=volunteer&activeTab=2" style={{ color: "black", margin: "0 2rem 1rem", fontWeight: "500", fontSize: "14px" }}>Volunteer</Link>
                      <Link href="../../students-landing" style={{ color: "black", margin: "0 2rem 1rem", fontWeight: "500", fontSize: "14px" }}>40 Hours Program</Link>
                      <Link href="/blogs" style={{ color: "black", margin: "0 2rem 1rem", fontWeight: "500", fontSize: "14px" }}>Blogs</Link>
                    </Stack>
                  }
                </Box>

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
                className="nav-login-btn"
                onClick={() => {
                  let dubShow = { ...showModel }
                  dubShow.login = true
                  setShowModel(dubShow)
                }}
              >
                Login
              </Button>
            )}

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
                  </Menu>

                  <Menu>
                    {isOrganization?
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
                        {organizationNotifications == 0 ?
                          null
                          :
                          <Badge colorScheme='red' position={'absolute'} top={'-7px'}>
                            {organizationNotifications}
                          </Badge>
                        }

                        <FiMessageSquare
                          size={23}
                          style={{ marginRight: 5, marginLeft: 5, color: '#e27832' }}
                        />
                      </>
                    </MenuButton>
                    :
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
                    }
                  </Menu>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}
                      _focus={{
                        boxShadow: 'none',
                      }}
                    >
                      {notificationsCount != 0 && (
                        <Badge colorScheme="red" position={'absolute'} top={'-7px'}>
                          {notificationsCount}
                        </Badge>
                      )}
                      <FiBell size={23} style={{ marginRight: 5, marginLeft: 5, color: '#000' }} />
                    </MenuButton>
                    <MenuList px={'10px'} style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                          <MenuItem key={index}>
                            <div>
                              <span>{notification.message}</span>
                              <br />
                              <span style={{ fontSize: '0.8em', color: '#666' }}>{notification.created_at_for_humans}</span>
                            </div>
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem>No New Notification</MenuItem>
                      )}
                    </MenuList>

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
                      } style={{ borderRadius: '50px', border: '2px solid black', width: '30px', height: '30px', objectFit: 'cover' }} 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = NoImage.src;
                        }}
                      />
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
                        <Link 
                          href='javascript:void(0)'
                          onClick={ () => openOrganization()}
                          _hover={{
                            textDecoration: 'none',
                            color: '#dd6b20'
                          }} >
                          <MenuItem>Switch to Organization</MenuItem>
                        </Link>
                        :
                        <Link
                          href='javascript:void(0)'
                          onClick={openModal}
                          _hover={{
                            textDecoration: 'none',
                            color: '#dd6b20'
                          }} >
                          <MenuItem>Add an Organization</MenuItem>
                        </Link>
                      }
                      <Link
                        onClick={handleLogout}
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
                        {getLoginData()?.user_profile?.credits} DEED DOLLARS
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
                      >
                        Create a listing
                      </Button>
                    </MenuList>
                  </Menu>
                  
                </div>
              </Flex>
            )}

          </Flex>


        </Flex>
     
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
