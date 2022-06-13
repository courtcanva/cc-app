import { Shape } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

const ThreePointArea = ({ color = "#72818B" }) => {
  const {
    initPointX, 
    initPointY, 
    threePointLineToCourtEdgeLenth,
    cornerThreePointLineLength,
    threePointLineRadius,
    strokeWidth,
  } = useStoreSelector((state) => state.proFullCourt);
  const startPointX = initPointX;
  const startPointY = initPointY + threePointLineToCourtEdgeLenth;
  const controlPointOneX = initPointX + cornerThreePointLineLength + threePointLineRadius;
  const controlPointOneY = startPointY;
  const controlPointTwoX = controlPointOneX;
  const controlPointTwoY = startPointY + threePointLineRadius;
  const controlPointThreeX = controlPointOneX;
  const controlPointThreeY = startPointY + threePointLineRadius * 2;
  const controlPointFourX = initPointX + cornerThreePointLineLength;
  const controlPointFourY = controlPointThreeY;

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
      fill={color}
      stroke="white"
      strokeWidth={strokeWidth}
    />
  );
};

export default ThreePointArea;
