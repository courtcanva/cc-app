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
import { CheckEmailRes } from "@/components/Login/EmailLogin";

type Props = {
  nextStep: () => void;
  prevStep: () => void;
  validation: (verified: boolean) => void;
  updateLoginData: (data: any) => void;
  onClose: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  userEmail: string;
  userId: string;
  initialRef: React.MutableRefObject<null>;
  userWithoutPwd: CheckEmailRes | null;
  pwd: string | null;
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
  userWithoutPwd,
  pwd,
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
      setErrorMessage("Please Input a 6 digits number!");
      return;
    }
    try {
      const { data } = await verifyOTP(userId, otp);
      if (userWithoutPwd) {
        if (data.tokens) {
          localStorage.setItem("UserInfo", JSON.stringify(data));
          dispatch(updateUserInfo(data));
          updateLoginData(data);
          validation(true);
          nextStep();
        } else {
          validation(false);
          nextStep();
        }
      } else {
        //
      }
    } catch (err) {
      toast({
        title: "network error",
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    try {
      await resendOTP(userId, userEmail);
    } catch (err) {
      toast({
        title: "network error",
        status: "error",
        isClosable: true,
      });
    }
    resetTimer();
  };
  const handleOtpInput = (value: string) => {
    const verificationCode = value.length > CODE_LENGTH ? value.substring(0, CODE_LENGTH) : value;
    setOtp(verificationCode);
  };
  const handleCloseModal = () => {
    setStep(1);
    onClose();
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
      <ModalOperator handleCloseModal={handleCloseModal} prevStep={prevStep} />
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
