import {
  ModalContent,
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
} from "@chakra-ui/react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

export default function EmailLogin(props: any) {
  const { initialRef, nextStep, prevStep, checkUser } = props;

  const [input, setInput] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  useEffect(() => {
    setIsEmpty(!input);
  }, [input]);

  const validate = (email: string) => {
    // regular expression from https://www.freakyjolly.com/react-form-custom-validation-with-error-message-example/
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
  };

  const handleEmailCheck = async () => {
    // TODO: fake boolean value
    const isExisted = true;
    checkUser(isExisted);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validate(input);
    setIsValidEmail(validation);
    if (validation) {
      handleEmailCheck();
      nextStep();
    }
  };

  return (
    <ModalContent>
      <IconButton
        aria-label="Go Back"
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
        <FormControl isInvalid={!isValidEmail} onSubmit={handleSubmit}>
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
              onChange={handleInputChange}
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
    </ModalContent>
  );
}
