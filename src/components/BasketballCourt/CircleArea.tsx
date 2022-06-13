import { Arc } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

const CircleArea = ({ color = "#606F14" }) => {
  const {
    initPointX, 
    initPointY, 
    courtAreaXLength,
    threePointLineToCourtEdgeLenth,
    threePointLineRadius,
    circleRadius,
    strokeWidth,
  } = useStoreSelector((state) => state.proFullCourt);
  const startPointX = initPointX + courtAreaXLength;
  const startPointY = initPointY + threePointLineToCourtEdgeLenth + threePointLineRadius;

  return (
    <Arc
        x={startPointX}
        y={startPointY}
        innerRadius={0}
        outerRadius={circleRadius}
        angle={180}
        fill={color}
        stroke="white"
        strokeWidth={strokeWidth}
        clockwise
        rotation={270}
      />
  );
};

export default CircleArea;
