import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

interface CourtAreaProps {
  courtRatio: number;
  color: string;
}

const CourtArea: React.FC<CourtAreaProps> = ({ courtRatio, color }) => {
  const { initPointX, initPointY, courtAreaXLength, courtAreaYLength, strokeWidth } =
    useStoreSelector((state) => state.courtSize);
  const borderWidth = courtAreaXLength * courtRatio;
  const borderHeight = courtAreaYLength * courtRatio;

  return (
    <Rect
      width={borderWidth}
      height={borderHeight}
      fill={color}
      x={initPointX}
      y={initPointY}
      stroke="white"
      strokeWidth={strokeWidth / 10}
    />
  );
};

export default CourtArea;
