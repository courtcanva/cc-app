import { useStoreSelector } from "@/store/hooks";
import { Group } from "react-konva";
import DimensionText from "./DimensionText";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";
import { MIN_DIMENSION_BOX } from "../../constants/courtData";

interface BorderDimensionProps {
  startPoint: ICourtStartPoint;
  borderLength: number;
}
const BorderDimension: React.FC<BorderDimensionProps> = ({ startPoint, borderLength }) => {
  const { courtAreaXLength, courtAreaYLength } = useStoreSelector(
    (state) => state.courtSpecData.activeCourt
  );
  const startPointX = startPoint.X - borderLength;
  const startPointY = startPoint.Y - borderLength;
  let dimensionColor: string;
  if (borderLength === 0) {
    dimensionColor = "transparent";
  } else {
    dimensionColor = borderLength < MIN_DIMENSION_BOX ? "black" : "white";
  }

  const textStartX =
    borderLength <= MIN_DIMENSION_BOX ? startPoint.X - MIN_DIMENSION_BOX : startPointX;
  const textStartY =
    borderLength <= MIN_DIMENSION_BOX ? startPoint.Y - MIN_DIMENSION_BOX : startPointY;

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

  return (
    <>
      {borderDimensionPosition.map((item: { startPoint: ICourtStartPoint; id: number }) => (
        <Group key={item.id}>
          <DimensionText startPoint={item.startPoint} text={borderLength} color={dimensionColor} />
        </Group>
      ))}
    </>
  );
};

export default BorderDimension;
