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
import { useDispatch } from "react-redux";
import { useStoreSelector } from "@/store/hooks";
import { changeDesignName } from "@/store/reducer/courtSpecDataSlice";

const DesignName = () => {
  const designName = useStoreSelector((state) => state.courtSpecData.activeCourt.designName);
  const dispatch = useDispatch();

  const handleNameChange = (editedName: string) => {
    dispatch(changeDesignName(editedName));
  };

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
    <Flex justifyContent="center" alignItems="center" fontSize="xl">
      <Editable
        color="white"
        textAlign="center"
        isPreviewFocusable={false}
        value={designName}
        display="flex"
        alignItems="center"
        onChange={(editedName) => handleNameChange(editedName)}
      >
        <EditablePreview p="0px 8px" />
        <Input as={EditableInput} />
        <EditableControls />
      </Editable>
    </Flex>
  );
};

export default DesignName;
