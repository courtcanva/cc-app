import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { courtWhiteLine } from "@/store/reducer/courtSpecDataSlice";
import { useDispatch } from "react-redux";
import { changeTileColor, getColor } from "@/store/reducer/tileSlice";

interface CourtAreaProps {
  startPoint: ICourtStartPoint;
  courtWidth: number;
}

const CourtArea: React.FC<CourtAreaProps> = ({ courtWidth, startPoint }) => {
  const { courtAreaYLength } = useStoreSelector((state) => state.courtSpecData.activeCourt);
  let courtAreaOffset = 0;
  // if width from backend <15k, change it 15k to ensure CourtArea render correctly
  if (courtAreaYLength === 7000) {
    courtAreaOffset = 4000;
  } else if (courtAreaYLength === 5000) {
    courtAreaOffset = 5000;
  }
  const selectedColor = useStoreSelector((state) => state.courtColor.selectedColor);
  const courtAreaColor = getColor("courtArea");
  const dispatch = useDispatch();
  const handleColorChange = () => {
    if (selectedColor === "none") return;
    dispatch(changeTileColor({ selectedColor, location: "courtArea" }));
  };

  return (
    <Rect
      width={courtWidth}
      height={courtAreaYLength}
      fill={courtAreaColor}
      x={startPoint.X}
      y={startPoint.Y + courtAreaOffset}
      stroke="white"
      strokeWidth={courtWhiteLine}
      onClick={handleColorChange}
    />
  );
};

export default CourtArea;
