import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Box,
    Text,
    Textarea,
    Button,
    Spacer
} from "@chakra-ui/react";
import { CloseIcon } from '@chakra-ui/icons'
import * as React from "react";
import {isMobile} from 'react-device-detect';

export const ReportThankYouModal = (props) => {
    const { show, setShow, size } = props;
    return (
        <Modal
            isOpen={show}
            onClose={() => setShow(false)}
            size={size}
            isCentered
        >
            <ModalOverlay />
            <ModalContent style={isMobile ? { width:'90%', borderRadius: '5%'} : {}}>
                <ModalBody>
                    <Box
                        px={{ base: '0', md: '12', lg: '12' }}
                        py={{ base: '12', md: '12', lg: '24' }}
                        rounded={{ sm: 'lg' }}
                        {...props}
                    >
                         {isMobile ? <CloseIcon onClick={() => setShow(false)} mb={10} mt={-10}/> : null}
                        <Text fontWeight={"semibold"} fontSize={32} pb={5}  >Thank You!</Text>
                        <Text fontWeight={"500"} color={"black"} fontSize={15} pb={5}>This post has successfully been reported. Our admins will review the report within the next 24 hours.
                        </Text>
                        <Text fontWeight={"500"} color={"black"}>Any further questions can be emailed to us at</Text>
                        <Text fontWeight={"bold"} color='orange.500'>info@gooddeeds.ca</Text>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>

    );
};
