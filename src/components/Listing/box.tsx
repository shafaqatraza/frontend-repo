
import {
    Box,
    Flex,
    Text,
    Spacer
} from '@chakra-ui/react'
import * as React from 'react'
import { isMobile } from 'react-device-detect'
const ListingBox = (props: any) => {
    return (
        <Box
        bg="white"
        maxWidth="2xl"
        p={{ base: '6', md: '8' }}
        rounded={{ sm: 'lg' }}
        shadow={{ md: 'base' }}
        boxShadow={isMobile ? 'lg' : {}}
        mb="4"
        border={isMobile ? '0' : '1px'}
        borderColor="gray.200"
        borderRadius={isMobile ? '8px' : 0}

        >
            <Flex
                justifyContent="start" alignItems="center" >
                <Box w="35px" h="35px"
                    borderRadius="50%"
                    bgColor="gray.200" >
                    <Flex justifyContent="center"  ><Text
                        fontWeight="bold"
                        fontSize={14} pt="2">{props?.step || 0}</Text></Flex>
                </Box>

                <Text fontSize={24}
                    pl="3"
                    fontWeight={500}>
                    {props?.heading || ""}
                </Text>
            </Flex>
            {props.children}

        </Box>


    )
}
export default ListingBox;
