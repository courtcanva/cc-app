import React from "react";
import { useStoreSelector } from "@/store/hooks";
import { userData } from "@/store/reducer/userSlice";
import { switchImageEditing } from "@/store/reducer/buttonToggleSlice";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";

const ImageEditingContainer = dynamic(() => import("./ImageEditingContainer"), {});

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
