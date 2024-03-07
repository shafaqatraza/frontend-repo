// components/organizationForm/OrganizationFormModal.jsx
import React from 'react';
import { useOrganizationFormContext } from './organizationFormContext';
import FormScreen1 from './FormScreen1';
import FormScreen2 from './FormScreen2';
import FormScreen3 from './FormScreen3';
import WelcomeScreen1 from './WelcomeScreen1';
import WelcomeScreen2NonProfit from './NonProfit/WelcomeScreen2';
import WelcomeScreen3NonProfit from './NonProfit/WelcomeScreen3';
import WelcomeScreen2ForProfit from './ForProfit/WelcomeScreen2';
import WelcomeScreen3ForProfit from './ForProfit/WelcomeScreen3';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import { Card } from '../Card'
import { modalMobileProps, modalContentMobileProps } from "../../utils/modalProps";

const steps = [FormScreen1, FormScreen2, FormScreen3, WelcomeScreen1, WelcomeScreen2NonProfit, WelcomeScreen3NonProfit, WelcomeScreen2ForProfit, WelcomeScreen3ForProfit];

const OrganizationFormModal = () => {
    const { currentStep, isModalOpen, closeModal } = useOrganizationFormContext();
    const StepComponent = steps[currentStep - 1];
    
    return (
      <Modal isOpen={isModalOpen} onClose={closeModal} {...modalMobileProps}>
        <ModalOverlay />
        <ModalContent {...modalContentMobileProps}>
          
          <ModalCloseButton />
          <ModalBody pt='2'>
            {/* Render the current step component */}
            <Card pb='3'> <StepComponent /> </Card>
  
            {/* Example: Render a button to move to the next step */}
            {/* <Button onClick={closeModal}>Close</Button> */}
          </ModalBody>
          <div className="steppers mb-2">
              <div className={`stepper-dot ${currentStep == 1 && "active"}`}></div>
              <div className={`stepper-dot ${currentStep == 2 && "active"}`}></div>
              <div className={`stepper-dot ${currentStep == 3 && "active"}`}></div>
              <div className={`stepper-dot ${currentStep == 4 && "active"}`}></div>
              <div className={`stepper-dot ${currentStep == 5 && "active"}`}></div>
              <div className={`stepper-dot ${currentStep == 6 && "active"}`}></div>
          </div>
        </ModalContent>
      </Modal>
    );
  };
  
  export default OrganizationFormModal;
