import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Text,
  Icon,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import React from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

export default function LoginWithPwd(props: any) {
  const { prevStep } = props;

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
            Existed User, Login with password
          </Text>
        </Flex>
      </ModalHeader>
      <ModalCloseButton role="closeButton" />
      <ModalBody></ModalBody>
    </ModalContent>
  );
}
