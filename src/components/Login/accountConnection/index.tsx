import {
  Button,
  Flex,
  Icon,
  Link,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import { FcGoogle } from "react-icons/fc";
import ModalOperator from "@/components/Login/ModalOperater";
import { api } from "@/utils/axios";
import { GoogleLoginRes } from "@/components/Login/SelectLogin";
import { updateUserInfo } from "@/store/reducer/userSlice";
import { useStoreDispatch } from "@/store/hooks";

interface Props {
  existedUserInfo: GoogleLoginRes | null;
  setStep: Dispatch<SetStateAction<number>>;
  updateLoginData: (data: any) => void;
  onClose: () => void;
}

export const AccountConnection: React.FC<Props> = ({
  existedUserInfo,
  setStep,
  updateLoginData,
  onClose,
}) => {
  const dispatch = useStoreDispatch();
  const onConnect = async () => {
    const { data } = await api("/user/connect", {
      method: "put",
      requestData: {
        firstName: existedUserInfo?.firstName,
        lastName: existedUserInfo?.lastName,
        googleId: existedUserInfo?.googleId,
        email: existedUserInfo?.email,
        isActivated: true,
        otp: "",
      },
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
      console.warn(err);
    }
  };
  return (
    <>
      <ModalOperator handleCloseModal={() => setStep(1)} prevStep={() => setStep(1)} />
      <ModalHeader>
        <Flex flexDir="column" alignItems="center">
          <Icon width="240px" height="180px" viewBox="120 0 550 550" role="logo">
            <MainLogoSvg />
          </Icon>
          <Text fontSize="medium">An account with your Google email exists</Text>
          <Text fontSize="11px" textAlign="center" fontWeight="light" marginTop="15px">
            Do you want to connect your account with Google?
          </Text>
        </Flex>
      </ModalHeader>
      <ModalBody>
        <Flex flexDir="column" justifyContent="space-around" gap="25px" paddingX="20px">
          <Button variant="loginBtn" position="relative" onClick={onConnect}>
            <Icon w="32px" h="32px" position="absolute" top="8px" left="20px">
              <FcGoogle />
            </Icon>
            <Text marginLeft="35px">Connect with Google </Text>
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
};
