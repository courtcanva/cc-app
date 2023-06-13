import {
  Slider,
  SliderTrack,
  SliderMark,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  Text,
  IconButton,
  Grid,
  Tooltip,
} from "@chakra-ui/react";
import { FaCaretUp } from "react-icons/fa";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody } from "@chakra-ui/react";
import { useStoreSelector } from "@/store/hooks";
import ColorBoard from "./ColorBoard";
import SaveBoard from "./SaveBoard";
import DownloadSvg from "@/assets/svg/TopBarSvg/download.svg";
import BinSvg from "@/assets/svg/TopBarSvg/bin.svg";
import DocSvg from "@/assets/svg/TopBarSvg/document.svg";
import PaintBucketSvg from "@/assets/svg/TopBarSvg/paintBucket.svg";
import UploadSvg from "@/assets/svg/TopBarSvg/upload.svg";
import BorderSvg from "@/assets/svg/TopBarSvg/border.svg";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  switchPaintBucket,
  switchSideBar,
  switchLoginModal,
  switchSavePopover,
} from "@/store/reducer/buttonToggleSlice";
import { getCourtNameString, updateBorderLength } from "@/store/reducer/courtSpecDataSlice";
import { downloadToPDF } from "@/utils/printPDF";
import { resetAll } from "@/store/reducer/canvasControlSlice";
import { RIGHT_BAR_WIDTH } from "@/constants/designPage";

const TopBar = () => {
  const dispatch = useDispatch();
  const open = () => dispatch(switchPaintBucket(true));
  const close = () => dispatch(switchPaintBucket(false));
  const userData = useStoreSelector((state) => state.user);
  const { selectedColor } = useStoreSelector((state) => state.courtColor);
  const { isPaintPopoverOpen, isSavePopoverOpen } = useStoreSelector((state) => state.buttonToggle);
  const { activeCourt: selectedCourt } = useStoreSelector((state) => state.courtSpecData);

  const nameString = getCourtNameString(selectedCourt);
  const borderLength = selectedCourt.borderLength;
  const [sliderValue, setSliderValue] = useState(borderLength / 1000);
  const [useUserId, setUserId] = useState(userData.userId);

  useEffect(() => {
    setSliderValue(borderLength / 1000);
    setUserId(userData.userId);
  }, [borderLength, userData]);

  const handleDownload = () => {
    dispatch(switchSideBar(false));
    dispatch(resetAll());
    const downloadTimer = setTimeout(() => {
      downloadToPDF();
      clearTimeout(downloadTimer);
    }, 500);
  };

  const handleChange = (val: number) => {
    dispatch(resetAll());
    dispatch(switchSideBar(false));
    setSliderValue(val);
    dispatch(updateBorderLength(val * 1000));
  };

  const handleSaveOpen = () => {
    useUserId ? dispatch(switchSavePopover(true)) : dispatch(switchLoginModal(true));
  };

  const handleSaveClose = () => {
    dispatch(switchSavePopover(false));
  };

  return (
    <Grid
      gridTemplateColumns={{ base: "0 1fr 1fr", lg: "1fr 1fr 1fr" }}
      position="fixed"
      width={`calc(100vw - 98px - ${RIGHT_BAR_WIDTH})`}
      background="background.tertiary"
      left="98px"
      top="73px"
      height="50px"
    >
      <Flex alignItems="center">
        <Text
          minWidth="250px"
          fontSize="md"
          fontWeight="600"
          display={{ base: "none", lg: "block" }}
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          marginLeft="8"
          color="brand.primary"
        >
          {nameString}
        </Text>
      </Flex>

      <Flex
        alignItems="center"
        justifyContent={{ base: "flex-start", lg: "center" }}
        marginLeft="35px"
      >
        <Flex alignItems="center" gap="3" marginRight={{ base: "55px", lg: "50px", xl: "100px" }}>
          <Tooltip hasArrow shouldWrapChildren label="Paint Bucket" fontSize="sm" placement="top">
            <Popover
              isOpen={isPaintPopoverOpen}
              onOpen={open}
              onClose={close}
              returnFocusOnClose={false}
            >
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
          </Tooltip>
          <Tooltip hasArrow shouldWrapChildren label="Label Bucket" fontSize="sm" placement="top">
            <IconButton
              aria-label="Upload"
              colorScheme="transparent"
              icon={<UploadSvg />}
              data-testid="uploadBtn"
              variant="editorFooterIconBtn"
            />
          </Tooltip>
        </Flex>
        <Flex alignItems="center" gap="2">
          <Tooltip
            hasArrow
            shouldWrapChildren
            label="Border Slider"
            marginBottom="9px"
            fontSize="sm"
            placement="top"
          >
            <BorderSvg data-testid="borderIcon" />
          </Tooltip>
          <Text fontSize="lg" color="brand.primary">
            0
          </Text>
          <Slider
            aria-label="slider"
            defaultValue={sliderValue}
            value={sliderValue}
            min={0}
            max={2.0}
            step={0.1}
            w="180px"
            isDisabled={selectedCourt.courtName === "Pro Full Court"}
            onChange={(val: number) => handleChange(val)}
          >
            <SliderMark
              value={sliderValue}
              textAlign="center"
              color="brand.primary"
              marginTop="-6"
              marginLeft="-5"
              width="10"
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
              marginTop={3}
              boxShadow="none"
            >
              <FaCaretUp size={30} />
            </SliderThumb>
          </Slider>
          <Text fontSize="lg" color="brand.primary">
            2
          </Text>
        </Flex>
      </Flex>

      {/* right */}
      <Flex alignItems="center" justifyContent="flex-end" marginRight="3" gap="2">
        <IconButton
          aria-label="Download"
          colorScheme="transparent"
          icon={<DownloadSvg />}
          variant="witheBackgroundIconBtn"
          onClick={handleDownload}
          data-testid="download-btn"
        />
        <Popover isOpen={isSavePopoverOpen} onClose={handleSaveClose}>
          <PopoverTrigger>
            <IconButton
              aria-label="DocSvg"
              colorScheme="transparent"
              icon={<DocSvg />}
              variant="witheBackgroundIconBtn"
              onClick={handleSaveOpen}
              data-testid="save-btn"
            />
          </PopoverTrigger>
          <PopoverContent w="140px" h="110px">
            <PopoverBody>
              <SaveBoard />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Grid>
  );
};

export default TopBar;
