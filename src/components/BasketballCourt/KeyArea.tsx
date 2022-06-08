import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

const KeyArea = ({ color = "#1A1F51" }) => {
  const { startPointX, startPointY, width, height } = useStoreSelector((state) => state.keyArea);

  return (
    <Rect
      width={width}
      height={height}
      fill={color}
      stroke="white"
      strokeWidth={2}
      x={startPointX}
      y={startPointY}
    />
  );
};

export default KeyArea;
