import { MIN_DIMENSION_BOX } from "@/constants/courtSize";
import { useStoreSelector } from "@/store/hooks";
import { Text } from "react-konva";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";

interface DimensionTextProps {
  startPoint: ICourtStartPoint;
  text: number;
  color: string;
}

const DimensionText: React.FC<DimensionTextProps> = ({ startPoint, text, color }) => {
  const { borderLength } = useStoreSelector((state) => state.courtSpecData.activeCourt);
  const { ruler } = useStoreSelector((state) => state.rulerControl);
  const borderSize = borderLength < MIN_DIMENSION_BOX ? MIN_DIMENSION_BOX : borderLength;
  return (
    <Text
      width={borderSize}
      height={borderSize}
      text={text / 1000 + `m`}
      fontSize={400}
      fontStyle="500"
      align="center"
      verticalAlign="middle"
      fill={color}
      x={startPoint.X}
      y={startPoint.Y}
      visible={ruler}
    />
  );
};

export default DimensionText;
