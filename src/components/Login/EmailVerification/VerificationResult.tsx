import { ModalHeader, ModalBody, Text, Icon, Button, ModalFooter } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

type Props = {
  onClose: any;
  verified: boolean;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  prevStep: () => void;
};
const VerificationResult: React.FC<Props> = ({ onClose, verified, setStep, prevStep }) => {
  const handleFinalStep = () => {
    setStep(1);
    onClose();
  };
  const handlePrevStep = () => {
    prevStep();
  };
  return (
    <>
      <ModalHeader>
        <Icon
          as={verified ? BsCheckCircleFill : BsXCircleFill}
          w="60px"
          h="60px"
          color={verified ? "brand.secondary" : "red.500"}
        />
      </ModalHeader>
      <ModalBody>
        <Text fontSize="sm" textAlign="center">
          {verified
            ? "Yay! You have successfully verified your account."
            : "Ops! Account verification failed."}
        </Text>
      </ModalBody>
      <ModalFooter>
        <Button
          variant={verified ? "shareBtn" : "failedBtn"}
          width="300px"
          marginTop="20px"
          onClick={verified ? handleFinalStep : handlePrevStep}
          rightIcon={<ArrowForwardIcon />}
        >
          {verified ? "Continue to App" : "Try Again"}
        </Button>
      </ModalFooter>
    </>
  );
};

export default VerificationResult;
