import { Modal, ModalOverlay } from "@chakra-ui/react";
import React, { useState } from "react";
import SelectLogin from "./SelectLogin";
import EmailLogin from "./EmailLogin";
import LoginWithPwd from "./LoginWithPwd";
import Register from "./Register";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  updateLoginData: (data: any) => void;
}

function LoginModalContent(props: Props) {
  const initialRef = React.useRef(null);

  const { updateLoginData, onClose, isOpen } = props;

  const [step, setStep] = useState(1);
  const [userExisted, setUserExisted] = useState(false);
  const nextStep = () => {
    setStep((step) => step + 1);
  };
  const prevStep = () => {
    setStep((step) => step - 1);
  };
  const checkUser = (isUserExisted: boolean) => {
    setUserExisted(isUserExisted);
  };

  const modalContent = () => {
    switch (step) {
      case 1:
        return (
          <SelectLogin
            nextStep={nextStep}
            initialRef={initialRef}
            onClose={onClose}
            updateLoginData={updateLoginData}
          />
        );
      case 2:
        return (
          <EmailLogin
            nextStep={nextStep}
            prevStep={prevStep}
            initialRef={initialRef}
            checkUser={checkUser}
          />
        );
      case 3:
        return userExisted ? (
          <LoginWithPwd nextStep={nextStep} prevStep={prevStep} initialRef={initialRef} />
        ) : (
          <Register nextStep={nextStep} prevStep={prevStep} initialRef={initialRef} />
        );
      case 4:
      // TODO: success
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={"sm"} initialFocusRef={initialRef}>
      <ModalOverlay />
      {modalContent()}
    </Modal>
  );
}

export default LoginModalContent;
