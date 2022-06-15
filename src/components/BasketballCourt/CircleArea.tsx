import { Arc } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

interface CircleAreaProps {
  courtRatio: number;
  color: string;
}

const CircleArea: React.FC<CircleAreaProps> = ({courtRatio, color}) => {
  const {
    initPointX,
    initPointY,
    courtAreaXLength,
    threePointLineToCourtEdgeLenth,
    threePointLineRadius,
    circleRadius,
    strokeWidth,
  } = useStoreSelector((state) => state.courtSize);
  const startPointX = initPointX + courtAreaXLength * courtRatio;
  const startPointY = initPointY + (threePointLineToCourtEdgeLenth + threePointLineRadius) * courtRatio;

  return (
    <Arc
      x={startPointX}
      y={startPointY}
      innerRadius={0}
      outerRadius={circleRadius * courtRatio}
      angle={180}
      fill={color}
      stroke="white"
      strokeWidth={strokeWidth / 10}
      clockwise
      rotation={270}
    />
  );
};

export default CircleArea;
