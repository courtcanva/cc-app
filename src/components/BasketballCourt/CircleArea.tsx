import { Arc } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";

interface CircleAreaProps {
  courtRatio: number;
  startPoint: ICourtStartPoint
}

const CircleArea: React.FC<CircleAreaProps> = ({ courtRatio, startPoint }) => {
  const {
    courtAreaXLength,
    threePointLineToCourtEdgeLenth,
    threePointLineRadius,
    circleRadius,
    strokeWidth,
  } = useStoreSelector((state) => state.courtSize);
  const startPointX = startPoint.X + courtAreaXLength * courtRatio;
  const startPointY =
    startPoint.Y + (threePointLineToCourtEdgeLenth + threePointLineRadius) * courtRatio;

  const color = useStoreSelector(
    (state) => state.tile.find((tile) => tile.location.includes("circleArea"))?.color
  );

  return (
    <Arc
      x={startPointX}
      y={startPointY}
      innerRadius={0}
      outerRadius={circleRadius * courtRatio}
      angle={180}
      fill={color}
      stroke="white"
      strokeWidth={strokeWidth / 100}
      clockwise
      rotation={270}
    />
  );
};

export default CircleArea;
