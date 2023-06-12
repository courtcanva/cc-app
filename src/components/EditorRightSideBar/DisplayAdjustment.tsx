import { Stack, Flex, Text, Switch, FormLabel, Tooltip } from "@chakra-ui/react";
import { changeZoomScale, dragSwitch, resetAll } from "@/store/reducer/canvasControlSlice";
import { RiZoomInLine, RiZoomOutLine } from "react-icons/ri";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import IconWrapper from "./IconWrapper/IconWrapper";
import { useDispatch } from "react-redux";
import { switchRuler } from "@/store/reducer/buttonToggleSlice";
import { MAX_ZOOM, MIN_ZOOM } from "@/constants/zoomLimit";
import { useStoreSelector } from "@/store/hooks";

const DisplayAdjustment = () => {
  const dispatch = useDispatch();
  const { zoomScale } = useStoreSelector((state) => state.canvasControl);
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
    <Stack spacing="20px">
      <Text fontWeight="700" fontSize="14px" fontFamily="Inter" paddingLeft="2px">
        Display Adjustment
      </Text>
      <Flex alignItems="center" gap="12px">
        <Tooltip hasArrow shouldWrapChildren label="Zoom Out">
          <IconWrapper disabled={zoomScale <= MIN_ZOOM} onClick={handleZoomOut}>
            <RiZoomOutLine
              aria-label="Revert edit"
              color="fontcolor.primary"
              data-testid="zoom-out-btn"
              size="20px"
            />
          </IconWrapper>
        </Tooltip>

        <Tooltip hasArrow shouldWrapChildren label="Zoom In">
          <IconWrapper disabled={zoomScale > MAX_ZOOM} onClick={handleZoomIn}>
            <RiZoomInLine
              aria-label="Forward edit"
              color="fontcolor.primary"
              data-testid="zoom-in-btn"
              size="20px"
            />
          </IconWrapper>
        </Tooltip>

        <Text display="inline" fontWeight="500" fontSize="sm">
          {`${(zoomScale * 100).toFixed()} %`}
        </Text>

        <Tooltip hasArrow shouldWrapChildren label="Reset Scale">
          <IconWrapper onClick={handleResetZoom}>
            <GiAnticlockwiseRotation
              aria-label="Reset Scale"
              color="fontcolor.primary"
              data-testid="reset-btn"
              size="20px"
            />
          </IconWrapper>
        </Tooltip>
      </Flex>
      <Flex paddingTop="2px">
        <FormLabel
          htmlFor="ruler-switch-btn"
          color="fontcolor.primary"
          data-testid="ruler-label"
          fontSize="12px"
          fontWeight="500"
          fontFamily="Inter"
        >
          Ruler
        </FormLabel>
        <Switch
          id="ruler-switch-btn"
          colorScheme="footerSwitch"
          size="md"
          defaultChecked
          data-testid="switch-btn"
          onChange={handleRulerState}
        />
      </Flex>
    </Stack>
  );
};

export default DisplayAdjustment;
