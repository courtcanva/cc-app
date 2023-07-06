import {
  Box,
  Flex,
  IconButton,
  FormControl,
  Switch,
  FormLabel,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import ResetDisplayAdjustmentSvg from "@/assets/svg/RightBarSvg/resetDisplayAdjustment.svg";
import ZoomOutSvg from "@/assets/svg/RightBarSvg/zoomOut.svg";
import ZoomInSvg from "@/assets/svg/RightBarSvg/zoomIn.svg";
import { useDispatch } from "react-redux";
import { switchRuler } from "@/store/reducer/buttonToggleSlice";
import { useStoreSelector } from "@/store/hooks";
import { changeZoomScale, dragSwitch, resetAll } from "@/store/reducer/canvasControlSlice";
import { MAX_ZOOM, MIN_ZOOM } from "@/constants/zoomLimit";

const DisplayAdjustment = () => {
  const { zoomScale } = useStoreSelector((state) => state.canvasControl);

  const dispatch = useDispatch();
  const handleRulerState = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(switchRuler(e.target.checked));
  };

  // changeZoomScale Payload: true -> Zoom in, false -> Zoom out
  const handleZoomIn = () => {
    dispatch(changeZoomScale(true));
    dispatch(dragSwitch(true));
  };

  const handleZoomOut = () => {
    dispatch(changeZoomScale(false));
  };

  const handleResetZoom = () => {
    dispatch(resetAll());
  };

  return (
    <Box>
      <Text fontSize="14px" fontWeight="700" mb="10px">
        Display Adjustment
      </Text>
      <Flex alignItems="center">
        <Tooltip hasArrow shouldWrapChildren label="Zoom Out" fontSize="sm" ml="-10px">
          <IconButton
            aria-label="Revert edit"
            icon={<ZoomOutSvg />}
            variant="navbarIconBtn"
            data-testid="zoom-out-btn"
            onClick={handleZoomOut}
            isDisabled={zoomScale <= MIN_ZOOM}
            ml="-10px"
          />
        </Tooltip>

        <Tooltip hasArrow shouldWrapChildren label="Zoom In" fontSize="sm" ml="-8px">
          <IconButton
            aria-label="Forward edit"
            icon={<ZoomInSvg />}
            variant="navbarIconBtn"
            data-testid="zoom-in-btn"
            onClick={handleZoomIn}
            isDisabled={zoomScale > MAX_ZOOM}
            ml="-8px"
          />
        </Tooltip>

        <Text fontSize="12px" fontWeight="500" margin="0 2px">{` ${(
          zoomScale * 100
        ).toFixed()} %`}</Text>

        <Tooltip hasArrow label="Reset Court Scale" fontSize="sm">
          <IconButton
            aria-label="reset zoom"
            icon={<ResetDisplayAdjustmentSvg boxSize={6} />}
            variant="navbarIconBtn"
            data-testid="reset-btn"
            onClick={handleResetZoom}
          />
        </Tooltip>
      </Flex>
      <Flex alignItems="center" marginTop="11.5px">
        <FormControl display="flex" alignItems="center">
          <FormLabel
            htmlFor="ruler-switch-btn"
            mb="0"
            data-testid="ruler-label"
            fontSize="12px"
            fontWeight="500"
          >
            Ruler
          </FormLabel>
          <Switch
            id="ruler-switch-btn"
            colorScheme="footerSwitch"
            size="lg"
            marginLeft="-4px"
            sx={{
              "span.chakra-switch__track": {
                padding: "0px",
                borderRadius: "12px",
                width: "39px",
                height: "18px",
              },
              "span .chakra-switch__thumb": {
                bgColor: "background.tertiary",
                marginTop: "2px",
                width: "14px",
                height: "14px",
                boxShadow: "-2px 0px 4px rgba(0,0,0,0.25)",
              },
              "span.chakra-switch__track[data-focus]": {
                boxShadow: "none",
              },
            }}
            defaultChecked
            data-testid="switch-btn"
            onChange={handleRulerState}
          />
        </FormControl>
      </Flex>
    </Box>
  );
};

export default DisplayAdjustment;
