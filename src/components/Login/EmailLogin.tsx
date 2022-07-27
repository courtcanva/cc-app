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
  onClose: any;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  nextStep: () => void;
  prevStep: () => void;
  findUser: (isExisted: boolean) => void;
  inputEmail: (input: string) => void;
}

export default function EmailLogin(props: Props) {
  const { initialRef, nextStep, prevStep, findUser, inputEmail, onClose, setStep } = props;

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
      const { data } = await checkEmail(input);
      data ? findUser(true) : findUser(false);
      typeof data === "boolean" && nextStep();
    } catch (err) {
      toast({
        title: "network error",
        status: "error",
        isClosable: true,
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
    setStep(1);
    onClose();
  };
  return (
    <>
      <ModalOperator handleCloseModal={handleCloseModal} prevStep={prevStep} />
      <ModalHeader width="100%">
        <Flex flexDir="column" alignItems="center" width="100%">
          <Icon width="240px" height="180px" viewBox="120 0 600 600" role="logo">
            <MainLogoSvg />
          </Icon>
          <Divider />
          <Text fontSize="md" marginTop="20px">
            Continue with Email
          </Text>
        </Flex>
      </ModalHeader>
      <ModalBody width="100%" marginBottom="20px">
        <FormControl display="flex" flexDirection="column">
          <FormLabel size="4px" color={isValidEmail ? "black" : "red.500"}>
            {isValidEmail ? "Enter your email address!" : "Please enter a valid email!"}
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
}
