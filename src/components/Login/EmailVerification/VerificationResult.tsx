import { ModalHeader, ModalBody, Text, Icon, Button, ModalFooter } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import ModalOperator from "../ModalOperater";

type Props = {
  onClose: any;
  verified: boolean;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  prevStep: () => void;
  currentStep: number;
  userEmail: string;
};
const VerificationResult: React.FC<Props> = (props: Props) => {
  const { onClose, verified, setStep, prevStep, currentStep, userEmail } = props;
  const handleCloseModal = () => {
    setStep(1);
    onClose();
  };
  const handlePrevStep = () => {
    prevStep();
  };
  // TODO: auto login after successful verification
  return (
    <>
      <ModalOperator
        handleCloseModal={handleCloseModal}
        prevStep={prevStep}
        currentStep={currentStep}
      />
      <ModalHeader marginTop="10px">
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
      <ModalFooter marginBottom="10px">
        <Button
          variant={verified ? "shareBtn" : "failedBtn"}
          width="300px"
          marginTop="20px"
          onClick={verified ? handleCloseModal : handlePrevStep}
          rightIcon={<ArrowForwardIcon />}
        >
          {verified ? "Continue to App" : "Try Again"}
        </Button>
      </ModalFooter>
    </>
  );
};

export default VerificationResult;
