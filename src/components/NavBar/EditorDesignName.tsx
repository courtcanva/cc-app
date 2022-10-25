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
import checkDesignName from "@/utils/checkDesignName";
import { useDispatch } from "react-redux";
import { changeDesignName } from "@/store/reducer/courtSpecDataSlice";
import { DESIGN_NAME_MAX_CHAR_LENGTH } from "@/constants/courtData";

const DesignName = () => {
  const dispatch = useDispatch();
  const designName = useStoreSelector((state) => state.courtSpecData.activeCourt.designName);
  const nameList = useStoreSelector((state) => state.designName.nameList);
  const [newDesignName, setNewDesignName] = useState(designName);
  const [feedback, setFeedback] = useState("");
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

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

  const saveNameChange = () => {
    if (newDesignName.trim().length > DESIGN_NAME_MAX_CHAR_LENGTH) {
      setFeedbackModalOpen(true);
      setFeedback(`The design name should less than ${DESIGN_NAME_MAX_CHAR_LENGTH} characters.`);
    } else {
      const errorMessage = checkDesignName(newDesignName.trim(), nameList);
      if (errorMessage) {
        setFeedbackModalOpen(true);
        setFeedback(errorMessage);
      } else {
        dispatch(changeDesignName(newDesignName.trim()));
      }
    }
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
          onSubmit={saveNameChange}
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
