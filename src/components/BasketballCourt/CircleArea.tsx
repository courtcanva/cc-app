import { Shape } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

const CircleArea = ({ color = "#606F14" }) => {
  const { startPointX, startPointY, circleAreaRadius } = useStoreSelector(
    (state) => state.circleArea
  );

  return (
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.moveTo(startPointX, startPointY);
        context._context.arcTo(
          startPointX - circleAreaRadius,
          startPointY,
          startPointX - circleAreaRadius,
          startPointY + circleAreaRadius,
          circleAreaRadius
        );
        context._context.arcTo(
          startPointX - circleAreaRadius,
          startPointY + circleAreaRadius * 2,
          startPointX,
          startPointY + circleAreaRadius * 2,
          circleAreaRadius
        );
        // context.closePath();
        context.fillStrokeShape(shape);
      }}
      fill={color}
      stroke="white"
      strokeWidth={2}
    />
  );
};

export default CircleArea;
