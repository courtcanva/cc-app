import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  Modal,
  ModalOverlay,
  Flex,
} from "@chakra-ui/react";
import { switchMyTemplateDisplay } from "@/store/reducer/buttonToggleSlice";
import { useDispatch } from "react-redux";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessNotice = (prop: Props) => {
  const disPatch = useDispatch();

  const handleOpenMyTemplate = () => {
    disPatch(switchMyTemplateDisplay(true));
    onClose();
  };
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
          Congratulations, you have successfully submitted a new template!
        </ModalHeader>
        <ModalFooter>
          <Flex gap="5rem">
            <Button
              background="button.hover"
              color="fontcolor.primary"
              onClick={onClose}
              variant="shareBtn"
            >
              Close
            </Button>
            <Button fontSize="lg" onClick={handleOpenMyTemplate}>
              My Template
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default SuccessNotice;
