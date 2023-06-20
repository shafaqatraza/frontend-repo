import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Box,
  ModalCloseButton,
  Stack,
  Spacer,
  Text,
  Button,
  Icon
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

import * as React from 'react'
import { isMobile } from 'react-device-detect'

export const DeleteModal = (props) => {
  const { show, setShow, size, deletePost } = props

  return (
    <Modal   isOpen={show} onClose={() => setShow(false)} size={size} isCentered>
      <ModalOverlay />
      <ModalContent style={isMobile ? {borderRadius:'20px'} : {}}>
        {/* <ModalCloseButton left={0} _focus={{ boxShadow: "none" }} /> */}
        <ModalBody  boxShadow={isMobile ?'base' : null}
>
          <Box px={{ base: '2', md: '2' }} rounded={{ sm: 'lg' }}  {...props} >
            <Stack spacing="3" textAlign={'center'} pr={0} pl={0} mb={5}>
              {isMobile ? (
                <Icon
                style={{position:'absolute',left:'5%',top:'5%'}}
                fontSize={15} as={CloseIcon} color="black" onClick={() => setShow(false)}/>
              ) : null}
              <Spacer />
              <Text pr={5} pl={5} color={'#000000'} fontSize={22} fontWeight={500}>
                Are you sure you want to delete this post?
              </Text>
              <Text  color={'#212121'} fontSize={15}>
                You can't undo this action.
              </Text>
              <Button
                colorScheme="orange"
                size="lg"
                fontSize="md"
                onClick={() => deletePost()}
                _focus={{
                  boxShadow: 'none'
                }}
              >
                Delete Post
              </Button>

              <Text
                cursor={'pointer'}
                onClick={() => setShow(false)}
                color="#dd6b20"
                mb={10}
                pr={5}
                pl={5}
                fontSize={16}
              >
                Cancel
              </Text>
            </Stack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
