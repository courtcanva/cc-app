import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { courtWhiteLine } from "@/store/reducer/courtSizeSlice";
import { useDispatch } from "react-redux";
import { changeTileColor } from "@/store/reducer/tileSlice";
import { getColor } from "@/utils/getAreaColor";
import useDispatchStrokeColor from "@/hooks/useDispatchStrokeColor";

interface CourtAreaProps {
  startPoint: ICourtStartPoint;
  courtWidth: number;
}

const CourtArea: React.FC<CourtAreaProps> = ({ courtWidth, startPoint }) => {
  const { courtAreaYLength } = useStoreSelector((state) => state.courtSize);
  const selectedColor = useStoreSelector((state) => state.courtColor.selectedColor);
  const dispatch = useDispatch();

  const courtAreaColor = getColor("courtArea");
  const hoverStrokeColor = useDispatchStrokeColor();

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
      y={startPoint.Y}
      strokeWidth={courtWhiteLine}
      onClick={handleColorChange}
      {...hoverStrokeColor("courtArea")}
    />
  );
};

export default CourtArea;
