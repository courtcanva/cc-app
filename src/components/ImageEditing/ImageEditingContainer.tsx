import React, { useRef, useState, useCallback } from "react";
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
  Button,
  Text,
  Input,
  Center,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import { toBase64 } from "@/utils/manageExternalImage";
import { Label } from "react-konva";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ImageEditingContainer = ({ isOpen, onClose }: Props) => {
  const dispatch = useDispatch();
  const uploadImageRef = useRef<HTMLInputElement | null>(null);
  const [picture, setPicture] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  const closeWindow = () => {
    onClose();
  };

  const handleInputImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (uploadImageRef.current?.files?.length === 0) return;
    const imgUrl = e.target.files ? ((await toBase64(e.target.files[0])) as string) : null;
    setPicture(imgUrl);
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  const handleApply = () => {
    console.log("undo");
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeWindow} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader role="modalTitle" color="#2C4E8A">
            Change Your Avatar
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="0.5rem 2rem">
            <Center
              backgroundColor="#e3eaf6"
              border="dotted"
              borderColor="#799ad4"
              borderWidth="2px"
              borderRadius="5px"
              maxWidth="156px"
              height="34px"
              margin="auto"
            >
              <Input
                ref={uploadImageRef}
                type="file"
                id="file"
                accept="image/*"
                opacity="0"
                onChange={handleInputImage}
                zIndex="3"
                cursor="pointer"
                width="100%"
                height="100%"
              ></Input>
              <Box position="absolute" zIndex="1" color="#3761ad" fontWeight="500">
                Choose an image
              </Box>
            </Center>
            <Center position="relative" height="260px" marginTop="10px">
              {picture && (
                <Cropper
                  image={picture}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  cropShape={"round"}
                  aspect={3 / 3}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                />
              )}
              {!picture && <Text>Please upload image</Text>}
            </Center>
            <Flex
              justifyContent="space-between"
              alignContent="center"
              margin="0 0.5rem"
              marginTop="15px"
            >
              <Box minWidth="120px">
                <Text fontSize="sm" color="#2C4E8A" fontWeight="600">
                  Zoom
                </Text>
                <Slider
                  aria-label="zoom-slider"
                  defaultValue={30}
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(zoom) => setZoom(Number(zoom))}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
              <Box minWidth="120px">
                <Text fontSize="sm" color="#2C4E8A" fontWeight="600">
                  Rotation
                </Text>
                <Slider
                  aria-label="rotate-slider"
                  defaultValue={30}
                  value={rotation}
                  min={-180}
                  max={180}
                  step={0.5}
                  aria-labelledby="rotate"
                  onChange={(rotation) => setRotation(Number(rotation))}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
              <Box>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  height="33px"
                  width="60px"
                  marginTop="2px"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Box>
            </Flex>
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
