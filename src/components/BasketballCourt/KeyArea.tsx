import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

const KeyArea = ({ color = "#1A1F51" }) => {
  const {
    startPointX,
    startPointY,
    controlPointFourY,
  } = useStoreSelector((state) => state.threePointLine);

  return (
    <Rect
      width={45}
      height={controlPointFourY-startPointY-31.5}
      fill={color}
      stroke="white"
      strokeWidth={2}
      x={startPointX}
      y={startPointY+15.75}
    />
  );
};

export default KeyArea;
