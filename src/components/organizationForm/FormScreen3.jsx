// components/organizationForm/FormScreen3.jsx
import React, { useState, useEffect } from 'react'
import { useOrganizationFormContext } from './organizationFormContext';
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
  FormErrorMessage,
  ModalHeader
} from '@chakra-ui/react'

import axios from 'axios'
import { useToast } from '@chakra-ui/toast'
import { useMutation } from 'react-query'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import { baseUrl, accessToken } from '../../components/Helper/index';
import { isMobile } from 'react-device-detect'

const FormScreen3 = () => {
    const { setCurrentStep, openModal, organizationSlug } = useOrganizationFormContext();
    const toast = useToast()
  
    const [about, setAbout] = React.useState()
    const [location, setLocation] = React.useState([])
    const [coordinates, setCoordinates] = React.useState(null)
    const [websiteUrl, setWebsiteUrl] = React.useState()
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [aboutError, setAboutError] = React.useState(false)
    const [locationError, setLocationError] = React.useState(false)
    
    
    const handleChange = (address) => {
        setLocation(address)
        setLocationError(false)
    }

    const handleSelect = (address2) => {
        setLocation(address2)
        setLocationError(false)
        geocodeByAddress(address2)
          .then((results) => getLatLng(results[0]))
          .then((latLng) => {
            const coordinatesString = `${latLng.lat},${latLng.lng}`;
            setCoordinates(coordinatesString)
          }
          )
          .catch((error) => console.log('Error', error))
    }

    const handleNext = async(e) => {
      
        e.preventDefault();

        if(!about){
            setAboutError(true)
            return;
        }
        if(!coordinates){
            setLocationError(true)
            return;
        }

        setIsSubmitting(true)
        const formData = new FormData();
        formData.append('about', about)
        formData.append('location', location)
        formData.append('website_url', websiteUrl)
        formData.append('coordinates', coordinates)
        
        try {
            const response = await fetch(`${baseUrl}/organizations/create-profile/${organizationSlug}`, {
                method: 'POST',
                headers: {
                Authorization: "Bearer " + accessToken(),
                },
                body: formData,
            });
        
            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Failed to create Organization:', errorResponse.error);
                toast({ title: 'Sorry, something went wrong. Please try again later.', status: 'error', position: 'top' });
                setIsSubmitting(false);
                return;
            }

            // const data = await response.json();
            setCurrentStep(4);
            openModal();
            toast({ title: 'Your organization has been successfully created!', status: 'success', position: 'top' });

        } catch (error) {
            setIsSubmitting(false)
            toast({ title: 'Sorry, something went wrong. Please try again later.', status: 'error', position: 'top' });
            console.error('An unexpected error occurred:', error);
        }

    };

    return (
        <>
        <ModalHeader textAlign="center" py={3}  fontSize="30px">
            Create Profile
        </ModalHeader>
        <chakra.form onSubmit={handleNext}>
            <Stack spacing="1.5" className="create-profile-form">
                <FormControl mt="8">
                <FormLabel>About Organization</FormLabel>
                    <Textarea
                        variant="filled"
                        rows={5}
                        errorBorderColor="crimson"
                        placeholder="Tell us about your organization"
                        type="text"
                        fontWeight="500"
                        maxLength={255}
                        onChange={(e) => { setAbout(e.target.value); setAboutError(false);
                        }}
                    />
                    {aboutError? <p style={{color:'red'}} className='align-center'>The organization's description is required.</p>:''}
                </FormControl>
                <Spacer />
                <Spacer />
                <FormControl isRequired>
                    <FormLabel textAlign="left">Location</FormLabel>
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
                                style={{height: '50px'}}
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
                    {locationError? <p style={{color:'red'}} className='error-msg'>The location field is required.</p>:''}
                </FormControl>
                <Spacer />
                <Spacer />
                <FormControl pb={5}>
                    <FormLabel textAlign="left">Website URL (optional)</FormLabel>
                    <Input
                        variant="filled"
                        name="webUrl"
                        type="text"
                        fontWeight="500"
                        placeholder="Enter your website URL"
                        onChange={(e) => { setWebsiteUrl(e.target.value) }}
                        backgroundColor={mode('gray.50', 'whiteAlpha.900')}
                        height={50}
                    />
                </FormControl>
                <Spacer />
                <Spacer />
                <Spacer />
                <Button type="submit" colorScheme="orange" size="lg" fontSize="md" disabled={isSubmitting}>
                    <span id="button-text">
                        {isSubmitting ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div> : "Create Profile"}
                    </span>
                </Button>
                <Spacer />
            </Stack>
        </chakra.form>
        </>
    );
};

export default FormScreen3;
