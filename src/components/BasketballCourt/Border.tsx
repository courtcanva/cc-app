import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";
import { useDispatch } from "react-redux";
import { changeTileColor, getColor } from "@/store/reducer/tileSlice";
import { changeSelectedColor } from "@/store/reducer/courtColorSlice";

interface BorderProps {
  startPoint: ICourtStartPoint;
  borderLength: number;
  courtAreaXLength: number;
  courtAreaYLength: number;
}
const Border: React.FC<BorderProps> = ({
  startPoint,
  borderLength,
  courtAreaXLength,
  courtAreaYLength,
}) => {
  const selectedColor = useStoreSelector((state) => state.courtColor.selectedColor);
  const borderColor = getColor("border");
  const dispatch = useDispatch();
  const handleColorChange = () => {
    if (selectedColor === "none") return;
    dispatch(changeTileColor({ selectedColor, location: "border" }));
  };
  return (
    <Rect
      width={courtAreaXLength + borderLength * 2}
      height={courtAreaYLength + borderLength * 2}
      fill={borderColor}
      x={startPoint.X - borderLength}
      y={startPoint.Y - borderLength}
      onClick={handleColorChange}
    />
  );
};

export default Border;
