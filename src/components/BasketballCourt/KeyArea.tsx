import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { courtWhiteLine } from "../../store/reducer/courtSpecDataSlice";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { getColor } from "@/store/reducer/tileSlice";
import { useColorHandler } from "@/hooks/useColorHandler";

interface KeyAreaProps {
  startPoint: ICourtStartPoint;
}

const KeyArea: React.FC<KeyAreaProps> = ({ startPoint }) => {
  const { threePointLineToCourtEdgeLength, threePointLineRadius, keyAreaWidth, keyAreaHeight } =
    useStoreSelector((state) => state.courtSpecData.activeCourt);

  const selectedColor = useStoreSelector((state) => state.courtColor.selectedColor);
  const keyAreaColor = getColor("keyArea");
  const handleColorChange = useColorHandler(selectedColor, "keyArea");

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
