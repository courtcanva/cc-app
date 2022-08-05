import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";
import { getColor } from "@/store/reducer/tileSlice";
import { useColorHandler } from "@/hooks/useColorHandler";

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
  const handleColorChange = useColorHandler(selectedColor, "border");

  return (
    <Rect
      width={courtAreaXLength + borderLength * 2}
      height={courtAreaYLength + borderLength * 2}
      fill={borderColor}
      x={startPoint.X - borderLength}
      y={startPoint.Y - borderLength}
      onClick={handleColorChange}
      onTouchStart={handleColorChange}
    />
  );
};

export default Border;
