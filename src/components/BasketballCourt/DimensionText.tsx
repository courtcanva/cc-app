import { Text } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

interface DimensionTextProps {
  courtRatio: number;
  startPointX: number;
  startPointY: number;
  color: string;
  text: number;
}

const DimensionText: React.FC<DimensionTextProps> = ({
  courtRatio,
  startPointX,
  startPointY,
  color,
  text,
}) => {
  const { borderLength } = useStoreSelector((state) => state.courtSize);
  let border;
  borderLength <= 100 ? (border = 100 * courtRatio) : (border = borderLength * courtRatio);

  return (
    <Text
      width={border}
      height={border}
      text={text + `M`}
      fontSize={50 * courtRatio}
      align="center"
      verticalAlign="middle"
      fill={color}
      x={startPointX}
      y={startPointY}
    />
  );
};

export default DimensionText;
