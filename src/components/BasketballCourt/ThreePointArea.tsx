import React from 'react';
import { Shape } from 'react-konva';

const ThreePointArea = ({ color = "#375239" }) => {

    return (
        <Shape
            sceneFunc={(context, shape) => {

                context.beginPath();
                context.moveTo(185, 195); // Create a starting point
                context.lineTo(205, 195); // Create a horizontal line
                context._context.arcTo(265, 195, 265, 240, 45); // Create an arc
                context._context.arcTo(265, 285, 185, 285, 45); // Create an arc
                context.lineTo(185, 285); // Continue with vertical line

                context.closePath();
                // (!) Konva specific method, it is very important
                context.fillStrokeShape(shape);
            }}
            fill={color}
            stroke="white"
            strokeWidth={2}
        />
    );

}

export default ThreePointArea