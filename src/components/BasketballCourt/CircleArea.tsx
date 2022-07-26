import { Arc } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { courtWhiteLine } from "../../store/reducer/courtSpecDataSlice";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { getColor } from "@/store/reducer/tileSlice";
import { useColorHandler } from "@/hooks/useColorHandler";
interface CircleAreaProps {
  startPoint: ICourtStartPoint;
}

const FULL_COURT_SIZE = 28000;

const CircleArea: React.FC<CircleAreaProps> = ({ startPoint }) => {
  let { courtAreaXLength, threePointLineToCourtEdgeLength, threePointLineRadius, circleRadius } =
    useStoreSelector((state) => state.courtSpecData.activeCourt);

  // coz pro full court is flipped, courtAreaXLength needs to be half of the court length
  const newCourtAreaXLength =
    courtAreaXLength === FULL_COURT_SIZE ? courtAreaXLength / 2 : courtAreaXLength;

  const selectedColor = useStoreSelector((state) => state.courtColor.selectedColor);
  const circleAreaColor = getColor("circleArea");
  const handleColorChange = useColorHandler(selectedColor, "circleArea");

  return (
    <Arc
      x={startPoint.X + newCourtAreaXLength}
      y={startPoint.Y + (threePointLineToCourtEdgeLength + threePointLineRadius)}
      innerRadius={0}
      outerRadius={circleRadius}
      angle={180}
      fill={circleAreaColor}
      stroke="white"
      strokeWidth={courtWhiteLine}
      clockwise
      rotation={270}
      onClick={handleColorChange}
    />
  );
};

export default CircleArea;
