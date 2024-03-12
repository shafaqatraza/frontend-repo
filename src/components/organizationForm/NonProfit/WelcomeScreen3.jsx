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
      <ModalHeader textAlign="center" py={3} fontSize="30px">Connect you to volunteers or donors</ModalHeader>
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
        <Text fontSize={16} textAlign="justify" className='p-4'>
          Our platform will connect you with volunteers and 
          donors. In efforts to Improve your volunteer recruitment 
          and retention, we reward volunteers with exclusive 
          Deeds Dollars for every hour worked. <br /> <br />
          Increase foundation donations by connecting with users who want to donate and earn Deed Dollars. 
          For every $1 donated they will receive 1 Deed Dollar.
        </Text>
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
