import { Arrow } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";
import { minDimensionBox } from "../../constants/courtSize";

interface ArrowProps {
  courtRatio: number;
  startPoint: ICourtStartPoint;
  arrowXEndLength: number; // court x length has different calculations between full courts and single side courts
}

const ArrowLine: React.FC<ArrowProps> = ({ courtRatio, arrowXEndLength, startPoint }) => {
  const { courtAreaXLength, courtAreaYLength, borderLength } = useStoreSelector(
    (state) => state.courtSize
  );

  const dimensionColor = borderLength < 1000 ? "black" : "white";
  const border =
    borderLength <= minDimensionBox ? minDimensionBox : borderLength;
  const arrowSize = 100;
  const arrowWeight = 50;

  return (
    <>
      <Arrow // court x length left arrow
        pointerLength={arrowSize}
        pointerWidth={arrowSize}
        points={[
          startPoint.X + arrowXEndLength - 1000,
          startPoint.Y - border / 2,
          startPoint.X + 250,
          startPoint.Y - border / 2,
        ]}
        fill={dimensionColor}
        stroke={dimensionColor}
        strokeWidth={arrowWeight}
      />
      <Arrow // court x length right arrow
        scaleX={-1}
        x={startPoint.X * 2 + courtAreaXLength * 2}
        pointerLength={arrowSize}
        pointerWidth={arrowSize}
        points={[
          startPoint.X + arrowXEndLength - 1000,
          startPoint.Y - border / 2,
          startPoint.X + 250,
          startPoint.Y - border / 2,
        ]}
        fill={dimensionColor}
        stroke={dimensionColor}
        strokeWidth={arrowWeight}
      />
      <Arrow // court Y length top arrow
        pointerLength={arrowSize}
        pointerWidth={arrowSize}
        points={[
          startPoint.X - border / 2,
          startPoint.Y + (courtAreaYLength / 2) - 750,
          startPoint.X - border / 2,
          startPoint.Y + 250,
        ]}
        fill={dimensionColor}
        stroke={dimensionColor}
        strokeWidth={arrowWeight}
      />
      <Arrow // court Y length bottom arrow
        scaleY={-1}
        y={startPoint.Y * 2 + courtAreaYLength}
        pointerLength={arrowSize}
        pointerWidth={arrowSize}
        points={[
          startPoint.X - border / 2,
          startPoint.Y + (courtAreaYLength / 2) - 750,
          startPoint.X - border / 2,
          startPoint.Y + 250,
        ]}
        fill={dimensionColor}
        stroke={dimensionColor}
        strokeWidth={arrowWeight}
      />
    </>
  );
};

export default ArrowLine;
