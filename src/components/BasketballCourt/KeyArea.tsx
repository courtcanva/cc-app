import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { courtWhiteLine } from "../../store/reducer/courtSizeSlice";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { useDispatch } from "react-redux";
import { setKeyAreaColor } from "@/store/reducer/courtColorSlice";

interface KeyAreaProps {
  startPoint: ICourtStartPoint;
}

const KeyArea: React.FC<KeyAreaProps> = ({ startPoint }) => {
  const { threePointLineToCourtEdgeLenth, threePointLineRadius, keyAreaWidth, keyAreaHeight } =
    useStoreSelector((state) => state.courtSize);

  const selectedColor = useStoreSelector((state) => state.courtColor.selectedColor);
  const keyAreaColor = useStoreSelector((state) => state.courtColor.keyAreaColor);
  const dispatch = useDispatch();
  const handleColorChange = () => {
    if (!selectedColor) return;
    dispatch(setKeyAreaColor(selectedColor));
  };
  return (
    <Rect
      width={keyAreaWidth}
      height={keyAreaHeight}
      fill={keyAreaColor}
      stroke="white"
      strokeWidth={courtWhiteLine}
      x={startPoint.X}
      y={startPoint.Y + threePointLineToCourtEdgeLenth + threePointLineRadius - keyAreaHeight / 2}
      onClick={handleColorChange}
    />
  );
};

export default KeyArea;
