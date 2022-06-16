import { Shape } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

interface BorderDimensionLineProps {
  courtRatio: number;
}

const BorderDimensionLine: React.FC<BorderDimensionLineProps> = ({ courtRatio }) => {
  const { initPointX, initPointY, courtAreaYLength, borderLength, strokeWidth } = useStoreSelector(
    (state) => state.courtSize
  );
  const startPointX = initPointX - borderLength * courtRatio;
  const startPointY = initPointY - borderLength * courtRatio;
  const courtHeight = courtAreaYLength * courtRatio;

  return (
    <>
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(startPointX, initPointY); 
          context.lineTo(initPointX, initPointY);
          context.lineTo(initPointX, startPointY);
          context.fillStrokeShape(shape);
        }}
        fill="transparent"
        stroke="white"
        strokeWidth={strokeWidth / 20}
        dash={[3, 3]}
      />
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(startPointX, initPointY + courtHeight); 
          context.lineTo(initPointX, initPointY + courtHeight);
          context.lineTo(initPointX, initPointY + courtHeight + borderLength * courtRatio);
          context.fillStrokeShape(shape);
        }}
        fill="transparent"
        stroke="white"
        strokeWidth={strokeWidth / 20}
        dash={[3, 3]}
      />
    </>
  );
};

export default BorderDimensionLine;
