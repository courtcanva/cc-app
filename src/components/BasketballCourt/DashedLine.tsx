import { Shape } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { dashedWhiteLine } from "../../store/reducer/courtSizeSlice";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";

interface DashedLineProps {
  startPoint: ICourtStartPoint;
}

const DashedLine: React.FC<DashedLineProps> = ({ startPoint }) => {
  const { courtAreaYLength, borderLength } = useStoreSelector((state) => state.courtSize);
  const { ruler } = useStoreSelector((state) => state.rulerControl);
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
        strokeWidth={dashedWhiteLine}
        dash={[60, 60]}
        visible={ruler}
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
        strokeWidth={dashedWhiteLine}
        dash={[60, 60]}
        visible={ruler}
      />
    </>
  );
};

export default DashedLine;
