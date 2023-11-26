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
    Spacer,
    Center,
    Box
} from '@chakra-ui/react'


import { useToast } from "@chakra-ui/toast";
import { useMutation } from 'react-query'

// import { baseUrl } from '../../../../config'


export const InnerSection = (props: any) => {
    let {
        setShowModel,
        show,
        image,
        para,
        goNext,
        lastStep,
        currentStep
    } = props;
    return (
        <Stack spacing="6">
            <Center>
                <Image
                    // width={"220px"}
                    className="resp-img"
                    src={image}
                    alt={"img"}
                    draggable="false"
                />
            </Center>
            <Spacer />
            <Text fontSize={16}>
                {para}
            </Text>
            <Spacer />
            <Spacer />
            <Button
                colorScheme="orange" size="lg" fontSize="md"
                onClick={() => {
                    goNext()
                }}
            >
                {lastStep ? "Get Started" : "Next"}
            </Button>
            {!lastStep && (
                <Box className="steppers">
                    <div className={`stepper-dot ${currentStep == 1 && "active"}`}></div>
                    <div className={`stepper-dot ${currentStep == 2 && "active"}`}></div>
                    <div className={`stepper-dot ${currentStep == 3 && "active"}`}></div>
                </Box>
            )}

            {!lastStep &&
                <Text
                    textAlign="center"
                    cursor="pointer"
                    ml={2} color="primary.300" fontWeight="semibold" onClick={() => {
                        let dubShow = { ...show };
                        dubShow.welcomeScreen3 = false;
                        dubShow.welcomeScreen2 = false;
                        dubShow.welcomeScreen1 = false;
                        dubShow.welcomeScreen4 = false;
                        // dubShow.step2 = false;
                        setShowModel(dubShow);
                        // goNext()
                    }}>
                    Skip
                </Text>
            }
            <Spacer />

        </Stack>

    )
}
