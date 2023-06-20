import { chakra } from '@chakra-ui/react'

export const SocialButton = chakra('a', {
  baseStyle: {
    borderRadius: '50%',
    w: '8',
    h: '8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bg: 'grey.300',
    color: 'secondary.100',
    transition: 'all 0.2s',
    _hover: {
      bg: 'primary.100'
    }
  }
})
