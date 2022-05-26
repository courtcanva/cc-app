import React from "react";
import { Shape } from "react-konva";


const ThreePointArea = ({ color = "#375239" }) => {
  return (
    <Shape
    sceneFunc={(context, shape) => { 
        context.beginPath();
        context.moveTo(0, 0); // Create a starting point
        context.lineTo(15.75, 0); // Create a horizontal line
        context._context.arcTo(81.75, 0, 81.75, 66, 66); // Create an arc
        context._context.arcTo(81.75, 132, 0, 132, 66); // Create an arc
        context.lineTo(0, 132); // Continue with vertical line

        context.closePath();
        // (!) Konva specific method, it is very important
        context.fillStrokeShape(shape);
    }}
    fill={color}
    stroke="white"
    strokeWidth={2}
/>
  );
};

export default ThreePointArea;
