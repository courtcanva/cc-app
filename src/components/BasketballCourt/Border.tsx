import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import DimensionText from "../BasketballCourt/DimensionText";

interface BorderProps {
  courtRatio: number;
}

const Border: React.FC<BorderProps> = ({ courtRatio }) => {
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

  const color = useStoreSelector(
    (state) => state.tile.find((tile) => tile.location.includes("border"))?.color
  );

  return (
    <>
      <Rect
        width={borderWidth}
        height={borderHeight}
        fill={color}
        x={startPointX}
        y={startPointY}
      />
      <DimensionText // dimension at top left
        courtRatio={courtRatio}
        startPointX={textStartX}
        startPointY={textStartY}
        color={textColor}
        text={borderLength / 100}
      />
      <DimensionText // dimension at bottom left
        courtRatio={courtRatio}
        startPointX={textStartX}
        startPointY={initPointY + courtAreaYLength * courtRatio}
        color={textColor}
        text={borderLength / 100}
      />
      <DimensionText // dimension at top right
        courtRatio={courtRatio}
        startPointX={initPointX + courtAreaXLength * 2 * courtRatio}
        startPointY={textStartY}
        color={textColor}
        text={borderLength / 100}
      />
      <DimensionText // dimension at bottom right
        courtRatio={courtRatio}
        startPointX={initPointX + courtAreaXLength * 2 * courtRatio}
        startPointY={initPointY + courtAreaYLength * courtRatio}
        color={textColor}
        text={borderLength / 100}
      />
      <DimensionText // court X length demension
        courtRatio={courtRatio}
        startPointX={initPointX + courtAreaXLength * courtRatio - border / 2}
        startPointY={textStartY}
        color={textColor}
        text={courtAreaXLength / 50}
      />
      <DimensionText // court Y length demension
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
