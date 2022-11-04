import { useColorHandler } from "@/hooks/useColorHandler";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { useStoreSelector } from "@/store/hooks";
import { getColor } from "@/store/reducer/tileSlice";
import React from "react";
import { Rect } from "react-konva";
type CustomiseBorderPro = {
  startPoint: ICourtStartPoint;
  borderLength: number;
  customizeXLength: number;
  customizeYLength: number;
  courtAreaYLength: number;
};
const CustomiseBorder = ({
  startPoint,
  borderLength,
  customizeXLength,
  customizeYLength,
  courtAreaYLength,
}: CustomiseBorderPro) => {
  const selectedColor = useStoreSelector((state) => state.courtColor.selectedColor);
  const borderColor = getColor("border");
  const handleColorChange = useColorHandler(selectedColor, "border");
  return (
    <Rect
      width={customizeXLength * 1000 + borderLength * 2}
      height={customizeYLength * 1000 + borderLength * 2}
      fill={borderColor}
      x={startPoint.X - borderLength}
      y={startPoint.Y + courtAreaYLength / 2 - (customizeYLength * 1000) / 2 - borderLength}
      onClick={handleColorChange}
      onTouchStart={handleColorChange}
    />
  );
};

export default CustomiseBorder;
