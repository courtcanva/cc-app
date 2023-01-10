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
import { FaTrashAlt, FaFileUpload, FaSave } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (e: any) => void;
  buttonText: string;
  alertText: string;
}
const ConfirmModal = ({ isOpen, onClose, onConfirm, buttonText, alertText }: Props) => {
  const alert = buttonText === "Save" ? alertText : `Are you sure you want to ${alertText}?`;

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
            ) : buttonText === "Save" ? (
              <FaSave size={35} style={{ color: "red", marginTop: "25px", marginBottom: "10px" }} />
            ) : (
              <FaTrashAlt
                size={35}
                style={{ color: "red", marginTop: "25px", marginBottom: "10px" }}
              />
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
            <p>{alert}</p>
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
