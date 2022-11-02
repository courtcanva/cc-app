import {
  ModalHeader,
  ModalBody,
  Flex,
  Text,
  Icon,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import React, { useState } from "react";
import PwdInputGroup from "./PwdInputGroup";
import ModalOperator from "./ModalOperater";
import useAuthRequest from "./helpers/authRequest";
import validatePwd from "@/components/Login/helpers/validatePwd";

type Props = {
  nextStep: () => void;
  prevStep: () => void;
  onClose: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  userEmail: string;
  initialRef: React.MutableRefObject<null>;
  currentStep: string;
};

const Register: React.FC<Props> = (props: Props) => {
  const { nextStep, prevStep, userEmail, onClose, setStep, setUserId, currentStep } = props;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [weakPasswordMsg, setWeakPasswordMsg] = useState("");
  const { userRegister } = useAuthRequest();
  const toast = useToast();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (firstName === "" || lastName === "" || password === "" || confirmPassword === "") {
      setWeakPasswordMsg("");
      setErrorMessage("Please fill all fields with asterisk!");
      return;
    }
    if (!validatePwd(password, confirmPassword, setWeakPasswordMsg, setErrorMessage)) return;
    const userInfo = {
      email: userEmail,
      password,
      firstName,
      lastName,
    };
    const res = await userRegister(userInfo);
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
    setUserId(res.data.userId);
    nextStep();
  };
  const handleCloseModal = () => {
    setStep(1);
    onClose();
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
            Sign up with
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
            <Flex gap="10px">
              <FormControl isRequired>
                <FormLabel>First name</FormLabel>
                <Input
                  placeholder="First name"
                  value={firstName}
                  onChange={(event) => setFirstName(event?.currentTarget.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last name</FormLabel>
                <Input
                  placeholder="Last name"
                  value={lastName}
                  onChange={(event) => setLastName(event?.currentTarget.value)}
                />
              </FormControl>
            </Flex>
            <div style={{ marginTop: "8px" }}>
              <PwdInputGroup
                label="Password"
                value={password}
                onChange={(event) => setPassword(event?.currentTarget.value)}
              />
            </div>
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
              Create Account
            </Button>
          </form>
        </Flex>
      </ModalBody>
    </>
  );
};

export default Register;
