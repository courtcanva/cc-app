import {
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Text,
  Icon,
  IconButton,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import React, { useState } from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import PwdInputGroup from "../PwdInputGroup";

type Props = {
  nextStep: () => void;
  prevStep: () => void;
  userEmail: string;
  initialRef: React.MutableRefObject<null>;
};
const EmailVerification: React.FC<Props> = ({ userEmail, nextStep }) => {
  const [inputCode, setInputCode] = useState<number>(0);
  // const[isDisabled, setIsDisable] = useState<boolean>(false)
  // inputCode.toString().length===4? setIsDisable(true):false
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    nextStep();
  };
  return (
    <>
      <ModalCloseButton role="closeButton" />
      <ModalHeader>
        <Flex flexDir="column" alignItems="center">
          <Icon width="240px" height="180px" viewBox="0 0 800 600" role="logo">
            <MainLogoSvg />
          </Icon>
          <Text fontSize="sm" textAlign="center">
            Please enter the 4-digit code sent to <br /> {userEmail}
          </Text>
          <Divider />
        </Flex>
      </ModalHeader>
      <ModalBody>
        <Flex flexDir="column" alignItems="center">
          <form
            style={{ marginBottom: "30px", width: "300px" }}
            // onSubmit={handleSubmit}
          >
            <FormControl isRequired>
              <Input name="verifyCode" type="number" htmlSize={4} width="5rem" textAlign="center" />
            </FormControl>
            <Button variant="shareBtn" width="300px" marginTop="20px" onClick={handleSubmit}>
              Verify
            </Button>
          </form>
        </Flex>
      </ModalBody>
    </>
  );
};

export default EmailVerification;
