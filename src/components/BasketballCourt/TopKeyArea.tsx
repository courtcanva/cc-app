import { Arc } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

const ShootArea = ({ color = "#b59f7a" }) => {
  const { startPointX, startPointY, innerRadius, outerRadius, angle, strokeWidth, rotation, dash } =
    useStoreSelector((state) => state.topKeyArea);

  return (
    <>
      <Arc
        x={startPointX}
        y={startPointY}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        angle={angle}
        fill={color}
        stroke="white"
        strokeWidth={strokeWidth * 4}
        clockwise
        rotation={rotation}
      />
      <Arc
        x={startPointX}
        y={startPointY}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        angle={angle}
        fill="transparent"
        stroke="white"
        strokeWidth={strokeWidth}
        clockwise
        rotation={rotation * 3}
        dash={dash}
      />
    </>
  );
};

export default ShootArea;
