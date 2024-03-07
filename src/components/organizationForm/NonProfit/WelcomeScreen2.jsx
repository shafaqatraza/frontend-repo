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

const WelcomeScreen2 = () => {
  const { setCurrentStep, openModal, closeModal } = useOrganizationFormContext();

  const handleNext = () => {
    setCurrentStep(6);
    openModal(); 
  };

  return (
    <>
      <ModalHeader textAlign="center" py={3} fontSize="30px">List volunteer or donation opportunities</ModalHeader>
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
        <Text fontSize={16} textAlign="center" className={'m-4'}>
            List your volunteer or donation opportunities for our volunteers to apply for/ donate to.
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

export default WelcomeScreen2;
