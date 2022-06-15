import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import DimensionText from "../BasketballCourt/DimensionText";

interface BorderProps {
  courtRatio: number;
  color: string;
}

const Border: React.FC<BorderProps> = ({ courtRatio, color }) => {
  const { initPointX, initPointY, courtAreaXLength, courtAreaYLength, borderLength } =
    useStoreSelector((state) => state.courtSize);
  const startPointX = initPointX - borderLength * courtRatio;
  const startPointY = initPointY - borderLength * courtRatio;
  const borderWidth = (courtAreaXLength + borderLength) * 2 * courtRatio;
  const borderHeight = (courtAreaYLength + borderLength * 2) * courtRatio;
  let border;
  borderLength <= 100 ? (border = 100 * courtRatio) : (border = borderLength * courtRatio);
  let textStartX;
  borderLength <= 100 ? (textStartX = initPointX - 100 * courtRatio) : (textStartX = startPointX);
  let textStartY;
  borderLength <= 100 ? (textStartY = initPointY - 100 * courtRatio) : (textStartY = startPointY);
  let textColor;
  borderLength < 100 ? (textColor = "black") : (textColor = "white");

  return (
    <>
      <Rect
        width={borderWidth}
        height={borderHeight}
        fill={color}
        x={startPointX}
        y={startPointY}
      />
      <DimensionText
        courtRatio={courtRatio}
        startPointX={textStartX}
        startPointY={textStartY}
        color={textColor}
        text={borderLength / 100}
      />
      <DimensionText
        courtRatio={courtRatio}
        startPointX={textStartX}
        startPointY={initPointY + courtAreaYLength * courtRatio}
        color={textColor}
        text={borderLength / 100}
      />
      <DimensionText
        courtRatio={courtRatio}
        startPointX={initPointX + courtAreaXLength * 2 * courtRatio}
        startPointY={textStartY}
        color={textColor}
        text={borderLength / 100}
      />
      <DimensionText
        courtRatio={courtRatio}
        startPointX={initPointX + courtAreaXLength * 2 * courtRatio}
        startPointY={initPointY + courtAreaYLength * courtRatio}
        color={textColor}
        text={borderLength / 100}
      />
      <DimensionText
        courtRatio={courtRatio}
        startPointX={initPointX + courtAreaXLength * courtRatio - border / 2}
        startPointY={textStartY}
        color={textColor}
        text={courtAreaXLength / 50}
      />
      <DimensionText
        courtRatio={courtRatio}
        startPointX={textStartX}
        startPointY={initPointY + (courtAreaYLength / 2) * courtRatio - border / 2}
        color={textColor}
        text={courtAreaYLength / 100}
      />
    </>
  );
};

export default Border;
