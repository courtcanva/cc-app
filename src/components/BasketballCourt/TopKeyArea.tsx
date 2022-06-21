import { Arc } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";

interface ShootAreaProps {
  courtRatio: number;
  startPoint: ICourtStartPoint
}

const ShootArea: React.FC<ShootAreaProps> = ({ courtRatio, startPoint }) => {
  const {
    keyAreaWidth,
    threePointLineToCourtEdgeLenth,
    threePointLineRadius,
    circleRadius,
    strokeWidth,
  } = useStoreSelector((state) => state.courtSize);
  const startPointX = startPoint.X + keyAreaWidth * courtRatio;
  const startPointY =
    startPoint.Y + (threePointLineToCourtEdgeLenth + threePointLineRadius) * courtRatio;

  const color = useStoreSelector(
    (state) => state.tile.find((tile) => tile.location.includes("topKeyArea"))?.color
  );

  return (
    <>
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
        rotation={90}
      />
      <Arc
        x={startPointX}
        y={startPointY}
        innerRadius={0}
        outerRadius={circleRadius * courtRatio}
        angle={180}
        fill="transparent"
        stroke="white"
        strokeWidth={strokeWidth / 200}
        clockwise
        rotation={270}
        dash={[3, 3]}
      />
    </>
  );
};

export default ShootArea;
