import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useUpdateTemplateMutation, useDeleteTemplateMutation } from "@/redux/api/templateApi";

const MyTemplateAlert = ({ isOpen, cancelRef, onClose, alertHeader, template }: any) => {
  const isDeleteAlert = alertHeader === "Delete";
  const [updateTemplate] = useUpdateTemplateMutation();
  const [deleteTemplate] = useDeleteTemplateMutation();

  const handleDeleteOrUndisplay = () => {
    if (isDeleteAlert) {
      deleteTemplate(template._id);
    } else {
      template.status = "private";
      updateTemplate(template);
    }
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered={true}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {alertHeader} Template
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to {isDeleteAlert ? "permanently delete" : "undisplay"} your
            template?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDeleteOrUndisplay} marginLeft={3}>
              {alertHeader}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default MyTemplateAlert;
