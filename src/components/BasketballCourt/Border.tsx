import { Rect } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import DimensionText from "../BasketballCourt/DimensionText";

interface BorderProps {
  courtRatio: number;
  initPointX: number;
  initPointY: number;
}

const Border: React.FC<BorderProps> = ({ courtRatio, initPointX, initPointY }) => {
  const { courtAreaXLength, courtAreaYLength, borderLength } = useStoreSelector(
    (state) => state.courtSize
  );
  const startPointX = initPointX - borderLength * courtRatio;
  const startPointY = initPointY - borderLength * courtRatio;
  const borderWidth = (courtAreaXLength + borderLength) * 2 * courtRatio;
  const borderHeight = (courtAreaYLength + borderLength * 2) * courtRatio;
  let border;
  borderLength <= 1000 ? (border = 1000 * courtRatio) : (border = borderLength * courtRatio);
  let textStartX;
  borderLength <= 1000 ? (textStartX = initPointX - 1000 * courtRatio) : (textStartX = startPointX);
  let textStartY;
  borderLength <= 1000 ? (textStartY = initPointY - 1000 * courtRatio) : (textStartY = startPointY);
  let textColor;
  borderLength < 1000 ? (textColor = "black") : (textColor = "white");

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
        text={borderLength / 1000}
      />
      <DimensionText // dimension at bottom left
        courtRatio={courtRatio}
        startPointX={textStartX}
        startPointY={initPointY + courtAreaYLength * courtRatio}
        color={textColor}
        text={borderLength / 1000}
      />
      <DimensionText // dimension at top right
        courtRatio={courtRatio}
        startPointX={initPointX + courtAreaXLength * 2 * courtRatio}
        startPointY={textStartY}
        color={textColor}
        text={borderLength / 1000}
      />
      <DimensionText // dimension at bottom right
        courtRatio={courtRatio}
        startPointX={initPointX + courtAreaXLength * 2 * courtRatio}
        startPointY={initPointY + courtAreaYLength * courtRatio}
        color={textColor}
        text={borderLength / 1000}
      />
      <DimensionText // court X length demension
        courtRatio={courtRatio}
        startPointX={initPointX + courtAreaXLength * courtRatio - border / 2}
        startPointY={textStartY}
        color={textColor}
        text={courtAreaXLength / 500}
      />
      <DimensionText // court Y length demension
        courtRatio={courtRatio}
        startPointX={textStartX}
        startPointY={initPointY + (courtAreaYLength / 2) * courtRatio - border / 2}
        color={textColor}
        text={courtAreaYLength / 1000}
      />
    </>
  );
};

export default Border;
