import React from "react";

const svgMock = (...props) => {
  const svg = React.createElement("svg", {
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    ...props[0],
  });
  return svg;
};
export default svgMock;
