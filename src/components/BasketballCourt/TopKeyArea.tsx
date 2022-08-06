import { Arc } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { courtWhiteLine, dashedWhiteLine } from "../../store/reducer/courtSpecDataSlice";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { getColor } from "@/store/reducer/tileSlice";
import { useColorHandler } from "@/hooks/useColorHandler";

interface TopKeyAreaProps {
  startPoint: ICourtStartPoint;
}

const TopKeyArea: React.FC<TopKeyAreaProps> = ({ startPoint }) => {
  const { keyAreaWidth, threePointLineToCourtEdgeLength, threePointLineRadius, circleRadius } =
    useStoreSelector((state) => state.courtSpecData.activeCourt);
  const startPointX = startPoint.X + keyAreaWidth;
  const startPointY = startPoint.Y + (threePointLineToCourtEdgeLength + threePointLineRadius);

  const selectedColor = useStoreSelector((state) => state.courtColor.selectedColor);
  const topKeyAreaColor = getColor("topKeyArea");
  const handleColorChange = useColorHandler(selectedColor, "topKeyArea");

  return (
    <>
      <Arc
        x={startPointX}
        y={startPointY}
        innerRadius={0}
        outerRadius={circleRadius}
        angle={180}
        fill={topKeyAreaColor}
        stroke="white"
        strokeWidth={courtWhiteLine}
        clockwise
        rotation={90}
        onClick={handleColorChange}
        onTouchStart={handleColorChange}
      />
      <Arc
        x={startPointX}
        y={startPointY}
        innerRadius={0}
        outerRadius={circleRadius}
        angle={180}
        fill="transparent"
        stroke="white"
        strokeWidth={dashedWhiteLine}
        clockwise
        rotation={270}
        dash={[50, 50]}
      />
    </>
  );
};

export default TopKeyArea;
