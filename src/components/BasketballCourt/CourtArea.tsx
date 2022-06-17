import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

interface CourtAreaProps {
  courtRatio: number;
}

const CourtArea: React.FC<CourtAreaProps> = ({ courtRatio }) => {
  const { initPointX, initPointY, courtAreaXLength, courtAreaYLength, strokeWidth } =
    useStoreSelector((state) => state.courtSize);
  const borderWidth = courtAreaXLength * courtRatio;
  const borderHeight = courtAreaYLength * courtRatio;

  const color = useStoreSelector(
    (state) => state.tile.find((tile) => tile.location.includes("courtArea"))?.color
  );

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
