import React, { useState, useEffect } from 'react'
import {
  Text,
  Button,
  chakra,
  FormLabel,
  FormControl,
  Input,
  Textarea,
  Stack,
  useColorModeValue as mode,
  Spacer,
  FormErrorMessage
} from '@chakra-ui/react'

import axios from 'axios'
import { useToast } from '@chakra-ui/toast'
import { useMutation } from 'react-query'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import { baseUrl } from '../../../../config'
import { isMobile } from 'react-device-detect'

export const Step2Form = (props) => {
  let { setShowModel, show, data, setData } = props
  const toast = useToast()

  let accessToken = JSON.parse(localStorage.getItem('loggedInUser'))
  let promo = localStorage.getItem('promo')
  accessToken = accessToken.token
  const [newData, setNewData] = useState(data)
  const [location, setLocation] = useState([])
  const [latLng, setLatLng] = useState()
  const mutation = useMutation(
    (formData) => {
      if(promo){
        formData.append('promo_code', promo)
      }
      return axios.post(`${baseUrl}/profile/store`, formData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + accessToken
        }
      })
    },
    {
      onSuccess: (data) => {
        let tmpLoginData = JSON.parse(localStorage.getItem('loggedInUser'))
        // console.log("LmnopZq", data.data)
        tmpLoginData.user = data.data.data.user
        localStorage.setItem('loggedInUser', JSON.stringify(tmpLoginData))
        toast({
          title: data?.data?.message || 'profile info saved successfully',
          status: 'success'
        })
        let dubShow = { ...show }
        dubShow.step2 = false
        dubShow.welcomeScreen1 = true
        setShowModel(dubShow)
      },
      onError: (data) => {
        // let errors = data.response?.data.errors
        // if (errors?.username) {
        //   toast({ title: errors.username, status: 'error' })
        // }
        // if (errors?.email) {
        //   errors.email.map((sin) => {
        //     toast({ title: sin, status: 'error' })
        //   })
        // } else {
        //   data.response?.data?.message &&
        //     toast({
        //       title: data.response?.data?.message,
        //       status: 'error'
        //     })
        // }
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
  )
  const handleChange = (address) => {

    setLocation(address)
    let dubData = { ...data };
    dubData.location = address;
    setData(dubData);
    // this.setState({ address });
  }

  const handleSelect = (address2) => {
    setLocation(address2)
    let dubData = { ...data };
    dubData.location = address2;
    setData(dubData);
    geocodeByAddress(address2)
      .then((results) => getLatLng(results[0]))
      .then((ll) => {
        setLatLng(ll)
        // console.log("lulilolp", ll)
      }
      )
      .catch((error) => console.error('Error', error))
  }

  return (
    <chakra.form
      onSubmit={(e) => {
        e.preventDefault()
        var formData = new FormData()
        formData.append('username', data.username)
        formData.append('bio', data.bio)
        formData.append('location', data.location)
        formData.append('website_url', data.website_url)
        formData.append('avatar', data.avatar.file.originFileObj)
        formData.append('coordinates', latLng)
        mutation.mutate(formData)
      }}
      {...props}
    >
      <Stack spacing="6" className="create-profile-form">
        <FormControl mt="8" isRequired isInvalid={data.bio ? false : true}>
          <FormLabel>Bio</FormLabel>
          <Textarea
            variant="filled"
            rows={5}
            isInvalid={data.bio ? false : true}
            errorBorderColor="crimson"
            placeholder="Enter bio"
            type="text"
            fontWeight="500"
            maxLength={255}
            onChange={(e) => {
              let dubData = { ...data }
              dubData.bio = e.target.value
              setData(dubData)
            }}
          />
          {data.bio === '' && (
            <FormErrorMessage className="form-error-msg">
              Required field
            </FormErrorMessage>
          )}
        </FormControl>
        <Spacer />
        <Spacer />
        <FormControl isRequired isInvalid={data.bio ? false : true}>
          <FormLabel textAlign="left">Location</FormLabel>
          {/*  <Input
            variant="filled"
            name="location"
            errorBorderColor="crimson"
            type="text"
            fontWeight="500"
            autoComplete="name"
            placeholder="Enter your location"
            isInvalid={data.location ? false : true}
            onChange={(e) => {
              let dubData = { ...data };
              dubData.location = e.target.value;
              setData(dubData);
            }}
            // backgroundColor={mode('gray.50', 'whiteAlpha.900')}
            height={50}
          /> */}
          <PlacesAutocomplete
            value={location}
            onChange={(e) => handleChange(e)}
            onSelect={(e) => handleSelect(e)}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: isMobile ? '' : 'Search Places ...',
                    className: 'location-search-input'
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item'
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? {
                        backgroundColor: '#fafafa',
                        cursor: 'pointer'
                      }
                      : {
                        backgroundColor: '#ffffff',
                        cursor: 'pointer'
                      }
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          {data.location === '' && (
            <FormErrorMessage className="form-error-msg">
              Required field
            </FormErrorMessage>
          )}
        </FormControl>
        <Spacer />
        <Spacer />
        <FormControl>
          <FormLabel textAlign="left">Website URL (optional)</FormLabel>
          <Input
            variant="filled"
            name="webUrl"
            type="text"
            fontWeight="500"
            placeholder="Enter your website URL"
            onChange={(e) => {
              let dubData = { ...data }
              dubData.website_url = e.target.value
              setData(dubData)
            }}
            // backgroundColor={mode('gray.50', 'whiteAlpha.900')}
            height={50}
          />
        </FormControl>
        <Spacer />
        <Spacer />
        <Spacer />

        <Button
          isLoading={mutation.isLoading}
          type="submit"
          colorScheme="orange"
          size="lg"
          fontSize="md"
        >
          Create Profile
        </Button>

        <Spacer />
      </Stack>
    </chakra.form>
  )
}
