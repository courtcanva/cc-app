import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { courtWhiteLine } from "@/store/reducer/courtSizeSlice";
import { useDispatch } from "react-redux";
import { setCourtAreaColor } from "@/store/reducer/courtColorSlice";

interface CourtAreaProps {
  startPoint: ICourtStartPoint;
  courtWidth: number;
}

const CourtArea: React.FC<CourtAreaProps> = ({ courtWidth, startPoint }) => {
  const { courtAreaYLength } = useStoreSelector((state) => state.courtSize);

  const selectedColor = useStoreSelector((state) => state.courtColor.selectedColor);
  const courtAreaColor = useStoreSelector((state) => state.courtColor.courtAreaColor);

  const dispatch = useDispatch();
  const handleColorChange = () => {
    if (!selectedColor) return;
    dispatch(setCourtAreaColor(selectedColor));
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
