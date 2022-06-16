import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

interface KeyAreaProps {
  courtRatio: number;
  color: string;
}

const KeyArea: React.FC<KeyAreaProps> = ({ courtRatio, color }) => {
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
