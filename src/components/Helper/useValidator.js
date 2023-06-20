import { useState } from 'react'
import SimpleReactValidator from 'simple-react-validator'

const useValidator = (customMessage = {}, customValidator = {}) => {
  const [show, setShow] = useState(false)
  const validator = new SimpleReactValidator({
    messages: customMessage,
    validators: {
      limit: {  // name the rule
        rule: (val, params, validator) => {
          return val.length >= 1 && val.length <= 4;
        },
        required: true  // optional
      }
    }
  })

  if (show) {
    validator.showMessages()
  }

  return [validator, setShow]
}

export default useValidator;