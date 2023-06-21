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
import { AxiosResponse } from "axios";

interface Props {
  initialRef: React.LegacyRef<HTMLInputElement> | undefined;
  onClose: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  nextStep: () => void;
  prevStep: () => void;
  setUserExisted: React.Dispatch<React.SetStateAction<boolean>>;
  setNeedPwd: React.Dispatch<React.SetStateAction<boolean>>;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  currentStep: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

export interface CheckResponse {
  findUser: boolean;
  needPwd: boolean;
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
  setUserEmail,
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
    const axiosResponse: AxiosResponse = await checkEmail(input);
    if (axiosResponse.status !== 201) {
      toast({
        title: "Network Error",
        status: "error",
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    const res: CheckResponse = axiosResponse.data;
    setUserExisted(res.findUser);
    setNeedPwd(res.findUser && res.needPwd);
    if (res.findUser && res.needPwd && res.emailRes && res.userId) {
      if (res.emailRes.status !== "PENDING") {
        toast({
          title: "Failed to send verification email",
          status: "error",
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      setUserId(res.userId);
      setStep(4);
    } else {
      res.userId ? setUserId(res.userId) : null;
      nextStep();
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validate(input);
    setIsValidEmail(validation);
    if (validation) {
      setUserEmail(input);
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
