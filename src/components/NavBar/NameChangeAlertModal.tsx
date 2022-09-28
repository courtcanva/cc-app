import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  updateFeedbackData: string;
}

const NameChangeAlertModal = (props: Props) => {
  const { onClose, isOpen, updateFeedbackData } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        display="flex"
        ml="98px"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <ModalHeader mt="15px" mb="-10px" color="brand.primary" fontSize="md">
          {updateFeedbackData}
        </ModalHeader>
        <ModalFooter>
          <Button bg="button.hover" color="fontcolor.primary" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NameChangeAlertModal;
