import {
  Box,
  Fade,
  ScaleFade,
  Input,
  Center,
  Text,
  Button,
  CSSReset,
  Textarea
} from '@chakra-ui/react'
import React from 'react'
import { GrFormClose } from 'react-icons/gr'
import { Rate } from 'antd'
import { NewRating } from '../NewRating'
import { isMobile } from 'react-device-detect'

const RateAndReviewModal = (props) => {
  const {
    show,
    onClose,
    submit,
    setRatingValue,
    ratingValue,
    reviewText,
    setReviewText,
    submitReviewAndRating,
    isLoading
  } = props

  // console.log('fgfgfgfg')
  return (
    <Fade in={show}>
      <Box
        bg="transparent"
        p="10px"
        height={'100%'}
        rounded="md"
        style={{
          marginLeft: '4%',
          marginRight: '4%',
          marginTop: '4%',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
      >
        <GrFormClose
          fontSize={'35px'}
          cursor={'pointer'}
          onClick={() => onClose()}
        />
        <Box
          pt={isMobile ? 2 : 5}
          pb={5}
          pl={isMobile ? 1 : 20}
          pr={isMobile ? 0 : 20}
          textAlign="center"
        >
          <Text
            textAlign={ 'center'}
            fontWeight={600}
            fontSize={isMobile ? '30px' : '24px'}
            mb={'10px'}
          >
            Rate Your Interaction
          </Text>
          <Text mb={'15px'} fontWeight={isMobile ?  500 : null} fontSize={'14px'}>How was your experience with this user?</Text>
          <NewRating
            mt={'5'}
            setRatingValue={setRatingValue}
            ratingValue={ratingValue}
            defaultValue={ratingValue}
            size="5lx"
          />
          <Text mt={'15px'} mb={'10px'} textAlign="left"
          fontWeight={isMobile ? 600 : null}
          >
            {' '}
            Leave a Comment
          </Text>
          <Textarea
            variant="filled"
            rows={3}
            placeholder="Compose your message here"
            type="text"
            defaultValue={reviewText}
            maxLength={200}
            onChange={(e) => {
              setReviewText(e.target.value)
            }}
          />
        </Box>

        <Box textAlign={'center'} px={isMobile ? 0 : 20}>
          <Center>
            <Button
              w={'100%'}
              type="submit"
              // mt={'5'}
              isLoading={isLoading}
              colorScheme="orange"
              size="lg"
              fontSize="md"
              onClick={() => submitReviewAndRating()}
            >
              Submit
            </Button>
          </Center>
        </Box>
      </Box>
    </Fade>
  )
}

export default RateAndReviewModal
