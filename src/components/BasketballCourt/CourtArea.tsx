import { Shape } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

const CourtArea = ({ color = "#B61313" }) => {
  const { 
    initPointX, 
    initPointY, 
    courtAreaXLength, 
    courtAreaYLength,
    strokeWidth,
  } = useStoreSelector((state) => state.proFullCourt);
  const startPointX = initPointX;
  const startPointY = initPointY;
  return (
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.moveTo(startPointX, startPointY); // Create a starting point
        context.lineTo(startPointX + courtAreaXLength, startPointY); // Create a horizontal line
        context.lineTo(startPointX + courtAreaXLength, startPointY + courtAreaYLength); // Create a horizontal line
        context.lineTo(startPointX, startPointY + courtAreaYLength); // Create a horizontal line
        context.closePath();
        context.fillStrokeShape(shape);
      }}
      fill={color}
      stroke="white"
      strokeWidth={strokeWidth}
    />
  );
};

export default CourtArea;
