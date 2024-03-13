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
        organization_type: 1,  // Set the default value to 1
        charity_registration_number: "",
    });

    // useEffect(() => {
    //     const fetchOrganizationTypes = async () => {     
    //         const response = await fetch(`${baseUrl}/organization-types`, {
    //             method: 'GET',
    //             headers: {
    //                 Authorization: "Bearer " + accessToken(),
    //                 'Content-Type': 'application/json',
    //             }
    //         });

    //         if (!response.ok) {
    //             const errorResponse = await response.json();
    //             console.error('Failed to create Checkout session:', errorResponse.error);
    //             return;
    //         }
    
    //         const data = await response.json();
    //         setOrganizationTypes(data.data)
    //     }

    //     fetchOrganizationTypes()
    // }, []);

    const isNumeric = (str) => {
        return !isNaN(str);
    };

    const handleCharityRegistrationNumberChange = (e) => {
        const inputValue = e.target.value;
        const lastChar = inputValue.charAt(inputValue.length - 1);
        const containsInvalidChars = inputValue.match(/[^0-9rR]/g) !== null;

        if(containsInvalidChars){
            return;
        }

        if (inputValue.length <= 9 && isNumeric(inputValue)) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                charity_registration_number: inputValue,
            }));
        } else if ((inputValue.length === 10 || inputValue.length === 11) && lastChar.toUpperCase() === 'R') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                charity_registration_number: inputValue.toUpperCase(),
            }));
        } else if (inputValue.length >= 12 && inputValue.length <= 15 && isNumeric(lastChar)) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                charity_registration_number: inputValue.toUpperCase(),
            }));
        }

        setRegistrationNumberError('');
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

        if(selectedType == 3){
            setFormData((prevFormData) => ({
                ...prevFormData,
                charity_registration_number: "",
            }));
            setRegistrationNumberError('');
        }
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

        const charityNum = formData.charity_registration_number; 

        if(!charityNum && formData.organization_type === 1 || !charityNum && formData.organization_type === 2){ 
            setRegistrationNumberError('Charity registration number is mandatory.')
            return;
        }

        if((formData.organization_type === 1 || formData.organization_type === 2) && charityNum.length < 15){
            setRegistrationNumberError('Invalid charity registration number.')
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
                            type="email"
                            name="work_email"
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
                    <RadioGroup defaultValue="1" mt={3}>
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
                            <p>Valid Format: (123456789RR1234)</p>
                            {registrationNumberError? <p style={{color:'red'}} className='text text-danger text-align-center'>{registrationNumberError}</p>:''}
                        </FormControl>
                    )}

                    <Spacer />
                    <Button
                        type="submit"
                        colorScheme="orange"
                        size="lg"
                        fontSize="md"
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
