import { Shape } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

interface BorderDimensionLineProps {
  courtRatio: number;
  color: string;
}

const BorderDimensionLine: React.FC<BorderDimensionLineProps> = ({ courtRatio, color }) => {
  const { initPointX, initPointY, courtAreaXLength, courtAreaYLength, borderLength, strokeWidth } =
    useStoreSelector((state) => state.courtSize);
  const startPointX = initPointX - borderLength * courtRatio;
  const startPointY = initPointY - borderLength * courtRatio;
  const borderWidth = (courtAreaXLength + borderLength) * 2 * courtRatio;
  const borderHeight = (courtAreaYLength + borderLength * 2) * courtRatio;

  return (
    <>
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(startPointX, initPointY); // Create a starting point
          context.lineTo(initPointX, initPointY);
          context.lineTo(initPointX, startPointY);
          context.fillStrokeShape(shape);
        }}
        fill={color}
        stroke="white"
        strokeWidth={strokeWidth / 10}
      />
      <Shape
        scaleY={-1}
        y={initPointY * 2 + courtAreaXLength * 2 * courtRatio}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(startPointX, initPointY); // Create a starting point
          context.lineTo(initPointX, initPointY);
          context.lineTo(initPointX, startPointY);
          context.fillStrokeShape(shape);
        }}
        fill={color}
        stroke="white"
        strokeWidth={strokeWidth / 10}
      />
    </>
  );
};

export default BorderDimensionLine;
