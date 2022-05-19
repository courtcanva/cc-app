import { ModalBody, useDisclosure } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, Button, Box } from "@chakra-ui/react";
import CourtSize from "./CourtSize";
import UpSvg from "@/assets/svg/en-sort-up.svg";
import DownSvg from "@/assets/svg/en-sort-down.svg";

function ChangeCourtSize() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={isOpen ? onClose : onOpen}
        size="sm"
        borderRadius="lg"
        bgColor={isOpen ? "CourtSizecolor.btc" : "White"}
      >
        Select court size{isOpen ? <UpSvg /> : <DownSvg />}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"6xl"}>
        <ModalOverlay />
        <ModalContent maxWidth={"90vw"}>
          <ModalCloseButton />
          <ModalBody>
            <Box
              color="white"
              bg="White"
              rounded="md"
              border="1px solid CourtSizecolor.border"
              borderRadius="lg"
            >
              <CourtSize />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChangeCourtSize;
