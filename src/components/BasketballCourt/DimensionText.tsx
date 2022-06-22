import { Text } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";
import { minDimensionBox } from "../../constants/courtSize";

interface DimensionTextProps {
  startPoint: ICourtStartPoint;
  color: string;
  text: number;
}

const DimensionText: React.FC<DimensionTextProps> = ({
  startPoint,
  color,
  text,
}) => {
  const { borderLength } = useStoreSelector((state) => state.courtSize);
  const border =
    borderLength <= minDimensionBox ? minDimensionBox : borderLength;
  console.log(text / 1000);

  return (
    <Text
      width={border}
      height={border}
      text={text / 1000 + `m`}
      fontSize={500}
      align="center"
      verticalAlign="middle"
      fill={color}
      x={startPoint.X}
      y={startPoint.Y}
    />
  );
};

export default DimensionText;
