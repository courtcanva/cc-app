import { Arc } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

interface ShootAreaProps {
  courtRatio: number;
  color: string;
}

const ShootArea: React.FC<ShootAreaProps> = ({ courtRatio, color }) => {
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
        strokeWidth={strokeWidth / 40}
        clockwise
        rotation={270}
        dash={[1, 1]}
      />
    </>
  );
};

export default ShootArea;
