import * as React from 'react'
import {
    Text,
    Button,
    chakra,
    FormLabel,
    FormControl,
    Input,
    Image,
    Stack,
    useColorModeValue as mode,
    Spacer
} from '@chakra-ui/react'
import { useRouter } from 'next/router'


export const InnerSection = (props) => {
    const router = useRouter()
    let {
        setShowModel,
        show,
        image,
        para,
        goNext,
        lastStep
    } = props;
    return (
        <Stack spacing="3" textAlign={"center"} pr={0} pl={0} mb={5}>
            <Spacer />
            <Text pr={5} pl={5} color={"#666666"} fontSize={16}>
                {para}
            </Text>
            <Button
                colorScheme="orange" size="lg" fontSize="md"
                onClick={() => {
                    router.push('/profile')
                }}
                _focus={{
                    boxShadow: "none"
                }}
            >
                Complete a Deed
            </Button>

            <Text
                onClick={() => {
                    router.push('/profile')
                }}
                color="#dd6b20" mb={10} pr={5} pl={5} fontSize={16}>
                Invite Friends
            </Text>

        </Stack>

    )
}
