import { Text } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";
// import { minDimensionBox } from "../../constants/courtSize";

interface DimensionTextProps {
  courtRatio: number;
  startPoint: ICourtStartPoint
  color: string;
  text: number;
}

const DimensionText: React.FC<DimensionTextProps> = ({
  // it can be used for court dimensions and border dimensions
  courtRatio,
  startPoint,
  color,
  text,
}) => {
  const { borderLength } = useStoreSelector((state) => state.courtSize);
  const minDimensionBox = 1000;
  const border = borderLength <= minDimensionBox ? (minDimensionBox * courtRatio) : (borderLength * courtRatio);
  console.log(text / 1000);

  return (
    <Text
      width={border}
      height={border}
      text={text / 1000 + `m`}
      fontSize={500 * courtRatio}
      align="center"
      verticalAlign="middle"
      fill={color}
      x={startPoint.X}
      y={startPoint.Y}
    />
  );
};

export default DimensionText;
