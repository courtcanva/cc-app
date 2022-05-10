import React from 'react';
import { Rect } from 'react-konva';

const CourtArea = ({ color = "#7a3030" }) => {

    return (
        <Rect
            x={185}
            y={180}
            width={130}
            height={120}
            fill={color}
            stroke="white"
            strokeWidth={2}
            shadowBlur={0}
        />
    );

}

export default CourtArea