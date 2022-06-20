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
  // it can be used for court dimensions and border dimensions
  courtRatio,
  startPointX,
  startPointY,
  color,
  text,
}) => {
  const { borderLength } = useStoreSelector((state) => state.courtSize);
  let border;
  borderLength <= 1000 ? (border = 1000 * courtRatio) : (border = borderLength * courtRatio);

  return (
    <Text
      width={border}
      height={border}
      text={text + `m`}
      fontSize={500 * courtRatio}
      align="center"
      verticalAlign="middle"
      fill={color}
      x={startPointX}
      y={startPointY}
    />
  );
};

export default DimensionText;
