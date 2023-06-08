import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Text,
  Tooltip,
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverBody,
  Slider,
  SliderTrack,
  SliderThumb,
} from "@chakra-ui/react";
import PaintBucketSvg from "@/assets/svg/RightBarSvg/paintBucket.svg";
import UndoSvg from "@/assets/svg/RightBarSvg/undo.svg";
import RedoSvg from "@/assets/svg/RightBarSvg/redo.svg";
import ResetSvg from "@/assets/svg/RightBarSvg/reset.svg";
import CustomizeSvg from "@/assets/svg/RightBarSvg/customize.svg";
import { useDispatch } from "react-redux";
import { switchPaintBucket, switchSideBar } from "@/store/reducer/buttonToggleSlice";
import { useStoreSelector } from "@/store/hooks";
import ColorBoard from "@/components/TopBar/ColorBoard";
import { ActionCreators } from "redux-undo";
import { resetAll } from "@/store/reducer/canvasControlSlice";
import { updateBorderLength } from "@/store/reducer/courtSpecDataSlice";
import { updateBorderTileQty } from "@/store/reducer/areaTileQtySlice";

const DesignTools = () => {
  const dispatch = useDispatch();
  const open = () => dispatch(switchPaintBucket(true));
  const close = () => dispatch(switchPaintBucket(false));
  const userData = useStoreSelector((state) => state.user);
  const { selectedColor } = useStoreSelector((state) => state.courtColor);
  const { isPaintPopoverOpen, isSavePopoverOpen } = useStoreSelector((state) => state.buttonToggle);
  const { activeCourt: selectedCourt } = useStoreSelector((state) => state.courtSpecData);

  const isThingsToUndo = useStoreSelector((state) => state.tile.past).length;
  const isThingsToRedo = useStoreSelector((state) => state.tile.future).length;
  const isThingsToReset = isThingsToUndo;
  const handleUndo = () => {
    dispatch(switchSideBar(false));
    dispatch(ActionCreators.undo());
  };
  const handleRedo = () => {
    dispatch(switchSideBar(false));
    dispatch(ActionCreators.redo());
  };
  const handleReset = () => {
    dispatch(switchSideBar(false));
    dispatch(ActionCreators.jumpToPast(0));
  };

  const borderLength = selectedCourt.borderLength;
  const [sliderValue, setSliderValue] = useState(borderLength / 1000);
  const [useUserId, setUserId] = useState(userData.userId);

  useEffect(() => {
    setSliderValue(borderLength / 1000);
    setUserId(userData.userId);
  }, [borderLength, userData]);

  const handleChange = (val: number) => {
    dispatch(resetAll());
    dispatch(switchSideBar(false));
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

  return (
    <Box>
      <Text fontSize="14px" fontWeight="700" mb="10px">
        Design Tools
      </Text>
      <Flex>
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
                variant="navbarIconBtn"
                data-testid="colorSelectBtn"
                mr="4px"
                ml="-10px"
              />
            </PopoverTrigger>
            <PopoverContent width={300} height={168}>
              <PopoverBody>
                <ColorBoard />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Tooltip>
        <Tooltip hasArrow shouldWrapChildren label="undo color edit">
          <IconButton
            aria-label="Revert edit"
            data-testid="undoBtn"
            icon={<UndoSvg />}
            variant="navbarIconBtn"
            disabled={!isThingsToUndo}
            onClick={handleUndo}
          />
        </Tooltip>
        <Tooltip hasArrow shouldWrapChildren label="redo color edit">
          <IconButton
            aria-label="Forward edit"
            data-testid="redoBtn"
            icon={<RedoSvg />}
            variant="navbarIconBtn"
            disabled={!isThingsToRedo}
            onClick={handleRedo}
            marginX="-4px"
          />
        </Tooltip>
        <Tooltip hasArrow shouldWrapChildren label="reset all color edits">
          <IconButton
            aria-label="Reset edit"
            data-testid="resetBtn"
            icon={<ResetSvg />}
            variant="navbarIconBtn"
            disabled={!isThingsToReset}
            onClick={handleReset}
          />
        </Tooltip>
      </Flex>
      <Flex>
        <Tooltip label="Custom size">
          <IconButton
            aria-label={"Custom size"}
            icon={<CustomizeSvg boxSize={6} />}
            disabled={true}
            variant="navbarIconBtn"
            mr="4px"
            ml="-10px"
          />
        </Tooltip>
        <Slider
          aria-label="slider"
          defaultValue={sliderValue}
          value={sliderValue}
          min={0}
          max={2.0}
          step={0.1}
          w="100px"
          isDisabled={selectedCourt.courtName === "Pro Full Court"}
          onChange={(val: number) => handleChange(val)}
          display="flex"
          alignItems="center"
          colorScheme=""
        >
          <SliderTrack height="1px" borderColor="#FFFFFF" />
          <SliderThumb
            w="20px"
            h="20px"
            bg="background.secondary"
            border="1px solid"
            borderColor="#FFFFFF"
          >
            <Box fontSize="10px" fontWeight="600" color="#FFFFFF" textAlign="center">
              {sliderValue.toFixed(1)}
            </Box>
          </SliderThumb>
        </Slider>
      </Flex>
    </Box>
  );
};

export default DesignTools;
