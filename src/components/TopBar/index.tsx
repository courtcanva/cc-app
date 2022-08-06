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
  Icon,
} from "@chakra-ui/react";
import { TriangleUpIcon } from "@chakra-ui/icons";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody } from "@chakra-ui/react";
import { useStoreSelector } from "@/store/hooks";
import ColorBoard from "./ColorBoard";
import SaveBoard from "./SaveBoard";
import { BsBorderWidth } from "react-icons/bs";
import DownloadSvg from "@/assets/svg/TopBarSvg/download.svg";
import BinSvg from "@/assets/svg/TopBarSvg/bin.svg";
import DocSvg from "@/assets/svg/TopBarSvg/document.svg";
import PaintBucketSvg from "@/assets/svg/TopBarSvg/paintBucket.svg";
import UploadSvg from "@/assets/svg/TopBarSvg/upload.svg";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { usePaintBucket } from "@/store/reducer/paintBucketSlice";
import {
  getCourtNameString,
  updateBorderLength,
  getDesignsData,
  setDefaultCourt,
  defaultCourt,
} from "@/store/reducer/courtSpecDataSlice";
import { updateBorderTileQty } from "@/store/reducer/areaTileQtySlice";
import { downloadToPDF } from "@/utils/printPDF";
import { fetchDesignData, useDeleteDesignMutation } from "@/redux/api/designApi";
import { designMapping } from "@/utils/designMapping";
import { getDesignsTileData } from "@/store/reducer/designsTileListSlice";
import { changeDesignNameList } from "@/store/reducer/designNameSlice";
import { useLoginModal } from "@/store/reducer/loginModalSlice";

const TopBar = () => {
  const dispatch = useDispatch();
  const open = () => dispatch(usePaintBucket(true));
  const close = () => dispatch(usePaintBucket(false));
  const userData = useStoreSelector((state) => state.user);
  const { selectedColor } = useStoreSelector((state) => state.courtColor);
  const { paintPopover } = useStoreSelector((state) => state.paintBucket);
  const { activeCourt: selectedCourt } = useStoreSelector((state) => state.courtSpecData);

  const nameString = getCourtNameString(selectedCourt);
  const borderLength = selectedCourt.borderLength;
  const [sliderValue, setSliderValue] = useState(borderLength / 1000);
  const [useUserId, setUserId] = useState(userData.googleId);
  const [savePopoverOpen, setSavePopoverOpen] = useState(false);

  useEffect(() => {
    setSliderValue(borderLength / 1000);
    setUserId(userData.googleId);
  }, [borderLength, userData]);

  const handleChange = (val: number) => {
    setSliderValue(val);
    dispatch(updateBorderLength(val * 1000));
    const borderTileQty =
      2 *
        (Math.ceil(selectedCourt.courtAreaXLength / 300) +
          Math.ceil(selectedCourt.courtAreaYLength / 300)) *
        Math.ceil((val * 1000) / 300) +
      4 * Math.pow(Math.ceil((val * 1000) / 300), 2);
    dispatch(updateBorderTileQty(borderTileQty));
  };

  const handleSaveOpen = () => {
    if (useUserId === "") {
      dispatch(useLoginModal(true));
      setSavePopoverOpen(false);
      return;
    }
    setSavePopoverOpen(true);
  };
  const handleSaveClose = () => {
    setSavePopoverOpen(false);
  };

  const [deleteDesign] = useDeleteDesignMutation();
  const handleDeleteDesign = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (useUserId === "") {
      dispatch(useLoginModal(true));
      return;
    }
    if (selectedCourt.courtId === "") return;
    await deleteDesign(selectedCourt.courtId);
    dispatch(setDefaultCourt(defaultCourt));
    const design = await fetchDesignData(useUserId);
    if (design.data === undefined) return;
    const { mappedDesignsData, mappedtileData, mappedNameList } = designMapping(design.data);
    dispatch(getDesignsData(mappedDesignsData));
    dispatch(getDesignsTileData(mappedtileData));
    dispatch(changeDesignNameList(mappedNameList));
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
        <Icon as={BsBorderWidth} color="brand.primary" data-testid="borderIcon" />
        <Text fontSize="lg">0</Text>
        <Slider
          aria-label="slider"
          defaultValue={sliderValue}
          value={sliderValue}
          min={0}
          max={2.0}
          step={0.1}
          maxWidth="40"
          minWidth="30"
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
            as={TriangleUpIcon}
            boxShadow="none"
          ></SliderThumb>
        </Slider>
        <Text fontSize="lg">2</Text>
      </Flex>

      {/* right */}
      <Flex alignItems="center" justifyContent="flex-end" marginRight="3" gap="2">
        <IconButton
          aria-label="Download"
          colorScheme="transparent"
          icon={<DownloadSvg />}
          variant="witheBackgroundIconBtn"
          onClick={downloadToPDF}
          data-testid="download-btn"
        />

        <Popover isOpen={savePopoverOpen} onClose={handleSaveClose}>
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
        <IconButton
          aria-label="Bin"
          colorScheme="transparent"
          icon={<BinSvg />}
          variant="editorFooterIconBtn"
          onClick={handleDeleteDesign}
        />
      </Flex>
    </SimpleGrid>
  );
};

export default TopBar;
