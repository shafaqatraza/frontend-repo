// components/organizationForm/FormScreen1.jsx
import React, { useState, useEffect } from 'react';
import { useOrganizationFormContext } from './organizationFormContext';
import { accessToken, baseUrl} from '../Helper/index'
import {
    Button,
    chakra,
    FormControl,
    Input,
    Stack,
    useColorModeValue as mode,
    ModalHeader,
    RadioGroup, 
    Box,
    Radio,
    Spacer
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/toast'
import PhoneInput from "react-phone-input-2";


const FormScreen1 = () => {
    const { setCurrentStep, openModal, setOrgType, setOrganizationSlug } = useOrganizationFormContext();
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast()
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [organizationTypes, setOrganizationTypes] = React.useState();
    const [organizationNameError, setOrganizationNameError] = React.useState();
    const [workEmailError, setWorkEmailError] = React.useState();
    const [phoneNumberError, setPhoneNumberError] = React.useState();
    const [registrationNumberError, setRegistrationNumberError] = React.useState();
    

    const [formData, setFormData] = React.useState({
        organization_name: "",
        work_email: "",
        phone_number: "",
        organization_type: 1,
        charity_registration_number: "",
    });

    useEffect(() => {
        const fetchOrganizationTypes = async () => {     
            const response = await fetch(`${baseUrl}/organization-types`, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + accessToken(),
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Failed to create Checkout session:', errorResponse.error);
                return;
            }
    
            const data = await response.json();
            setOrganizationTypes(data.data)
        }

        fetchOrganizationTypes()
    }, []);

    const handleCharityRegistrationNumberChange = (e) => {
        const inputValue = e.target.value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            charity_registration_number: inputValue,
        }));
        setRegistrationNumberError('')
    };

    const handlePhoneNumber = (number) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            phone_number: number,
        }));
        setPhoneNumberError('')
    };
    
    const handleRadioChange = (selectedType) => {
        setOrgType(selectedType)
        setFormData({
          ...formData,
          organization_type: selectedType,
        });
    };
 
    const handleNext = async(e) => {
        
        e.preventDefault();

        if(!formData.organization_name){ 
            setOrganizationNameError('The organization name is required.')
            return;
        }

        if(!formData.work_email){ 
            setWorkEmailError('The work email is required.')
            return;
        }

        if(!formData.phone_number){ 
            setPhoneNumberError('The phone number is required.')
            return;
        }
console.log('type', formData.organization_type)
        if(!formData.charity_registration_number && formData.organization_type === 1 || !formData.charity_registration_number && formData.organization_type === 2){ 
            setRegistrationNumberError('The charitys registration number is required.')
            return;
        }
        
        setIsSubmitting(true);
        const form = new FormData();
        form.append("organization_name", formData.organization_name);
        form.append("work_email", formData.work_email);
        form.append("phone_number", formData.phone_number);
        form.append("organization_type", formData.organization_type);
        form.append("charitys_registration_number", formData.charity_registration_number);

        try {
            const response = await fetch(`${baseUrl}/organizations`, {
                method: 'POST',
                body: form,
                headers: {
                    'Authorization': 'Bearer ' + accessToken(),
                },
            });
    
            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Failed to create Organization:', errorResponse.error);
                toast({ title: 'Sorry, something went wrong. Please try again later.', status: 'error', position: 'top' });
                setIsSubmitting(false);
                return;
            }

            const data = await response.json();
            setOrganizationSlug(data.slug)
            setCurrentStep(2);
            openModal();
    
        } catch (error) {
            setIsSubmitting(false);
            toast({ title: 'Sorry, something went wrong. Please try again later.', status: 'error', position: 'top' });
            console.error('An unexpected error occurred:', error);
        }

    };

    return (
        <>
            <ModalHeader textAlign="center" py={3} fontSize="30px">Create Organization</ModalHeader>
            <chakra.form>
                <Stack spacing="6">
                    <FormControl id="organization_name">
                        <Input
                            name="organization_name"
                            type="text"
                            autoComplete="organization_name"
                            required
                            placeholder="Organization Name"
                            value={ formData.organization_name }
                            onChange={(e) => {
                                let prevFormData = { ...formData };
                                prevFormData.organization_name = e.target.value;
                                setOrganizationNameError('')
                                setFormData(prevFormData);
                            }}
                            backgroundColor={mode("gray.50", "whiteAlpha.900")}
                            height={50}
                        />
                        {organizationNameError? <p style={{color:'red'}} className='text text-danger text-align-center'>{organizationNameError}</p>:''}
                    </FormControl>
                    <FormControl id="work_email">
                        <Input
                            name="work_email"
                            type="email"
                            autoComplete="work_email"
                            required
                            placeholder="Work Email"
                            value={ formData.work_email }
                            onChange={(e) => {
                                let prevFormData = { ...formData };
                                prevFormData.work_email = e.target.value;
                                setWorkEmailError('')
                                setFormData(prevFormData);
                            }}
                            backgroundColor={mode("gray.50", "whiteAlpha.900")}
                            height={50}
                        />
                        {workEmailError? <p style={{color:'red'}} className='text text-danger text-align-center'>{workEmailError}</p>:''}
                    </FormControl>
                    <FormControl id="phone_number">
                        <PhoneInput
                            containerClass="css-1t1ao6j"
                            inputClass="country-dropdown"
                            name="phone_number"
                            value={ formData.phone_number }
                            country={"ca"}
                            onChange={handlePhoneNumber}
                        />
                        {phoneNumberError? <p style={{color:'red'}} className='text text-danger text-align-center'>{phoneNumberError}</p>:''}
                    </FormControl>
                    <RadioGroup mt={3}>
                        <Box mb={2}>
                            <Radio
                                value="1"
                                size="lg"
                                colorScheme="teal"
                                isChecked={formData.organization_type === 1}
                                onChange={() => handleRadioChange(1)}
                                style={{
                                    backgroundColor: formData.organization_type === 1 ? '#e27832' : 'transparent',
                                    borderColor: formData.organization_type === 1 ? '#e27832' : '',
                                }}
                            >
                                Charity Organization
                            </Radio>
                        </Box>
                        <Box mb={2}>
                            <Radio
                                value="2"
                                size="lg"
                                colorScheme="teal"
                                isChecked={formData.organization_type === 2}
                                onChange={() => handleRadioChange(2)}
                                style={{
                                    backgroundColor: formData.organization_type === 2 ? '#e27832' : 'transparent',
                                    borderColor: formData.organization_type === 2 ? '#e27832' : '',
                                }}
                            >
                                Non-Profit Organization
                            </Radio>
                        </Box>
                        <Box mb={2}>
                            <Radio
                                value="3"
                                size="lg"
                                colorScheme="teal"
                                isChecked={formData.organization_type === 3}
                                onChange={() => handleRadioChange(3)}
                                style={{
                                    backgroundColor: formData.organization_type === 3 ? '#e27832' : 'transparent',
                                    borderColor: formData.organization_type === 3 ? '#e27832' : '',
                                }}
                            >
                                For-Profit Organization
                            </Radio>
                        </Box>
                    </RadioGroup>
                    {(formData.organization_type == 1 || formData.organization_type == 2) && (
                        <FormControl id="charity_registration_number">
                            <Input
                                name="charity Registration Number"
                                type="text"
                                required
                                placeholder="Charity's Registration Number"
                                value={formData.charity_registration_number}
                                onChange={handleCharityRegistrationNumberChange}
                                backgroundColor={mode("gray.50", "whiteAlpha.900")}
                                height={50}
                            />
                            {registrationNumberError? <p style={{color:'red'}} className='text text-danger text-align-center'>{registrationNumberError}</p>:''}
                        </FormControl>
                    )}

                    <Spacer />
                    <Button
                        type="submit"
                        colorScheme="orange"
                        size="lg"
                        fontSize="md"
                        disabled={isLoading}
                        onClick={handleNext}
                        disabled={isSubmitting}
                    >
                        <span id="button-text">
                            {isSubmitting ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div> : "Create Account"}
                        </span>
                    </Button>
                </Stack>
            </chakra.form>
        </>
    );
};

export default FormScreen1;
