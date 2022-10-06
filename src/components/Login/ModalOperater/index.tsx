import { ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import useAuthRequest from "../helpers/authRequest";
type Props = {
  handleCloseModal: () => void;
  prevStep: () => void;
  currentStep: number;
};

const ModalOperator: React.FC<Props> = ({ handleCloseModal, prevStep, currentStep }) => {
  return (
    <Flex
      width="100%"
      flexDirection="row"
      justifyContent={currentStep !== 4 ? "space-between" : "end"}
    >
      {currentStep !== 4 ? (
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
