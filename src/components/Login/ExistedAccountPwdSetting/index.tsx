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
  onClose: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  userEmail: string;
  currentStep: string;
};

const ExistedAccountPwdSetting: React.FC<Props> = ({
  setStep,
  onClose,
  currentStep,
  userEmail,
}) => {
  const closeModal = () => {
    onClose();
    setStep(1);
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
    const passwordRegExp =
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[a-zA-Z\d `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{8,}$/; // eslint-disable-line
    if (!passwordRegExp.test(password)) {
      setErrorMessage("");
      setWeakPasswordMsg(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character!"
      );
      return;
    }
    try {
      await updateUser({
        email: userEmail,
        password: password,
      });
      toast({
        title: "Operation success! Please login again",
        status: "success",
        isClosable: true,
        position: "top",
      });
      closeModal();
    } catch (err) {
      toast({
        title: "network error",
        status: "error",
        isClosable: true,
        position: "top",
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
      <ModalHeader width="100%" marginTop="-20px">
        <Flex flexDir="column" alignItems="center">
          <Icon width="240px" height="180px" viewBox="0 0 800 600" role="logo">
            <MainLogoSvg />
          </Icon>
          <Text fontSize="xl" textAlign="center">
            Please set your password
            <Text color="brand.secondary" fontSize="sm">
              {userEmail}
            </Text>
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