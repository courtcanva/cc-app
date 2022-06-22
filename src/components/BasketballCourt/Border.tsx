import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { dimensionColor, borderSize } from "../../store/reducer/courtSizeSlice";
import DimensionText from "../BasketballCourt/DimensionText";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";
import { MIN_DIMENSION_BOX } from "../../constants/courtSize";

interface BorderProps {
  startPoint: ICourtStartPoint;
}

const Border: React.FC<BorderProps> = ({ startPoint }) => {
  const { courtAreaXLength, courtAreaYLength, borderLength } = useStoreSelector(
    (state) => state.courtSize
  );
  const startPointX = startPoint.X - borderLength;
  const startPointY = startPoint.Y - borderLength;
  const borderWidth = courtAreaXLength + borderLength * 2;
  const borderHeight = courtAreaYLength + borderLength * 2;
  const textStartX =
    borderLength <= MIN_DIMENSION_BOX ? startPoint.X - MIN_DIMENSION_BOX : startPointX;
  const textStartY =
    borderLength <= MIN_DIMENSION_BOX ? startPoint.Y - MIN_DIMENSION_BOX : startPointY;

  const color = useStoreSelector(
    (state) => state.tile.find((tile) => tile.location.includes("border"))?.color
  );

  const borderDimensionPosition = [
    {
      id: 1,
      startPoint: {
        X: textStartX,
        Y: textStartY,
      },
    },
    {
      id: 2,
      startPoint: {
        X: textStartX,
        Y: startPoint.Y + courtAreaYLength,
      },
    },
    {
      id: 3,
      startPoint: {
        X: startPoint.X + courtAreaXLength,
        Y: textStartY,
      },
    },
    {
      id: 4,
      startPoint: {
        X: startPoint.X + courtAreaXLength,
        Y: startPoint.Y + courtAreaYLength,
      },
    },
  ];
  const courtDimensionPosition = [
    {
      startPoint: {
        X: startPoint.X + courtAreaXLength / 2 - borderSize / 2,
        Y: textStartY,
      },
      text: courtAreaXLength,
    },
    {
      startPoint: {
        X: textStartX,
        Y: startPoint.Y + courtAreaYLength / 2 - borderSize / 2,
      },
      text: courtAreaYLength,
    },
  ];

  return (
    <>
      <Rect
        width={borderWidth}
        height={borderHeight}
        fill={color}
        x={startPointX}
        y={startPointY}
      />
      {borderDimensionPosition.map((item: { startPoint: ICourtStartPoint; id: number }) => (
        <div key={item.id}>
          <DimensionText startPoint={item.startPoint} color={dimensionColor} text={borderLength} />
        </div>
      ))}
      {courtDimensionPosition.map((item: { startPoint: ICourtStartPoint; text: number }) => (
        <div key={item.text}>
          <DimensionText startPoint={item.startPoint} color={dimensionColor} text={item.text} />
        </div>
      ))}
    </>
  );
};

export default Border;
