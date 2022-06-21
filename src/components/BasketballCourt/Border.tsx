import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import DimensionText from "../BasketballCourt/DimensionText";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";
import { minDimensionBox } from "../../constants/courtSize";

interface BorderProps {
  courtRatio: number;
  startPoint: ICourtStartPoint;
}

const Border: React.FC<BorderProps> = ({ courtRatio, startPoint }) => {
  const { courtAreaXLength, courtAreaYLength, borderLength } = useStoreSelector(
    (state) => state.courtSize
  );
  
  const dimensionColor = borderLength < 1000 ? ("black") : ("white");
  const startPointX = startPoint.X - borderLength * courtRatio;
  const startPointY = startPoint.Y - borderLength * courtRatio;
  const borderWidth = (courtAreaXLength + borderLength) * 2 * courtRatio;
  const borderHeight = (courtAreaYLength + borderLength * 2) * courtRatio;
  const border =
    borderLength <= minDimensionBox ? minDimensionBox * courtRatio : borderLength * courtRatio;
  const textStartX =
    borderLength <= minDimensionBox ? startPoint.X - minDimensionBox * courtRatio : startPointX;
  const textStartY =
    borderLength <= minDimensionBox ? startPoint.Y - minDimensionBox * courtRatio : startPointY;

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
      Y: startPoint.Y + courtAreaYLength * courtRatio,
    },
    {
      X: startPoint.X + courtAreaXLength * 2 * courtRatio,
      Y: textStartY,
    },
    {
      X: startPoint.X + courtAreaXLength * 2 * courtRatio,
      Y: startPoint.Y + courtAreaYLength * courtRatio,
    },
  ];
  const courtDimensionPosition = [
    {
      startPoint: {
        X: startPoint.X + courtAreaXLength * courtRatio - border / 2,
        Y: textStartY,
      },
      text: courtAreaXLength * 2,
    },
    {
      startPoint: {
        X: textStartX,
        Y: startPoint.Y + (courtAreaYLength / 2) * courtRatio - border / 2,
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
            courtRatio={courtRatio}
            startPoint={item}
            color={dimensionColor}
            text={borderLength}
          />
        </div>
      ))}
      {courtDimensionPosition.map((item: { startPoint: ICourtStartPoint; text: number }) => (
        <div key={item.text}>
          <DimensionText
            courtRatio={courtRatio}
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
