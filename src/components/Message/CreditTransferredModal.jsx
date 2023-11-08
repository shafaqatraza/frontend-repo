import {
    Box,
    Fade,
    ScaleFade,
    Input,
    Center,
    Text,
    Button
} from "@chakra-ui/react";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import { AiOutlineCheck } from "react-icons/ai";
import { useRouter } from "next/router";
import {
	userId,
} from '../../components/Helper/index'


const CreditTransferred = (props) => {
    const { show, onClose, getMessage,  messageInfo } = props;
    const router = useRouter();
    return (
        <Fade in={show}>
            <Box
                bg="transparent"
                p='10px'
                height={"100%"}
                rounded='md'
            >
                <GrFormClose
                    fontSize={"35px"}
                    cursor={"pointer"}
                    onClick={() => {
                        onClose()
                        // console.log('credit transfer')
                        getMessage(messageInfo.chat_id, messageInfo.receiver_id, messageInfo.listing_id, userId, {}, {})
                    }}
                />
                <Box pt={5} pb={10} pl={20} pr={20} >
                    <Text textAlign={"center"} fontWeight={600} fontSize={"24px"} mb={10}>Deed Dollars Transferred</Text>
                    <Center>
                        <Box
                            height={"150px"}
                            width={"150px"}
                            borderRadius={"50%"}
                            textAlign={"center"}
                            borderWidth={"3px"}
                            borderColor={"#E27832"}
                            alignItems={"center"}
                            display={'flex'}
                            justifyContent={"center"}
                        >
                            <Box>
                                <AiOutlineCheck
                                    fontSize={36}
                                    color={"#E27832"}
                                    fontWeight={600} />
                            </Box>
                        </Box>
                    </Center>
                </Box>
                <Box textAlign={"center"} px={20}>
                    <Button w={"70%"} type="submit" mt={"5"} colorScheme="orange" size="md" fontSize="md"
                        onClick={() => {
                            router.push("/profile")
                        }}
                    >
                        See Wallet
                    </Button>
                </Box>
            </Box>
        </Fade >

    );
};

export default CreditTransferred;
