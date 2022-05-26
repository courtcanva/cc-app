import React from "react";
import { Shape } from "react-konva";


const ThreePointArea = ({ color = "#375239" }) => {
  return (
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.moveTo(0, 0); // Create a starting point
        context.lineTo(40, 0); // Create a horizontal line
        context._context.arcTo(83.25, 0, 83.25, 66, 67.5);
        context._context.arcTo(83.25, 132, 40, 132, 67.5); // Create an arc
        // context._context.arcTo(265, 285, 185, 285, 1.6.875); // Create an arc
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
