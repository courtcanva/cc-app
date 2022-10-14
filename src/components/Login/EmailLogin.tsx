import {
  ModalHeader,
  ModalBody,
  Button,
  Flex,
  Text,
  Icon,
  Divider,
  FormControl,
  Input,
  useToast,
  FormLabel,
} from "@chakra-ui/react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import React, { useEffect, useState } from "react";
import useAuthRequest from "@/components/Login/helpers/authRequest";
import ModalOperator from "./ModalOperater";

interface Props {
  initialRef: React.LegacyRef<HTMLInputElement> | undefined;
  onClose: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  nextStep: () => void;
  prevStep: () => void;
  setUserExisted: React.Dispatch<React.SetStateAction<boolean>>;
  setNeedPwd: React.Dispatch<React.SetStateAction<boolean>>;
  inputEmail: (input: string) => void;
  currentStep: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

interface checkResponse {
  findUser: boolean;
  needPwd?: boolean;
  emailRes?: {
    status: string;
    message: string;
  };
  userId?: string;
}

const EmailLogin: React.FC<Props> = ({
  initialRef,
  nextStep,
  prevStep,
  setUserExisted,
  inputEmail,
  onClose,
  setStep,
  currentStep,
  setNeedPwd,
  setUserId,
}) => {
  const [input, setInput] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const { checkEmail } = useAuthRequest();

  const toast = useToast();
  useEffect(() => {
    setIsEmpty(!input);
  }, [input]);

  const validate = (email: string) => {
    // regular expression from https://www.freakyjolly.com/react-form-custom-validation-with-error-message-example/
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
  };

  const handleEmailCheck = async () => {
    try {
      const res: checkResponse = (await checkEmail(input)).data;
      setUserExisted(res.findUser);
      if (res.findUser && res.needPwd && res.emailRes && res.userId) {
        // if (res.emailRes.status !== "PENDING") {
        //   throw Error("Failed to send verification email");
        // }
        setNeedPwd(true);
        setUserId(res.userId);
        setStep(4);
      } else {
        nextStep();
      }
    } catch (err) {
      toast({
        title: err instanceof Error ? err.message : "network error",
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validate(input);
    setIsValidEmail(validation);
    if (validation) {
      inputEmail(input);
      handleEmailCheck();
    }
  };
  const handleCloseModal = () => {
    onClose();
    setStep(1);
  };
  return (
    <>
      <ModalOperator
        handleCloseModal={handleCloseModal}
        prevStep={prevStep}
        currentStep={currentStep}
      />
      <ModalHeader width="100%" marginTop="-20px">
        <Flex flexDir="column" alignItems="center" width="100%">
          <Icon width="240px" height="180px" viewBox="100 0 600 600" role="logo">
            <MainLogoSvg />
          </Icon>
          <Text fontSize="md" marginTop="10px">
            Continue with Email
          </Text>
          <Divider />
        </Flex>
      </ModalHeader>
      <ModalBody width="100%" marginTop="10px" marginBottom="30px">
        <FormControl display="flex" flexDirection="column">
          <FormLabel fontSize="sm" color={isValidEmail ? "black" : "red.500"}>
            {isValidEmail ? "Please enter your email address!" : "Please enter a valid email!"}
          </FormLabel>
          <Input
            id="email"
            type="email"
            required
            value={input}
            ref={initialRef}
            role="emailInput"
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
          />
          <Button
            variant="loginBtn"
            position="relative"
            marginY="10px"
            isDisabled={isEmpty}
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </FormControl>
      </ModalBody>
    </>
  );
};

export default EmailLogin;
