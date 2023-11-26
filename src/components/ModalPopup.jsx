import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Box,
    ModalCloseButton
} from "@chakra-ui/react";

import * as React from "react";

export const ModalPopup = (props) => {
    const { TitleModal, body, show, setShow, size } = props;
    return (
        <Modal
            isOpen={show}
            onClose={() => setShow(false)}
            size={size}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton left={2} _focus={{ boxShadow: "none" }} />
                <ModalHeader fontSize={22} textAlign="center" pb={0} pt={10} pr={10} pl={10}>
                    {TitleModal}
                </ModalHeader>
                <ModalBody>
                    <Box
                        px={{ base: '2', md: '2' }}
                        rounded={{ sm: 'lg' }}
                        {...props}
                    >
                        {body}

                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>

    );
};
