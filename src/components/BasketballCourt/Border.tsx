import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";
import { useDispatch } from "react-redux";
import { changeTileColor } from "@/store/reducer/tileSlice";

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
  // const { courtAreaXLength, courtAreaYLength} = useStoreSelector(
  //   (state) => state.courtSize
  // );
  const selectedColor = useStoreSelector((state) => state.courtColor.selectedColor);
  const borderColor = useStoreSelector(
    (state) => state.tile.find((tile) => tile.location.includes("border"))?.color
  );
  const dispatch = useDispatch();
  const handleColorChange = () => {
    if (!selectedColor) return;
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
