import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { RiDeleteBinFill } from "react-icons/ri";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
const DeleteComfirmModal = ({ isOpen, onClose, onConfirm }: Props) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} flexDirection="column" gap="10px" alignItems={"center"}>
            <RiDeleteBinFill width={10} height={10} color="red.500" />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
            <p>Are you sure you want to remove this item from the shopping cart?</p>
          </ModalBody>
          <ModalFooter display={"flex"} gap="10px" marginTop={"10px"}>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" marginRight={3} onClick={onConfirm}>
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteComfirmModal;
