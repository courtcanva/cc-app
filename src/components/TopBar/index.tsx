import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { Flex, SimpleGrid, Text, IconButton } from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";

import ColorPlate from "./color-plate";

import BinSvg from "@/assets/svg/TopBarSvg/bin.svg";
import DocSvg from "@/assets/svg/TopBarSvg/document.svg";
import RbSvg from "@/assets/svg/TopBarSvg/rainbow.svg";
import ScSvg from "@/assets/svg/TopBarSvg/smallCourt.svg";
import UploadSvg from "@/assets/svg/TopBarSvg/upload.svg";

const TopBar = () => {
  return (
    <SimpleGrid
      columns={2}
      position="fixed"
      w="calc(100vw - 98px)"
      bg="white"
      boxShadow="dark-lg"
      left="98px"
      mt="-356"
      h="50px"
      p={2}
      pt={1}
      pb={1}
    >
      {/* left */}
      <Flex alignItems="center" justifyContent="space-around">
        <Text fontSize="md" fontWeight="600">
          510 m² Pro full court (17 m * 30 m)
        </Text>
        <Flex alignItems="center">
          <Text fontWeight="700" fontSize="md">
            Center court circle
          </Text>
          <IconButton
            aria-label="SmallCourt"
            icon={<ScSvg />}
            ml="8"
            data-testid="smallCourtIcon"
          />
        </Flex>

        <Popover closeOnBlur={false}>
          <PopoverTrigger>
            <IconButton aria-label="Rb" colorScheme="" icon={<RbSvg />} display="fixed" data-testid="colorSelectBtn" />
          </PopoverTrigger>
          <PopoverContent w={300} h={168} mt={0.5}>
            <PopoverArrow />
            <PopoverBody>
              {/* color-plate */}
              <ColorPlate />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>

      {/* right */}
      <SimpleGrid columns={2} alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" justifyContent="space-between">
          <IconButton
            aria-label="Upload"
            colorScheme=""
            icon={<UploadSvg />}
            data-testid="uploadBtn"
          />
          <Text fontSize="md">Border width</Text>
          <Slider aria-label="slider-ex-4" defaultValue={40} maxW="40">
            <SliderTrack h="9px" borderRadius="6px">
              <SliderFilledTrack bg="brand.primary" />
            </SliderTrack>
            <SliderThumb boxSize={5} />
          </Slider>
        </Flex>

        <Flex alignItems="center" justifyContent="flex-end" mr="3" gap="2">
          <IconButton aria-label="DocSvg" colorScheme="" icon={<DocSvg />} />
          <IconButton aria-label="Bin" colorScheme="" icon={<BinSvg />} />
        </Flex>
      </SimpleGrid>
    </SimpleGrid>
  );
};

export default TopBar;
