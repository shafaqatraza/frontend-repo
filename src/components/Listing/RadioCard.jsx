import { Box } from '@chakra-ui/react'
const RadioCard = (props) => {

    return (
        <Box as='label'>
            <Box
                onClick={() => props.onClick(props.children)}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='md'
                boxShadow='md'
                textAlign="center"
                borderColor='orange.600'
                textTransform='capitalize'
                bg={props.postType === props.children ? 'orange.500' : "transparent"}
                color={props.postType === props.children ? 'white' : "orange.500"}
                _focus={{
                    boxShadow: 'none',
                }}
                px={50}
                py={35}
            >
                {props.children}
            </Box>
        </Box>
    )
}

export default RadioCard;