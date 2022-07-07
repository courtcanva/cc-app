import { Arc } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { courtWhiteLine } from "../../store/reducer/courtSizeSlice";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { useDispatch } from "react-redux";
import { changeTileColor } from "@/store/reducer/tileSlice";
import { getColor } from "@/utils/getAreaColor";
import useDispatchStrokeColor from "@/hooks/useDispatchStrokeColor";
interface CircleAreaProps {
  startPoint: ICourtStartPoint;
}

const CircleArea: React.FC<CircleAreaProps> = ({ startPoint }) => {
  const { courtAreaXLength, threePointLineToCourtEdgeLength, threePointLineRadius, circleRadius } =
    useStoreSelector((state) => state.courtSize);
  const selectedColor = useStoreSelector((state) => state.courtColor.selectedColor);
  const dispatch = useDispatch();

  const circleAreaColor = getColor("circleArea");
  const hoverStrokeColor = useDispatchStrokeColor();

  const handleColorChange = () => {
    if (selectedColor === "none") return;
    dispatch(changeTileColor({ selectedColor, location: "circleArea" }));
  };

  return (
    <Arc
      x={startPoint.X + courtAreaXLength / 2}
      y={startPoint.Y + (threePointLineToCourtEdgeLength + threePointLineRadius)}
      innerRadius={0}
      outerRadius={circleRadius}
      angle={180}
      fill={circleAreaColor}
      strokeWidth={courtWhiteLine}
      clockwise
      rotation={270}
      onClick={handleColorChange}
      {...hoverStrokeColor("circleArea")}
    />
  );
};

export default CircleArea;
