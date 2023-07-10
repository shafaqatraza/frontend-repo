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
  import { isMobile } from 'react-device-detect'
  import {
      userId,
  } from '../Helper/index'

  const RequestCreditModal = (props) => {
    const { show, onClose, submit, setCreditAmount, creditAmount, userChatInformation, isLoading, getMessage,
      messageInfo } = props
  // console.log(isLoading,'llllooo')
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
                  marginTop: '4%',
                  backgroundColor: 'white',
                  position:'absolute'
                }
              : {}
          }
        >
          <GrFormClose
            fontSize={'35px'}
            cursor={'pointer'}
            onClick={() => onClose()}
          />
          <Box
            pt={isMobile ? 0 : 5}
            pb={isMobile ? 5 : 5}
            // pl={isMobile ? '20%' : 20}
            // pr={isMobile ? '20%' : 20}
          >
            <Center>
              <Box
                height={'170px'}
                width={'170px'}
                borderRadius={'50%'}
                textAlign={'center'}
                borderWidth={'3px'}
                borderColor={'#E27832'}
                alignItems={'center'}
                display={'flex'}
                justifyContent={'center'}
              >
                <Box>
                  <Text mb={'5px'} fontSize={'12px'} color="#979797">
                    Enter Deed Dollars Here
                  </Text>
                  <Input
                    variant="unstyled"
                    fontSize={'20px'}
                    fontWeight={600}
                    placeholder={creditAmount || isMobile ? '0' : '200'}
                    color={'#E27832'}
                    textAlign={'center'}
                    type="number"
                    defaultValue={creditAmount}
                    onChange={(e) => setCreditAmount(e.target.value)}
                  />
                  <Text
                    fontSize={'24px'}
                    fontWeight={600}
                    color={
                      creditAmount ? '#E27832' : isMobile ? '#979797' : '#E27832'
                    }
                  >
                    Deed Dollars
                  </Text>
                </Box>
              </Box>
            </Center>
          </Box>
          <Box textAlign={'center'} px={isMobile ? 0 : 20}>
            <Text fontWeight={600} mb={'20px'} fontSize={'18px'}>
              {userChatInformation.listing !== undefined ? userChatInformation.listing.title : ""}
            </Text>
            {isMobile ? (
              <Center>
                <Button
                  w={'70%'}
                  type="submit"
                  colorScheme="orange"
                  size="md"
                  fontSize="md"
                  mb="15px"
                  isLoading={isLoading}
                  onClick={() =>
                    {
                      // console.log('transaction submit')
                      getMessage(messageInfo.chat_id, messageInfo.receiver_id, messageInfo.listing_id, userId, {}, {})
                      submit()
                    }}
                >
                  Request
                </Button>
              </Center>
            ) : null}

            {isMobile ? null : (
              <Center>
                <Button
                  w={'70%'}
                  type="submit"
                  mt={'5'}
                  colorScheme="orange"
                  size="md"
                  fontSize="md"
                  isLoading={isLoading}
                  onClick={() =>
                    {
                      // console.log('transaction submit')
                      getMessage(messageInfo.chat_id, messageInfo.receiver_id, messageInfo.listing_id, userId, {}, {})
                      submit()
                    }}
                >
                  Request
                </Button>
              </Center>
            )}
          </Box>
        </Box>
      </Fade>
    )
  }

  export default RequestCreditModal
