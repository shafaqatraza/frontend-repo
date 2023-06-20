import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Text,
  ModalOverlay,
  useDisclosure,
  Spacer,
} from "@chakra-ui/react";
import * as React from "react";
import { isMobile } from "react-device-detect";
import { modalMobileProps, modalContentMobileProps } from "../utils/modalProps";
import { Card } from "./Card";
import Navbar from "./Navbar";


interface ModelType {
  login: boolean,
  signUp: boolean
}
interface LoginFormProps {
  TitleModal: string;
  body: any;
  show: ModelType;
  setShow: any;
}

export const MyModal = (props: LoginFormProps) => {
  const { TitleModal, body, show, setShow } = props;
  return (
    <div >

      <Modal
        {...modalMobileProps}
        isOpen={show.login} onClose={() => {
          let dubShow = { ...show }
          dubShow.login = false
          setShow(false)
        }}>
        <ModalOverlay />
        <Spacer/>
          <ModalContent {...modalContentMobileProps}>
            {isMobile && (
              <Navbar />
            )}
            <ModalHeader textAlign="center" fontSize="30px"
              py={10}>
              {TitleModal}
            </ModalHeader>

            <ModalBody>
              <Card>{body}</Card>
            </ModalBody>
          </ModalContent>

       
      </Modal>
    </div>
  );
};
