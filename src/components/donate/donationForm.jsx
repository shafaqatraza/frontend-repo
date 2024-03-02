import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { accessToken, baseUrl, STRIPE_PUB_KEY_TEST, STRIPE_PUB_KEY_LIVE } from '../Helper/index'
import {
  Box,
  Flex,
  Text,
  Button,
  RadioGroup, 
  Radio,
  Input 
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/toast'
import NoImage from '../../assets/imgs/no-image.png'
import { isMobile } from 'react-device-detect'
const DonationForm = forwardRef(({ donationData, onDonate }, ref) => {
  const title = donationData.title;
  const slug = donationData.slug;
  const description = donationData.description;
  const thumbnail = donationData.thumbnail;
  const toast = useToast()
  const [donationAmount, setDonationAmount] = useState(0);
  const [donationType, setDonationType] = useState("oneTime");
  

  const handleSubmit = async () => {
    
    onDonate(true)
    const floatValue = parseFloat(donationAmount);
    
    if(floatValue < 0.50 || isNaN(floatValue)){
      toast({ title: 'The donation amount must be at least $0.50 CAD.', status: 'info', position: 'top' });
      onDonate(false)
      return;
    }

    try {
        // Call your backend to create a Checkout session
        const response = await fetch(`${baseUrl}/donate/initiate-stripe-checkout`, {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + accessToken(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({donationType, donationAmount, title, slug, description, thumbnail }),
        });

        if (!response.ok) {
            onDonate(false)
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
          onDonate(false)
          toast({ title: 'Sorry, something went wrong. Please try again later.', status: 'error', position: 'top' });
          console.error('Failed to redirect to Checkout:', error);
        }
    } catch (error) {
        onDonate(false)
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

  const handleAmountButtonClick = (value) => {
    setDonationAmount(value);
  };
  

  const handleRadioChange = (type) => {
    setDonationType(type);
  };
  

  // Expose the handleSubmit function via the ref
  React.useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

return (
    <Flex direction="column" justifyContent={"space-between"} mt={3}>
      <Text
        fontSize={"20px"}
        fontWeight={600}
        color={"#000000"}
        textTransform="capitalize"
      >
      Monthly or One-Time Donation
      </Text>
      <RadioGroup defaultValue="oneTime" mt={3}>
        <Box mb={2}>
          <Radio value="oneTime" size="lg" colorScheme="teal"
            isChecked={donationType == 'oneTime'? true : false}
            onChange={() => handleRadioChange('oneTime')}
            style={{
              backgroundColor: donationType === 'oneTime' ? '#e27832' : 'transparent',
              borderColor: donationType === 'oneTime' ? '#e27832' : 'transparent',
            }}
          >
            One-Time
          </Radio>
        </Box>
        <Box mb={2}>
          <Radio value="monthly" size="lg" colorScheme="teal" 
            isChecked={donationType == 'monthly'? true : false}
            onChange={() => handleRadioChange('monthly')}
            style={{
              backgroundColor: donationType === 'monthly' ? '#e27832' : 'transparent',
              borderColor: donationType === 'monthly' ? '#e27832' : 'transparent',
            }}
          >
            Monthly
          </Radio>
        </Box>
      </RadioGroup>
      <Text
        fontSize={"20px"}
        fontWeight={600}
        color={"#000000"}
        textTransform="capitalize"
      >
        Donation Amount
      </Text>
      <Flex direction="column" alignItems="">
        <Flex mb={5} mt={3}>
          <Button
            class="donation-amount-btn donation-btn"
            onClick={() => handleAmountButtonClick(10)}
            marginRight={3}
          >
            $10
          </Button>

          <Button
            class="donation-amount-btn donation-btn"
            onClick={() => handleAmountButtonClick(25)}
            
          >
            $25
          </Button>

          <Button
            class="donation-amount-btn"
            onClick={() => handleAmountButtonClick(50)}
          >
            $50
          </Button>
        </Flex>
        <Flex>
          <Button
            class="donation-amount-btn donation-btn"
            onClick={() => handleAmountButtonClick(75)}
          >
            $75
          </Button>

          <Button
            class="donation-amount-btn donation-btn"
            onClick={() => handleAmountButtonClick(100)}
          >
            $100
          </Button>

          <Button
            class="donation-amount-btn"
            onClick={() => handleAmountButtonClick(150)}
          >
            $150
          </Button>
        </Flex>
      </Flex>
      <Flex alignItems="flex-start" flexDirection="column" mt={5}>
        <Text fontSize={"18px"} fontWeight={600} color={"#000000"} textTransform="capitalize">
          Custom Amount
        </Text>
        <Input
          type="number"
          placeholder="Custom amount"
          borderRadius="10px"
          border="1px solid #183553"
          width={"150px"}
          value={donationAmount}
          onChange={(e) => {
            const inputValue = e.target.value;
            // Check if the input value is valid
            if (isValidAmount(inputValue)) {
                // Update the state if the input is valid
                setDonationAmount(inputValue);
            }
          }}
          p="10px"
          mt="2"
        />
      </Flex>
    </Flex>
  );
});

export default DonationForm;
