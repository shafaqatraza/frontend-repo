import {
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { Card } from "../../Card";
import { MyModal } from "../../MyModal";
import { SignupForm } from "../Signup/SignupForm";
import { LoginForm } from "./LoginForm";

export const LoginModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Text onClick={onOpen} ml={3} style={{ cursor: "pointer" }}>
        Sign Up or Login
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}  >
        {/* <ModalOverlay /> */}
        <ModalContent>
          <ModalHeader textAlign="center" py={10}>
            Log In
          </ModalHeader>

          <ModalBody>
            <Card>
              <LoginForm />
            </Card>

          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
