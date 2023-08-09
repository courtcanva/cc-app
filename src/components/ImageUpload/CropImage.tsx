import {
  Button,
  Box,
  Center,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { getCroppedImg } from "@/utils/manageExternalImage";
import Cropper, { Area } from "react-easy-crop";

interface ICropImage {
  name: string;
  picture: string;
  setImage: (url: string, width: number, height: number) => void;
  onClose: () => void;
}

const CropImage = (props: ICropImage) => {
  const { name, picture, setImage, onClose } = props;
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

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setCrop({ x: 0, y: 0 });

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
    setImage(cropCanvas.toDataURL(), cropCanvas.width, cropCanvas.height);
    onClose();
  }, [picture, croppedAreaPixels, rotation]);

  useEffect(() => {
    handleReset();
  }, [picture]);

  return (
    <>
      <Center position="relative" height="260px" marginTop="10px">
        <Cropper
          image={picture}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          cropShape={"round"}
          aspect={3 / 3}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          setMediaSize={setMediaSize}
        />
      </Center>
      <Flex justifyContent="space-between" alignContent="center" margin="16px 8px">
        <Box minWidth="120px">
          <Flex justifyContent="space-between">
            <Text fontSize="sm" color="brand.primary" fontWeight="600" pb="8px">
              Zoom
            </Text>
            <Text fontSize="sm" color="brand.primary" fontWeight="600" pb="8px">
              {(zoom * 100).toFixed() + "%"}
            </Text>
          </Flex>
          <Slider
            aria-label="zoom-slider"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(zoom) => setZoom(zoom)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb w="16px" h="16px" bg="background.primary" />
          </Slider>
        </Box>
        <Box minWidth="120px">
          <Flex justifyContent="space-between">
            <Text fontSize="sm" color="brand.primary" fontWeight="600" pb="8px">
              Rotation
            </Text>
            <Text fontSize="sm" color="brand.primary" fontWeight="600" pb="8px">
              {rotation + "\u00B0"}
            </Text>
          </Flex>
          <Slider
            aria-label="rotate-slider"
            value={rotation}
            min={-180}
            max={180}
            step={1}
            aria-labelledby="Rotate"
            onChange={(rotation) => setRotation(rotation)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb w="16px" h="16px" bg="background.primary" />
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
      <Flex justifyContent="center" p="16px 0">
        <Button variant="shareBtn" onClick={handleApply}>
          Apply {name}
        </Button>
      </Flex>
    </>
  );
};

export default CropImage;
