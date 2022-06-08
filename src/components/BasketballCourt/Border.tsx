import { Shape } from "react-konva";
import { useStoreSelector } from "@/store/hooks";

const Border = ({ color = "#643132" }) => {
    const { startPointX, startPointY, borderXLength, borderYLength } = useStoreSelector(
        (state) => state.border
    );

    return (
        <Shape
            sceneFunc={(context, shape) => {
                context.beginPath();
                context.moveTo(startPointX, startPointY); // Create a starting point
                context.lineTo(startPointX + borderXLength, startPointY); // Create a horizontal line
                context.lineTo(startPointX + borderXLength, startPointY + borderYLength); // Create a horizontal line
                context.lineTo(startPointX, startPointY + borderYLength); // Create a horizontal line
                context.closePath();
                context.fillStrokeShape(shape);
            }}
            fill={color}
        />
    );
};

export default Border;
