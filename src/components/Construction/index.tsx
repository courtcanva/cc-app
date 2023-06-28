import { RIGHT_BAR_WIDTH } from "@/constants/designPage";
import { Box, Center } from "@chakra-ui/react";
import { useState, RefObject, useRef, useEffect } from "react";
import Konva from "konva";
import { useDispatch } from "react-redux";
import { Stage, Layer, Line, Rect, Text } from "react-konva";
import useCourt from "@/hooks/useCourt";
import { KonvaEventObject } from "konva/lib/Node";
import { useStoreSelector } from "@/store/hooks";
import { useConstruction } from "@/hooks/useConstruction";
import {
  COORDINATES_AREA_WIDTH,
  IMAGE_COVERAGE,
  DRAW_DELAY,
  PIXEL_RATIO,
} from "@/constants/construction";
import { resetAll } from "@/store/reducer/canvasControlSlice";
import { getInvertColor } from "@/utils/getInvertColor";
import constructionSlice from "@/store/reducer/constructionSlice";

interface Coordinates {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
}

const Construction = () => {
  const dispatch = useDispatch();
  const constructionRef = useRef<any>();
  const [constructionRatio, setConstructionRatio] = useState(1);
  const imgSrc = useStoreSelector((state) => state.construction.constructionSrc);
  const constructionInfo = useStoreSelector((state) => state.construction.constructionInfo);
  const tiles = useStoreSelector((state) => state.tile.present.court);
  const tilesColor = tiles.map((item) => item.color);
  const invertColor = getInvertColor(tilesColor);

  const { beginPointX, beginPointY, endPointX, endPointY, tileSize } = constructionInfo;
  const img = new Image();
  imgSrc && (img.src = imgSrc);
  const canvasWidth = constructionRatio * (endPointX - beginPointX);
  const canvasHeight = constructionRatio * (endPointY - beginPointY);
  // prepare start and end points of lines along the x axis
  const xLinesPoints = Array.from(
    { length: Math.ceil((endPointX - beginPointX) / tileSize) + 1 },
    (v, k) => k
  ).map((number) => {
    let x = number * tileSize * constructionRatio * IMAGE_COVERAGE + COORDINATES_AREA_WIDTH;
    // the last line will move back if the court size is not divisible by tile size.
    if (number - (endPointX - beginPointX) / tileSize > 0.1) {
      x -= (tileSize - ((endPointX - beginPointX) % tileSize)) * constructionRatio * IMAGE_COVERAGE;
    }
    return [x, COORDINATES_AREA_WIDTH, x, COORDINATES_AREA_WIDTH + canvasHeight * IMAGE_COVERAGE];
  });
  // prepare start and end points of lines along the y axis
  const yLinesPoints = Array.from(
    { length: Math.ceil((endPointY - beginPointY) / tileSize) + 1 },
    (v, k) => k
  ).map((number) => {
    let y = number * tileSize * constructionRatio * IMAGE_COVERAGE + COORDINATES_AREA_WIDTH;
    // the last line will move back if the court size is not divisible by tile size.
    if (number - (endPointY - beginPointY) / tileSize > 0.1) {
      y -= (tileSize - ((endPointY - beginPointY) % tileSize)) * constructionRatio * IMAGE_COVERAGE;
    }
    return [COORDINATES_AREA_WIDTH, y, COORDINATES_AREA_WIDTH + canvasWidth * IMAGE_COVERAGE, y];
  });

  const xCoordinates = xLinesPoints.map((item, index) => {
    return {
      x: item[0],
      y: 0,
      width: tileSize * constructionRatio * IMAGE_COVERAGE,
      height: COORDINATES_AREA_WIDTH,
      text:
        Math.floor(index / 100).toString() +
        Math.floor((index % 100) / 10).toString() +
        (index % 10).toString(),
    };
  });
  // remove the item start from the last line
  xCoordinates.pop();

  const yCoordinates = yLinesPoints.map((item, index) => {
    return {
      x: 0,
      y: item[1],
      width: COORDINATES_AREA_WIDTH,
      height: tileSize * constructionRatio * IMAGE_COVERAGE,
      text:
        String.fromCharCode(65 + Math.floor(index / 26)) + String.fromCharCode(65 + (index % 26)),
    };
  });
  // remove the item start from the last line
  yCoordinates.pop();
  const getCartesianCoordinates = (xCoordinates: Coordinates[], yCoordinates: Coordinates[]) => {
    const cartesianCoordinates: Coordinates[] = [];
    xCoordinates.forEach((xCoordinate) => {
      yCoordinates.forEach((yCoordinate) => {
        const cartesianCoordinate = {
          x: xCoordinate.x,
          y: yCoordinate.y,
          width: tileSize * constructionRatio * IMAGE_COVERAGE,
          height: tileSize * constructionRatio * IMAGE_COVERAGE,
          text: xCoordinate.text + "\n" + yCoordinate.text,
        };
        cartesianCoordinates.push(cartesianCoordinate);
      });
    });
    return cartesianCoordinates;
  };
  const cartesianCoordinates = getCartesianCoordinates(xCoordinates, yCoordinates);
  console.log(cartesianCoordinates);

  useEffect(() => {
    const constructionCtx = constructionRef.current?.getContext();
    if (imgSrc && constructionCtx) {
      setConstructionRatio(window.innerHeight / (endPointY - beginPointY));
      setTimeout(() => {
        constructionCtx.drawImage(
          img,
          COORDINATES_AREA_WIDTH,
          COORDINATES_AREA_WIDTH,
          (img.width * constructionRatio * IMAGE_COVERAGE) / PIXEL_RATIO,
          (img.height * constructionRatio * IMAGE_COVERAGE) / PIXEL_RATIO
        );
      }, DRAW_DELAY);
    }
  }, [img]);
  return (
    <Box position="fixed" h="100vh" w="100vw" bottom="0" left="0" bg="blackAlpha.600" zIndex="999">
      <Center h="100vh" w={`calc(100vw - ${RIGHT_BAR_WIDTH})`}>
        <Stage width={canvasWidth} height={canvasHeight}>
          <Layer>
            <Rect
              x={0}
              y={0}
              // add a tileSize width and height to avoid overflow
              width={
                canvasWidth * IMAGE_COVERAGE +
                COORDINATES_AREA_WIDTH +
                tileSize * constructionRatio * IMAGE_COVERAGE
              }
              height={
                canvasHeight * IMAGE_COVERAGE +
                COORDINATES_AREA_WIDTH +
                tileSize * constructionRatio * IMAGE_COVERAGE
              }
              fill="white"
            />
            {xCoordinates.map((item, index) => {
              return (
                <Text
                  key={index}
                  x={item.x}
                  y={item.y}
                  width={item.width}
                  height={item.height}
                  text={item.text}
                  align="center"
                  fontSize={10}
                  verticalAlign="middle"
                />
              );
            })}
            {yCoordinates.map((item, index) => {
              return (
                <Text
                  key={index}
                  x={item.x}
                  y={item.y}
                  width={item.width}
                  height={item.height}
                  text={item.text}
                  align="center"
                  verticalAlign="middle"
                />
              );
            })}
          </Layer>
          <Layer ref={constructionRef}></Layer>
          <Layer>
            {xLinesPoints.map((linePoints, index) => {
              return <Line key={index} points={linePoints} stroke="black" strokeWidth={1} />;
            })}
            {yLinesPoints.map((linePoints, index) => {
              return <Line key={index} points={linePoints} stroke="black" strokeWidth={1} />;
            })}
            {cartesianCoordinates.map((item, index) => {
              return (
                <Text
                  key={index}
                  x={item.x}
                  y={item.y}
                  width={item.width}
                  height={item.height}
                  text={item.text}
                  align="center"
                  verticalAlign="middle"
                  fontSize={6}
                  fill={invertColor}
                />
              );
            })}
          </Layer>
        </Stage>
      </Center>
    </Box>
  );
};

export default Construction;
