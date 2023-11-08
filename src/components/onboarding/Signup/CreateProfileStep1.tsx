import {
  Text,
  Button,
  chakra,
  Checkbox,
  Flex,
  FormControl,
  HTMLChakraProps,
  Input,
  Stack,
  useColorModeValue as mode,
  Center,
  Avatar,
  Box,
  VStack
} from '@chakra-ui/react'
import * as React from 'react'
import { PasswordField } from '../../PasswordField'

export const CreateProfilStep1 = (props: HTMLChakraProps<'form'>) => (
  <chakra.form
    onSubmit={(e) => {
      e.preventDefault()
      // your login logic here
    }}
    {...props}
  >
    <Stack spacing="6">
      <FormControl id="fname">
        <Input
          name="username"
          type="text"
          autoComplete="username"
          required
          placeholder="Username"
          backgroundColor={mode('gray.50', 'whiteAlpha.900')}
          height={50}
        />
      </FormControl>
      <Center >
        <VStack spacing="4" justifyContent="center" my={10}>
          <Text
            fontSize="lg"
            fontWeight="medium"
            color={'gray.400'}
            display="block"
          >
            Upload a profile picture
          </Text>
          <Box >
            <Avatar

              size="2xl"
              src="https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjY5fHxsYWR5JTIwc21pbGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
              name="Melinda Paul"
            />
          </Box>
          <Button
            width="full"
            colorScheme="yellow"
            display={{ base: 'none', md: 'initial' }}
          >
            Upload
          </Button>
        </VStack>
      </Center>
      <Button type="submit" colorScheme="orange" size="lg" fontSize="md" disabled>
        Next
      </Button>
    </Stack>
  </chakra.form>
)
