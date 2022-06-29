import { Arc } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { courtWhiteLine, dashedWhiteLine } from "../../store/reducer/courtSizeSlice";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { useDispatch } from "react-redux";
import { changeTileColor } from "@/store/reducer/tileSlice";

interface TopKeyAreaProps {
  startPoint: ICourtStartPoint;
}

const TopKeyArea: React.FC<TopKeyAreaProps> = ({ startPoint }) => {
  const { keyAreaWidth, threePointLineToCourtEdgeLength, threePointLineRadius, circleRadius } =
    useStoreSelector((state) => state.courtSize);
  const startPointX = startPoint.X + keyAreaWidth;
  const startPointY = startPoint.Y + (threePointLineToCourtEdgeLength + threePointLineRadius);

  const selectedColor = useStoreSelector((state) => state.courtColor.selectedColor);
  const topKeyAreaColor = useStoreSelector(
    (state) => state.tile.find((tile) => tile.location.includes("topKeyArea"))?.color
  );
  const dispatch = useDispatch();
  const handleColorChange = () => {
    if (!selectedColor) return;
    dispatch(changeTileColor({ selectedColor, location: "topKeyArea" }));
  };
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
