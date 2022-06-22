import { Arrow } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { dimensionColor, borderSize } from "../../store/reducer/courtSizeSlice";
import { useContext } from "react";
import { START_POINT } from "@/constants/courtSize";

function ArrowLine() {
  const { courtAreaXLength, courtAreaYLength } = useStoreSelector((state) => state.courtSize);
  const startPoint = useContext(START_POINT);
  const arrowSize = 100;
  const arrowWeight = 50;
  const arrowGap = 200;

  return (
    <>
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
      />
    </>
  );
}

export default ArrowLine;
