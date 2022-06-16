import { Shape } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

interface ThreePointAreaProps {
  courtRatio: number;
  color: string;
}

const ThreePointArea: React.FC<ThreePointAreaProps> = ({ courtRatio, color }) => {
  const {
    initPointX,
    initPointY,
    threePointLineToCourtEdgeLenth,
    cornerThreePointLineLength,
    threePointLineRadius,
    strokeWidth,
  } = useStoreSelector((state) => state.courtSize);
  const startPointX = initPointX;
  const startPointY = initPointY + threePointLineToCourtEdgeLenth * courtRatio;
  const controlPointOneX =
    initPointX + (cornerThreePointLineLength + threePointLineRadius) * courtRatio;
  const controlPointOneY = startPointY;
  const controlPointTwoX = controlPointOneX;
  const controlPointTwoY = startPointY + threePointLineRadius * courtRatio;
  const controlPointThreeX = controlPointOneX;
  const controlPointThreeY = startPointY + threePointLineRadius * 2 * courtRatio;
  const controlPointFourX = initPointX + cornerThreePointLineLength * courtRatio;
  const controlPointFourY = controlPointThreeY;

  return (
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.moveTo(startPointX, startPointY); // Create a starting point
        context.lineTo(startPointX + cornerThreePointLineLength * courtRatio, startPointY); // Create a horizontal line
        context._context.arcTo(
          controlPointOneX,
          controlPointOneY,
          controlPointTwoX,
          controlPointTwoY,
          threePointLineRadius * courtRatio
        ); // Create an arc
        context._context.arcTo(
          controlPointThreeX,
          controlPointThreeY,
          controlPointFourX,
          controlPointFourY,
          threePointLineRadius * courtRatio
        );
        // Continue with vertical line which makes it a close shape
        context.lineTo(startPointX, controlPointThreeY);
        context.closePath();
        context.fillStrokeShape(shape);
      }}
      fill={color}
      stroke="white"
      strokeWidth={strokeWidth / 10}
    />
  );
};

export default ThreePointArea;
