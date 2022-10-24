import React from "react";
import { useStoreSelector } from "@/store/hooks";
import { MIN_DIMENSION_BOX } from "@/constants/courtData";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { Arrow, Text } from "react-konva";
type CustomiseCourtDimensionPro = {
  startPoint: ICourtStartPoint;
  borderLength: number;
  inputX: string;
  inputY: string;
};
const CustomiseCourtDimension = ({
  startPoint,
  borderLength,
  inputX,
  inputY,
}: CustomiseCourtDimensionPro) => {
  const { courtAreaYLength, courtAreaXLength } = useStoreSelector(
    (state) => state.courtSpecData.activeCourt
  );
  const { isRulerOn } = useStoreSelector((state) => state.buttonToggle);
  const dimensionColor = borderLength < MIN_DIMENSION_BOX ? "black" : "white";
  const borderSize = borderLength < MIN_DIMENSION_BOX ? MIN_DIMENSION_BOX : borderLength;
  const arrowSize = 100;
  const arrowWeight = 50;
  const arrowGap = 200;
  return (
    <>
      <Text
        width={borderSize}
        height={borderSize}
        text={inputX + "m"}
        fontSize={400}
        fontStyle="500"
        align="center"
        verticalAlign="middle"
        fill={dimensionColor}
        x={startPoint.X + (Number(inputX) * 1000) / 2 - borderSize / 2}
        y={startPoint.Y + courtAreaYLength / 2 - (Number(inputY) * 1000) / 2 - borderSize}
        visible={isRulerOn}
      />
      <Text
        width={borderSize}
        height={borderSize}
        text={inputY + "m"}
        fontSize={400}
        fontStyle="500"
        align="center"
        verticalAlign="middle"
        fill={dimensionColor}
        x={startPoint.X - borderSize}
        y={startPoint.Y + courtAreaYLength / 2 - borderSize / 2}
        visible={isRulerOn}
      />
      <Arrow // court x length left arrow
        pointerLength={arrowSize}
        pointerWidth={arrowSize}
        points={[
          startPoint.X + (Number(inputX) * 1000) / 2 - 750,
          startPoint.Y - borderSize / 2 + courtAreaYLength / 2 - (Number(inputY) * 1000) / 2,
          startPoint.X + arrowGap,
          startPoint.Y - borderSize / 2 + courtAreaYLength / 2 - (Number(inputY) * 1000) / 2,
        ]}
        fill={dimensionColor}
        stroke={dimensionColor}
        strokeWidth={arrowWeight}
        visible={isRulerOn}
      />

      <Arrow // court x length right arrow
        scaleX={-1}
        x={startPoint.X * 2 + Number(inputX) * 1000}
        pointerLength={arrowSize}
        pointerWidth={arrowSize}
        points={[
          startPoint.X + (Number(inputX) * 1000) / 2 - 750,
          startPoint.Y - borderSize / 2 + courtAreaYLength / 2 - (Number(inputY) * 1000) / 2,
          startPoint.X + arrowGap,
          startPoint.Y - borderSize / 2 + courtAreaYLength / 2 - (Number(inputY) * 1000) / 2,
        ]}
        fill={dimensionColor}
        stroke={dimensionColor}
        strokeWidth={arrowWeight}
        visible={isRulerOn}
      />

      <Arrow // court Y length top arrow
        pointerLength={arrowSize}
        pointerWidth={arrowSize}
        points={[
          startPoint.X - borderSize / 2,
          startPoint.Y + courtAreaYLength / 2 - 750,
          startPoint.X - borderSize / 2,
          startPoint.Y + arrowGap + courtAreaYLength / 2 - (Number(inputY) * 1000) / 2,
        ]}
        fill={dimensionColor}
        stroke={dimensionColor}
        strokeWidth={arrowWeight}
        visible={isRulerOn}
      />

      <Arrow // court Y length bottom arrow
        pointerLength={arrowSize}
        pointerWidth={arrowSize}
        points={[
          startPoint.X - borderSize / 2,
          startPoint.Y + courtAreaYLength / 2 + 750,
          startPoint.X - borderSize / 2,
          startPoint.Y - arrowGap + courtAreaYLength / 2 + (Number(inputY) * 1000) / 2,
        ]}
        fill={dimensionColor}
        stroke={dimensionColor}
        strokeWidth={arrowWeight}
        visible={isRulerOn}
      />
    </>
  );
};

export default CustomiseCourtDimension;
