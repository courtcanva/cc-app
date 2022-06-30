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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import { TriangleUpIcon } from '@chakra-ui/icons';
import { useStoreSelector } from "@/store/hooks";

import ColorBoard from "./ColorBoard";
import LoginModalContent from "../Login";

import BinSvg from "@/assets/svg/TopBarSvg/bin.svg";
import DocSvg from "@/assets/svg/TopBarSvg/document.svg";
import RbSvg from "@/assets/svg/TopBarSvg/rainbow.svg";
import UploadSvg from "@/assets/svg/TopBarSvg/upload.svg";
import { useDispatch } from "react-redux";
// import { changeCourtName } from "@/store/reducer/courtNameSlice";
import { changeBorderLength } from "@/store/reducer/courtSizeSlice";
import {useState} from 'react';

const TopBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sliderValue, setSliderValue] = useState(0.9);
  const { name: courtName } = useStoreSelector((state) => state.courtName);
  const dispatch = useDispatch();

  const handleChange = (val: number) => {
    console.log(val);
    setSliderValue(val);
    let newBorderlength = 0;
    switch (val) {
      case 0:
        newBorderlength = 0;
        break;
      case 0.3:
        newBorderlength = 300;
        break;
      case 0.6:
        newBorderlength = 600;
        break;
      case 0.9:
        newBorderlength = 900;
        break;
      case 1.2:
        newBorderlength = 1200;
        break;
      case 1.5:
        newBorderlength = 1500;
        break;
      case 1.8:
        newBorderlength = 1800;
        break;
      default:
        newBorderlength = 1800;
        break;
    }
    dispatch(changeBorderLength(newBorderlength));
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
        <Popover closeOnBlur={false}>
          <PopoverTrigger>
            <IconButton
              aria-label="Rb"
              colorScheme="transparent"
              icon={<RbSvg />}
              display="fixed"
              variant="editorFooterIconBtn"
              data-testid="colorSelectBtn"
            />
          </PopoverTrigger>
          <PopoverContent width={300} height={168}>
            <PopoverArrow />
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
        <Slider
          aria-label="slider"
          defaultValue={1}
          min={0}
          max={1.8}
          step={0.3}
          maxW="40"
          minWidth="30"
          onChangeEnd={(val) => handleChange(val)}
        >
          <SliderMark
            value={sliderValue}
            textAlign='center'
            color="brand.primary"
            mt='-6'
            ml='-5'
            w='10'
            fontSize="10px"
          >
            {sliderValue}m  
          </ SliderMark>        
          <SliderTrack height="9px" borderRadius="6px" background="brand.primary">
            <SliderFilledTrack background="brand.primary" />
          </SliderTrack>
          <SliderThumb background="transparent" color="brand.primary" border="none" mt={3} as={TriangleUpIcon} boxShadow="none">
          </SliderThumb>
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
        <LoginModalContent isOpen={isOpen} onClose={onClose}></LoginModalContent>
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
