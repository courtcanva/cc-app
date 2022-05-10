// components/MyComponent.js
import React, { useRef, useState } from "react";
import { Stage, Layer, Text } from "react-konva"; // notice you can import from react-konva normally
import Area from './Area'
import CourtArea from './CourtArea'
import ThreePointArea from "./ThreePointArea";
import ShootArea from "./ShootArea";
import ThreeSecondArea from './ThreeSecondArea'

const BasketballCourt = () => {
  const stageRef = useRef();
  //   const

  return (
    <div style={{ background: "white" }}>
      <Stage
        id="basketball-court"
        width={500}
        height={500}

        ref={stageRef}
      >

        <Layer draggable>
          <Area />
          <CourtArea />
          <ThreePointArea />
          <ThreeSecondArea />
          <ShootArea />
        </Layer>

        <Layer draggable>
          {/* https://konvajs.org/api/Konva.Text.html#main */}
          <Text text="Hello My Court" fontFamily="fantasy" fontStyle="italic bold" fontSize={20} />
        </Layer>
      </Stage>
    </div>
  );
};

export default BasketballCourt;
