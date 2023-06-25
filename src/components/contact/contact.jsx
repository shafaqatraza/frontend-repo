import {
    Text,
    Flex,
    Box,
    Skeleton,
    useBreakpointValue,
    Image,
    Center,
    Spinner,
    Container,
    SimpleGrid,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    FormErrorMessage
} from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import { baseImgUrl, accessToken } from "../../components/Helper/index";
import { isMobile } from "react-device-detect";
import { baseUrl } from '../../../config'
import axios from 'axios'
import { useToast } from '@chakra-ui/toast'
import { eventNames } from "process";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useMediaQuery } from '@chakra-ui/react'

const Contact = (props) => {

    // const router = useRouter();
    const toast = useToast()
    const token = accessToken();
    const [isSmallerThan767] = useMediaQuery('(max-width: 767px)')

    const [isLoading, setIsLoading] = useState(false)

    const [contactForm, setContactForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        message: ''
    })
    const [phone, setPhone] = useState()

    const handleSubmit = async (event) => {

        // event.preventDefault();
        if (contactForm.first_name == '') {
            toast({
                title: 'First name is required.',
                status: 'error'
            })
        } else if (contactForm.last_name == '') {
            toast({
                title: 'Last name is required.',
                status: 'error'
            })
        } else if (contactForm.email == '') {
            toast({
                title: 'Email is required.',
                status: 'error'
            })
        } else if (phone == '') {
            toast({
                title: 'Phone is required.',
                status: 'error'
            })
        } else if (contactForm.message == '') {
            toast({
                title: 'Message is required.',
                status: 'error'
            })
        } else {
            setIsLoading(true)
            contactForm.phone = `+${phone}`;
            await axios.post(`${baseUrl}/contact-us`, contactForm, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: 'Bearer ' + token
                }
            }).then(res => {
                setIsLoading(false)
                toast({
                    title: res?.message || 'Contact form submitted succesfully.',
                    status: 'success'
                })
                setContactForm({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    message: ''
                })
                createCaptcha();
            }).catch(err => {
                setIsLoading(false)
            })
        }

    };

    var code;
    function createCaptcha() {
        //clear the contents of captcha div first
        document.getElementById('captcha').innerHTML = "";
        var charsArray =
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
        var lengthOtp = 6;
        var captcha = [];
        for (var i = 0; i < lengthOtp; i++) {
            //below code will not allow Repetition of Characters
            var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
            if (captcha.indexOf(charsArray[index]) == -1)
                captcha.push(charsArray[index]);
            else i--;
        }
        var canv = document.createElement("canvas");
        canv.id = "captcha";
        canv.width = 100;
        canv.height = 50;
        var ctx = canv.getContext("2d");
        ctx.font = "25px Georgia";
        ctx.strokeText(captcha.join(""), 0, 30);
        //storing captcha so that can validate you can save it somewhere else according to your specific requirements
        code = captcha.join("");
        document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
    }
    function validateCaptcha() {
        // event.preventDefault();
        // debugger
        if (document.getElementById("cpatchaTextBox").value == code) {
            handleSubmit();
        } else if (document.getElementById("cpatchaTextBox").value == '') {
            toast({
                title: 'Please enter the above code',
                status: 'error'
            })
        } else {
            toast({
                title: 'Invalid Captcha. Try Again',
                status: 'error'
            })
            createCaptcha();
        }
    }

    useEffect(() => {
        createCaptcha();
    }, [])


    return (

        <Container
            // as={SimpleGrid}
            maxW="7xl"
            mx="auto"
            columns={{ base: 1 }}
            spacing={{ base: 8, lg: 8, md: 8 }}
            mb={{ lg: 4 }}
            mt={10}
        >
            <Flex justifyContent={"center"}>
                <Box
                    width={'673px'}
                    maxW={'100%'}
                    borderRadius={'20px'}
                    boxShadow={'0px 1px 4px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.02), 0px 1px 12px rgba(0, 0, 0, 0.12)'}
                    p={isSmallerThan767 ? '30px 15px' : '30px 100px'}
                >
                    {/* <Text textAlign="center" fontSize="28px">Contact Us</Text> */}
                    <SimpleGrid columns={1} spacing={isMobile ? 0 : 10}>
                        <FormControl id="name" isRequired >
                            <FormLabel color="gray.500">First Name</FormLabel>
                            <Input variant="filled" placeholder="First Name" value={contactForm.first_name} onChange={event => setContactForm({ ...contactForm, first_name: event.currentTarget.value })} name="first_name" type="text" maxLength={50} />
                        </FormControl>

                        <FormControl id="name" isRequired>
                            <FormLabel color="gray.500">Last Name</FormLabel>
                            <Input variant="filled" placeholder="Last Name" value={contactForm.last_name} onChange={event => setContactForm({ ...contactForm, last_name: event.currentTarget.value })} name="last_name" type="text" maxLength={50} />
                        </FormControl>
                    </SimpleGrid>

                    <SimpleGrid columns={1} spacing={2}>
                        <FormControl mt="8" id="name" isRequired>
                            <FormLabel color="gray.500">Email</FormLabel>
                            <Input variant="filled" placeholder="Email" value={contactForm.email} onChange={event => setContactForm({ ...contactForm, email: event.currentTarget.value })} name="email" type="email" maxLength={50} />
                        </FormControl>

                        <FormControl mt="8" id="name" isRequired>
                            <FormLabel color="gray.500">Phone Number</FormLabel>
                            <PhoneInput
                                containerClass="css-1pwkzcn"
                                inputClass='country-dropdown'
                                // international
                                country={'ca'}
                                value={contactForm.phone}
                                onChange={setPhone} />
                            {/* <Input variant="filled" placeholder="Phone Number" value={contactForm.phone} onChange={event => setContactForm({ ...contactForm, phone: event.currentTarget.value })} name="phone" type="number" maxLength={50} /> */}
                        </FormControl>
                    </SimpleGrid>

                    <FormControl mt="8" id="description" isRequired>
                        <FormLabel color="gray.500">Message</FormLabel>
                        <Textarea variant="filled" rows={5} name="Message" value={contactForm.message} onChange={event => setContactForm({ ...contactForm, message: event.currentTarget.value })} placeholder="message" type="text" maxLength={1000} />
                    </FormControl>

                    <SimpleGrid columns={1} spacing={10}>
                        <FormControl mt="8" id="captcha" isRequired>
                            <FormLabel color="gray.500">Security Check (CAPTCHA)</FormLabel>
                            <div id="captcha"> </div>
                            <Text onClick={createCaptcha} style={{ cursor: 'pointer', textAlign: 'right' }}>Change text</Text>
                            <Input variant="filled" placeholder="Enter Captcha" name="captcha" type="text" id="cpatchaTextBox" />
                        </FormControl>
                    </SimpleGrid>

                    <Button
                        width="100%"
                        mt="10"
                        size="md"
                        isDisabled={isLoading}
                        onClick={validateCaptcha}
                        colorScheme="orange"
                    >
                        Submit
                    </Button>

                </Box>
            </Flex>

        </Container>


    )

};

export default Contact;
