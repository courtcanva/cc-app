import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { courtWhiteLine } from "../../store/reducer/courtSizeSlice";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { useDispatch } from "react-redux";
import { changeTileColor } from "@/store/reducer/tileSlice";

interface KeyAreaProps {
  startPoint: ICourtStartPoint;
}

const KeyArea: React.FC<KeyAreaProps> = ({ startPoint }) => {
  const { threePointLineToCourtEdgeLength, threePointLineRadius, keyAreaWidth, keyAreaHeight } =
    useStoreSelector((state) => state.courtSize);

  const selectedColor = useStoreSelector((state) => state.courtColor.selectedColor);
  const keyAreaColor = useStoreSelector(
    (state) => state.tile.find((tile) => tile.location.includes("keyArea"))?.color
  );
  const dispatch = useDispatch();
  const handleColorChange = () => {
    if (selectedColor === "none") return;
    dispatch(changeTileColor({ selectedColor, location: "keyArea" }));
  };
  return (
    <Rect
      width={keyAreaWidth}
      height={keyAreaHeight}
      fill={keyAreaColor}
      stroke="white"
      strokeWidth={courtWhiteLine}
      x={startPoint.X}
      y={startPoint.Y + threePointLineToCourtEdgeLength + threePointLineRadius - keyAreaHeight / 2}
      onClick={handleColorChange}
    />
  );
};

export default KeyArea;
