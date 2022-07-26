import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { useColorHandler } from "@/hooks/useColorHandler";
import { courtWhiteLine } from "@/store/reducer/courtSpecDataSlice";
import { useDispatch } from "react-redux";
import { changeTileColor, getColor } from "@/store/reducer/tileSlice";

interface CourtAreaProps {
  startPoint: ICourtStartPoint;
  courtWidth: number;
}

const CourtArea: React.FC<CourtAreaProps> = ({ courtWidth, startPoint }) => {
  const { courtAreaYLength } = useStoreSelector((state) => state.courtSpecData.activeCourt);
  const MEDIUM_COURT_WIDTH = 7000;
  const SMALL_COURT_WIDTH = 5000;
  const MEDIUM_COURT_AREA_OFFSET = 4000;
  const SMALL_COURT_AREA_OFFSET = 5000;

  let courtAreaOffset = 0;
  // if width from backend <15k, change it 15k to ensure CourtArea render correctly
  if (courtAreaYLength === MEDIUM_COURT_WIDTH) {
    courtAreaOffset = MEDIUM_COURT_AREA_OFFSET;
  } else if (courtAreaYLength === SMALL_COURT_WIDTH) {
    courtAreaOffset = SMALL_COURT_AREA_OFFSET;
  }
  const selectedColor = useStoreSelector((state) => state.courtColor.selectedColor);
  const courtAreaColor = getColor("courtArea");
  const handleColorChange = useColorHandler(selectedColor, "courtArea");

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
