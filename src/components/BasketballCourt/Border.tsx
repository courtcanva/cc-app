import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";
import { useState } from "react";

interface BorderProps {
  startPoint: ICourtStartPoint;
}
const Border: React.FC<BorderProps> = ({ startPoint }) => {
  const { courtAreaXLength, courtAreaYLength, borderLength } = useStoreSelector(
    (state) => state.courtSize
  );
  const selectedColor = useStoreSelector((state) => state.courtColor.color);
  const [courtBorderColor, setCourtBorderColor] = useState("#195955");

  const handleColorChange = () => {
    setCourtBorderColor(selectedColor);
  };

  return (
    <Rect
      width={courtAreaXLength + borderLength * 2}
      height={courtAreaYLength + borderLength * 2}
      fill={courtBorderColor}
      x={startPoint.X - borderLength}
      y={startPoint.Y - borderLength}
      onClick={() => handleColorChange()}
    />
  );
};

export default Border;
