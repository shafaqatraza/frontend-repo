import { Box, SimpleGrid, Stack, Text } from '@chakra-ui/react'

interface FeatureProps {
  title: string
  text: string
}

const Feature = ({ title, text }: FeatureProps) => {
  return (
    <Stack color="#fff" textAlign="center">
      <Text fontWeight={700}>{title}</Text>
      <Text>{text}</Text>
    </Stack>
  )
}

export default function SimpleThreeColumns() {
  return (
    <Box p={4} backgroundColor="#183553">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          title={'Donate'}
          text={'Begin your journey with Good Deeds.'}
        />
        <Feature
          title={'Give Back'}
          text={'See your acts of kindness be rewarded.'}
        />
        <Feature
          title={'Earn Deed Dollars'}
          text={'Use your virtual currency how and when you want to.'}
        />
      </SimpleGrid>
    </Box>
  )
}
