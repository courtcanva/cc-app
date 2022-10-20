import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  Modal,
  ModalOverlay,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessNotice = (prop: Props) => {
  const { isOpen, onClose } = prop;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent
        display="flex"
        marginLeft="98px"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <ModalHeader marginTop="15px" marginBottom="-10px" color="brand.primary" fontSize="md">
          Congratulations You have successfully submitted a new template!
        </ModalHeader>
        <ModalFooter>
          <Button background="button.hover" color="fontcolor.primary" onClick={onClose} role="closeBtn">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default SuccessNotice;
