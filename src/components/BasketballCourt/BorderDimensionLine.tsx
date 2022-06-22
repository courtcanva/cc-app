import { Shape } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";

interface BorderDimensionLineProps {
  startPoint: ICourtStartPoint;
}

const BorderDimensionLine: React.FC<BorderDimensionLineProps> = ({ startPoint }) => {
  const { courtAreaYLength, borderLength, strokeWidth } = useStoreSelector(
    (state) => state.courtSize
  );
  const startPointX = startPoint.X - borderLength;
  const startPointY = startPoint.Y - borderLength;
  const courtHeight = courtAreaYLength;

  return (
    <>
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(startPointX, startPoint.Y);
          context.lineTo(startPoint.X, startPoint.Y);
          context.lineTo(startPoint.X, startPointY);
          context.fillStrokeShape(shape);
        }}
        fill="transparent"
        stroke="white"
        strokeWidth={strokeWidth / 5}
        dash={[60, 60]}
      />
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(startPointX, startPoint.Y + courtHeight);
          context.lineTo(startPoint.X, startPoint.Y + courtHeight);
          context.lineTo(startPoint.X, startPoint.Y + courtHeight + borderLength);
          context.fillStrokeShape(shape);
        }}
        fill="transparent"
        stroke="white"
        strokeWidth={strokeWidth / 5}
        dash={[60, 60]}
      />
    </>
  );
};

export default BorderDimensionLine;
