import { Shape } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { courtWhiteLine } from "../../store/reducer/courtSpecDataSlice";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { getColor } from "@/store/reducer/tileSlice";
import { useColorHandler } from "@/hooks/useColorHandler";

interface ThreePointAreaProps {
  startPoint: ICourtStartPoint;
}

const ThreePointArea: React.FC<ThreePointAreaProps> = ({ startPoint }) => {
  const { threePointLineToCourtEdgeLength, cornerThreePointLineLength, threePointLineRadius } =
    useStoreSelector((state) => state.courtSpecData.activeCourt);
  const startPointX = startPoint.X;
  const startPointY = startPoint.Y + threePointLineToCourtEdgeLength;
  const controlPointOneX = startPoint.X + (cornerThreePointLineLength + threePointLineRadius);
  const controlPointOneY = startPointY;
  const controlPointTwoX = controlPointOneX;
  const controlPointTwoY = startPointY + threePointLineRadius;
  const controlPointThreeX = controlPointOneX;
  const controlPointThreeY = startPointY + threePointLineRadius * 2;
  const controlPointFourX = startPoint.X + cornerThreePointLineLength;
  const controlPointFourY = controlPointThreeY;

  const selectedColor = useStoreSelector((state) => state.courtColor.selectedColor);
  const threePointAreaColor = getColor("threePoint");
  const handleColorChange = useColorHandler(selectedColor, "threePoint");

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
      fill={threePointAreaColor}
      stroke="white"
      strokeWidth={courtWhiteLine}
      onClick={handleColorChange}
      onTouchStart={handleColorChange}
    />
  );
};

export default ThreePointArea;
