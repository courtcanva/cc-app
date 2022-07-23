import React from "react";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
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
import { useStoreSelector } from "@/store/hooks";

const SaveBoard: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const tileColor = useStoreSelector((state) => state.tile.present);
  const courtSize = useStoreSelector((state) => state.courtSpecData.activeCourt);
  const designNames = useStoreSelector((state) => state.designName);
  console.log(designNames);
  

  const [value, setValue] = React.useState("");
  const handleChange = (event: any) => setValue(event.target.value);

  return (
    <Flex data-testid="SaveBoard">
      <Box display="flex" flexDirection="column" gap="1">
        <Button
          leftIcon={<SaveSvg />}
          aria-label="SaveSvg"
          bg="white"
          w="115px"
          h="44px"
          justifyContent="left"
        >
          Save
        </Button>
        <Button
          leftIcon={<DocSvg />}
          aria-label="DocSvg"
          bg="white"
          w="115px"
          h="44px"
          justifyContent="left"
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
      </Box>
    </Flex>
  );
};

export default SaveBoard;
