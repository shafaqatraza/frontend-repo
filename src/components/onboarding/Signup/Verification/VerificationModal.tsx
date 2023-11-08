import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton
} from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { isMobile } from "react-device-detect";
import { modalMobileProps, modalContentMobileProps } from "../../../../utils/modalProps";

import * as React from 'react'
import { Card } from '../../../Card'

interface ModelType {
  verification: boolean
  signUp: boolean
}
interface VerificationProps {
  TitleModal: string
  body: any
  show: ModelType
  setShow: any
}

export const SignUpVerificationModal = (props: any) => {
  const { body, show, setShow, goBack } = props
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
        {/* <ModalHeader
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
          <div></div>

        </ModalHeader> */}
        {/* {!isMobile && (
            <ModalCloseButton />
          )} */}
        <ModalBody pt='2'>
          <Card>{body}</Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
