import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { courtWhiteLine } from "../../store/reducer/courtSizeSlice";
import { useContext } from "react";
import { START_POINT } from "@/constants/courtSize";


function KeyArea() {
  const { threePointLineToCourtEdgeLenth, threePointLineRadius, keyAreaWidth, keyAreaHeight } =
    useStoreSelector((state) => state.courtSize);
  const startPoint = useContext(START_POINT);
  const startPointY =
    startPoint.Y + threePointLineToCourtEdgeLenth + threePointLineRadius - keyAreaHeight / 2;

  const color = useStoreSelector(
    (state) => state.tile.find((tile) => tile.location.includes("keyArea"))?.color
  );

  return (
    <Rect
      width={keyAreaWidth}
      height={keyAreaHeight}
      fill={color}
      stroke="white"
      strokeWidth={courtWhiteLine}
      x={startPoint.X}
      y={startPointY}
    />
  );
}

export default KeyArea;
