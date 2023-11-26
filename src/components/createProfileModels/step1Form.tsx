import * as React from 'react'
import {
  Button,
  chakra,
  FormLabel,
  FormControl,
  Input,
  useColorModeValue as mode,
  Box,
  FormErrorMessage,
  Center,
  Spacer,
  Icon,
  Text,
  Flex,
  Tag
} from '@chakra-ui/react'
import { useCallback } from 'react'
import { Form, useField } from "react-final-form";
import Upload from './uploadComponent'
import { useToast } from "@chakra-ui/toast";
import axios from 'axios';
import validate from "./validate";
import { isMobile } from 'react-device-detect';
import { FiX, FiCheck } from 'react-icons/fi';
import { baseUrl, accessToken } from '../../components/Helper/index';

export const Step1Form = (props: any) => {
  let {
    setShowModel,
    show,
    data,
    setData
  } = props;
  const toast = useToast()
  const [avatar, setAvatar] = React.useState<any>('');
  const [isAvatarAvailable, setAvatarAvailablity] = React.useState<any>();
  const [usernameAvailable, setUsernameAvailable] = React.useState<any>();
  const [suggestedUsername, setSuggestedUsername] = React.useState<any>();
  const [userNameError, setUserNameError] = React.useState<any>('');

  const Error = ({ name }: any) => {
    const {
      meta: { error }
    } = useField(name, { subscription: { error: true } });
    return <FormErrorMessage>{error}</FormErrorMessage>;
  };
  const InputControl = ({ name, label }: any) => {
    const { input, meta } = useField(name);
    return (
      <Control name={name} my={4} position="relative">
        <FormLabel color="#BDBDBD" htmlFor={name}>{label}</FormLabel>
        <Input
          {...input}
          isInvalid={meta.error || meta.touched || usernameAvailable === false}
          id={name}
          placeholder={label}
          backgroundColor={mode('gray.50', 'whiteAlpha.900')}
          height={50}
          onKeyUp={usernameSuggest}

        />
        {usernameAvailable === false &&
          <>
            <Text className='text-red-800'>This username is already in use. Please make it unique or choose from the suggestions provided.</Text>
            <Flex gap='3' className='mt-3'>
              {suggestedUsername?.map((usernames: any, index: any) => (
                <Tag key={index} variant='solid' colorScheme='orange' onClick={() => { navigator.clipboard.writeText(`${usernames}`); toast({ title: "Username copied", status: "success" }) }} className="cursor-pointer"> {usernames} </Tag>
              ))}
            </Flex>
          </>
        }
        <div style={{ position: 'absolute', top: "45px", right: "10px", zIndex: 10 }}>
          {meta.error || meta.touched || usernameAvailable === false ? (
            <Icon as={FiX} color="#E74C3C" fontSize="20px" transition="all 0.15s ease" />
          ) : input.value || usernameAvailable === true ? (
            <Icon as={FiCheck} color="#979797" fontSize="20px" transition="all 0.15s ease" />
          ) : null}
        </div>
      </Control >
    );
  };
  const Control = ({ name, ...rest }: any) => {
    const { meta: { error, touched } } = useField(name, { subscription: { touched: true, error: true } });
    return <FormControl {...rest} isInvalid={error && touched} />;
  };

  const onSubmit = (values: any) => {
    if (avatar) {
      let dubData = { ...data }
      dubData.avatar = avatar
      dubData.username = values.username
      setData(dubData)
      // open next popup
      let dubShow = { ...show }
      dubShow.step1 = false;
      dubShow.step2 = true;
      setShowModel(dubShow)
      setAvatarAvailablity(true);
    }
    else {
      setAvatarAvailablity(false);
      toast({ title: "profile Image is required field", status: "error" })
    }
  };

  // function ClearField() {
  //   (document.getElementById('username') as HTMLInputElement).value = '';
  // }


  const usernameSuggest = (e: any) => {
    axios.get(`${baseUrl}/profile/username-availablity?username=${e.target.value}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken()
      }
    }).then((res) => {
      setUsernameAvailable(res.data.available)
      setUserNameError('')
      if (res.data.available == false) {
        setSuggestedUsername(res.data.suggestions);
      }
    }).catch((error) => {
      setUserNameError(error.response.data.errors.username[0]);
      setUsernameAvailable(null)


      // toast({ title: error.response.data.errors.username[0], status: "error" })
      
    })
  }



  return (

    <Form
      onSubmit={(e) => onSubmit(e)}
      validate={validate}
      render={({
        handleSubmit,
        form,
        errors,
        submitting,

        pristine,
        values
      }) => {
        return (
          <Box
            as="form"
            p={4}
            onSubmit={handleSubmit}
          >
            <InputControl
              name="username"
              label="User name"
              type="text"
              placeholder="Username"
            />

            {userNameError? <p style={{color:'red'}} className='text text-danger text-align-center'>{userNameError}</p>:''}

            <FormControl id="fname" >
              <FormLabel
                textAlign="center"
                color="#BDBDBD"
                marginTop={`${isMobile ? "65px" : ""}`}>
                Upload a profile picture</FormLabel>
              <Center>
                <Upload setAvatar={setAvatar} isAvatarAvailable={isAvatarAvailable} />
              </Center>
            </FormControl>


            <Button
              // isLoading={mutation.isLoading}
              isLoading={submitting}
              loadingText="Submitting"
              type="submit"
              width="full"
              mb="6"
              style={{ marginTop: '150px' }}
              colorScheme="orange" size="lg" fontSize="md"
              marginTop={isMobile ? "50px" : "20px"}
              isDisabled={usernameAvailable ? false :true }
             
            >
              Next
            </Button>
          </Box >

        )
      }}
    />


  )
}
