import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

const KeyArea = ({ color = "#2C4E8A" }) => {
  const {
    initPointX,
    initPointY,
    threePointLineToCourtEdgeLenth,
    threePointLineRadius,
    keyAreaWidth,
    keyAreaHeight,
    strokeWidth,
  } = useStoreSelector((state) => state.proFullCourt);
  const startPointX = initPointX;
  const startPointY =
    initPointY + threePointLineToCourtEdgeLenth + threePointLineRadius - keyAreaHeight / 2;

  return (
    <Rect
      width={keyAreaWidth}
      height={keyAreaHeight}
      fill={color}
      stroke="white"
      strokeWidth={strokeWidth}
      x={startPointX}
      y={startPointY}
    />
  );
};

export default KeyArea;
