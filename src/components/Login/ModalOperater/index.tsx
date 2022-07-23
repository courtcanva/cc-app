import { ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
type Props = {
  handleCloseModal: () => void;
  prevStep: () => void;
};
const ModalOperator: React.FC<Props> = ({ handleCloseModal, prevStep }) => {
  return (
    <Flex width="100%" flexDirection="row" justifyContent="space-between">
      <IconButton
        aria-label="Go Back"
        role="goBack"
        icon={<ChevronLeftIcon />}
        variant="witheBackgroundIconBtn"
        color="black"
        fontSize="28px"
        onClick={prevStep}
      ></IconButton>
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
