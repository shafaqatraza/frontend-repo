import React, { useState, useRef, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { accessToken, baseUrl, STRIPE_PUB_KEY_TEST, STRIPE_PUB_KEY_LIVE } from '../Helper/index'

import {
  Button,
  Box,
  Flex,
  Text,
  Spacer,
  Switch,
  NumberInput,
  NumberInputField,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  Radio,
  RadioGroup,
  Spinner,
  Stack
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/toast'
import NoImage from '../../assets/imgs/no-image.png'
import { isMobile } from 'react-device-detect'
const DonationForm = (props) => {
  const donationData = props.donationData;
  const [amount, setAmount] = useState(''); // Initial donation amount, you can set it to whatever you want
  const title = donationData.get('title');
  const slug = donationData.get('slug');
  const description = donationData.get('description');
  const thumbnail = donationData.get('thumbnail');
  const titleRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [donationThumbnail, setDonationThumbnail] = useState(NoImage.src)
  const toast = useToast()

  useEffect(() => {
    if(thumbnail){
      setDonationThumbnail(thumbnail)
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const floatValue = parseFloat(amount);
    if(floatValue < 0.50){
      toast({ title: 'The donation amount must be at least $0.50 CAD.', status: 'info', position: 'top' });
      return;
    }
    setIsLoading(true)
    const donationData = {
        title: title,
        description: description,
        slug: slug,
        thumbnail: thumbnail,
    };

    const params = new URLSearchParams(donationData);
    const queryParams = '?' + params.toString();

    try {
        // Call your backend to create a Checkout session
        const response = await fetch(`${baseUrl}/donate/initiate-stripe-checkout`, {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + accessToken(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount, title, slug, description, thumbnail, queryParams }),
        });

        if (!response.ok) {
            setIsLoading(false)
            // Handle non-successful response (HTTP status code other than 2xx)
            const errorResponse = await response.json();
            console.error('Failed to create Checkout session:', errorResponse.error);
            toast({ title: 'Sorry, something went wrong. Please try again later.', status: 'error', position: 'top' });
            return;
        }

        const session = await response.json();
        window.sessionStorage.setItem('stripe_checkout_session', session.sessionId);

        // Load Stripe.js and redirect to Checkout
        const stripe = await loadStripe(`${STRIPE_PUB_KEY_TEST}`);
        const { error } = await stripe.redirectToCheckout({
            sessionId: session.sessionId,
        });

        if (error) {
          setIsLoading(false)
          toast({ title: 'Sorry, something went wrong. Please try again later.', status: 'error', position: 'top' });
          console.error('Failed to redirect to Checkout:', error);
        }
    } catch (error) {
        setIsLoading(false)
        toast({ title: 'Sorry, something went wrong. Please try again later.', status: 'error', position: 'top' });
        console.error('An unexpected error occurred:', error);
    }
};

const isValidAmount = (value) => {
  // Regular expression to match numbers and decimals
  const regex = /^\d*\.?\d*$/;

  // Check if the value matches the regular expression
  if (!regex.test(value)) {
      return false;
  }

  // Check if the value is within the specified range
  return value <= 999999999999;
};
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
    
  //   const donationData = {
  //     title: title,
  //     description: description,
  //     slug: slug,
  //     thumbnail: thumbnail,
  //   };

  //   const params = new URLSearchParams(donationData);
  //   const queryParams = '?' + params.toString();

  //   try {
  //     // Call your backend to create a Checkout session
  //     const response = await fetch(`${baseUrl}/donate/create-checkout-session`, {
  //       method: 'POST',
  //       headers: {
  //         Authorization: "Bearer " + accessToken(),
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ amount, title, slug, description, thumbnail, queryParams }),
  //     });

  //     const session = await response.json();
  //     window.sessionStorage.setItem('stripe_checkout_session', session.sessionId);

  //     // Load Stripe.js and redirect to Checkout
  //     const stripe = await loadStripe('pk_test_51MzNd8HXctCE4qHqr1vcficqBBBYQp6cFwZxDFefUmKIx6C11wm0pHZCG52m4NYghl36riJi7TZZbZ1ACNg8vJAZ00XFHi92vG');
  //     const { error } = await stripe.redirectToCheckout({
  //       sessionId: session.sessionId,
  //     });

  //     if (error) {
  //       console.log(error);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  
  return (
    <div className='flex-container justify-content-center'>
      <form onSubmit={handleSubmit}>
        <Box
          bg="white"
          width={{ base: '100%', md: '450px' }} // Set a fixed width for the Box
          p={{ base: '6', md: '8' }}
          rounded={{ sm: 'lg' }}
          shadow={{ md: 'base' }}
          boxShadow={isMobile ? 'lg' : {}}
          mb="4"
          border={isMobile ? '0' : '1px'}
          borderColor="gray.200"
          borderRadius={isMobile ? '8px' : 0}
          className='mt-10 mb-10'
          >
            <Flex justifyContent="start" alignItems="center" >
                <Text fontSize={24}
                  pl="3"
                  fontWeight={500}>
                  {title}
                </Text>
            </Flex>
            <FormControl mt="8" id="name" isRequired>
              <Input
                autoComplete="fake"
                autoCorrect="off"
                spellCheck="false"
                id="customUnitAmount"
                name="customUnitAmount"
                type="text"
                inputMode="decimal"
                placeholder="CA$0.00"
                aria-invalid="false"
                aria-describedby=""
                data-1p-ignore="false"
                value={amount}
                // onChange={(e) => setAmount(e.target.value)}
                onChange={(e) => {
                    const inputValue = e.target.value;
                    // Check if the input value is valid
                    if (isValidAmount(inputValue)) {
                        // Update the state if the input is valid
                        setAmount(inputValue);
                    }
                }}
              />
            </FormControl>
            <FormControl mt="8" id="name">
              <FormHelperText pt="2" pb={'3'} mb="4">{description}</FormHelperText>
            </FormControl>
            <FormControl mt="3" id="donation-thumbnail">
            <img
                src={donationThumbnail}
                alt={title}
            /></FormControl>
            <Button
              width="100%"
              my="4"
              size="lg"
              // isDisabled={isLoading}
              onClick={handleSubmit}
              disabled={isLoading}
              colorScheme="orange"
            >
              <span id="button-text">
                {isLoading ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden"></span></div> : "Next"}
              </span>
            </Button>
        </Box>
      </form>
    </div>
  );
};

export default DonationForm;
