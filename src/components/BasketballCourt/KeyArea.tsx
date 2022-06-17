import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

interface KeyAreaProps {
  courtRatio: number;
}

const KeyArea: React.FC<KeyAreaProps> = ({ courtRatio }) => {
  const {
    initPointX,
    initPointY,
    threePointLineToCourtEdgeLenth,
    threePointLineRadius,
    keyAreaWidth,
    keyAreaHeight,
    strokeWidth,
  } = useStoreSelector((state) => state.courtSize);
  const startPointY =
    initPointY +
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
      strokeWidth={strokeWidth / 10}
      x={initPointX}
      y={startPointY}
    />
  );
};

export default KeyArea;
