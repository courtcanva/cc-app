import { Shape } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";

interface BorderDimensionLineProps {
  courtRatio: number;
  startPoint: ICourtStartPoint
}

const BorderDimensionLine: React.FC<BorderDimensionLineProps> = ({
  courtRatio,
  startPoint
}) => {
  const { courtAreaYLength, borderLength, strokeWidth } = useStoreSelector(
    (state) => state.courtSize
  );
  const startPointX = startPoint.X - borderLength * courtRatio;
  const startPointY = startPoint.Y - borderLength * courtRatio;
  const courtHeight = courtAreaYLength * courtRatio;

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
        strokeWidth={strokeWidth / 200}
        dash={[3, 3]}
      />
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(startPointX, startPoint.Y + courtHeight);
          context.lineTo(startPoint.X, startPoint.Y + courtHeight);
          context.lineTo(startPoint.X, startPoint.Y + courtHeight + borderLength * courtRatio);
          context.fillStrokeShape(shape);
        }}
        fill="transparent"
        stroke="white"
        strokeWidth={strokeWidth / 200}
        dash={[3, 3]}
      />
    </>
  );
};

export default BorderDimensionLine;
