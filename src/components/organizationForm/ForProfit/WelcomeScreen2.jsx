// components/organizationForm/WelcomeScreen2.jsx
import React from 'react';
import { useOrganizationFormContext } from '../organizationFormContext';
import explorepegiun from '../../../assets/imgs/explorepegiun.png'
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

  const handleNext = () => {
    setCurrentStep(8);
    openModal();
  };
    
  return (
    <>
      <ModalHeader textAlign="center" py={3} fontSize="30px">List volunteer opportunities</ModalHeader>
      <Stack spacing="6">
        <Center>
          <Image
              className="resp-img"
              src={explorepegiun.src}
              alt={"img"}
              draggable="false"
          />
        </Center>
        <Spacer />
        <Text fontSize={16} textAlign="center">
          List your volunteer opportunities on our site to connect with our community of dedicated volunteers.
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
