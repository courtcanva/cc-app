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
  FormHelperText,
  FormErrorMessage,
  useToast,
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
          <Text fontSize="xl" marginTop="20px">
            Continue with Email
          </Text>
        </Flex>
      </ModalHeader>
      <ModalBody width="100%">
        <FormControl isInvalid={!isValidEmail}>
          {isValidEmail ? (
            <FormHelperText
              fontSize="11px"
              textAlign="center"
              fontWeight="light"
              marginBottom="15px"
            >
              Enter your email address!
            </FormHelperText>
          ) : (
            <FormErrorMessage
              fontSize="11px"
              justifyContent="center"
              fontWeight="light"
              marginBottom="15px"
            >
              Please enter a valid email!
            </FormErrorMessage>
          )}
          <Flex
            flexDir="column"
            justifyContent="space-around"
            gap="25px"
            paddingX="20px"
            marginBottom="40px"
          >
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
              isDisabled={isEmpty}
              onClick={handleSubmit}
            >
              <Text>Continue</Text>
            </Button>
          </Flex>
        </FormControl>
      </ModalBody>
    </>
  );
}
