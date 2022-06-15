import { Arrow } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

interface ArrowProps {
  courtRatio: number;
  arrowXEndLength: number;
}

const ArrowLine: React.FC<ArrowProps> = ({ courtRatio, arrowXEndLength }) => {
  const { initPointX, initPointY, courtAreaXLength, courtAreaYLength, borderLength } =
    useStoreSelector((state) => state.courtSize);
  let border;
  borderLength <= 100 ? (border = 100 * courtRatio) : (border = borderLength * courtRatio);
  let color;
  borderLength <= 50 ? (color = "black") : (color = "white");

  return (
    <>
      <Arrow
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
      <Arrow
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
      <Arrow
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
      <Arrow
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
