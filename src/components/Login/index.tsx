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
  useToast,
} from "@chakra-ui/react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import { IconContext } from "react-icons";
import { FaEnvelope } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { api } from "../../utils/axios";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "@/store/reducer/userSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  updateLoginData: (data: any) => void;
}

const LoginModalContent = (props: Props) => {
  const initialRef = React.useRef(null);
  const dispatch = useDispatch();
  const { updateLoginData, onClose, isOpen } = props;

  // Send request to backend after the request from front-end has been approved by Google
  /* istanbul ignore next */
  const handleSuccess = async (codeResponse: any) => {
    const { data } = await api("/auth/google", {
      method: "post",
      requestData: codeResponse,
    });
    try {
      if (data) {
        // Store user data into local storage after logging
        localStorage.setItem("UserInfo", JSON.stringify(data));
        dispatch(updateUserInfo(data));
        updateLoginData(data);
        onClose();
      }
    } catch (err) {
      const toast = useToast();
      toast({
        title: "network error",
        status: "error",
        isClosable: true,
      });
      return;
    }
  };

  // Send authorization request to Google's Oauth server
  const handleLogin = useGoogleLogin({
    onSuccess: handleSuccess, // The method which would execute after authorization
    flow: "auth-code", // Authorization flow
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm" initialFocusRef={initialRef}>
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
            <Button
              onClick={() => handleLogin()}
              variant="loginBtn"
              position="relative"
              ref={initialRef}
            >
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
};

export default LoginModalContent;
