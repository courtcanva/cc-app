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
import { FaTrashAlt, FaFileUpload } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  buttonText: string;
  alertText: string;
}
const ConfirmModal = ({ isOpen, onClose, onConfirm, buttonText, alertText }: Props) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} flexDirection="column" gap="10px" alignItems={"center"}>
            {buttonText === "Publish" ? (
              <FaFileUpload
                size={35}
                style={{ color: "red", marginTop: "25px", marginBottom: "10px" }}
              />
            ) : (
              <FaTrashAlt
                size={35}
                style={{ color: "red", marginTop: "25px", marginBottom: "10px" }}
              />
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
            <p>Are you sure you want to {alertText}?</p>
          </ModalBody>
          <ModalFooter display={"flex"} gap="10px" marginTop={"10px"}>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" marginRight={3} onClick={onConfirm}>
              {buttonText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmModal;
