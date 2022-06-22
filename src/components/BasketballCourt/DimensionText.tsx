import { Text } from "react-konva";
import { ICourtStartPoint } from "../../interfaces/courtStartPoint";
import { borderSize } from "../../store/reducer/courtSizeSlice";

interface DimensionTextProps {
  startPoint: ICourtStartPoint;
  color: string;
  text: number;
}

const DimensionText: React.FC<DimensionTextProps> = ({ startPoint, color, text }) => {
  console.log(borderSize);
  console.log(text / 1000);

  return (
    <Text
      width={borderSize}
      height={borderSize}
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
