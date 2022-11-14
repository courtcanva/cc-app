import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Box,
  FormLabel,
  Button,
  Text,
  Input,
  Center,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import Image from "next/image";
import ImageCutting from "./ImageCutting";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import { toBase64 } from "@/utils/manageExternalImage";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// https://codesandbox.io/s/y09komm059

const ImageEditingContainer = ({ isOpen, onClose }: Props) => {
  const dispatch = useDispatch();
  const uploadImageRef = useRef<HTMLInputElement | null>(null);
  const [picture, setPicture] = useState<string | null>(null);

  const closeWindow = () => {
    onClose();
  };

  const handleInputImage = async (e: any) => {
    // React.ChangeEvent<HTMLInputElement>
    if (uploadImageRef.current?.files?.length === 0) return;
    const imgUrl = (await toBase64(e.target.files[0])) as string;
    setPicture(imgUrl);
  };

  const handleApply = () => {
    console.log("undo");
  };

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeWindow} size="2xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader role="modalTitle">Image Editing</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="0.5rem 1.5rem">
            <FormLabel>Change Your Avatar:</FormLabel>
            <Box>
              {/* backgroundColor="#2C4E8A" width="200px" */}
              <Input
                ref={uploadImageRef}
                type="file"
                accept="image/*"
                onChange={handleInputImage}
              ></Input>
            </Box>
            <Center position="relative" height="220px">
              {picture && (
                <Cropper
                  image={picture}
                  crop={crop}
                  zoom={zoom}
                  aspect={3 / 3}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              )}
              {!picture && <Text>Please upload image</Text>}
            </Center>
            <Box marginTop="10px">
              <Slider
                aria-label="slider-ex-1"
                defaultValue={30}
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </ModalBody>
          <Flex justifyContent="space-around" margin="1.5rem" flexWrap="wrap">
            <Button colorScheme="blue" variant="shareBtn" width="200px" onClick={handleApply}>
              Apply
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageEditingContainer;
