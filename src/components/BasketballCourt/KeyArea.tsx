import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";

interface KeyAreaProps {
  startPoint: ICourtStartPoint;
}

const KeyArea: React.FC<KeyAreaProps> = ({ startPoint }) => {
  const {
    threePointLineToCourtEdgeLenth,
    threePointLineRadius,
    keyAreaWidth,
    keyAreaHeight,
    strokeWidth,
  } = useStoreSelector((state) => state.courtSize);
  const startPointY =
    startPoint.Y + threePointLineToCourtEdgeLenth + threePointLineRadius - keyAreaHeight / 2;

  const color = useStoreSelector(
    (state) => state.tile.find((tile) => tile.location.includes("keyArea"))?.color
  );

  return (
    <Rect
      width={keyAreaWidth}
      height={keyAreaHeight}
      fill={color}
      stroke="white"
      strokeWidth={strokeWidth / 3}
      x={startPoint.X}
      y={startPointY}
    />
  );
};

export default KeyArea;
