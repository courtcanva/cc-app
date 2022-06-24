import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";

interface BorderProps {
  startPoint: ICourtStartPoint;
}
const Border: React.FC<BorderProps> = ({ startPoint }) => {
  const { courtAreaXLength, courtAreaYLength, borderLength } = useStoreSelector(
    (state) => state.courtSize
  );

  const color = useStoreSelector(
    (state) => state.tile.find((tile) => tile.location.includes("border"))?.color
  );

  return (
    <Rect
      width={courtAreaXLength + borderLength * 2}
      height={courtAreaYLength + borderLength * 2}
      fill={color}
      x={startPoint.X - borderLength}
      y={startPoint.Y - borderLength}
    />
  );
};

export default Border;
