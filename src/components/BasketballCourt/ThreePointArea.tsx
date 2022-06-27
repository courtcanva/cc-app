import { Shape } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { courtWhiteLine } from "../../store/reducer/courtSizeSlice";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { useState } from "react";

interface ThreePointAreaProps {
  startPoint: ICourtStartPoint;
}

const ThreePointArea: React.FC<ThreePointAreaProps> = ({ startPoint }) => {
  const { threePointLineToCourtEdgeLenth, cornerThreePointLineLength, threePointLineRadius } =
    useStoreSelector((state) => state.courtSize);
  const startPointX = startPoint.X;
  const startPointY = startPoint.Y + threePointLineToCourtEdgeLenth;
  const controlPointOneX = startPoint.X + (cornerThreePointLineLength + threePointLineRadius);
  const controlPointOneY = startPointY;
  const controlPointTwoX = controlPointOneX;
  const controlPointTwoY = startPointY + threePointLineRadius;
  const controlPointThreeX = controlPointOneX;
  const controlPointThreeY = startPointY + threePointLineRadius * 2;
  const controlPointFourX = startPoint.X + cornerThreePointLineLength;
  const controlPointFourY = controlPointThreeY;

  const currentColorBoardColor = useStoreSelector((state) => state.courtColor.color);
  const [courtThreePointColor, setCourtAreaColor] = useState("#72818B");

  const handleColorChange = () => {
    setCourtAreaColor(currentColorBoardColor);
  };
  return (
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.moveTo(startPointX, startPointY); // Create a starting point
        context.lineTo(startPointX + cornerThreePointLineLength, startPointY); // Create a horizontal line
        context._context.arcTo(
          controlPointOneX,
          controlPointOneY,
          controlPointTwoX,
          controlPointTwoY,
          threePointLineRadius
        ); // Create an arc
        context._context.arcTo(
          controlPointThreeX,
          controlPointThreeY,
          controlPointFourX,
          controlPointFourY,
          threePointLineRadius
        );
        // Continue with vertical line which makes it a close shape
        context.lineTo(startPointX, controlPointThreeY);
        context.closePath();
        context.fillStrokeShape(shape);
      }}
      fill={courtThreePointColor}
      stroke="white"
      strokeWidth={courtWhiteLine}
      onClick={() => handleColorChange()}
    />
  );
};

export default ThreePointArea;
