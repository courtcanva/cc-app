import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  SimpleGrid,
  Text,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody } from "@chakra-ui/react";
import { useStoreSelector } from "@/store/hooks";

import ColorBoard from "./ColorBoard";
import BinSvg from "@/assets/svg/TopBarSvg/bin.svg";
import DocSvg from "@/assets/svg/TopBarSvg/document.svg";
import PaintBucketSvg from "@/assets/svg/TopBarSvg/paintBucket.svg";
import UploadSvg from "@/assets/svg/TopBarSvg/upload.svg";
import { useDispatch } from "react-redux";
import { changeSelectedColor } from "@/store/reducer/courtColorSlice";

const TopBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name: courtName } = useStoreSelector((state) => state.courtName);
  const { selectedColor } = useStoreSelector((state) => state.courtColor);
  const dispatch = useDispatch();
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
        <Slider aria-label="slider" defaultValue={40} maxW="40" minWidth="30">
          <SliderTrack height="9px" borderRadius="6px">
            <SliderFilledTrack background="brand.primary" />
          </SliderTrack>
          <SliderThumb boxSize={5} />
        </Slider>
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
