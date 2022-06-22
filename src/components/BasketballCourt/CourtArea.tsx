import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { courtWhiteLine } from "../../store/reducer/courtSizeSlice";
import { useContext } from "react";
import { START_POINT } from "@/constants/courtSize";

interface CourtAreaProps {
  courtWidth: number;
}

const CourtArea: React.FC<CourtAreaProps> = ({ courtWidth }) => {
  const { courtAreaYLength } = useStoreSelector((state) => state.courtSize);
  const startPoint = useContext(START_POINT);

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
      strokeWidth={courtWhiteLine}
    />
  );
};

export default CourtArea;
