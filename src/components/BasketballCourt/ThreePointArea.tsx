import { RootState } from "@/store";
import React from "react";
import { Shape } from "react-konva";
import { useSelector } from "react-redux";
import { useStoreDispatch, useStoreSelector } from "../../store/hooks";


const ThreePointArea = ({ color = "#375239" }) => {
  const {
    startPointX,
    startPointY,
    cornerThreePointLineLength,
    controlPointOneX,
    controlPointOneY,
    controlPointTwoX,
    controlPointTwoY,
    controlPointThreeX,
    controlPointThreeY,
    controlPointFourX,
    controlPointFourY,
    threePointLineRadius,
  } = useSelector((state: RootState) => state.threePointLine);

  return (
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.moveTo(startPointX, startPointY); // Create a starting point
        context.lineTo(startPointX + cornerThreePointLineLength, startPointY); // Create a horizontal line
        context._context.arcTo(controlPointOneX, controlPointOneY, controlPointTwoX, controlPointTwoY, threePointLineRadius); // Create an arc
        context._context.arcTo(controlPointThreeX, controlPointThreeY, controlPointFourX, controlPointFourY, threePointLineRadius); // Create an arc
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
