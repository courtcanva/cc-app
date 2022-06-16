import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalFooter,
  Flex,
  Text,
  Icon,
  Link,
} from "@chakra-ui/react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import { IconContext } from "react-icons";
import { FaEnvelope } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function LoginModalContent(props: Props) {
  const initialRef = React.useRef(null);

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
          <Flex flexDir="column" alignItems="center" marginTop="20px">
            <Icon width="240px" height="180px" viewBox="0 0 800 600" role="logo">
              <MainLogoSvg />
            </Icon>
            <Text fontSize="xl">Log in or sign up in seconds</Text>
            <Text fontSize="11px" textAlign="center" fontWeight="light" marginTop="15px">
              Use your email or Google account to continue with CourtCanva!
            </Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton role="closeButton" />
        <ModalBody>
          <Flex flexDir="column" justifyContent="space-around" gap="25px" paddingX="20px">
            <Button variant="loginBtn" position="relative" ref={initialRef}>
              <Icon w="32px" h="32px" position="absolute" top="8px" left="20px">
                <FcGoogle />
              </Icon>
              <Text>Continue with Google </Text>
            </Button>
            <Button variant="loginBtn" position="relative">
              <IconContext.Provider value={{ color: "#FF5439", className: "global-class-name" }}>
                <Icon w="32px" h="32px" position="absolute" top="8px" left="20px">
                  <FaEnvelope />
                </Icon>
              </IconContext.Provider>
              <Text>Continue with email </Text>
            </Button>
          </Flex>
        </ModalBody>
        <ModalFooter marginBottom="60px">
          <Text fontSize="10px">
            By continuing, you agree to CourtCanva’s&nbsp;
            <Link href="#" textDecoration="underline" _hover={{ color: "fontcolor.tertiary" }}>
              Terms of Use
            </Link>
            &nbsp;and read our&nbsp;
            <Link href="#" textDecoration="underline" _hover={{ color: "fontcolor.tertiary" }}>
              Privacy Policy
            </Link>
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LoginModalContent;