import {
  Flex,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  SimpleGrid,
  Box,
  VStack
} from '@chakra-ui/react'
import SimpleThreeColumns from './threeColumn'
export default function WithBackgroundImage() {
  return (
    <Flex
      w={'full'}
      h={'50vh'}
      backgroundImage={
        'url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
      flexDirection="column"
      justifyContent="flex-end"
    >
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        // bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
        // mb={75}
      >
        <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
          <Text
            color={'white'}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}
          >
            Pay it forward, get rewarded.
          </Text>
          <Text
            color={'white'}
            fontWeight={400}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: 'lg' })}
          >
            Browse items and services available in your community, or get
            started offering your own and earn deed dollars.
          </Text>
        </Stack>
      </VStack>
      <SimpleThreeColumns />
    </Flex>
  )
}
