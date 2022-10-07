import { Arrow } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { MIN_DIMENSION_BOX } from "@/constants/courtData";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import DimensionText from "./DimensionText";

interface CourtDimensionProps {
  startPoint: ICourtStartPoint;
  borderLength: number;
}
const CourtDimension: React.FC<CourtDimensionProps> = ({ startPoint, borderLength }) => {
  const { courtAreaXLength, courtAreaYLength } = useStoreSelector(
    (state) => state.courtSpecData.activeCourt
  );
  const { ruler } = useStoreSelector((state) => state.rulerControl);
  const dimensionColor = borderLength < MIN_DIMENSION_BOX ? "black" : "white";
  const borderSize = borderLength < MIN_DIMENSION_BOX ? MIN_DIMENSION_BOX : borderLength;
  const arrowSize = 100;
  const arrowWeight = 50;
  const arrowGap = 200;
  const courtDimensionPosition = [
    {
      startPoint: {
        X: startPoint.X + courtAreaXLength / 2 - borderSize / 2,
        Y: startPoint.Y - borderSize,
      },
      text: courtAreaXLength,
    },
    {
      startPoint: {
        X: startPoint.X - borderSize,
        Y: startPoint.Y + courtAreaYLength / 2 - borderSize / 2,
      },
      text: courtAreaYLength,
    },
  ];

  return (
    <>
      {courtDimensionPosition.map((item: { startPoint: ICourtStartPoint; text: number }) => (
        <div key={item.text}>
          <DimensionText startPoint={item.startPoint} text={item.text} color={dimensionColor} />
        </div>
      ))}
      <Arrow // court x length left arrow
        pointerLength={arrowSize}
        pointerWidth={arrowSize}
        points={[
          startPoint.X + courtAreaXLength / 2 - 1000,
          startPoint.Y - borderSize / 2,
          startPoint.X + arrowGap,
          startPoint.Y - borderSize / 2,
        ]}
        fill={dimensionColor}
        stroke={dimensionColor}
        strokeWidth={arrowWeight}
        visible={ruler}
      />
      <Arrow // court x length right arrow
        scaleX={-1}
        x={startPoint.X * 2 + courtAreaXLength}
        pointerLength={arrowSize}
        pointerWidth={arrowSize}
        points={[
          startPoint.X + courtAreaXLength / 2 - 1000,
          startPoint.Y - borderSize / 2,
          startPoint.X + arrowGap,
          startPoint.Y - borderSize / 2,
        ]}
        fill={dimensionColor}
        stroke={dimensionColor}
        strokeWidth={arrowWeight}
        visible={ruler}
      />
      <Arrow // court Y length top arrow
        pointerLength={arrowSize}
        pointerWidth={arrowSize}
        points={[
          startPoint.X - borderSize / 2,
          startPoint.Y + courtAreaYLength / 2 - 750,
          startPoint.X - borderSize / 2,
          startPoint.Y + arrowGap,
        ]}
        fill={dimensionColor}
        stroke={dimensionColor}
        strokeWidth={arrowWeight}
        visible={ruler}
      />
      <Arrow // court Y length bottom arrow
        scaleY={-1}
        y={startPoint.Y * 2 + courtAreaYLength}
        pointerLength={arrowSize}
        pointerWidth={arrowSize}
        points={[
          startPoint.X - borderSize / 2,
          startPoint.Y + courtAreaYLength / 2 - 750,
          startPoint.X - borderSize / 2,
          startPoint.Y + arrowGap,
        ]}
        fill={dimensionColor}
        stroke={dimensionColor}
        strokeWidth={arrowWeight}
        visible={ruler}
      />
    </>
  );
};

export default CourtDimension;
