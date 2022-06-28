import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { courtWhiteLine } from "../../store/reducer/courtSizeSlice";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { useState } from "react";

interface KeyAreaTextProps {
  startPoint: ICourtStartPoint;
}

const KeyArea: React.FC<KeyAreaTextProps> = ({ startPoint }) => {
  const { threePointLineToCourtEdgeLenth, threePointLineRadius, keyAreaWidth, keyAreaHeight } =
    useStoreSelector((state) => state.courtSize);

  const selectedColor = useStoreSelector((state) => state.courtColor.color);
  const [keyAreaColor, setKeyAreaColor] = useState("#2C4E8A");

  const handleColorChange = () => {
    setKeyAreaColor(selectedColor);
  };
  return (
    <Rect
      width={keyAreaWidth}
      height={keyAreaHeight}
      fill={keyAreaColor}
      stroke="white"
      strokeWidth={courtWhiteLine}
      x={startPoint.X}
      y={startPoint.Y + threePointLineToCourtEdgeLenth + threePointLineRadius - keyAreaHeight / 2}
      onClick={() => handleColorChange()}
    />
  );
};

export default KeyArea;
