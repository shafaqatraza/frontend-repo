import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Text,
  useDisclosure
} from '@chakra-ui/react'

import { ChevronLeftIcon } from '@chakra-ui/icons'

import * as React from 'react'
import { Card } from '../../Card'

interface ModelType {
  login: boolean
  signUp: boolean
  drawer: boolean
  step1: boolean
  step2: boolean
}
interface LoginFormProps {
  TitleModal: string
  body: any
  show: ModelType
  setShow: any
}

export const Step2 = (props: LoginFormProps) => {
  const { TitleModal, body, show, setShow } = props
  return (
    <Modal
      isOpen={show.step1}
      onClose={() => {
        let dubShow = { ...show }
        dubShow.step1 = false
        setShow(false)
      }}
      size={'2xl'}
    >
      {/* <ModalOverlay /> */}
      <ModalContent>
        <ModalHeader textAlign='center' py={10}>
          <ChevronLeftIcon cursor='pointer' w={8} h={8} color='' />
          {TitleModal}
        </ModalHeader>

        <ModalBody>
          <Card>{body}</Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
