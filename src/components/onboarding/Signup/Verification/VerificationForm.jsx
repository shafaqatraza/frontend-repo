import * as React from 'react';
import {
  Box,
  HStack,
  PinInput,
  PinInputField,
  Text,
  Center,
  Icon,
  Spinner,
  VStack,
  Image,
  Button
} from '@chakra-ui/react';
import { FiCheck } from 'react-icons/fi';
import { useToast } from "@chakra-ui/toast";
import { baseUrl } from '../../../../../config';
import { accessToken } from '../../../Helper/index';
import Img1 from '../../../../assets/imgs/logo/mainlogo.png'
import axios from 'axios';


export const SignUpVerificationForm = (props) => {
  let {
    setShowModel,
    show,
    data,
    setData
  } = props;
  const toast = useToast();

  const [loading, setLoading] = React.useState(false);
  const [isConfirmed, setConfirmed] = React.useState(false);
  const [isInvalid, setInValidity] = React.useState(false);
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    if (value?.length === 4) {
      var formData = new FormData();
      formData.append("pin", value.trim());
      let userDetails = JSON.parse(localStorage.getItem('loggedInUser'));
      formData.append("email", userDetails.user.email);
      setLoading(true);
      axios.post(`${baseUrl}/verify-email`, formData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'multipart/form-data',
        }
      }).then((res) => {
        if (res.status === 200) {
          setInValidity(false)
          setConfirmed(true)
          setLoading(false)
          toast({ title: 'Email Verified Successfully', status: 'success' })
          setTimeout(() => {
            let dubShow = { ...show }
            dubShow.signUpVerification = false
            dubShow.step1 = true
            setShowModel(dubShow)
          }, 2000)
        }
      }).catch((data) => {
        setInValidity(true)
        setConfirmed(false)
        setLoading(false)
        setValue('')
        toast({ title: 'Invalid OTP or Something went wrong', status: 'error' })
      })
    }
  }, [value]);

  const resendOTP = async (e) => {
    e.preventDefault()
    let userDetails = JSON.parse(localStorage.getItem('loggedInUser'));
    var formData = new FormData();
    formData.append("email", userDetails.user.email);

    axios.post(`${baseUrl}/verify-email/resend`, formData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'multipart/form-data',
        'Authorization': "Bearer " + accessToken()
      }
    }).then((res) => {
      // console.log(res);
      toast({ title: 'Verification email sent successfully.', status: 'success' })
    }).catch((error) => {
      toast({ title: 'Something went wrong', status: 'error' })
    })
  }

  return (
    <Box>
       <Center>

      <Text marginTop="2rem" fontSize="30px" fontWeight="600">
        {loading ? "Confirming your verification code" : isConfirmed ? "Confirmed!" : "Verify Email"}
      </Text>
       </Center>

      {loading ? (
        <Center h={"400px"} >
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='orange.200'
            color='orange.500'
            size='xl'
          />
        </Center>
      ) : isConfirmed ? (
        <Center h={"400px"} >
          <div className="verification-confirmed">
            <Icon as={FiCheck} color="#DD6B20" fontSize="30px" transition="all 0.15s ease" />
          </div>
        </Center>
      ) : (
        <VStack>

          {/* <Center>
            <Image
              width={"180px"}
              src={Img1.src}
              alt={"img"}
              draggable="false"
            />
          </Center> */}
          {/* <Text fontSize="14px" fontWeight="400" mt="24px">
            You will get a confirmation code in to your account's email, please enter the code below in order to continue:
          </Text> */}

          <Text color="#666666" fontSize="14px" fontWeight="400" mt="24px">
          An email with a four-digitt verification code has been <span className="d-block text-center">sent to you.</span>
          </Text>

        <HStack justifyContent="center" my="20px !important">
        <div style={{border:"4px solid #E27832", padding:"12px"}}>

            <PinInput
              otp
              size="lg"
              placeholder=""
              isInvalid={isInvalid}
              variant="flushed"
              onChange={(e) => setValue(e)}
              >
              <PinInputField style={{backgroundColor:"#D9D9D9", borderBottom:"#D9D9D9"}} />
              <PinInputField style={{backgroundColor:"#D9D9D9", marginLeft:"12px", borderBottom:"#D9D9D9"}} />
              <PinInputField style={{backgroundColor:"#D9D9D9", marginLeft:"12px", borderBottom:"#D9D9D9"}} />
              <PinInputField style={{backgroundColor:"#D9D9D9", marginLeft:"12px", borderBottom:"#D9D9D9"}} />
            </PinInput>
              </div>
          </HStack>
          <button
          type="button"
          className="cust-button"
          // colorScheme="orange"
          // size="lg"
          // fontSize="md"
          // disabled={isLoading}
        >
          Set up Profile
        </button>

          <Text
            color={"primary.300"}
            // fontWeight="semibold"
            fontSize="md"
            cursor={"pointer"}
            onClick={(e) => resendOTP(e)}
          >
            <span style={{color:"#666666"}}>Didn’t receive an email?</span>  Resend Code
          </Text>
        </VStack>
      )}

    </Box>
  )
}
