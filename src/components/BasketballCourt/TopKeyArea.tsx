import { Arc } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

const ShootArea = ({ color = "#B61313" }) => {
  const {
    initPointX,
    initPointY,
    keyAreaWidth,
    threePointLineToCourtEdgeLenth,
    threePointLineRadius,
    circleRadius,
    strokeWidth,
  } = useStoreSelector((state) => state.proFullCourt);
  const startPointX = initPointX + keyAreaWidth;
  const startPointY = initPointY + threePointLineToCourtEdgeLenth + threePointLineRadius;

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
        strokeWidth={strokeWidth}
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
        strokeWidth={strokeWidth / 4}
        clockwise
        rotation={270}
        dash={[1, 1]}
      />
    </>
  );
};

export default ShootArea;
