import { Arrow } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

interface ArrowProps {
  courtRatio: number;
  initPointX: number;
  initPointY: number;
  arrowXEndLength: number; // court x length has different calculations between full courts and single side courts
}

const ArrowLine: React.FC<ArrowProps> = ({
  courtRatio,
  arrowXEndLength,
  initPointX,
  initPointY,
}) => {
  const { courtAreaXLength, courtAreaYLength, borderLength } = useStoreSelector(
    (state) => state.courtSize
  );
  let border;
  borderLength <= 1000 ? (border = 1000 * courtRatio) : (border = borderLength * courtRatio);
  let color;
  borderLength <= 500 ? (color = "black") : (color = "white");

  return (
    <>
      <Arrow // court x length left arrow
        pointerLength={5}
        pointerWidth={5}
        points={[
          initPointX + arrowXEndLength * courtRatio - 20,
          initPointY - border / 2,
          initPointX + 5,
          initPointY - border / 2,
        ]}
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
      <Arrow // court x length right arrow
        scaleX={-1}
        x={initPointX * 2 + courtAreaXLength * 2 * courtRatio}
        pointerLength={5}
        pointerWidth={5}
        points={[
          initPointX + arrowXEndLength * courtRatio - 20,
          initPointY - border / 2,
          initPointX + 5,
          initPointY - border / 2,
        ]}
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
      <Arrow // court Y length top arrow
        pointerLength={5}
        pointerWidth={5}
        points={[
          initPointX - border / 2,
          initPointY + (courtAreaYLength / 2) * courtRatio - 15,
          initPointX - border / 2,
          initPointY + 5,
        ]}
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
      <Arrow // court Y length bottom arrow
        scaleY={-1}
        y={initPointY * 2 + courtAreaYLength * courtRatio}
        pointerLength={5}
        pointerWidth={5}
        points={[
          initPointX - border / 2,
          initPointY + (courtAreaYLength / 2) * courtRatio - 15,
          initPointX - border / 2,
          initPointY + 5,
        ]}
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
    </>
  );
};

export default ArrowLine;
