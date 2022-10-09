import { ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { stepName } from "..";


type Props = {
  handleCloseModal: () => void;
  prevStep: () => void;
  currentStep: string;
};

const ModalOperator: React.FC<Props> = ({ handleCloseModal, prevStep, currentStep }) => {
  return (
    <Flex
      width="100%"
      flexDirection="row"
      justifyContent={currentStep !== stepName.EmailVerification ? "space-between" : "end"}
    >
      {currentStep !== "EmailVerification" ? (
        <IconButton
          aria-label="Go Back"
          role="goBack"
          icon={<ChevronLeftIcon />}
          variant="witheBackgroundIconBtn"
          color="black"
          fontSize="28px"
          onClick={prevStep}
        ></IconButton>
      ) : (
        <></>
      )}
      <IconButton
        aria-label="Close"
        role="close"
        icon={<CloseIcon />}
        variant="witheBackgroundIconBtn"
        color="black"
        fontSize="15px"
        onClick={handleCloseModal}
      ></IconButton>
    </Flex>
  );
};
export default ModalOperator;
