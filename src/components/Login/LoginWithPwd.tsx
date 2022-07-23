import { ModalHeader, ModalBody, Flex, Text, Icon, Divider, Button } from "@chakra-ui/react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import React, { useState } from "react";
import PwdInputGroup from "./PwdInputGroup";
import ModalOperator from "./ModalOperater";
type Props = {
  prevStep: () => void;
  onClose: any;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  userEmail: string;
  initialRef: React.MutableRefObject<null>;
};

const LoginWithPwd: React.FC<Props> = ({ prevStep, userEmail, onClose, setStep }) => {
  const [password, setPassword] = useState("");
  const handleCloseModal = () => {
    setStep(1);
    onClose();
  };

  return (
    <>
      <ModalOperator handleCloseModal={handleCloseModal} prevStep={prevStep} />
      <ModalHeader>
        <Flex flexDir="column" alignItems="center">
          <Icon width="240px" height="180px" viewBox="0 0 800 600" role="logo">
            <MainLogoSvg />
          </Icon>
          <Text fontSize="sm" textAlign="center">
            Sign up with <br /> {userEmail}
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
            <PwdInputGroup
              label="Password"
              value={password}
              onChange={(event) => setPassword(event?.currentTarget.value)}
            />
            <Button variant="shareBtn" width="300px" marginTop="20px">
              Continue Login
            </Button>
          </form>
        </Flex>
      </ModalBody>
    </>
  );
};
export default LoginWithPwd;
