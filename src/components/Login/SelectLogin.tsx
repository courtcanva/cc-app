import {
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
import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { api } from "@/utils/axios";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "@/store/reducer/userSlice";

interface Props {
  onClose: () => void;
  updateLoginData: (data: any) => void;
  initialRef: React.LegacyRef<HTMLButtonElement> | undefined;
  nextStep: () => void;
  connectionStep: (existedUserInfo: GoogleLoginRes) => void;
}

export interface GoogleLoginRes {
  googleId: string;
  email: string;
  firstName: string;
  lastName: string;
  needConnection: boolean;
}

export default function SelectLogin(props: Props) {
  const dispatch = useDispatch();
  const { onClose, updateLoginData, initialRef, nextStep, connectionStep } = props;

  // Send request to backend after the request from front-end has been approved by Google
  /* istanbul ignore next */
  const handleSuccess = async (codeResponse: any) => {
    const { data } = await api("/auth/google", {
      method: "post",
      requestData: codeResponse,
    });
    const googleLoginRes: GoogleLoginRes = data;
    try {
      if (!googleLoginRes.needConnection) {
        // Store user data into local storage after logging
        localStorage.setItem("UserInfo", JSON.stringify(data));
        dispatch(updateUserInfo(data));
        updateLoginData(data);
        onClose();
      } else {
        connectionStep(googleLoginRes);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Send authorization request to Google's Oauth server
  const handleLogin = useGoogleLogin({
    onSuccess: handleSuccess, // The method which would execute after authorization
    flow: "auth-code", // Authorization flow
  });
  return (
    <>
      <ModalHeader>
        <Flex flexDir="column" alignItems="center">
          <Icon width="240px" height="180px" viewBox="120 0 550 550" role="logo">
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
            <Text marginLeft="35px">Continue with Google </Text>
          </Button>

          <Button variant="loginBtn" position="relative" onClick={nextStep}>
            <IconContext.Provider value={{ color: "#FF5439", className: "global-class-name" }}>
              <Icon w="32px" h="32px" position="absolute" top="8px" left="20px">
                <FaEnvelope />
              </Icon>
            </IconContext.Provider>
            <Text marginLeft="35px">Continue with Email </Text>
          </Button>
        </Flex>
      </ModalBody>
      <ModalFooter marginBottom="20px">
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
    </>
  );
}
