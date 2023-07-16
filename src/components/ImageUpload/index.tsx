import { useStoreSelector } from "@/store/hooks";
import { switchBadgeUsed, setBadgeImage } from "@/store/reducer/badgeSlice";
import { switchBadgeUpload } from "@/store/reducer/buttonToggleSlice";
import { inputImageCheck, toBase64 } from "@/utils/manageExternalImage";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Input,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Box,
  Center,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "@/utils/manageExternalImage";

const ImageUpload = (ref: any) => {
  const minSizeInKB = 0;
  const maxSizeInKB = 300;
  const dispatch = useDispatch();
  const toast = useToast();
  const { isBadgeUploadOpen } = useStoreSelector((state) => state.buttonToggle);
  const onClose = () => {
    setPicture("");
    handleReset();
    dispatch(switchBadgeUpload(false));
  };
  const [picture, setPicture] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [mediaSize, setMediaSize] = useState({
    width: 0,
    height: 0,
    naturalWidth: 0,
    naturalHeight: 0,
  });
  const [loading, setLoading] = useState(false);

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

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);

    const croppedAreaPixelsValue = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    };
    if (mediaSize.naturalWidth >= mediaSize.naturalHeight) {
      croppedAreaPixelsValue.width = mediaSize.naturalHeight;
      croppedAreaPixelsValue.height = mediaSize.naturalHeight;
      croppedAreaPixelsValue.x = (mediaSize.naturalWidth - mediaSize.naturalHeight) / 2;
    } else {
      croppedAreaPixelsValue.width = mediaSize.naturalWidth;
      croppedAreaPixelsValue.height = mediaSize.naturalWidth;
      croppedAreaPixelsValue.y = (mediaSize.naturalHeight - mediaSize.naturalWidth) / 2;
    }

    setCroppedAreaPixels(croppedAreaPixelsValue);
  };

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleApply = useCallback(async () => {
    if (!picture || !croppedAreaPixels) return;
    const cropCanvas = (await getCroppedImg(
      picture,
      croppedAreaPixels,
      rotation
    )) as HTMLCanvasElement;
    dispatch(
      setBadgeImage({
        badgeImageUrl: cropCanvas.toDataURL(),
        width: cropCanvas.width,
        height: cropCanvas.height,
      })
    );
    dispatch(switchBadgeUsed(true));
    onClose();
  }, [picture, croppedAreaPixels, rotation]);

  return (
    <Modal finalFocusRef={ref} isOpen={isBadgeUploadOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="brand.primary" textAlign="center">
          Upload Image
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
            <>
              <Center position="relative" height="260px" marginTop="10px">
                <Cropper
                  image={picture}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  cropShape={"round"}
                  aspect={1 / 1}
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  setMediaSize={setMediaSize}
                />
              </Center>
              <Flex
                justifyContent="space-between"
                alignContent="center"
                margin="0 0.5rem"
                marginTop="15px"
              >
                <Box minWidth="120px">
                  <Text fontSize="sm" color="brand.primary" fontWeight="600">
                    Zoom
                  </Text>
                  <Slider
                    aria-label="zoom-slider"
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
                  <Text fontSize="sm" color="brand.primary" fontWeight="600">
                    Rotation
                  </Text>
                  <Slider
                    aria-label="rotate-slider"
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
            </>
          )}
        </ModalBody>
        <ModalFooter justifyContent="center">
          {picture && !loading && (
            <Button variant="shareBtn" onClick={handleApply}>
              Apply
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImageUpload;
