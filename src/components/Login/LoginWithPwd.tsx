import {
  ModalHeader,
  ModalBody,
  Flex,
  Text,
  Icon,
  Divider,
  Button,
  useToast,
} from "@chakra-ui/react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import React, { useState } from "react";
import PwdInputGroup from "./PwdInputGroup";
import ModalOperator from "./ModalOperater";
import useAuthRequest from "./helpers/authRequest";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "@/store/reducer/userSlice";

type Props = {
  prevStep: () => void;
  nextStep: () => void;
  onClose: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setNeedPwd: React.Dispatch<React.SetStateAction<boolean>>;
  userEmail: string;
  userId: string;
  initialRef: React.MutableRefObject<null>;
  updateLoginData: (data: any) => void;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  currentStep: string;
};

const LoginWithPwd: React.FC<Props> = (props: Props) => {
  const {
    prevStep,
    nextStep,
    userEmail,
    onClose,
    setStep,
    updateLoginData,
    setUserId,
    currentStep,
    setNeedPwd,
    userId,
  } = props;
  const [password, setPassword] = useState("");
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const { userLogin, resendOTP } = useAuthRequest();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleForgotPwd = async () => {
    const res = await resendOTP(userId, userEmail);
    if (res.status !== 201) {
      toast({
        title: "Network Error",
        status: "error",
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (res.data.status !== "PENDING") {
      toast({
        title: "Failed to send verification email",
        status: "error",
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    // setNeedPwd(true);
    // setStep(4);
  };
  const closeModal = () => {
    onClose();
    setStep(1);
  };
  const handlePassword = (value: string) => {
    setIsLoginFailed(false);
    setPassword(value);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await userLogin(userEmail, password);
      if (response.status !== 200) {
        if (response.status === 403) {
          setIsLoginFailed(true);
          return;
        } else {
          toast({
            title: "Network Error",
            status: "error",
            isClosable: true,
            position: "bottom",
          });
          return;
        }
      }
      const data = response.data;
      setUserId(data.userId);
      if (data.isActivated) {
        localStorage.setItem("UserInfo", JSON.stringify(data));
        dispatch(updateUserInfo(data));
        updateLoginData(data);
        toast({
          title: "Login successful! Enjoy designing!",
          status: "success",
          isClosable: true,
          position: "bottom",
        });
        closeModal();
      } else {
        await resendOTP(data.userId, userEmail);
        nextStep();
      }
    } catch (err) {
      setIsLoginFailed(true);
    }
  };
  return (
    <>
      <ModalOperator handleCloseModal={closeModal} prevStep={prevStep} currentStep={currentStep} />
      <ModalHeader width="100%" marginTop="-20px">
        <Flex flexDir="column" alignItems="center">
          <Icon width="240px" height="180px" viewBox="0 0 800 600" role="logo">
            <MainLogoSvg />
          </Icon>
          <Text fontSize="sm" textAlign="center">
            Login with
            <Text color="brand.secondary">{userEmail}</Text>
          </Text>
          <Divider />
          <Text fontSize="md" color={isLoginFailed ? "red.500" : "black"}>
            {isLoginFailed ? "Incorrect password!" : ""}
          </Text>
        </Flex>
      </ModalHeader>
      <ModalBody>
        <Flex flexDir="column" alignItems="center">
          <form style={{ marginBottom: "30px", width: "300px" }} onSubmit={handleSubmit}>
            <PwdInputGroup
              label="Password"
              value={password}
              onChange={(event) => handlePassword(event?.currentTarget.value)}
            />
            <Button variant="shareBtn" width="300px" marginTop="20px" type="submit">
              Continue Login
            </Button>
            <Button variant="link" width="300px" marginTop="15px" onClick={handleForgotPwd}>
              <Text fontSize="15px">Forgot password?</Text>
            </Button>
          </form>
        </Flex>
      </ModalBody>
    </>
  );
};
export default LoginWithPwd;
