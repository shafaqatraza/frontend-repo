import {
    Text,
    Flex,
    Button,
    Box
} from "@chakra-ui/react";
import * as React from "react";
import Router, { useRouter } from "next/router";
import { isMobile } from "react-device-detect";
import { useMediaQuery } from '@chakra-ui/react';


export const Steps = (props: any) => {
    const router = useRouter();
    const [isSmallerThan450] = useMediaQuery('(max-width: 450px)');
    let {
        step,
        heading,
        text,
        buttonText,
        id,
        list
    } = props;

    const isElement = (element: any) => {
        return React.isValidElement(element);
    }

    return (
        <Box>
            <Flex
                pt="8"
                justifyContent="start"
                alignItems="center"
                marginBottom={11}
            >
                <Box w="30px" h="30px"
                    borderRadius="50%"
                    bgColor="gray.200"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Flex justifyContent="center" >
                        <Text fontSize={16} fontWeight="600">{step}</Text>
                    </Flex>
                </Box>

                <Text fontSize={24} color="primary.300"
                    pl="3"
                    fontWeight={500}>
                    {heading}
                </Text>

            </Flex>

            {
                text && isElement(text) ? (
                    text
                ) : (
                    <Text
                        fontSize={14}
                        fontWeight={400}
                        marginBottom={29}
                    >
                        {text}
                    </Text>
                )
            }

            {list && (
                <>
                    <Text
                        fontSize={14}
                        fontWeight={400}
                        marginBottom={4}
                    >
                        {list.title}
                    </Text>
                    <ul style={{ marginBottom: 29 }}>
                        {list.items.map((itemText: any) => (
                            <li style={
                                {
                                    fontSize: 14,
                                    fontWeight: 400,
                                    marginBottom: 10,
                                    marginLeft: 20
                                }
                            }>
                                {itemText}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {buttonText &&
                <Button
                    variant={'solid'}
                    colorScheme={'orange'}
                    width={isSmallerThan450 ? "100%" : "250px"}
                    height="51px"
                    style={{
                        borderRadius: 100,
                        marginTop: text && isElement(text) ? 29 : 0
                    }}
                    size={'md'}
                    ml={isSmallerThan450 ? 0 : 4}
                    onClick={() => {
                        if (id === "create") {
                            Router.push({ pathname: "/listing/create" });
                        } else if (id === "about") {
                            Router.push({ pathname: "/about" });
                        } else if (id === "signup") {
                            Router.push({
                                pathname: '/how-to-use',
                                query: { signup: 'true' }
                            },
                                undefined, { shallow: true }
                            )

                        }
                    }}
                >
                    {buttonText}
                </Button>

            }
        </Box>
    )
}
