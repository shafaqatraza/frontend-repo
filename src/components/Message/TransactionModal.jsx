import {
    Box,
    Fade,
    ScaleFade,
    Input,
    Center,
    Text,
    Button,
    CSSReset,
    Textarea
} from "@chakra-ui/react";
import {
	userId,
} from '../../components/Helper/index'
import React from "react";
import { GrFormClose } from "react-icons/gr";
const TransactionModal = (props) => {
    const { show, onClose, submitTransactionReport, transactionReportText, setTransactionReportText, getMessage, messageInfo } = props;
    // getMessage(data.chat_id, data.receiver_id, data.listing_id, data.sender_id, {}, {});

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
                        // console.log('transaction modal')
                        getMessage(messageInfo.chat_id, messageInfo.receiver_id, messageInfo.listing_id, userId, {}, {})
                    }}
                />
                <Box pt={10} pb={10} pl={20} pr={20} textAlign="left" >
                    <Text textAlign={"left"} fontWeight={600} fontSize={"24px"} mb={"15px"}>How can we help?</Text>
                    <Text mb={"15px"}>A safe and secure community is important to  Good Deeds. Reports will logged, tracked and
                        be dealt with according to its severity.
                    </Text>
                    <Textarea
                        variant="filled"
                        rows={5}
                        placeholder="Compose your message here"
                        type="text"
                        defaultValue={transactionReportText}
                        maxLength={255}
                        onChange={(e) => {
                            setTransactionReportText(e.target.value)
                        }}
                    />
                </Box>

                <Box textAlign={"center"} px={20}>
                    <Center>
                        <Button w={"100%"} type="submit" mt={"5"} colorScheme="orange" size="lg" fontSize="md"
                            
                            onClick={() => submitTransactionReport()} >
                            Submit
                        </Button>
                    </Center>
                </Box>
            </Box>
        </Fade >

    );
};

export default TransactionModal;