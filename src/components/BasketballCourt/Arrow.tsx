import { Arrow } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";
// import { dimensionColor, minDimensionBox } from "../../constants/courtSize";

interface ArrowProps {
  courtRatio: number;
  startPoint: ICourtStartPoint
  arrowXEndLength: number; // court x length has different calculations between full courts and single side courts
}

const ArrowLine: React.FC<ArrowProps> = ({
  courtRatio,
  arrowXEndLength,
  startPoint,
}) => {
  const { courtAreaXLength, courtAreaYLength, borderLength } = useStoreSelector(
    (state) => state.courtSize
  );
  const minDimensionBox = 1000;
  const dimensionColor ="white";
  const border = borderLength <= minDimensionBox ? (minDimensionBox * courtRatio) : (borderLength * courtRatio);

  return (
    <>
      <Arrow // court x length left arrow
        pointerLength={5}
        pointerWidth={5}
        points={[
          startPoint.X + arrowXEndLength * courtRatio - 20,
          startPoint.Y - border / 2,
          startPoint.X + 5,
          startPoint.Y - border / 2,
        ]}
        fill={dimensionColor}
        stroke={dimensionColor}
        strokeWidth={1}
      />
      <Arrow // court x length right arrow
        scaleX={-1}
        x={startPoint.X * 2 + courtAreaXLength * 2 * courtRatio}
        pointerLength={5}
        pointerWidth={5}
        points={[
          startPoint.X + arrowXEndLength * courtRatio - 20,
          startPoint.Y - border / 2,
          startPoint.X + 5,
          startPoint.Y - border / 2,
        ]}
        fill={dimensionColor}
        stroke={dimensionColor}
        strokeWidth={1}
      />
      <Arrow // court Y length top arrow
        pointerLength={5}
        pointerWidth={5}
        points={[
          startPoint.X - border / 2,
          startPoint.Y + (courtAreaYLength / 2) * courtRatio - 15,
          startPoint.X - border / 2,
          startPoint.Y + 5,
        ]}
        fill={dimensionColor}
        stroke={dimensionColor}
        strokeWidth={1}
      />
      <Arrow // court Y length bottom arrow
        scaleY={-1}
        y={startPoint.Y * 2 + courtAreaYLength * courtRatio}
        pointerLength={5}
        pointerWidth={5}
        points={[
          startPoint.X - border / 2,
          startPoint.Y + (courtAreaYLength / 2) * courtRatio - 15,
          startPoint.X - border / 2,
          startPoint.Y + 5,
        ]}
        fill={dimensionColor}
        stroke={dimensionColor}
        strokeWidth={1}
      />
    </>
  );
};

export default ArrowLine;
