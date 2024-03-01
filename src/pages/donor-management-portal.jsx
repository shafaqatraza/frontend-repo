import { Box, Text } from '@chakra-ui/react'
import {
  Spacer, Divider, Container,
  SimpleGrid,
  Image,
  Flex,
  Button
} from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { Footer } from '../components/Footer'
import Navbar from '../components/Navbar'
import { Section1 } from '../components/howToUse/section1'
import Contact from '../components/contact/contact'
import HeadingAndText from '../components/headingAndText'
import { isMobile } from 'react-device-detect'
import gdlogopegiun from "../assets/imgs/gdlogopegiun.png";
import { useMediaQuery } from '@chakra-ui/react'
import fav from "../assets/imgs/favicon.ico"
import { useRouter } from 'next/router'

 
const DonorManagement = () => {
  const router = useRouter();
  
  return (
    <div style={{overflowX:"hidden"}}>
    <Box>
      <Navbar />
      < Container
        as={SimpleGrid}
        maxW="container.lg"
        columns={{ base: 1 }}
        spacing={{ base: 8, lg: 6 }}
        mb={12}
      >
        <Box>
          <Flex gap={'70px'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} pt={'30px'} pb={'20px'} >
            <Image style={{ width: "200px", height: "203px" }} src={gdlogopegiun.src} alt='Connect with Good Deeds: Pioneering Peer-to-Peer Kindness Marketplace'/>
          </Flex>
          <Text fontSize={'26px'} lineHeight="42px" fontWeight={'700'} color="#183553" textAlign="center">To access the Donor Management Portal, please log into your desktop computer</Text>
         </Box>
         <Button
              width="100%"
              height="45px"
              mt="6"
              size="md"
              onClick={() => router.push('/')}
              colorScheme="orange"
          >
            Back
          </Button>
      </Container >
      <Footer />
    </Box >
    </div>
  )
}

export default DonorManagement
