import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

const Border = ({ color = "#195955" }) => {
  const { 
    initPointX,
    initPointY,
    courtAreaXLength,
    courtAreaYLength,
    bordeLength,
  } = useStoreSelector((state) => state.proFullCourt);
  const startPointX = initPointX - bordeLength;
  const startPointY = initPointY - bordeLength;
  const borderWidth = courtAreaXLength + bordeLength;
  const borderHeight = courtAreaYLength + bordeLength * 2;

  return (
    <Rect
      width={borderWidth}
      height={borderHeight}
      fill={color}
      x={startPointX}
      y={startPointY}
    />
  );
};

export default Border;
