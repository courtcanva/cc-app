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
import DownloadSvg from "@/assets/svg/TopBarSvg/download.svg";
import BinSvg from "@/assets/svg/TopBarSvg/bin.svg";
import DocSvg from "@/assets/svg/TopBarSvg/document.svg";
import PaintBucketSvg from "@/assets/svg/TopBarSvg/paintBucket.svg";
import UploadSvg from "@/assets/svg/TopBarSvg/upload.svg";
import { useDispatch } from "react-redux";
import { downloadToPDF } from "../../utils/printPDF";
import { usePaintBucket } from "@/store/reducer/paintBucketSlice";

const TopBar = () => {
  const { onOpen } = useDisclosure();
  const dispatch = useDispatch();
  const open = () => dispatch(usePaintBucket(true));
  const close = () => dispatch(usePaintBucket(false));
  const { name: courtName } = useStoreSelector((state) => state.courtName);
  let nameString = "";
  const { selectedColor } = useStoreSelector((state) => state.courtColor);
  const { paintPopover } = useStoreSelector((state) => state.paintBucket);
  const { activeCourt: selectedCourt } = useStoreSelector((state) => state.courtSpecData);
  if (selectedCourt) {
    nameString = `${
      ((selectedCourt.courtAreaXLength + selectedCourt.borderLength * 2) *
        (selectedCourt.courtAreaYLength + selectedCourt.borderLength * 2)) /
      1000000
    } m² ${selectedCourt.courtName} (${
      (selectedCourt.courtAreaXLength + selectedCourt.borderLength * 2) / 1000
    } m × ${(selectedCourt.courtAreaYLength + selectedCourt.borderLength * 2) / 1000} m)`;
  }

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
          {nameString}
        </Text>
      </Flex>

      {/* center */}
      <Flex alignItems="center" gap={{ base: "0", lg: "5" }}>
        <Popover isOpen={paintPopover} onOpen={open} onClose={close}>
          <PopoverTrigger>
            <IconButton
              aria-label="Rb"
              icon={<PaintBucketSvg fill={selectedColor} />}
              display="fixed"
              variant="witheBackgroundIconBtn"
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
          variant="witheBackgroundIconBtn"
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
          aria-label="Download"
          colorScheme="transparent"
          icon={<DownloadSvg />}
          variant="witheBackgroundIconBtn"
          onClick={downloadToPDF}
        />
        <IconButton
          aria-label="DocSvg"
          colorScheme="transparent"
          icon={<DocSvg />}
          variant="witheBackgroundIconBtn"
          onClick={onOpen}
          data-testid="download-btn"
        />
        {/* TODO: Fetch user login state from redux */}
        {/* <LoginModalContent isOpen={isOpen} onClose={onClose}></LoginModalContent> */}
        <IconButton
          aria-label="Bin"
          colorScheme="transparent"
          icon={<BinSvg />}
          variant="witheBackgroundIconBtn"
        />
      </Flex>
    </SimpleGrid>
  );
};

export default TopBar;
