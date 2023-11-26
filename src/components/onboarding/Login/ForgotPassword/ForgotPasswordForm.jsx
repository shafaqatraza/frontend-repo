import {
    Box,
    Button,
    FormControl,
    Input,
    Text,
    Stack,
    useColorModeValue as mode,
    HStack,
    PinInput,
    PinInputField,
    Flex
} from "@chakra-ui/react";
import * as React from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { PasswordField } from "../../../PasswordField";
import { baseUrl } from "../../../../../config";

export const ForgotPassword = (props) => {
    let { setShowModel, show } = props;
    const toast = useToast();
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState({
        email: "",
        pin: "",
        password: password,
    });
    const [currentStep, setCurrentStep] = React.useState(1);
    const [isInvalidOTP, setOTPInValidity] = React.useState(false);

    const onClickNext = (e) => {
        e.preventDefault()
        if (currentStep == 1) {
            setIsLoading(true);
            var formData = new FormData();
            formData.append("email", data.email);

            axios.post(`${baseUrl}/forgot-password`, formData, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'multipart/form-data',
                }
            }).then((res) => {
                setCurrentStep(2);
                setIsLoading(false);
                toast({ title: res.data.message, status: 'success' })
            }).catch((error) => {
                // console.log(error)
                setIsLoading(false);
                let errors = error.response?.data.errors;
                if (errors?.email) {
                    errors.email.map((sin) => {
                        toast({ title: sin, status: "error" })
                    });
                } else {
                    errors.response?.data?.message &&
                        toast({
                            title: data.response?.data?.message,
                            status: "error",
                        });
                }
            })
        }
        if (currentStep == 2) {
            setIsLoading(true);
            var formData = new FormData();
            formData.append("email", data.email);
            formData.append("pin", data.pin);

            axios.post(`${baseUrl}/forgot-password/verify`, formData, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'multipart/form-data',
                }
            }).then((res) => {
                setCurrentStep(3);
                setIsLoading(false);
                setOTPInValidity(false)
                toast({ title: res.data.message, status: 'success' })
            }).catch((error) => {
                console.log(error)
                setIsLoading(false);
                setOTPInValidity(true);
                toast({ title: 'Invalid OTP or Something went wrong', status: 'error' })
            })
        }
        if (currentStep == 3) {
            setIsLoading(true);
            var formData = new FormData();
            formData.append("email", data.email);
            formData.append("pin", data.pin);
            formData.append("password", password);

            axios.post(`${baseUrl}/forgot-password/reset`, formData, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'multipart/form-data',
                }
            }).then((res) => {
                setIsLoading(false);
                let dubShow = { ...show };
                dubShow.forgotPassword = false;
                dubShow.login = true;
                setShowModel(dubShow);
                toast({ title: res.data.message, status: 'success' })
            }).catch((error) => {
                setIsLoading(false);
                let errors = error.response?.data.errors;
                if (errors?.password) {
                    errors.password.map((sin) => {
                        toast({ title: sin, status: "error" })
                    });
                } else {
                    errors.response?.data?.message &&
                        toast({
                            title: data.response?.data?.message,
                            status: "error",
                        });
                }
            })
        }
    }

    const resendOTP = (e) => {
        e.preventDefault()
        setIsLoading(true);
        var formData = new FormData();
        formData.append("email", data.email);

        axios.post(`${baseUrl}/forgot-password`, formData, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'multipart/form-data',
            }
        }).then((res) => {
            setCurrentStep(2);
            setIsLoading(false);
            toast({ title: res.data.message, status: 'success' })
        }).catch((error) => {
            console.log(error)
            setIsLoading(false);
            let errors = error.response?.data.errors;
            if (errors?.email) {
                errors.email.map((sin) => {
                    toast({ title: sin, status: "error" })
                });
            } else {
                errors.response?.data?.message &&
                    toast({
                        title: data.response?.data?.message,
                        status: "error",
                    });
            }
        })
    }

    return (
        <Stack spacing="10" >

            <Text>
                {currentStep == 1 && "Enter your account email address"}
                {currentStep == 2 && "You will get a confirmation code in to your account's email, please enter the code below in order to continue:"}
                {currentStep == 3 && "Enter new password"}
            </Text>

            {currentStep == 1 && (
                <FormControl id="email">
                    <Input
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={(e) => {
                            let dubData = { ...data };
                            dubData.email = e.target.value;
                            setData(dubData);
                        }}
                        required
                        placeholder="Email"
                        backgroundColor={mode("gray.50", "whiteAlpha.900")}
                        height={50}
                    />
                </FormControl>
            )}

            {currentStep == 2 && (
                <HStack justifyContent="center" my="20px !important">
                    <PinInput
                        otp
                        size="lg"
                        placeholder=""
                        isInvalid={isInvalidOTP}
                        variant="flushed"
                        onChange={(e) => {
                            let dubData = { ...data };
                            dubData.pin = e;
                            setData(dubData);
                        }}
                    >
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                    </PinInput>
                </HStack>
            )}

            {currentStep == 3 && (
                <PasswordField setPassword={setPassword} />
            )}

            <Flex flexDirection="column">
                {currentStep == 2 && (
                    <Button
                        colorScheme="orange"
                        size="lg"
                        fontSize="md"
                        isDisabled={isLoading}
                        onClick={(e) => resendOTP(e)}
                        marginBottom="5"
                    >
                        Resend OTP
                    </Button>
                )}

                <Button
                    colorScheme="orange"
                    size="lg"
                    fontSize="md"
                    isDisabled={isLoading}
                    onClick={(e) => onClickNext(e)}
                >
                    {currentStep == 3 ? "Reset Password" : "Next"}
                </Button>
            </Flex>

            <Box className="steppers" mb="20px !important">
                <div className={`stepper-dot ${currentStep == 1 && "active"}`}></div>
                <div className={`stepper-dot ${currentStep == 2 && "active"}`}></div>
                <div className={`stepper-dot ${currentStep == 3 && "active"}`}></div>
            </Box>
        </Stack>
    );
};
