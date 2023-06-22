import {
  Image,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
// import Image from 'next/image'
import logo from '../../assets/imgs/gooddeeds-logo.png'
import { MyModal } from '../MyModal'
import { useRouter } from 'next/router'
import Charity from "../../assets/imgs/Charity.png";
import giving from "../../assets/imgs/giving.png";
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
import gdlogo from '../../assets/imgs/gdlogopegiun.png'
import explorepegiun from '../../assets/imgs/explorepegiun.png'
import exchangepegiun from '../../assets/imgs/exchangepegiun.png'
// import {
//   baseImgUrl,
//   userId,
//   listingData,
//   removeListinData,
//   notificationHandler,
//   currentOrganization,
// } from '../../components/Helper/index';
import Img1 from '../../assets/imgs/logo/mainlogo.png'
import Img2 from '../../assets/imgs/screen2.png'
import Img3 from '../../assets/imgs/screen3.png'
import { isLogin, Logout, GOOGLE_API_KEY, accessToken, baseUrl, totalMessageNotification, getLoginData } from '../Helper/index'
import axios from 'axios'


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

export const Banner: React.FC<{}> = () => {

  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [conversations, setConversations] = useState()
  const [openDropdown, setOpenDropdown] = useState(false);

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
    }

  }, [router.query])

  useEffect(() => {
    isLogin()

  }, [isLogin])

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 mt-5">
            <p className="good-deeds">The First <span className="donors">Peer 2 Peer</span><span className="you-motivated d-block"><span className="donors">Marketplace</span> That <span className="donors">Rewards</span></span> <span className="volunteers">Kindness!</span></p>
            <div className="mt-2 mb-2">
              <p className="our-platform col-md-10">Have stuff you want to get rid of?  Have a skill or service you can provide?  List what you want,  and turn your good will into real rewards.</p>
            </div>
            <div className="mt-3 mb-3">
              {!isLogin() &&
                <button className="try-button"
                  onClick={() => {
                    let dubShow = { ...showModel }
                    dubShow.signUp = true
                    setShowModel(dubShow)
                  }}
                >Sign up and get 100 FREE deed dollars!</button>
              }
            </div>
          </div>
          <div className="col-md-4 mt-5 charity-img">
            <Image src={giving.src} alt={"Charity"} />
          </div>
        </div>
      </div>
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
    </>
  );
};
