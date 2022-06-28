import { Arc } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { courtWhiteLine } from "../../store/reducer/courtSizeSlice";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { useState } from "react";
interface CircleAreaProps {
  startPoint: ICourtStartPoint;
}

const CircleArea: React.FC<CircleAreaProps> = ({ startPoint }) => {
  const { courtAreaXLength, threePointLineToCourtEdgeLenth, threePointLineRadius, circleRadius } =
    useStoreSelector((state) => state.courtSize);

  const selectedColor = useStoreSelector((state) => state.courtColor.color);
  const [circleAreaColor, setCircleAreaColor] = useState("#606F14");

  const handleColorChange = () => {
    setCircleAreaColor(selectedColor);
  };

  return (
    <Arc
      x={startPoint.X + courtAreaXLength / 2}
      y={startPoint.Y + (threePointLineToCourtEdgeLenth + threePointLineRadius)}
      innerRadius={0}
      outerRadius={circleRadius}
      angle={180}
      fill={circleAreaColor}
      stroke="white"
      strokeWidth={courtWhiteLine}
      clockwise
      rotation={270}
      onClick={() => handleColorChange()}
    />
  );
};

export default CircleArea;
