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

  // const color = useStoreSelector(
  //   (state) => state.tile.find((tile) => tile.location.includes("keyArea"))?.color
  // );
  const currentColorBoardColor = useStoreSelector((state) => state.courtColor.color);
  const [keyAreaColor, setCourtAreaColor] = useState("#2C4E8A");

  const handleColorChange = () => {
    setCourtAreaColor(currentColorBoardColor);
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
