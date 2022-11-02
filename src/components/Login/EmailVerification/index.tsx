import {
  ModalHeader,
  ModalBody,
  Flex,
  Text,
  Icon,
  Divider,
  FormControl,
  Input,
  Button,
  ModalFooter,
  Link,
  useToast,
} from "@chakra-ui/react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import ModalOperator from "../ModalOperater";
import useAuthRequest from "../helpers/authRequest";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "@/store/reducer/userSlice";

type Props = {
  nextStep: () => void;
  prevStep: () => void;
  currentStep: string;
  validation: (verified: boolean) => void;
  updateLoginData: (data: any) => void;
  onClose: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  userEmail: string;
  userId: string;
  initialRef: React.MutableRefObject<null>;
  needPwd: boolean;
  setPwdStep: () => void;
};
const EmailVerification: React.FC<Props> = ({
  userEmail,
  nextStep,
  onClose,
  setStep,
  prevStep,
  userId,
  validation,
  updateLoginData,
  currentStep,
  needPwd,
  setPwdStep,
}) => {
  const toast = useToast();
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState(60);
  const dispatch = useDispatch();
  const { verifyOTP, resendOTP } = useAuthRequest();
  const CODE_LENGTH = 6;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (otp.length < CODE_LENGTH) {
      setErrorMessage("Please input a 6 digits number!");
      return;
    }
    try {
      const { data } = await verifyOTP(userId, otp);
      if (data.tokens) {
        if (needPwd) setPwdStep();
        localStorage.setItem("UserInfo", JSON.stringify(data));
        dispatch(updateUserInfo(data));
        updateLoginData(data);
        validation(true);
      } else {
        validation(false);
        nextStep();
      }
    } catch (err) {
      toast({
        title: "Network Error",
        status: "error",
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
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
    resetTimer();
  };
  const handleOtpInput = (value: string) => {
    const verificationCode = value.length > CODE_LENGTH ? value.substring(0, CODE_LENGTH) : value;
    setOtp(verificationCode);
  };
  const handleCloseModal = () => {
    onClose();
    setStep(1);
  };
  const resetTimer = () => setTimer(60);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer < 1) {
        clearInterval(interval);
        return;
      }
      setTimer((timer) => timer - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return (
    <>
      <ModalOperator
        handleCloseModal={handleCloseModal}
        prevStep={prevStep}
        currentStep={currentStep}
      />
      <ModalHeader width="100%">
        <Flex flexDir="column" alignItems="center">
          <Icon width="240px" height="180px" viewBox="0 0 800 600" role="logo">
            <MainLogoSvg />
          </Icon>
          <Text fontSize="sm" textAlign="center">
            Please enter the 6 digits code sent to
            <Text color="brand.secondary">{userEmail}</Text>
          </Text>
          <Divider />
          <Text fontSize="md" color="red.500">
            {errorMessage}
          </Text>
        </Flex>
      </ModalHeader>
      <ModalBody>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "300px",
          }}
          onSubmit={handleSubmit}
        >
          <FormControl width="100px" isRequired>
            <Input
              name="verifyCode"
              type="number"
              // fontSize="1rem"
              textAlign="center"
              value={otp}
              onChange={(event) => handleOtpInput(event?.currentTarget.value)}
            />
          </FormControl>
          <Button variant="shareBtn" width="300px" marginTop="20px" onClick={handleSubmit}>
            Verify
          </Button>
        </form>
      </ModalBody>
      <ModalFooter marginBottom="20px" display="flex" flexDirection="column">
        <Text fontSize="10px">
          Did not receive the email? You can resend it in {timer}
          {timer >= 1 ? " seconds" : " second"}
        </Text>
        <Link
          href="#"
          fontSize="xs"
          textDecoration="underline"
          cursor={timer >= 1 ? "not-allowed" : "pointer"}
          _hover={timer >= 1 ? { color: "black" } : { color: "brand.secondary" }}
          onClick={handleResend}
        >
          Resend
        </Link>
      </ModalFooter>
    </>
  );
};

export default EmailVerification;
