import { Arc } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";

interface ShootAreaProps {
  startPoint: ICourtStartPoint;
}

const ShootArea: React.FC<ShootAreaProps> = ({ startPoint }) => {
  const {
    keyAreaWidth,
    threePointLineToCourtEdgeLenth,
    threePointLineRadius,
    circleRadius,
    strokeWidth,
  } = useStoreSelector((state) => state.courtSize);
  const startPointX = startPoint.X + keyAreaWidth;
  const startPointY = startPoint.Y + (threePointLineToCourtEdgeLenth + threePointLineRadius);

  const color = useStoreSelector(
    (state) => state.tile.find((tile) => tile.location.includes("topKeyArea"))?.color
  );

  return (
    <>
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
        rotation={90}
      />
      <Arc
        x={startPointX}
        y={startPointY}
        innerRadius={0}
        outerRadius={circleRadius}
        angle={180}
        fill="transparent"
        stroke="white"
        strokeWidth={strokeWidth / 5}
        clockwise
        rotation={270}
        dash={[50, 50]}
      />
    </>
  );
};

export default ShootArea;
