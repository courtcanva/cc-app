import React from 'react';
import { Rect } from 'react-konva';

const ThreeSecondArea = ({ color = "#1a1f51" }) => {

    return (
        <Rect
            x={185}
            y={225}
            width={40}
            height={30}
            fill={color}
            shadowBlur={0}
            stroke="white"
            strokeWidth={2}
        />
    );

}

export default ThreeSecondArea