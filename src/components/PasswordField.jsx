import {
  FormControl, IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement, Text, useColorModeValue as mode, useDisclosure, useMergeRefs
} from '@chakra-ui/react'
import * as React from 'react'

export const PasswordField = React.forwardRef(
  (props, ref) => {
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = React.useRef(null)

    const mergeRef = useMergeRefs(inputRef, ref)

    const onClickReveal = () => {
      onToggle()
      const input = inputRef.current
      if (input) {
        input.focus({ preventScroll: true })
        const length = input.value.length * 2
        requestAnimationFrame(() => {
          input.setSelectionRange(length, length)
        })
      }
    }

    return (
      <FormControl id="password">
        <InputGroup> 
        <Input
            ref={mergeRef}
            name="password"
            type={isOpen ? 'text' : 'password'}
            autoComplete="current-password"
            required
            placeholder={props.placeholder ? props.placeholder : "Password"}
            backgroundColor={mode('gray.50', 'whiteAlpha.900')}
            height={50}
            {...props}
            onChange={(e) => {
              props?.setPassword(e.target.value)
            }}
          />
        <InputRightElement style={{height: '100%', margin: '0 10px'}}>
          <IconButton
            bg="transparent !important"
            variant="ghost"
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height:'100%'}}
            icon={
              isOpen ? (
                <Text color="primary.300">
                  Hide
                </Text>
              ) : (
                <Text color="primary.300">
                  Show
                </Text>
              )
            }
            onClick={onClickReveal}
          />
        </InputRightElement>
          
        </InputGroup>
      </FormControl>
    )
  }
)

PasswordField.displayName = 'PasswordField'
