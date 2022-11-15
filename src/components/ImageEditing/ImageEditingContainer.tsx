import React, { useState, useCallback } from "react";
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
  useToast,
} from "@chakra-ui/react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import { toBase64, upLoadScreenshot, inputImageCheck } from "@/utils/manageExternalImage";
import { getCroppedImg } from "@/utils/canvasUtils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ImageEditingContainer = ({ isOpen, onClose }: Props) => {
  const toast = useToast();
  const [picture, setPicture] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const closeWindow = () => {
    onClose();
  };

  const handleInputImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 0 || !e.target.files) return;
    if (!inputImageCheck(e.target.files[0], 0, 300, toast)) return;
    const imgUrl = (await toBase64(e.target.files[0])) as string;
    setPicture(imgUrl);
  };

  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDragImage = async (e: React.DragEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!inputImageCheck(file, 0, 300, toast)) return;
    const imgUrl = (await toBase64(file)) as string;
    setPicture(imgUrl);
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  const handleApply = useCallback(async () => {
    if (!picture || !croppedAreaPixels) return;
    const croppedImage = (await getCroppedImg(picture, croppedAreaPixels, rotation)) as string;
    const uploadedImageUrl = await upLoadScreenshot(
      croppedImage,
      toast,
      process.env.NEXT_PUBLIC_AVATAR_ALBUM_NAME
    );
    console.log(uploadedImageUrl, "final image");
  }, [picture, croppedAreaPixels, rotation]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeWindow} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader role="modalTitle" color="#2C4E8A">
            Change Your Avatar
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="0.5rem 2rem" marginTop="5px">
            <Center
              backgroundColor="#3761ad"
              borderRadius="5px"
              maxWidth="156px"
              height="34px"
              margin="auto"
            >
              <Input
                type="file"
                id="file"
                accept="image/*"
                opacity="0"
                onChange={handleInputImage}
                zIndex="3"
                cursor="pointer"
                width="100%"
                height="100%"
                data-testid="fileInput"
                autoFocus
              ></Input>
              <Box
                position="absolute"
                zIndex="1"
                color="white"
                fontWeight="500"
                pointerEvents="none"
              >
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
              {!picture && (
                <Flex
                  onDragOver={handleDragOver}
                  onDrop={handleDragImage}
                  width="100%"
                  height="100%"
                  backgroundColor="#e3eaf6"
                  border="dotted"
                  borderColor="#799ad4"
                  borderWidth="2px"
                  borderRadius="3px"
                >
                  <Center margin="auto">
                    <Text fontSize="20px" fontWeight="600" color="#3761ad">
                      or Drag image to this area
                    </Text>
                  </Center>
                </Flex>
              )}
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
