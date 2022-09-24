import {
  Flex,
  IconButton,
  useEditableControls,
  Editable,
  EditablePreview,
  Input,
  EditableInput,
} from "@chakra-ui/react";
import { BiPencil } from "react-icons/bi";
import { useStoreSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import NameChangeAlertModal from "./NameChangeAlertModal";
import { useNameCheckFeedback } from "@/hooks/useNameCheckFeedback";

const DesignName = () => {
  const designName = useStoreSelector((state) => state.courtSpecData.activeCourt.designName);
  const nameList = useStoreSelector((state) => state.designName.nameList);
  const [newDesignName, setNewDesignName] = useState(designName);
  const { feedbackModalOpen, setFeedbackModalOpen, feedback, saveNameChange } =
    useNameCheckFeedback(newDesignName, nameList);

  useEffect(() => {
    setNewDesignName(designName);
  }, [designName]);

  const EditableControls = () => {
    const { isEditing, getEditButtonProps } = useEditableControls();
    return isEditing ? null : (
      <IconButton
        aria-label="Edit"
        icon={<BiPencil />}
        variant="navbarIconBtn"
        {...getEditButtonProps()}
      />
    );
  };

  return (
    <>
      <Flex justifyContent="center" alignItems="center" fontSize="xl">
        <Editable
          color="white"
          textAlign="center"
          isPreviewFocusable={false}
          value={newDesignName}
          display="flex"
          alignItems="center"
          onChange={(value) => {
            setNewDesignName(value);
          }}
          onSubmit={() => saveNameChange()}
        >
          <EditablePreview p="0px 8px" />
          <Input as={EditableInput} />
          <EditableControls />
        </Editable>
      </Flex>
      <NameChangeAlertModal
        isOpen={feedbackModalOpen}
        onClose={() => {
          setFeedbackModalOpen(false);
          setNewDesignName(designName);
        }}
        updateFeedbackData={feedback}
      ></NameChangeAlertModal>
    </>
  );
};

export default DesignName;
