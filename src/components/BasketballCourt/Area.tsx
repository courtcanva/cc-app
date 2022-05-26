import React from "react";
import { Rect } from "react-konva";

const CourtArea = ({ color = "#c96e55" }) => {
  return <Rect x={165} y={160} width={170} height={160} fill={color} shadowBlur={0} />;
};

export default CourtArea;
