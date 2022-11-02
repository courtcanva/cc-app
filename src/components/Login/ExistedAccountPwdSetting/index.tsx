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
import validatePwd from "@/components/Login/helpers/validatePwd";
import { AxiosResponse } from "axios";

type Props = {
  onClose: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  userEmail: string;
  currentStep: string;
  userId: string;
};

const ExistedAccountPwdSetting: React.FC<Props> = ({
  setStep,
  onClose,
  currentStep,
  userEmail,
  userId,
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
    if (!validatePwd(password, confirmPassword, setWeakPasswordMsg, setErrorMessage)) return;
    const res: AxiosResponse = await updateUser({
      userId: userId,
      password: password,
    });
    if (res.status !== 200) {
      toast({
        title: "Operation failed, please try again",
        status: "error",
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    toast({
      title: "Operation successful! Please login again",
      status: "success",
      isClosable: true,
      position: "bottom",
    });
    closeModal();
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
            <div style={{ marginTop: "8px" }}>
              <PwdInputGroup
                label="Confirm password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event?.currentTarget.value)}
              />
            </div>
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
