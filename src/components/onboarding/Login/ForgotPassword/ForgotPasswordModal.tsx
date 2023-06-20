import {
    Box,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Text,
    // useDisclosure,
    // ModalCloseButton,
    ModalOverlay,
    ModalCloseButton,
    ModalFooter
  } from '@chakra-ui/react'
  import { ChevronLeftIcon } from '@chakra-ui/icons'
  import { isMobile } from "react-device-detect"
  import * as React from 'react'
  import { modalMobileProps, modalContentMobileProps } from "../../../../utils/modalProps"
  import Navbar from "../../../Navbar";
  import { Card } from '../../../Card'
  
  interface ModelType {
    login: boolean
    forgotPassword: boolean
  }
  
  export const ForgotPasswordModal = (props: any) => {
    const { TitleModal, body, show, setShow, goBack, currentStep } = props
    return (
      <Modal
        {...modalMobileProps}
        isOpen={show}
        onClose={() => {
          setShow(false)
        }}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent {...modalContentMobileProps}>
          <ModalHeader
            display={goBack && "flex"}
            justifyContent={goBack ? "space-between" : "center"}
            alignItems="center"
            textAlign='center' pt={10} fontSize="30px">
            {
              goBack &&
              <ChevronLeftIcon
                onClick={() => {
                  goBack()
                }}
                cursor='pointer'
                w={8} h={8} color='' />}
            {TitleModal}
            <div></div>
  
          </ModalHeader>
          {!isMobile && (
            <ModalCloseButton />
          )}
          <ModalBody pt='2'>
            <Card pb='0'>{body}</Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }
  