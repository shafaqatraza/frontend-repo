import {
  Avatar,
  Box,
  Flex,
  Button,
  Spacer,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Divider,
  Textarea,
  VStack
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/toast'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import React, { useCallback, useState, useEffect } from 'react'
import { FieldGroup } from './FieldGroup'

import { isLogin, accessToken, baseUrl } from '../../components/Helper/index'
import Router from 'next/router'
import axios from 'axios'
import { Loader } from '../../components/Browse/Loader'
import useValidator from '../../components/Helper/useValidator'
import Upload from './uploadFile'
import { useMutation } from 'react-query'
import { isMobile } from 'react-device-detect'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const EditProfileForm = (props) => {
  const toast = useToast()
  const [validator, showValidationMessage] = useValidator()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)

  const [userName, setUserName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [profileData, setProfileData] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [website, setWebsite] = useState('')
  const [avtarUrl, setAvtarUrl] = useState('')
  const [avatar, setAvatar] = useState('')


  const getProfileDetails = useCallback(async () => {
    setIsLoading(true)
    const data = await axios.get(`${baseUrl}/user/info`, {
      headers: {
        Authorization: 'Bearer ' + accessToken()
      }
    })
    if (data.status === 200) {
      setIsLoading(false)

      let pd = data.data.data
      setProfileData(pd)
      setUserName(pd.user_profile.username || '')
      setFirstName(pd.first_name || '')
      setLastName(pd.last_name || '')
      setPhoneNumber(pd.phone_number || '')
      setEmail(pd.email || '')
      setAvtarUrl(pd.avatar || '')
      setBio(pd.user_profile.bio || '')
      setLocation(
        pd.user_profile.location !== null ? pd.user_profile.location : ''
      )
      setWebsite(pd.user_profile.website_url || '')
    }
  }, [])

  useEffect(() => {
    if (!isLogin()) {
      Router.push({ pathname: '/' })
    } else {
      getProfileDetails()
    }
  }, [])

  function removeEmptyFields(data) {
    Object.keys(data).forEach(key => {
      if (data[key] === '' || data[key] == null) {
        delete data[key];
      }
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validator.allValid()) {
      var formData = new FormData()
      formData.append('username', userName)
      formData.append('first_name', firstName)
      formData.append('last_name', lastName)
      formData.append('phone_number', `+${phoneNumber}`)
      if (Object.keys(oldPassword).length > 0) {
        formData.append('old_password', oldPassword)
      }
      if (Object.keys(password).length > 0) {
        formData.append('password', password)
      }
      formData.append('email', email)
      formData.append('bio', bio)
      formData.append('location', location)
      formData.append('verified_email', true)
      formData.append('website_url', website)
      formData.append('avatar', avatar)

      // if (Object.keys(avatar).length > 0) {  
      //   formData.append('avatar', avatar)
      // }
      mutation.mutate(formData)
    } else {
      showValidationMessage(true)
    }
  }

  const mutation = useMutation(
    (formData) => {
  
      setIsSubmitLoading(true)
      return axios.post(`${baseUrl}/profile/update`, formData, {
        headers: {
          Authorization: 'Bearer ' + accessToken(),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    },
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          toast({
            title: 'Profile Updated Successfully',
            status: 'success'
          })
          setIsSubmitLoading(false)
          let tmpLoginData = JSON.parse(localStorage.getItem('loggedInUser'))
          tmpLoginData.user = data.data.data.user
          localStorage.setItem('loggedInUser', JSON.stringify(tmpLoginData))
          Router.push({ pathname: '/profile' })
        }
      },
      onError: (data) => {
        setIsSubmitLoading(false)
        if (data.response?.data?.errors?.username) {
          toast({
            title: data.response?.data?.errors?.username[0],
            status: 'error'
          })
        } else {
          data.response?.data?.errors != undefined && data.response?.data?.errors != ""
            ?
            Object.keys(data.response?.data?.errors).map((keyName, i) => (
              typeof data.response?.data?.errors[keyName] == "object" ?
                toast({
                  title: data.response?.data?.errors[keyName],
                  status: 'error'
                })
                :
                toast({
                  title: data.response?.data?.errors[keyName][0],
                  status: 'error'
                })
            ))
            :
            data.response?.data?.message &&
            toast({
              title: data.response?.data?.message,
              status: 'error'
            })
        }
      }
    }
  )

  return (
    <Box px={{ base: '4', md: '10' }} py="16" maxWidth="xl" mx="auto">
      {isLoading && <Loader h={300} />}
      {!isLoading && (
        <Stack spacing="4">
          <Flex justifyContent="space-between">
            <ChevronLeftIcon
              cursor="pointer"
              onClick={() => Router.push({ pathname: '/profile' })}
              w={8}
              h={8}
              color=""
            />
            <Heading size="lg" as="h1" textAlign="center" paddingBottom="4">
              Edit Profile
            </Heading>
            <div></div>
          </Flex>

          <Divider />
          <Spacer />
          <FieldGroup
            display="flex"
            justifyContent="space-between"
            style={isMobile ? { flexDirection: 'row' } : null}
          >
            <Box textAlign="center">
              <FormLabel textAlign="center" color={'#BDBDBD'}>
                Profile Photo
              </FormLabel>
              <Upload
                setAvatar={setAvatar}
                avtarUrl={avtarUrl}
                fullName={profileData.full_name}
              />
            </Box>
            <VStack width="100%" spacing="6">
              <FormControl id="name" isRequired>
                <FormLabel color={isMobile ? '#BDBDBD' : ''}>
                  {/* {isMobile ? 'Username' : 'Name'} */}
                  Username
                </FormLabel>
                <Input
                  style={isMobile ? { backgroundColor: '#F6F6F6' } : {}}
                  type="text"
                  maxLength={255}
                  name="username"
                  defaultValue={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                {validator.message('username', userName, 'required', {
                  messages: {
                    required: 'This is a required field'
                  }
                })}
              </FormControl>
              <FormControl id="first_name" isRequired>
                <FormLabel color={isMobile ? '#BDBDBD' : ''}>
                  {/* {isMobile ? 'Username' : 'Name'} */}
                  First Name
                </FormLabel>
                <Input
                  style={isMobile ? { backgroundColor: '#F6F6F6' } : {}}
                  type="text"
                  maxLength={255}
                  name="first_name"
                  defaultValue={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {validator.message('first_name', firstName, 'required', {
                  messages: {
                    required: 'This is a required field'
                  }
                })}
              </FormControl>
              <FormControl id="last_name" isRequired>
                <FormLabel color={isMobile ? '#BDBDBD' : ''}>
                  {/* {isMobile ? 'Username' : 'Name'} */}
                  Last Name
                </FormLabel>
                <Input
                  style={isMobile ? { backgroundColor: '#F6F6F6' } : {}}
                  type="text"
                  maxLength={255}
                  name="last_name"
                  defaultValue={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {validator.message('last_name', lastName, 'required', {
                  messages: {
                    required: 'This is a required field'
                  }
                })}
              </FormControl>


            </VStack>
          </FieldGroup>
          <FieldGroup>
            <FormControl id="phone_number" isRequired>
              <FormLabel color={isMobile ? '#BDBDBD' : ''}>
                {/* {isMobile ? 'Username' : 'Name'} */}
                Phone Number
              </FormLabel>
              <PhoneInput
                containerClass='css-1c6j008'
                inputClass='country-dropdown'
                name="phone_number"
                value={phoneNumber}
                country={'ca'}
                onChange={setPhoneNumber} />
              {/* <Input
                style={isMobile ? { backgroundColor: '#F6F6F6' } : {}}
                type="number"
                maxLength={255}
                name="phone_number"
                defaultValue={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              /> */}
              {validator.message('phone_number', phoneNumber, 'required', {
                messages: {
                  required: 'This is a required field'
                }
              })}
            </FormControl>
          </FieldGroup>
          <FieldGroup>
            <FormControl id="email" isRequired>
              <FormLabel color={isMobile ? '#BDBDBD' : ''}>
                {/* {isMobile ? 'Username' : 'Name'} */}
                Email
              </FormLabel>
              <Input
                style={isMobile ? { backgroundColor: '#F6F6F6' } : {}}
                type="text"
                maxLength={255}
                name="email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {validator.message('phone_number', email, 'required', {
                messages: {
                  required: 'This is a required field'
                }
              })}
            </FormControl>
          </FieldGroup>
          <FieldGroup>
            <FormControl id="bio" isRequired>
              <FormLabel>Bio</FormLabel>
              <Textarea
                rows={5}
                name={'bio'}
                style={isMobile ? { backgroundColor: '#F6F6F6' } : {}}
                defaultValue={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <FormHelperText textAlign={'right'}>
                {bio.length}/255
                {/* Brief description for your profile. URLs are hyperlinked. */}
              </FormHelperText>
              {validator.message('bio', bio, 'required|max:255', {
                messages: {
                  required: 'This is a required field',
                  max: 'Maximum 255 characters allowed'
                }
              })}
            </FormControl>
          </FieldGroup>
          <FieldGroup>
            <FormControl id="location" isRequired>
              <FormLabel color={isMobile ? '#BDBDBD' : ''}>Location</FormLabel>
              <Input
                style={isMobile ? { backgroundColor: '#F6F6F6' } : {}}
                type="text"
                maxLength={255}
                name="location"
                onChange={(e) => setLocation(e.target.value)}
                defaultValue={location}
              />
              {validator.message('location', location, 'required', {
                messages: {
                  required: 'This is a required field'
                }
              })}
            </FormControl>
          </FieldGroup>
          <FieldGroup>
            <FormControl id="website">
              <FormLabel color={isMobile ? '#BDBDBD' : ''}>
                Website URL (optional)
              </FormLabel>
              <Input
                style={isMobile ? { backgroundColor: '#F6F6F6' } : {}}
                type="text"
                maxLength={255}
                defaultValue={website}
                name={website}
                onChange={(e) => setWebsite(e.target.value)}
              />

            </FormControl>
          </FieldGroup>
          <FieldGroup>
            <FormControl id="old_password">
              <FormLabel color={isMobile ? '#BDBDBD' : ''}>Old Password</FormLabel>
              <Input
                style={isMobile ? { backgroundColor: '#F6F6F6' } : {}}
                type="text"
                maxLength={255}
                name="old_password"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </FormControl>
          </FieldGroup>
          <FieldGroup>
            <FormControl id="password" >
              <FormLabel color={isMobile ? '#BDBDBD' : ''}>New Password</FormLabel>
              <Input
                style={isMobile ? { backgroundColor: '#F6F6F6' } : {}}
                type="text"
                maxLength={255}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </FieldGroup>
          <Spacer />
          <Spacer />

          <Button
            type="submit"
            colorScheme="orange"
            isDisabled={isSubmitLoading}
            onClick={handleSubmit}
            isLoading={isSubmitLoading ? true : false}
            loadingText="Profile Updating"
          >
            Update Profile
          </Button>
          <Spacer />
          <Spacer />
          <Spacer />
        </Stack>
      )}
    </Box>
  )
}

export default EditProfileForm
