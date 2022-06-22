import { Arc } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";

interface CircleAreaProps {
  startPoint: ICourtStartPoint;
}

const CircleArea: React.FC<CircleAreaProps> = ({ startPoint }) => {
  const {
    courtAreaXLength,
    threePointLineToCourtEdgeLenth,
    threePointLineRadius,
    circleRadius,
    strokeWidth,
  } = useStoreSelector((state) => state.courtSize);
  const startPointX = startPoint.X + courtAreaXLength / 2;
  const startPointY = startPoint.Y + (threePointLineToCourtEdgeLenth + threePointLineRadius);

  const color = useStoreSelector(
    (state) => state.tile.find((tile) => tile.location.includes("circleArea"))?.color
  );

  return (
    <Arc
      x={startPointX}
      y={startPointY}
      innerRadius={0}
      outerRadius={circleRadius}
      angle={180}
      fill={color}
      stroke="white"
      strokeWidth={strokeWidth / 3}
      clockwise
      rotation={270}
    />
  );
};

export default CircleArea;
