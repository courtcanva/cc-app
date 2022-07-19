import {
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Text,
  Icon,
  IconButton,
  Divider,
  FormControl,
  Input,
  FormHelperText,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import useAuthRequest from "@/components/Login/helpers/authRequest";

interface Props {
  initialRef: React.LegacyRef<HTMLInputElement> | undefined;
  nextStep: () => void;
  prevStep: () => void;
  findUser: (isExisted: boolean) => void;
  inputEmail: (input: string) => void;
}

export default function EmailLogin(props: Props) {
  const { initialRef, nextStep, prevStep, findUser, inputEmail } = props;

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

  return (
    <>
      <IconButton
        aria-label="Go Back"
        role="goBack"
        icon={<ChevronLeftIcon />}
        margin="8px"
        size="sm"
        width="32px"
        variant="witheBackgroundIconBtn"
        color="black"
        onClick={prevStep}
      ></IconButton>
      <ModalHeader>
        <Flex flexDir="column" alignItems="center" marginTop="20px">
          <Icon width="240px" height="180px" viewBox="0 0 800 600" role="logo">
            <MainLogoSvg />
          </Icon>
          <Divider />
          <Text fontSize="xl" marginTop="20px">
            Continue with Email
          </Text>
        </Flex>
      </ModalHeader>
      <ModalCloseButton role="closeButton" />
      <ModalBody>
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
