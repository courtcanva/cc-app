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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import { useStoreSelector } from "@/store/hooks";

import ColorBoard from "./ColorBoard";
import LoginModalContent from "../Login";

import BinSvg from "@/assets/svg/TopBarSvg/bin.svg";
import DocSvg from "@/assets/svg/TopBarSvg/document.svg";
import RbSvg from "@/assets/svg/TopBarSvg/rainbow.svg";
import ScSvg from "@/assets/svg/TopBarSvg/smallCourt.svg";
import UploadSvg from "@/assets/svg/TopBarSvg/upload.svg";

const TopBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name: courtName } = useStoreSelector((state) => state.courtName);

  return (
    <SimpleGrid
      columns={2}
      position="fixed"
      w="calc(100vw - 98px)"
      bg="white"
      boxShadow="dark-lg"
      left="98px"
      top="73px"
      h="50px"
      pt={1}
      pb={1}
    >
      {/* left */}
      <Flex alignItems="center" justifyContent="space-around">
        <Text
          minWidth="250px"
          fontSize="md"
          fontWeight="600"
          display={{ base: "none", xl: "block" }}
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {courtName}
        </Text>
        <Flex alignItems="center">
          <Text fontWeight="700" fontSize="md" whiteSpace="nowrap" textOverflow="ellipsis">
            Center court circle
          </Text>
          <IconButton
            aria-label="SmallCourt"
            icon={<ScSvg />}
            variant="editorFooterIconBtn"
            ml="8"
            mt="-0.5"
            w="76px"
            h="46px"
            data-testid="smallCourtIcon"
          />
        </Flex>

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
          <PopoverContent w={300} h={168}>
            <PopoverArrow />
            <PopoverBody>
              <ColorBoard />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>

      {/* right */}
      <SimpleGrid columns={2} alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" justifyContent="space-between">
          <IconButton
            aria-label="Upload"
            colorScheme="transparent"
            icon={<UploadSvg />}
            data-testid="uploadBtn"
            variant="editorFooterIconBtn"
          />
          <Flex
            fontSize="md"
            mr={{ base: "6", xl: "" }}
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            alignItems="center"
            justifyContent="center"
          >
            Border
            <Text
              fontSize="md"
              ml="1"
              display={{ base: "none", xl: "block" }}
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              width
            </Text>
          </Flex>

          <Slider aria-label="slider" defaultValue={40} maxW="40">
            <SliderTrack h="9px" borderRadius="6px">
              <SliderFilledTrack bg="brand.primary" />
            </SliderTrack>
            <SliderThumb boxSize={5} />
          </Slider>
        </Flex>

        <Flex alignItems="center" justifyContent="flex-end" mr="3" gap="2">
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
    </SimpleGrid>
  );
};

export default TopBar;
