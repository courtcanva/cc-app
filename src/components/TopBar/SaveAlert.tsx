import {
  AlertDialogCloseButton,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogFooter,
  Input,
  Text,
  Button,
} from "@chakra-ui/react";
import React, { useRef } from "react";

const SaveAlert = ({
  dialogOpen,
  useDesignName,
  handleCheckName,
  nameCheck,
  handleSaveAsDesign,
  setDialogOpen,
  setDesignName,
  setNameCheck,
  isSaving,
}: any) => {
  const cancelRef = useRef(null);
  const close = () => {
    setDialogOpen(false);
    setDesignName(useDesignName);
    setNameCheck("");
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={close}
      isOpen={dialogOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Save As</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Your design will be saved in FOLDER.
          <Text margin="5px 0">Court Name: {useDesignName}</Text>
          <Input
            marginTop="5px"
            value={useDesignName}
            onChange={handleCheckName}
            placeholder="Make your unique court name."
          />
          <Text color="crimson" marginTop="0.2rem" fontSize="0.8rem">
            {nameCheck}
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={close} w="75px">
            Cancel
          </Button>
          <Button
            bg="button.hover"
            color="fontcolor.primary"
            w="75px"
            ml={3}
            disabled={nameCheck !== "" || isSaving}
            onClick={handleSaveAsDesign}
            ref={cancelRef}
            _hover={{ bg: "brand.secondary", opacity: "0.60" }}
            _active={{ bg: "brand.secondary", opacity: "0.60" }}
            isLoading={isSaving}
          >
            Save
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SaveAlert;
