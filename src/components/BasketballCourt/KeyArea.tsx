import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { courtWhiteLine } from "../../store/reducer/courtSizeSlice";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { useDispatch } from "react-redux";
import { changeTileColor } from "@/store/reducer/tileSlice";
import { getColor } from "@/utils/getAreaColor";
import useDispatchStrokeColor from "@/hooks/useDispatchStrokeColor";

interface KeyAreaProps {
  startPoint: ICourtStartPoint;
}

const KeyArea: React.FC<KeyAreaProps> = ({ startPoint }) => {
  const { threePointLineToCourtEdgeLength, threePointLineRadius, keyAreaWidth, keyAreaHeight } =
    useStoreSelector((state) => state.courtSize);
  const selectedColor = useStoreSelector((state) => state.courtColor.selectedColor);
  const dispatch = useDispatch();

  const keyAreaColor = getColor("keyArea");
  const hoverStrokeColor = useDispatchStrokeColor();

  const handleColorChange = () => {
    if (selectedColor === "none") return;
    dispatch(changeTileColor({ selectedColor, location: "keyArea" }));
  };

  return (
    <Rect
      width={keyAreaWidth}
      height={keyAreaHeight}
      fill={keyAreaColor}
      strokeWidth={courtWhiteLine}
      x={startPoint.X}
      y={startPoint.Y + threePointLineToCourtEdgeLength + threePointLineRadius - keyAreaHeight / 2}
      onClick={handleColorChange}
      {...hoverStrokeColor("keyArea")}
    />
  );
};

export default KeyArea;
