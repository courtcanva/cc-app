import {
  Flex,
  IconButton,
  useEditableControls,
  Editable,
  EditablePreview,
  Input,
  EditableInput,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiStar, BiPencil } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useStoreSelector } from "@/store/hooks";

const DesignName = () => {
  const designName = useStoreSelector((state) => state.courtSize.designName);  
  const [value, setValue] = useState(designName);
  
  useEffect(() => {
    setValue(designName);
  }, [designName]);

  const dispatch = useDispatch();
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
        onChange={(value) => setValue(value)}
        value={value}
        display="flex"
        alignItems="center"
        // onSubmit={() => dispatch(changeDesignName(value))}
      >
        
        <EditablePreview p="0px 8px" />
        <Input as={EditableInput} />
        <EditableControls />
      </Editable>
    </Flex>
  );
};

export default DesignName;
