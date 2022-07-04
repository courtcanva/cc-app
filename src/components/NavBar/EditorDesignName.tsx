import { useStoreSelector } from "@/store/hooks";
import { changeDesignName } from "@/store/reducer/designNameSlice";
import {
  Flex,
  IconButton,
  useEditableControls,
  Editable,
  EditablePreview,
  Input,
  EditableInput,
} from "@chakra-ui/react";

// import { useState } from "react";

import { BiStar, BiPencil } from "react-icons/bi";
import { useDispatch } from "react-redux";

const DesignName = () => {
  // const [value, setValue] = useState("Court Canva 1");
  const { name: designName } = useStoreSelector((state) => state.designName);
  const dispatch = useDispatch();
  const handleDesignName = (value: string) => {
    dispatch(changeDesignName(value));
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
        onChange={(value) => handleDesignName(value)}
        value={designName}
        display="flex"
        alignItems="center"
      >
        <IconButton aria-label="Star" icon={<BiStar />} variant="navbarIconBtn" />
        <EditablePreview p="0px 8px" />
        <Input as={EditableInput} />
        <EditableControls />
      </Editable>
    </Flex>
  );
};

export default DesignName;
