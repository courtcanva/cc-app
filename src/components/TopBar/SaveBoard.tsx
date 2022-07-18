import React from "react";
import { ButtonGroup, Flex, Input, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import DocSvg from "@/assets/svg/TopBarSvg/document.svg";
import SaveSvg from "@/assets/svg/TopBarSvg/save.svg";
import { useRef } from "react";
import { AlertDialogCloseButton, Button, useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

const SaveBoard: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const [value, setValue] = React.useState("");
  const handleChange = (event: any) => setValue(event.target.value);

  return (
    <Flex data-testid="SaveBoard">
      <ButtonGroup flexDirection={"column"}>
        <Button
          leftIcon={<SaveSvg />}
          aria-label="SaveSvg"
          bg={"white"}
          w="155px"
          h="45px"
          margin="0px"
          alignItems="center"
        >
          Save
        </Button>
        <Button
          leftIcon={<DocSvg />}
          aria-label="DocSvg"
          bg={"white"}
          w="155px"
          h="45px"
          margin="0px"
          alignItems="center"
          onClick={onOpen}
        >
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>Change Your Court Name?</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                You desing will save in FOLDER.
                <Text>CourtName: {value}</Text>
                <Input
                  value={value}
                  onChange={handleChange}
                  placeholder="Make your unique court name."
                />
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" ml={3}>
                  Save
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          Save as
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default SaveBoard;
