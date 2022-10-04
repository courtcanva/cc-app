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
import React, { Dispatch, SetStateAction, useState } from "react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import ModalOperator from "@/components/Login/ModalOperater";
import PwdInputGroup from "@/components/Login/PwdInputGroup";

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
  setPwd: Dispatch<SetStateAction<string | null>>;
}

const PwdSetting: React.FC<Props> = ({ setStep, setPwd }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [weakPasswordMsg, setWeakPasswordMsg] = useState("");
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
    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    if (!passwordRegExp.test(password)) {
      setErrorMessage("");
      setWeakPasswordMsg(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character!"
      );
      return;
    }
    setPwd(password);
    setStep(4);
  };
  // if this call is needed else where in the future, please move it to redux
  return (
    <>
      <ModalOperator handleCloseModal={() => setStep(1)} prevStep={() => setStep(1)} />
      <ModalHeader>
        <Flex flexDir="column" alignItems="center">
          <Icon width="240px" height="180px" viewBox="120 0 550 550" role="logo">
            <MainLogoSvg />
          </Icon>
          <Text fontSize="medium">Your account has no password</Text>
          <Text fontSize="11px" textAlign="center" fontWeight="light" marginTop="15px">
            An account with the same email is registered through Google, do you want to set password
            for it?
          </Text>
        </Flex>
      </ModalHeader>
      <Text fontSize="md" color="red.500">
        {errorMessage}
      </Text>
      <ModalBody>
        <Flex flexDir="column" justifyContent="space-around" gap="25px" paddingX="20px">
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

export default PwdSetting;
