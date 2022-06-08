import { Shape } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

const CourtArea = ({ color = "#E18752" }) => {
  const { startPointX, startPointY, courtAreaXLength, courtAreaYLength } = useStoreSelector(
    (state) => state.courtArea
  );

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
      strokeWidth={2}
    />
  );
};

export default CourtArea;
