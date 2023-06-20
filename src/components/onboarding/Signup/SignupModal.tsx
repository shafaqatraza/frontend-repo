import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton
} from "@chakra-ui/react";
import * as React from "react";
import { isMobile } from "react-device-detect";
import { modalMobileProps, modalContentMobileProps } from "../../../utils/modalProps";
import { Card } from "../../Card";
import Navbar from "../../Navbar";

interface ModelType {
  login: boolean;
  signUp: boolean;
}
interface LoginFormProps {
  TitleModal: string;
  body: any;
  show: ModelType;
  setShow: any;
}

export const SignupModal = (props: LoginFormProps) => {
  const { TitleModal, body, show, setShow } = props;
  // const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Modal
      {...modalMobileProps}
      isOpen={show.signUp}
      onClose={() => {
        let dubShow = { ...show };
        dubShow.signUp = false;
        setShow(false);
      }}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent {...modalContentMobileProps}>
        {isMobile && (
          <Navbar />
        )}
        <ModalHeader textAlign="center" py={10} fontSize="30px">
          {TitleModal}
          {!isMobile && (
            <ModalCloseButton />
          )}
        </ModalHeader>

        <ModalBody>
          <Card>{body}</Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
