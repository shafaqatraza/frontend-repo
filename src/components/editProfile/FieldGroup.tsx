import { Box, Heading, Stack, StackProps } from '@chakra-ui/react'
import * as React from 'react'

interface FieldGroupProps extends StackProps {
  title?: string
}

export const FieldGroup = (props: FieldGroupProps) => {
  const { title, children, ...flexProps } = props
  return (
    <Stack direction={{ base: 'column', md: 'row' }} spacing="2" {...flexProps}>
      {children}
    </Stack>
  )
}
