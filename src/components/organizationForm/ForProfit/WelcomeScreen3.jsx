// components/organizationForm/WelcomeScreen3.jsx
import React from 'react';
import { useOrganizationFormContext } from '../organizationFormContext';
import exchangepegiun from '../../../assets/imgs/exchangepegiun.png'
import { useRouter } from 'next/router'
import {
  Text,
  Button,
  Image,
  Stack,
  ModalHeader,
  Spacer,
  Center,
} from '@chakra-ui/react'

const WelcomeScreen3 = () => {
  const { setCurrentStep, openModal, closeModal } = useOrganizationFormContext();
  const router = useRouter()

  const handleNext = () => {
    setCurrentStep(1);
    closeModal(); 
    router.push('/profile');
  };

  return (
    <>
      <ModalHeader textAlign="center" py={3} fontSize="30px">Connect to volunteers</ModalHeader>
      <Stack spacing="6">
        <Center>
          <Image
              className="resp-img"
              src={exchangepegiun.src}
              alt={"img"}
              draggable="false"
          />
        </Center>
        <Spacer />
        <Text fontSize={16} textAlign="justify" className='m-4'>
            Our platform will connect you with active volunteers. In
            efforts to Improve your volunteer recruitment and
            retention, we reward volunteers with exclusive Deeds 
            Dollars for every hour worked.
        </Text>
        <Spacer />
        <Button
            colorScheme="orange" size="lg" fontSize="md"
            onClick={handleNext}
        >
           Next
        </Button>
        <Text
          textAlign="center"
          cursor="pointer"
          ml={2} color="primary.300" fontWeight="semibold"
          onClick={closeModal}
          >
          Skip
        </Text>
      </Stack>
    </>
  );
};

export default WelcomeScreen3;
