import { Arrow } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { dimensionColor, borderSize } from "../../store/reducer/courtSizeSlice";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";

interface ArrowProps {
  startPoint: ICourtStartPoint;
}

const ArrowLine: React.FC<ArrowProps> = ({ startPoint }) => {
  const { courtAreaXLength, courtAreaYLength } = useStoreSelector((state) => state.courtSize);
  const color = String(dimensionColor);
  const border = Number(borderSize);
  const arrowSize = 100;
  const arrowWeight = 50;
  const arrowGap = 200;

  return (
    <>
      <Arrow // court x length left arrow
        pointerLength={arrowSize}
        pointerWidth={arrowSize}
        points={[
          startPoint.X + courtAreaXLength / 2 - 1000,
          startPoint.Y - border / 2,
          startPoint.X + arrowGap,
          startPoint.Y - border / 2,
        ]}
        fill={color}
        stroke={color}
        strokeWidth={arrowWeight}
      />
      <Arrow // court x length right arrow
        scaleX={-1}
        x={startPoint.X * 2 + courtAreaXLength}
        pointerLength={arrowSize}
        pointerWidth={arrowSize}
        points={[
          startPoint.X + courtAreaXLength / 2 - 1000,
          startPoint.Y - border / 2,
          startPoint.X + arrowGap,
          startPoint.Y - border / 2,
        ]}
        fill={color}
        stroke={color}
        strokeWidth={arrowWeight}
      />
      <Arrow // court Y length top arrow
        pointerLength={arrowSize}
        pointerWidth={arrowSize}
        points={[
          startPoint.X - border / 2,
          startPoint.Y + courtAreaYLength / 2 - 750,
          startPoint.X - border / 2,
          startPoint.Y + arrowGap,
        ]}
        fill={color}
        stroke={color}
        strokeWidth={arrowWeight}
      />
      <Arrow // court Y length bottom arrow
        scaleY={-1}
        y={startPoint.Y * 2 + courtAreaYLength}
        pointerLength={arrowSize}
        pointerWidth={arrowSize}
        points={[
          startPoint.X - border / 2,
          startPoint.Y + courtAreaYLength / 2 - 750,
          startPoint.X - border / 2,
          startPoint.Y + arrowGap,
        ]}
        fill={color}
        stroke={color}
        strokeWidth={arrowWeight}
      />
    </>
  );
};

export default ArrowLine;
