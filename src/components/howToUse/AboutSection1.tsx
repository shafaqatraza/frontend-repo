import { Container, SimpleGrid, Flex, Heading, Box } from '@chakra-ui/react'
import * as React from 'react'
import { isMobile } from 'react-device-detect'

export const AboutSection1 = (props: any) => (
  <Box className='about-header'>
    <Container
      as={SimpleGrid}
      maxW={'10xl'}
      bg={'secondary.100'}
      columns={{ base: 1, md: 1 }}
      spacing={{ base: 10, lg: 6 }}
      py={{ base: 10, sm: 10, lg: 12, xl: 20 }}
      // mb="4"
      style={
        isMobile
          ? {
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            height: 170
          }
          : { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }
      }
    >
      <Flex justifyContent="center" alignItems="center">
        <Heading
          size="lg"
          fontWeight="semibold"
          letterSpacing="tight"
          marginEnd={'0'}
          color="grey.100"
        >
          {props.title}
        </Heading>
      </Flex>
    </Container>
  </Box>
)
