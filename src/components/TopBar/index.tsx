import {
  Slider,
  SliderTrack,
  SliderMark,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  SimpleGrid,
  Text,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { TriangleUpIcon } from "@chakra-ui/icons";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody } from "@chakra-ui/react";
import { useStoreSelector } from "@/store/hooks";
import ColorBoard from "./ColorBoard";
import BinSvg from "@/assets/svg/TopBarSvg/bin.svg";
import DocSvg from "@/assets/svg/TopBarSvg/document.svg";
import PaintBucketSvg from "@/assets/svg/TopBarSvg/paintBucket.svg";
import UploadSvg from "@/assets/svg/TopBarSvg/upload.svg";
import { useDispatch } from "react-redux";
import { changeBorderLength } from "@/store/reducer/courtSizeSlice";
import { useEffect, useState } from "react";
import { changeSelectedColor } from "@/store/reducer/courtColorSlice";

const TopBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name: courtName } = useStoreSelector((state) => state.courtName);
  const { selectedColor } = useStoreSelector((state) => state.courtColor);
  const borderLength = useStoreSelector((state) => state.courtSize.borderLength);
  const [sliderValue, setSliderValue] = useState(borderLength / 1000);
  const dispatch = useDispatch();

  useEffect(() => setSliderValue(borderLength / 1000), [borderLength]);

  const handleChange = (val: number) => {
    setSliderValue(val);
    dispatch(changeBorderLength(val * 1000));
  };
  const handleSelectedColor = () => {
    dispatch(changeSelectedColor("none"));
  };

  return (
    <SimpleGrid
      columns={3}
      position="fixed"
      width="calc(100vw - 98px)"
      background="white"
      left="98px"
      top="73px"
      height="50px"
    >
      {/* left */}
      <Flex alignItems="center">
        <Text
          minWidth="250px"
          fontSize="md"
          fontWeight="600"
          display={{ base: "none", lg: "block" }}
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          marginLeft="8"
        >
          {courtName}
        </Text>
      </Flex>

      {/* center */}
      <Flex alignItems="center" gap={{ base: "0", lg: "5" }}>
        <Popover onClose={handleSelectedColor} closeOnBlur={false}>
          <PopoverTrigger>
            <IconButton
              aria-label="Rb"
              icon={<PaintBucketSvg fill={selectedColor} />}
              display="fixed"
              variant="editorFooterIconBtn"
              data-testid="colorSelectBtn"
            />
          </PopoverTrigger>
          <PopoverContent width={300} height={168}>
            <PopoverBody>
              <ColorBoard />
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <IconButton
          aria-label="Upload"
          colorScheme="transparent"
          icon={<UploadSvg />}
          data-testid="uploadBtn"
          variant="editorFooterIconBtn"
        />
        <Flex
          fontSize="md"
          marginRight={{ base: "6", xl: "" }}
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          alignItems="center"
          justifyContent="center"
        >
          Border
          <Text
            fontSize="md"
            marginLeft="1"
            display={{ base: "none", xl: "block" }}
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            width
          </Text>
        </Flex>
        <Text fontSize="lg">0</Text>
        <Slider
          aria-label="slider"
          defaultValue={sliderValue}
          value={sliderValue}
          min={0}
          max={1.8}
          step={0.3}
          maxW="40"
          minWidth="30"
          onChange={(val: number) => handleChange(val)}
        >
          <SliderMark
            value={sliderValue}
            textAlign="center"
            color="brand.primary"
            mt="-6"
            ml="-5"
            w="10"
            fontSize="10px"
          >
            {sliderValue}m
          </SliderMark>
          <SliderTrack height="9px" borderRadius="6px" background="brand.primary">
            <SliderFilledTrack background="brand.primary" />
          </SliderTrack>
          <SliderThumb
            background="transparent"
            color="brand.primary"
            border="none"
            mt={3}
            as={TriangleUpIcon}
            boxShadow="none"
          ></SliderThumb>
        </Slider>
        <Text fontSize="lg">1.8</Text>
      </Flex>

      {/* right */}
      <Flex alignItems="center" justifyContent="flex-end" marginRight="3" gap="2">
        <IconButton
          aria-label="DocSvg"
          colorScheme="transparent"
          icon={<DocSvg />}
          variant="editorFooterIconBtn"
          onClick={onOpen}
          data-testid="download-btn"
        />
        {/* TODO: Fetch user login state from redux */}
        {/* <LoginModalContent isOpen={isOpen} onClose={onClose}></LoginModalContent> */}
        <IconButton
          aria-label="Bin"
          colorScheme="transparent"
          icon={<BinSvg />}
          variant="editorFooterIconBtn"
        />
      </Flex>
    </SimpleGrid>
  );
};

export default TopBar;
