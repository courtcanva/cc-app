import { Arc } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

interface ShootAreaProps {
  courtRatio: number;
}

const ShootArea: React.FC<ShootAreaProps> = ({ courtRatio }) => {
  const {
    initPointX,
    initPointY,
    keyAreaWidth,
    threePointLineToCourtEdgeLenth,
    threePointLineRadius,
    circleRadius,
    strokeWidth,
  } = useStoreSelector((state) => state.courtSize);
  const startPointX = initPointX + keyAreaWidth * courtRatio;
  const startPointY =
    initPointY + (threePointLineToCourtEdgeLenth + threePointLineRadius) * courtRatio;

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
        strokeWidth={strokeWidth / 10}
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
        strokeWidth={strokeWidth / 20}
        clockwise
        rotation={270}
        dash={[3, 3]}
      />
    </>
  );
};

export default ShootArea;
