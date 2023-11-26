import {

    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,

} from "@chakra-ui/react";

import * as React from "react";
import { Card } from "../../Card";
import { modalMobileProps, modalContentMobileProps } from "../../../utils/modalProps";


interface ModelType {
    login: boolean,
    signUp: boolean,
    drawer: boolean,
    step1: boolean,
    step2: boolean,
    welcomeScreen1: boolean,
}
interface LoginFormProps {
    TitleModal: string;
    body: any;
    show: ModelType;
    setShow: any;
}

export const WelcomeScreen1 = (props: any) => {
    const { TitleModal, body, show, setShow } = props;
    return (
        <Modal isOpen={show} onClose={() => {
            setShow(false)
        }} 
        {...modalMobileProps}
        >
            <ModalOverlay />
            <ModalContent {...modalContentMobileProps}>
                <ModalHeader fontSize="30px" py={10}>
                    {TitleModal}
                </ModalHeader>
                <ModalBody>
                    <Card>{body}</Card>
                </ModalBody>
            </ModalContent>
        </Modal>

    );
};
