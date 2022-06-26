import { Arc } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { courtWhiteLine, dashedWhiteLine } from "../../store/reducer/courtSizeSlice";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { useState } from "react";

interface ShootAreaProps {
  startPoint: ICourtStartPoint;
}

const ShootArea: React.FC<ShootAreaProps> = ({ startPoint }) => {
  const { keyAreaWidth, threePointLineToCourtEdgeLenth, threePointLineRadius, circleRadius } =
    useStoreSelector((state) => state.courtSize);
  const startPointX = startPoint.X + keyAreaWidth;
  const startPointY = startPoint.Y + (threePointLineToCourtEdgeLenth + threePointLineRadius);

  // const color = useStoreSelector(
  //   (state) => state.tile.find((tile) => tile.location.includes("topKeyArea"))?.color
  // );
  const currentColorBoardColor = useStoreSelector((state) => state.courtColor.color);
  const [topKeyAreaColor, setCourtAreaColor] = useState("#B61313");

  const handleColorChange = () => {
    setCourtAreaColor(currentColorBoardColor);
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
        onClick={() => handleColorChange()}
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

export default ShootArea;
