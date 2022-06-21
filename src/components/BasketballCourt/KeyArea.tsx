import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";

interface KeyAreaProps {
  courtRatio: number;
  startPoint: ICourtStartPoint;
}

const KeyArea: React.FC<KeyAreaProps> = ({ courtRatio, startPoint }) => {
  const {
    threePointLineToCourtEdgeLenth,
    threePointLineRadius,
    keyAreaWidth,
    keyAreaHeight,
    strokeWidth,
  } = useStoreSelector((state) => state.courtSize);
  const startPointY =
    startPoint.Y +
    (threePointLineToCourtEdgeLenth + threePointLineRadius - keyAreaHeight / 2) * courtRatio;

  const color = useStoreSelector(
    (state) => state.tile.find((tile) => tile.location.includes("keyArea"))?.color
  );

  return (
    <Rect
      width={keyAreaWidth * courtRatio}
      height={keyAreaHeight * courtRatio}
      fill={color}
      stroke="white"
      strokeWidth={strokeWidth / 100}
      x={startPoint.X}
      y={startPointY}
    />
  );
};

export default KeyArea;
