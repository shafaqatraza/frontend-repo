// components/organizationForm/WelcomeScreen1.jsx
import React from 'react';
import { useOrganizationFormContext } from './organizationFormContext';
import gdlogopegiun from "../../assets/imgs/gdlogopegiun.png";
import {
  Text,
  Button,
  Image,
  Stack,
  ModalHeader,
  Spacer,
  Center,
} from '@chakra-ui/react'

const WelcomeScreen1 = () => {
  const { setCurrentStep, openModal, closeModal, orgType } = useOrganizationFormContext();

  const handleNext = () => {
    
    if(orgType === 1 || orgType === 2){
        setCurrentStep(5);
    }else{
      setCurrentStep(5);
    }
    openModal(); 
  };

  return (
    <>
      <ModalHeader textAlign="center" py={3} fontSize="30px">Welcome To Good Deeds!</ModalHeader>
      <Stack spacing="6">
        <Center>
          <Image
              // style={{ width: "350px",}}
              className="resp-img"
              src={gdlogopegiun.src}
              alt={"img"}
              draggable="false"
          />
        </Center>
        <Spacer />
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

export default WelcomeScreen1;
