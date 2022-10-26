/* eslint-disable require-jsdoc */
import { Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
export function ControlPanelSlider({
  setRotateDeg,
  rotateDeg,
  minDeg,
  maxDeg,
  defaultDeg = 0,
}: {
  setRotateDeg: Dispatch<SetStateAction<number>>;
  rotateDeg: number;
  minDeg: number;
  maxDeg: number;
  defaultDeg?: number;
}) {
  return (
    <Slider
      aria-label="slider-ex-6"
      onChange={(val) => setRotateDeg(val)}
      defaultValue={defaultDeg}
      min={minDeg}
      max={maxDeg}
      marginTop={"4rem"}
    >
      <SliderMark value={0}>{minDeg}</SliderMark>
      <SliderMark value={180}>{maxDeg / 2}</SliderMark>
      <SliderMark value={360}>{maxDeg}</SliderMark>
      <SliderMark
        value={rotateDeg}
        textAlign="center"
        bg="blue.500"
        color="white"
        mt="-10"
        ml="-5"
        w="12"
      >
        {rotateDeg} deg
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
}
