import React, { SetStateAction, Dispatch } from "react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from "@chakra-ui/react";

interface Props {
  rotateDeg: number;
  setRotateDeg: Dispatch<SetStateAction<number>>;
}

const Sidebar = ({ setRotateDeg, rotateDeg }: Props) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  return (
    <Slider
      id="slider"
      defaultValue={0}
      min={-180}
      max={180}
      colorScheme="teal"
      onChange={(val) => setRotateDeg(val)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      width="400px"
      color="rgba(112, 136, 177, 0.5)"
    >
      <SliderMark value={0} mt="1" ml="-2.5" fontSize="sm">
        0
      </SliderMark>
      <SliderMark value={90} mt="1" ml="-2.5" fontSize="sm">
        90%
      </SliderMark>
      <SliderMark value={-90} mt="1" ml="-2.5" fontSize="sm">
        -90%
      </SliderMark>
      <SliderMark value={180} mt="1" ml="-2.5" fontSize="sm">
        180%
      </SliderMark>
      <SliderMark value={-180} mt="1" ml="-2.5" fontSize="sm">
        -180%
      </SliderMark>
      <SliderTrack backgroundColor="rgba(112, 136, 177, 0.5)">
        <SliderFilledTrack backgroundColor="rgba(112, 136, 177, 0.5)" />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg="teal.500"
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={`${rotateDeg}%`}
        background="rgba(112, 136, 177)"
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
};

export default Sidebar;
