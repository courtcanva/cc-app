import { RiArrowLeftSLine, RiCloseLine } from "react-icons/ri";
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
          icon={<RiArrowLeftSLine />}
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
        icon={<RiCloseLine />}
        variant="witheBackgroundIconBtn"
        color="black"
        fontSize="25px"
        onClick={handleCloseModal}
      ></IconButton>
    </Flex>
  );
};
export default ModalOperator;
