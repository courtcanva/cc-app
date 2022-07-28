import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React, { useState } from "react";
import SelectLogin from "./SelectLogin";
import EmailLogin from "./EmailLogin";
import LoginWithPwd from "./LoginWithPwd";
import Register from "./Register";
import EmailVerification from "./EmailVerification";
import VerificationResult from "./EmailVerification/VerificationResult";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  updateLoginData: (data: any) => void;
}

const LoginModalContent = (props: Props) => {
  const initialRef = React.useRef(null);

  const { updateLoginData, onClose, isOpen } = props;

  const [step, setStep] = useState(1);
  const [userExisted, setUserExisted] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [verified, setVerified] = useState(true);
  const nextStep = () => {
    setStep((step) => step + 1);
  };
  const prevStep = () => {
    setStep((step) => step - 1);
  };
  const findUser = (isUserExisted: boolean) => {
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
            setStep={setStep}
            onClose={onClose}
            nextStep={nextStep}
            prevStep={prevStep}
            initialRef={initialRef}
            findUser={findUser}
            inputEmail={(email: string) => {
              setUserEmail(email);
            }}
          />
        );
      case 3:
        return userExisted ? (
          <LoginWithPwd
            setStep={setStep}
            onClose={onClose}
            prevStep={prevStep}
            nextStep={nextStep}
            initialRef={initialRef}
            userEmail={userEmail}
            updateLoginData={updateLoginData}
            getUserId={(userId: string) => {
              setUserId(userId);
            }}
          />
        ) : (
          <Register
            setStep={setStep}
            onClose={onClose}
            nextStep={nextStep}
            prevStep={prevStep}
            initialRef={initialRef}
            userEmail={userEmail}
            getUserId={(userId: string) => {
              setUserId(userId);
            }}
          />
        );
      case 4:
        return (
          <EmailVerification
            nextStep={nextStep}
            prevStep={prevStep}
            setStep={setStep}
            onClose={onClose}
            initialRef={initialRef}
            userEmail={userEmail}
            userId={userId}
            updateLoginData={updateLoginData}
            validation={(verified: boolean) => {
              setVerified(verified);
            }}
          />
        );
      case 5:
        return (
          <VerificationResult
            onClose={onClose}
            verified={verified}
            prevStep={prevStep}
            setStep={setStep}
          />
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm" initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent display="flex" flexDirection="column" alignItems="center" padding="10px">
        {modalContent()}
      </ModalContent>
    </Modal>
  );
};

export default LoginModalContent;
