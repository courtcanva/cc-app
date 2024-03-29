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
  const sliderMarkData = [0, 90, -90, 180, -180];
  const sliderMarkLists = (): JSX.Element[] => {
    return sliderMarkData.map((item, index) => (
      <SliderMark
        key={index}
        value={item}
        marginTop="1"
        marginLeft="-2.5"
        fontSize="14px"
        fontWeight="700"
        color="#344C5C"
      >
        {item}°
      </SliderMark>
    ));
  };
  return (
    <Slider
      defaultValue={0}
      min={-180}
      max={180}
      onChange={(val) => setRotateDeg(val)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      width="400px"
      position="absolute"
      bottom={"-10%"}
    >
      {sliderMarkLists()}
      <SliderTrack backgroundColor="rgba(112, 136, 177, 0.5)">
        <SliderFilledTrack backgroundColor="rgba(112, 136, 177, 0.5)" />
      </SliderTrack>
      <Tooltip
        hasArrow
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={`${rotateDeg}°`}
        background="background.secondary"
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
};

export default Sidebar;
