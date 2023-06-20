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
  VStack,
  FormHelperText,
  FormLabel,
  Textarea
} from '@chakra-ui/react'
import * as React from 'react'
import { PasswordField } from '../../PasswordField'

export const CreateProfilStep2 = (props: HTMLChakraProps<'form'>) => (
  <chakra.form
    onSubmit={(e) => {
      e.preventDefault()
      // your login logic here
    }}
    {...props}
  >
    <Stack spacing="6">
      <VStack width="full" spacing="6">
        <FormControl id="email">
          <FormLabel fontSize="sm" color="grey.400">Bio</FormLabel>
          <Textarea
            maxLength={255}
            name="text"
            autoComplete="text"
            required
            placeholder="Bio"
            backgroundColor={mode('gray.50', 'whiteAlpha.900')}
            height={50}
          />
        </FormControl>

        <FormControl id="location">
          <FormLabel fontSize="sm" color="grey.400">Location</FormLabel>
          <Input
            name="location"
            type="text"
            autoComplete="location"
            required
            placeholder="Location"
            backgroundColor={mode('gray.50', 'whiteAlpha.900')}
            height={50}
          />
        </FormControl>

        <FormControl id="location">
          <FormLabel fontSize="sm" color="grey.400">Website URL (optional)</FormLabel>
          <Input
            name="website"
            type="url"
            autoComplete="website"
            required
            placeholder="Website URL"
            backgroundColor={mode('gray.50', 'whiteAlpha.900')}
            height={50}
          />
        </FormControl>
      </VStack>

      <Button
        type="submit"
        colorScheme="orange"
        size="lg"
        fontSize="md"
        disabled
      >
        Next
      </Button>
    </Stack>
  </chakra.form>
)
