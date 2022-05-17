import { useDisclosure } from "@chakra-ui/react";
import { Button, Box } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import CourtSize from "./CourtSize";

function ScaleFadeEx() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={isOpen ? onClose : onOpen}
        size="sm"
        borderRadius="lg"
        zIndex="popover"
        bgColor={isOpen ? "CourtSizecolor.btc" : "White"}
        _after={{
          content: `${
            isOpen ? "url(@/assets/svg/en-sort-up.svg)" : "url(@/assets/svg/en-sort-down.svg)"
          }`,
          m: "3",
          mb: "2",
        }}
      >
        Select court size
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box
            w="70rem"
            h="44rem"
            color="white"
            mt="170"
            left="-336"
            bg="White"
            rounded="md"
            shadow="md"
            border="1px solid CourtSizecolor.border"
            borderRadius="lg"
            pos="absolute"
          >
            <CourtSize />
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ScaleFadeEx;
