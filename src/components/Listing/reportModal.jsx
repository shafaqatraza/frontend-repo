import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Box,
    Text,
    Textarea,
    Button
} from "@chakra-ui/react";

import React, { useState } from "react";
import { isMobile } from 'react-device-detect';
import { CloseIcon } from '@chakra-ui/icons'

export const ReportModal = (props) => {
    const { show, setShow, size, onReportSubmit, isReportSubmitLoading } = props;
    const [message, setMessage] = useState("");

    return (
        <Modal
            isOpen={show}
            onClose={() => setShow(false)}
            size={size}
            isCentered

        >
            <ModalOverlay />
            <ModalContent style={isMobile ? { width: '90%', borderRadius: '5%' } : {}}>
                {/* <ModalCloseButton left={0} _focus={{ boxShadow: "none" }} /> */}
                <ModalBody
                >
                    <Box
                        px={{ base: '0', md: '12', lg: '12' }}
                        py={{ base: '12', md: '12', lg: '24' }}
                        rounded={{ sm: 'lg' }}

                        {...props}
                    >
                        {isMobile ? <CloseIcon onClick={() => setShow(false)} mb={10} mt={-10} style={{

                        }} /> : null}
                        <Text fontWeight={"semibold"} fontSize={28} pb={5}  >Report this post</Text>
                        <Text fontSize={15} pb={10}>
                            A safe and secure community is important to Good Deeds. Reports will be logged, tracked and dealt with within a 24-hour period.
                        </Text>
                        <Textarea
                            variant="filled"
                            rows={3}
                            placeholder="Write a message here..."
                            type="text"
                            maxLength={255}
                            mb={2}
                            _active={{
                                borderColor: "transparent"
                            }}
                            _focus={{
                                border_color: "transparent"
                            }}
                            onChange={(e) => setMessage(e.target.value.trim())}
                        />
                        <Text color="#979797" fontSize="14px" textAlign="end" mb={5}>{message.length}/255</Text>
                        <Button
                            width={"100%"}
                            textAlign={"center"}
                            type="submit"
                            colorScheme="orange"
                            size="lg"
                            loadingText="Report Submitting"
                            isLoading={isReportSubmitLoading}
                            fontSize="md"
                            _focus={{
                                boxShadow: "none"
                            }}
                            disabled={(message === "" || isReportSubmitLoading) ? true : false}
                            onClick={() => {
                                onReportSubmit(message);
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>

    );
};
