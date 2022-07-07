import { Arc } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { courtWhiteLine, dashedWhiteLine } from "../../store/reducer/courtSizeSlice";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { useDispatch } from "react-redux";
import { changeTileColor } from "@/store/reducer/tileSlice";
import { getColor } from "@/utils/getAreaColor";
import useDispatchStrokeColor from "@/hooks/useDispatchStrokeColor";

interface TopKeyAreaProps {
  startPoint: ICourtStartPoint;
}

const TopKeyArea: React.FC<TopKeyAreaProps> = ({ startPoint }) => {
  const { keyAreaWidth, threePointLineToCourtEdgeLength, threePointLineRadius, circleRadius } =
    useStoreSelector((state) => state.courtSize);
  const selectedColor = useStoreSelector((state) => state.courtColor.selectedColor);
  const dispatch = useDispatch();

  const startPointX = startPoint.X + keyAreaWidth;
  const startPointY = startPoint.Y + (threePointLineToCourtEdgeLength + threePointLineRadius);

  const topKeyAreaColor = getColor("topKeyArea");
  const hoverStrokeColor = useDispatchStrokeColor();

  const handleColorChange = () => {
    if (selectedColor === "none") return;
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
        strokeWidth={courtWhiteLine}
        clockwise
        rotation={90}
        onClick={handleColorChange}
        {...hoverStrokeColor("topKeyArea")}
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
