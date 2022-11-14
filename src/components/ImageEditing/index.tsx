import React from "react";
import { useStoreSelector } from "@/store/hooks";
import { userData } from "@/store/reducer/userSlice";
import ImageEditingContainer from "./ImageEditingContainer";
import { switchImageEditing } from "@/store/reducer/buttonToggleSlice";
import { useDispatch } from "react-redux";

const ImageEditing = () => {
  const dispatch = useDispatch();
  const isImageEditing = useStoreSelector((state) => state.buttonToggle.isImageEditing);
  const currentUserId = useStoreSelector(userData).userId;

  const handleImageEditingClose = () => {
    dispatch(switchImageEditing(false));
  };

  return (
    <>
      {isImageEditing && currentUserId && (
        <ImageEditingContainer isOpen={isImageEditing} onClose={handleImageEditingClose} />
      )}
    </>
  );
};

export default ImageEditing;
