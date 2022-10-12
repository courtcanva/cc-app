import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React, { useState } from "react";
import SelectLogin, { GoogleLoginRes } from "./SelectLogin";
import EmailLogin from "./EmailLogin";
import LoginWithPwd from "./LoginWithPwd";
import Register from "./Register";
import EmailVerification from "./EmailVerification";
import VerificationResult from "./EmailVerification/VerificationResult";
import AccountConnection from "@/components/Login/AccountConnection";
import ExistedAccountPwdSetting from "@/components/Login/ExistedAccountPwdSetting";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  updateLoginData: (data: any) => void;
}
export enum stepName {
  SelectLogin = "SelectLogin",
  EmailLogin = "EmailLogin",
  LoginWithPwd = "LoginWithPwd",
  Register = "Register",
  EmailVerification = "EmailVerification",
  VerificationResult = "VerificationResult",
  AccountConnection = "AccountConnection",
  ExistedAccountPwdSetting = "ExistedAccountPwdSetting",
}

const LoginModalContent = (props: Props) => {
  const initialRef = React.useRef(null);

  const { updateLoginData, onClose, isOpen } = props;

  const [step, setStep] = useState(1);
  const [userExisted, setUserExisted] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [verified, setVerified] = useState(true);
  const [needPwd, setNeedPwd] = useState<boolean>(false);
  const [existedUserInfo, setExistedUserInfo] = useState<GoogleLoginRes | null>(null);
  const nextStep = () => {
    setStep((step) => step + 1);
  };
  const prevStep = () => {
    setStep((step) => step - 1);
  };
  const connectionStep = (existedUserInfo: GoogleLoginRes) => {
    setExistedUserInfo(existedUserInfo);
    setStep(6);
  };
  const setPwdStep = () => {
    setStep(7);
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
            connectionStep={connectionStep}
          />
        );
      case 2:
        return (
          <EmailLogin
            currentStep={stepName.EmailLogin}
            setStep={setStep}
            onClose={onClose}
            nextStep={nextStep}
            prevStep={prevStep}
            initialRef={initialRef}
            setUserExisted={setUserExisted}
            inputEmail={(email: string) => {
              setUserEmail(email);
            }}
            setNeedPwd={setNeedPwd}
          />
        );
      case 3:
        return userExisted ? (
          <LoginWithPwd
            currentStep={stepName.LoginWithPwd}
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
            currentStep={stepName.Register}
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
            currentStep={stepName.EmailVerification}
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
            needPwd={needPwd}
            setPwdStep={setPwdStep}
          />
        );
      case 5:
        return (
          <VerificationResult
            currentStep={stepName.VerificationResult}
            onClose={onClose}
            verified={verified}
            prevStep={prevStep}
            setStep={setStep}
          />
        );
      case 6:
        return (
          <AccountConnection
            currentStep={stepName.AccountConnection}
            updateLoginData={updateLoginData}
            onClose={onClose}
            existedUserInfo={existedUserInfo}
            setStep={setStep}
          />
        );
      case 7:
        return (
          <ExistedAccountPwdSetting
            onClose={onClose}
            setStep={setStep}
            userEmail={userEmail}
            currentStep={stepName.ExistedAccountPwdSetting}
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
