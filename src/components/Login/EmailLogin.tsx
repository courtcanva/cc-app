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
import React, { useState } from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

export default function EmailLogin(props: any) {
  const { initialRef, nextStep, prevStep } = props;
  const [input, setInput] = useState("");
  const handleInputChange = (e) => setInput(e.target.value);
  // TODO: change later
  const isError = !input.includes("@");
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
        <FormControl isInvalid={Boolean(isError)}>
          {!isError ? (
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
            <Input id="email" type="email" required value={input} onChange={handleInputChange} />
            <Button variant="loginBtn" position="relative" ref={initialRef}>
              <Text>Continue</Text>
            </Button>
          </Flex>
        </FormControl>
      </ModalBody>
    </ModalContent>
  );
}
