import {
  Box,
  Fade,
  ScaleFade,
  Input,
  Center,
  Text,
  Button
} from '@chakra-ui/react'
import React from 'react'
import { GrFormClose } from 'react-icons/gr'
import { AiFillDollarCircle } from 'react-icons/ai'
import { isMobile } from 'react-device-detect'
import {
	userId,
} from '../../components/Helper/index'

const PendingCreditModal = (props) => {
  const { show, onClose, getMessage,  messageInfo } = props
  return (
    <Fade in={show}>
      <Box
        bg="transparent"
        p="10px"
        height={'100%'}
        boxShadow={isMobile ?'base' : null}

        rounded="md"
        style={
          isMobile
            ? {
                marginLeft: '4%',
                marginRight: '4%',
                marginTop: '10%',
                backgroundColor: 'white',
              }
            : {}
        }
      >
        <GrFormClose
          fontSize={'35px'}
          cursor={'pointer'}
          onClick={() => {
            onClose()
            // console.log('Pending Credit')
            getMessage(messageInfo.chat_id, messageInfo.receiver_id, messageInfo.listing_id, userId, {}, {})
          }}
        />
        <Box
          pt={isMobile ? 2 : 20}
          pb={10}
          pl={isMobile ? 2 : 20}
          pr={isMobile ? 0 : 20}
        >
          <Text textAlign={isMobile ? "start" : 'center'} fontWeight={600} fontSize={'24px'} mb={10}>
            Credits Pending
          </Text>
          <Center>
            <Box
              height={isMobile ? '100px' : '170px'}
              width={isMobile ? '100px' : '170px'}
              borderRadius={'50%'}
              textAlign={'center'}
              borderWidth={'3px'}
              borderColor={'#E27832'}
              alignItems={'center'}
              display={'flex'}
              justifyContent={'center'}
            >
              <Box>
                <AiFillDollarCircle
                  fontSize={36}
                  color={'#E27832'}
                  fontWeight={600}
                />
              </Box>
            </Box>
          </Center>
        </Box>
        <Box textAlign={'center'} px={isMobile ? 0 : 20} pb={isMobile ? 5 : 0}>
          <Text color={'black'}>
            Credits will remain pending until the completed deed has been
            confirmed by both users.
          </Text>
        </Box>
      </Box>
    </Fade>
  )
}

export default PendingCreditModal
