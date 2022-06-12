import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalFooter,
  useStyleConfig,
} from "@chakra-ui/react";
import { Flex, Text, Icon, Link } from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function LoginModalContent(props: Props) {
  const initialRef = React.useRef(null);
  const logoStyles = useStyleConfig("Logo");

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
      size={"sm"}
      initialFocusRef={initialRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex flexDir="column" alignItems="center" mt="40px" mb="20px">
            <Text sx={logoStyles} fontSize="2xl" mb="20px" role="logo">
              CourtCanva
            </Text>
            <Text fontSize="xl">Log in or sign up in seconds</Text>
            <Text fontSize="11px" textAlign="center" fontWeight="light">
              Use your email or Google account to continue with CourtCanva!
            </Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="20px">
          <Flex flexDir="column" justifyContent="space-around" gap="25px">
            <Button variant="loginBtn" position="relative" ref={initialRef}>
              <Icon w="28px" h="28px" position="absolute" top="11px" left="20px">
                <FcGoogle />
              </Icon>
              <Text>Continue with Google </Text>
            </Button>

            <Button variant="loginBtn" position="relative">
              <Icon w="28px" h="28px" position="absolute" top="12px" left="20px">
                <FaEnvelope />
              </Icon>
              <Text>Continue with email </Text>
            </Button>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Text fontSize="10px">
            By continuing, you agree to CourtCanva’s&nbsp;
            <Link href="#" textDecoration="underline" _hover={{ color: "fontcolor.third" }}>
              Terms of Use
            </Link>
            &nbsp;and read our&nbsp;
            <Link href="#" textDecoration="underline" _hover={{ color: "fontcolor.third" }}>
              Privacy Policy
            </Link>
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LoginModalContent;
