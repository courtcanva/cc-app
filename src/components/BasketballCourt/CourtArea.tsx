import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { courtWhiteLine } from "@/store/reducer/courtSizeSlice";
import { useState } from "react";

interface CourtAreaProps {
  startPoint: ICourtStartPoint;
  courtWidth: number;
}

const CourtArea: React.FC<CourtAreaProps> = ({ courtWidth, startPoint }) => {
  const { courtAreaYLength } = useStoreSelector((state) => state.courtSize);

  // const color = useStoreSelector(
  //   (state) => state.tile.find((tile) => tile.location.includes("courtArea"))?.color
  // );
  const currentColorBoardColor = useStoreSelector((state) => state.courtColor.color);
  const [courtAreaColor, setCourtAreaColor] = useState("#B61313");

  const handleColorChange = () => {
    setCourtAreaColor(currentColorBoardColor);
  };
  return (
    <Rect
      width={courtWidth}
      height={courtAreaYLength}
      fill={courtAreaColor}
      x={startPoint.X}
      y={startPoint.Y}
      stroke="white"
      strokeWidth={courtWhiteLine}
      onClick={() => handleColorChange()}
    />
  );
};

export default CourtArea;
