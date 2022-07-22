import { Shape } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { courtWhiteLine } from "../../store/reducer/courtSizeSlice";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { useDispatch } from "react-redux";
import { changeTileColor, getColor } from "@/store/reducer/tileSlice";

interface ThreePointAreaProps {
  startPoint: ICourtStartPoint;
}

const ThreePointArea: React.FC<ThreePointAreaProps> = ({ startPoint }) => {
  const { threePointLineToCourtEdgeLength, cornerThreePointLineLength, threePointLineRadius } =
    // useStoreSelector((state) => state.courtSize);
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
  const dispatch = useDispatch();
  const handleColorChange = () => {
    if (selectedColor === "none") return;
    dispatch(changeTileColor({ selectedColor, location: "threePoint" }));
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
      fill={threePointAreaColor}
      stroke="white"
      strokeWidth={courtWhiteLine}
      onClick={handleColorChange}
    />
  );
};

export default ThreePointArea;
