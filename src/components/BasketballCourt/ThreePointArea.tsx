import { Shape } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { courtWhiteLine } from "../../store/reducer/courtSizeSlice";
import { useContext } from "react";
import { START_POINT } from "@/constants/courtSize";

function ThreePointArea() {
  const { threePointLineToCourtEdgeLenth, cornerThreePointLineLength, threePointLineRadius } =
    useStoreSelector((state) => state.courtSize);
  const startPoint = useContext(START_POINT);
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

  const color = useStoreSelector(
    (state) => state.tile.find((tile) => tile.location.includes("threePoint"))?.color
  );

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
      strokeWidth={courtWhiteLine}
    />
  );
}

export default ThreePointArea;
