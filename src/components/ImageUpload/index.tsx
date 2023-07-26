import { inputImageCheck, toBase64 } from "@/utils/manageExternalImage";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Box,
  Center,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import CropImage from "./CropImage";

interface IImageUpload {
  name: string;
  isOpen: boolean;
  switchUpload: (value: boolean) => AnyAction;
  setImage: (url: string, width: number, height: number) => void;
}

const ImageUpload = (props: IImageUpload) => {
  const { name, isOpen, switchUpload, setImage } = props;
  const minSizeInKB = 0;
  const maxSizeInKB = 300;
  const dispatch = useDispatch();
  const toast = useToast();
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(false);

  const onClose = () => {
    setPicture("");
    dispatch(switchUpload(false));
  };

  const imgSet = async (file: File) => {
    if (!inputImageCheck(file, minSizeInKB, maxSizeInKB, toast)) return;
    const img = (await toBase64(file)) as string;
    setPicture(img);
  };

  const handleInputImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    if (e.target.files?.length === 0 || !e.target.files) {
      setLoading(false);
      return;
    }
    const file = e.target.files[0];
    imgSet(file);
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered returnFocusOnClose={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="brand.primary" textAlign="center">
          Upload {name} Image
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody alignItems="center">
          <Center
            backgroundColor="background.primary"
            borderRadius="5px"
            maxWidth="160px"
            height="48px"
            margin="20px auto"
          >
            <Input
              type="file"
              accept="image/*"
              opacity="0"
              onChange={handleInputImage}
              width="100%"
              height="100%"
              aria-label="upload file"
            ></Input>
            <Box position="absolute" color="white" fontWeight="500" pointerEvents="none">
              Choose an image
            </Box>
          </Center>
          {loading && (
            <Center>
              <Spinner size="xl" />
            </Center>
          )}
          {picture && !loading && (
            <CropImage name={name} picture={picture} setImage={setImage} onClose={onClose} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageUpload;
