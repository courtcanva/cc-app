import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

interface BorderProps {
  courtRatio: number;
  color: string;
}

const Border: React.FC<BorderProps> = ({courtRatio, color}) => {
  const { initPointX, initPointY, courtAreaXLength, courtAreaYLength, borderLength } =
    useStoreSelector((state) => state.courtSize);
  const startPointX = initPointX - borderLength * courtRatio;
  const startPointY = initPointY - borderLength * courtRatio;
  const borderWidth = (courtAreaXLength + borderLength) * 2 * courtRatio;
  const borderHeight = (courtAreaYLength + borderLength * 2) * courtRatio;

  return (
    <Rect width={borderWidth} height={borderHeight} fill={color} x={startPointX} y={startPointY} />
  );
};

export default Border;
