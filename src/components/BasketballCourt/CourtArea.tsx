import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";

interface CourtAreaProps {
  startPoint: ICourtStartPoint;
  courtWidth: number;
}

const CourtArea: React.FC<CourtAreaProps> = ({ startPoint, courtWidth }) => {
  const { courtAreaYLength, strokeWidth } = useStoreSelector((state) => state.courtSize);

  const color = useStoreSelector(
    (state) => state.tile.find((tile) => tile.location.includes("courtArea"))?.color
  );

  return (
    <Rect
      width={courtWidth}
      height={courtAreaYLength}
      fill={color}
      x={startPoint.X}
      y={startPoint.Y}
      stroke="white"
      strokeWidth={strokeWidth / 3}
    />
  );
};

export default CourtArea;
