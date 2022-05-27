 import {
  Flex,
  IconButton,
  useEditableControls,
  Editable,
  EditablePreview,
  Input,
  EditableInput,
} from "@chakra-ui/react";
import {useState} from "react";

import { BiStar, BiPencil } from "react-icons/bi";

const DesignName = () => {
  const [value, setValue] = useState("Court Canva 1");
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
  }

  return (
    <Flex justifyContent="center" alignItems="center" fontSize="xl">
      <IconButton aria-label="Star" icon={<BiStar />} variant="navbarIconBtn" />
      <Editable
        display="inline-block"
        color="white"
        fontSize="xl"
        textAlign="center"
        isPreviewFocusable={false}
        onChange={(value)=> setValue(value)}
        value={value}
      >
        <EditablePreview />
        <Input as={EditableInput} />
        <EditableControls />
      </Editable>
    </Flex>
  );
};

export default DesignName;
