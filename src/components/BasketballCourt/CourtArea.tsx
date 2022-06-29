import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { courtWhiteLine } from "@/store/reducer/courtSizeSlice";
import { useDispatch } from "react-redux";
import { changeTileColor } from "@/store/reducer/tileSlice";

interface CourtAreaProps {
  startPoint: ICourtStartPoint;
  courtWidth: number;
}

const CourtArea: React.FC<CourtAreaProps> = ({ courtWidth, startPoint }) => {
  const { courtAreaYLength } = useStoreSelector((state) => state.courtSize);

  const selectedColor = useStoreSelector((state) => state.courtColor.selectedColor);
  const courtAreaColor = useStoreSelector(
    (state) => state.tile.find((tile) => tile.location.includes("courtArea"))?.color
  );
  const dispatch = useDispatch();
  const handleColorChange = () => {
    if (!selectedColor) return;
    dispatch(changeTileColor({ selectedColor, location: "courtArea" }));
  };
  return (
    <Rect
      width={courtWidth}
      height={courtAreaYLength}
      fill={courtAreaColor}
      x={startPoint.X}
      y={startPoint.Y}
      stroke="white"
      strokeWidth={courtWhiteLine}
      onClick={handleColorChange}
    />
  );
};

export default CourtArea;
