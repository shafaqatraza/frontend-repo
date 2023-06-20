import { extendTheme } from '@chakra-ui/react'
// Component style overrides
import Button from './components/button'
import { colors } from './foundations/colors'
// Foundational style overrides
import config from './foundations/config'
import fonts from './foundations/fonts'
// Global style overrides
import styles from './styles'

const customTheme = {
  styles,
  fonts,
  config,
  colors,
  // shadows,
  components: {
    Button
  }
}

export default extendTheme(customTheme)
