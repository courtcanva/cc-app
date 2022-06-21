import { Shape } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";

interface ThreePointAreaProps {
  courtRatio: number;
  startPoint: ICourtStartPoint;
}

const ThreePointArea: React.FC<ThreePointAreaProps> = ({ courtRatio, startPoint }) => {
  const {
    threePointLineToCourtEdgeLenth,
    cornerThreePointLineLength,
    threePointLineRadius,
    strokeWidth,
  } = useStoreSelector((state) => state.courtSize);
  const startPointX = startPoint.X;
  const startPointY = startPoint.Y + threePointLineToCourtEdgeLenth * courtRatio;
  const controlPointOneX =
    startPoint.X + (cornerThreePointLineLength + threePointLineRadius) * courtRatio;
  const controlPointOneY = startPointY;
  const controlPointTwoX = controlPointOneX;
  const controlPointTwoY = startPointY + threePointLineRadius * courtRatio;
  const controlPointThreeX = controlPointOneX;
  const controlPointThreeY = startPointY + threePointLineRadius * 2 * courtRatio;
  const controlPointFourX = startPoint.X + cornerThreePointLineLength * courtRatio;
  const controlPointFourY = controlPointThreeY;

  const color = useStoreSelector(
    (state) => state.tile.find((tile) => tile.location.includes("threePoint"))?.color
  );

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
      strokeWidth={strokeWidth / 100}
    />
  );
};

export default ThreePointArea;
