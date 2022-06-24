import { MIN_DIMENSION_BOX } from "@/constants/courtSize";
import { useStoreSelector } from "@/store/hooks";
import { Text } from "react-konva";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";

interface DimensionTextProps {
  startPoint: ICourtStartPoint;
  text: number;
}

const DimensionText: React.FC<DimensionTextProps> = ({ startPoint, text }) => {
  const { borderLength } = useStoreSelector((state) => state.courtSize);
  const dimensionColor = borderLength < MIN_DIMENSION_BOX ? "black" : "white";
  const borderSize = borderLength < MIN_DIMENSION_BOX ? MIN_DIMENSION_BOX : borderLength;

  return (
    <Text
      width={borderSize}
      height={borderSize}
      text={text / 1000 + `m`}
      fontSize={500}
      align="center"
      verticalAlign="middle"
      fill={dimensionColor}
      x={startPoint.X}
      y={startPoint.Y}
    />
  );
};

export default DimensionText;
