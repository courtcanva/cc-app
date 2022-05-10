import React from 'react';
import { Arc } from 'react-konva';

const ShootArea = ({ color = "#b59f7a" }) => {

    return (
        <Arc
            x={225}
            y={240}
            innerRadius={0}
            outerRadius={15}
            angle={180}
            fill={color}
            stroke="white"
            strokeWidth={2}
            clockwise
            rotation={90}
        />
    );

}

export default ShootArea