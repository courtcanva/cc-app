import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import DimensionText from "../BasketballCourt/DimensionText";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";
import { minDimensionBox } from "../../constants/courtSize";

interface BorderProps {
  startPoint: ICourtStartPoint;
}

const Border: React.FC<BorderProps> = ({ startPoint }) => {
  const { courtAreaXLength, courtAreaYLength, borderLength } = useStoreSelector(
    (state) => state.courtSize
  );

  const dimensionColor = borderLength < minDimensionBox ? "black" : "white";
  const startPointX = startPoint.X - borderLength;
  const startPointY = startPoint.Y - borderLength;
  const borderWidth = (courtAreaXLength + borderLength) * 2;
  const borderHeight = (courtAreaYLength + borderLength * 2);
  const border =
    borderLength <= minDimensionBox ? minDimensionBox : borderLength;
  const textStartX =
    borderLength <= minDimensionBox ? startPoint.X - minDimensionBox : startPointX;
  const textStartY =
    borderLength <= minDimensionBox ? startPoint.Y - minDimensionBox : startPointY;

  const color = useStoreSelector(
    (state) => state.tile.find((tile) => tile.location.includes("border"))?.color
  );

  const borderDimensionPosition = [
    {
      X: textStartX,
      Y: textStartY,
    },
    {
      X: textStartX,
      Y: startPoint.Y + courtAreaYLength,
    },
    {
      X: startPoint.X + courtAreaXLength * 2,
      Y: textStartY,
    },
    {
      X: startPoint.X + courtAreaXLength * 2,
      Y: startPoint.Y + courtAreaYLength,
    },
  ];
  const courtDimensionPosition = [
    {
      startPoint: {
        X: startPoint.X + courtAreaXLength - border / 2,
        Y: textStartY,
      },
      text: courtAreaXLength * 2,
    },
    {
      startPoint: {
        X: textStartX,
        Y: startPoint.Y + (courtAreaYLength / 2) - border / 2,
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
      {borderDimensionPosition.map((item: ICourtStartPoint) => (
        <div key={item.X}>
          <DimensionText
            startPoint={item}
            color={dimensionColor}
            text={borderLength}
          />
        </div>
      ))}
      {courtDimensionPosition.map((item: { startPoint: ICourtStartPoint; text: number }) => (
        <div key={item.text}>
          <DimensionText
            startPoint={item.startPoint}
            color={dimensionColor}
            text={item.text}
          />
        </div>
      ))}
    </>
  );
};

export default Border;
