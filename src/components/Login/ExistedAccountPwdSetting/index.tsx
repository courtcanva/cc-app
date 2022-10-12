import ModalOperator from "@/components/Login/ModalOperater";
import {
  Button,
  Divider,
  Flex,
  Icon,
  ModalBody,
  ModalHeader,
  Text,
  useToast,
} from "@chakra-ui/react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import PwdInputGroup from "@/components/Login/PwdInputGroup";
import React, { useState } from "react";
import { updateUser } from "@/components/Login/helpers/userRequests";

type Props = {
  prevStep: () => void;
  onClose: any;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  userEmail: string;
  currentStep: string;
};

const ExistedAccountPwdSetting: React.FC<Props> = ({
  setStep,
  onClose,
  prevStep,
  currentStep,
  userEmail,
}) => {
  const handleCloseModal = () => {
    setStep(1);
    onClose();
  };
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [weakPasswordMsg, setWeakPasswordMsg] = useState("");
  const toast = useToast();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password === "" || confirmPassword === "") {
      setWeakPasswordMsg("");
      setErrorMessage("Please fill all fields with asterisk!");
      return;
    }
    if (password !== confirmPassword) {
      setWeakPasswordMsg("");
      setErrorMessage("Password does not match!");
      return;
    }
    // regular expression from https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegExp.test(password)) {
      setErrorMessage("");
      setWeakPasswordMsg(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number!"
      );
      return;
    }
    try {
      const res = await updateUser({
        email: userEmail,
        password: password,
      });
      if (res.status === 200) {
        toast({
          title: "Password set successfully! Please login again",
          status: "success",
          isClosable: true,
        });
        setStep(1);
        onClose();
      }
    } catch (err) {
      toast({
        title: "network error",
        status: "error",
        isClosable: true,
      });
    }
  };
  return (
    <>
      <ModalOperator
        handleCloseModal={handleCloseModal}
        prevStep={prevStep}
        currentStep={currentStep}
      />
      <ModalHeader width="100%" marginTop="-20px">
        <Flex flexDir="column" alignItems="center">
          <Icon width="240px" height="180px" viewBox="0 0 800 600" role="logo">
            <MainLogoSvg />
          </Icon>
          <Text fontSize="sm" textAlign="center">
            To login by email, please set password for
            <Text color="brand.secondary">{userEmail}</Text>
          </Text>
          <Divider />
          <Text fontSize="md" color="red.500">
            {errorMessage}
          </Text>
        </Flex>
      </ModalHeader>
      <ModalBody>
        <Flex flexDir="column" alignItems="center">
          <form style={{ marginBottom: "30px", width: "300px" }} onSubmit={handleSubmit}>
            <PwdInputGroup
              label="Password"
              value={password}
              onChange={(event) => setPassword(event?.currentTarget.value)}
            />
            <PwdInputGroup
              label="Confirm Password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event?.currentTarget.value)}
            />
            {weakPasswordMsg.length > 0 && (
              <Text fontSize="xs" color="red.500">
                {weakPasswordMsg}
              </Text>
            )}
            <Button variant="shareBtn" width="300px" marginTop="20px" onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        </Flex>
      </ModalBody>
    </>
  );
};

export default ExistedAccountPwdSetting;
