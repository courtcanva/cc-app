import React from "react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from "@chakra-ui/react";

const Sidebar = () => {
  const [sliderValue, setSliderValue] = React.useState(5);
  const [showTooltip, setShowTooltip] = React.useState(false);
  return (
    <Slider
      id="slider"
      defaultValue={5}
      min={0}
      max={100}
      colorScheme="teal"
      onChange={(v) => setSliderValue(v)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      width="400px"
      color="rgba(112, 136, 177, 0.5)"
    >
      {/* <SliderMark value={25} mt="1" ml="-2.5" fontSize="sm">
        25%
      </SliderMark>
      <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
        50%
      </SliderMark>
      <SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
        75%
      </SliderMark> */}
      <SliderTrack backgroundColor="rgba(112, 136, 177, 0.5)">
        <SliderFilledTrack backgroundColor="rgba(112, 136, 177, 0.5)" />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg="teal.500"
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={`${sliderValue}%`}
        background="rgba(112, 136, 177)"
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
};

export default Sidebar;
