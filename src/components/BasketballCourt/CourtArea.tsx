import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";

interface CourtAreaProps {
  startPoint: ICourtStartPoint;
}

const CourtArea: React.FC<CourtAreaProps> = ({ startPoint }) => {
  const { courtAreaXLength, courtAreaYLength, strokeWidth } = useStoreSelector(
    (state) => state.courtSize
  );
  const borderWidth = courtAreaXLength;
  const borderHeight = courtAreaYLength;

  const color = useStoreSelector(
    (state) => state.tile.find((tile) => tile.location.includes("courtArea"))?.color
  );

  return (
    <Rect
      width={borderWidth}
      height={borderHeight}
      fill={color}
      x={startPoint.X}
      y={startPoint.Y}
      stroke="white"
      strokeWidth={strokeWidth / 3}
    />
  );
};

export default CourtArea;
