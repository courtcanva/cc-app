import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalFooter,
  Flex,
  Text,
  Icon,
  Link,
  IconButton,
  Divider,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import { IconContext } from "react-icons";
import { FaEnvelope } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { api } from "../../utils/axios";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "@/store/reducer/userSlice";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import SelectLogin from "./SelectLogin";
import EmailLogin from "./EmailLogin";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  updateLoginData: (data: any) => void;
}

function LoginModalContent(props: Props) {
  const initialRef = React.useRef(null);

  const { updateLoginData, onClose, isOpen } = props;

  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((step) => step + 1);
  };
  const prevStep = () => {
    setStep((step) => step - 1);
  };

  const modalContent = () => {
    switch (step) {
      case 1:
        return <SelectLogin nextStep={nextStep} initialRef={initialRef} onClose={onClose} />;
      case 2:
        return <EmailLogin nextStep={nextStep} prevStep={prevStep} initialRef={initialRef} />;
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
