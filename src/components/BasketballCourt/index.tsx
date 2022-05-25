import React, { useRef, useState } from "react";
import { Stage, Layer, Text } from "react-konva"; // notice you can import from react-konva normally
import ThreePointArea from "./ThreePointArea";


const BasketballCourt = () => {

  return (
    <div style={{ background: "white" }}>
      <Stage
        id="basketball-court"
        width={1000}
        height={500}
        visible={true}
      >
        <Layer draggable>

          <ThreePointArea />
 
        </Layer>

        <Layer draggable>
          {/* https://konvajs.org/api/Konva.Text.html#main */}
          <Text text="Court Test" fontFamily="Times New Roman" fontStyle="bold" fontSize={50} />
        </Layer>
      </Stage>
    </div>
  );
};

export default BasketballCourt;