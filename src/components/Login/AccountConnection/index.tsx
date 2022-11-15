import {
  Button,
  Flex,
  Icon,
  Link,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import { FcGoogle } from "react-icons/fc";
import ModalOperator from "@/components/Login/ModalOperater";
import { api } from "@/utils/axios";
import { GoogleLoginRes } from "@/components/Login/SelectLogin";
import { updateUserInfo } from "@/store/reducer/userSlice";
import { useStoreDispatch } from "@/store/hooks";
import { IUser } from "@/interfaces/user";

interface Props {
  existedUserInfo: GoogleLoginRes | null;
  setStep: Dispatch<SetStateAction<number>>;
  updateLoginData: (data: IUser) => void;
  onClose: () => void;
  currentStep: string;
}

const AccountConnection: React.FC<Props> = ({
  existedUserInfo,
  setStep,
  updateLoginData,
  onClose,
  currentStep,
}) => {
  const toast = useToast();
  const dispatch = useStoreDispatch();
  const closeModal = () => {
    onClose();
    setStep(1);
  };
  // if this call is needed else where in the future, please move it to redux
  const onConnect = async () => {
    try {
      const axiosResponse = await api("/user/connect", {
        method: "put",
        requestData: {
          googleId: existedUserInfo?.googleId,
          email: existedUserInfo?.email,
        },
      });
      const loginRes: GoogleLoginRes = axiosResponse.data;
      console.log(axiosResponse, "Account connection");
      const userInfo: IUser = {
        userId: loginRes.userId,
        email: loginRes.email,
        firstName: loginRes.firstName,
        lastName: loginRes.lastName,
      };
      localStorage.setItem("UserInfo", JSON.stringify(userInfo));
      dispatch(updateUserInfo(userInfo));
      updateLoginData(userInfo);
      toast({
        title: "Connection successful! Enjoy designing!",
        status: "success",
        isClosable: true,
        position: "bottom",
      });
      closeModal();
    } catch (err) {
      toast({
        title: "Connection failed, please try again",
        status: "error",
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <>
      <ModalOperator
        handleCloseModal={closeModal}
        prevStep={() => setStep(1)}
        currentStep={currentStep}
      />
      <ModalHeader>
        <Flex flexDir="column" alignItems="center">
          <Icon width="240px" height="180px" viewBox="120 0 550 550" role="logo">
            <MainLogoSvg />
          </Icon>
          <Text fontSize="17px" textAlign="center">
            Account registered by your email exists
          </Text>
          <Text fontSize="11px" textAlign="center" fontWeight="light" marginTop="15px">
            To continue, please connect your existing account with your Google account
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

export default AccountConnection;
