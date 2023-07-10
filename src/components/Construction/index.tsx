import { RIGHT_BAR_WIDTH } from "@/constants/designPage";
import { Box, Center, Button } from "@chakra-ui/react";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Konva from "konva";
import { useDispatch } from "react-redux";
import { Stage, Layer, Line, Rect, Text, Image } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import {
  COORDINATES_AREA_WIDTH,
  IMAGE_COVERAGE,
  DRAW_DELAY,
  PIXEL_RATIO,
} from "@/constants/construction";
import { findDistinctColor } from "@/utils/findDistinctColor";
import { changeConstructionPdfSrc } from "@/store/reducer/constructionSlice";
import {
  switchConstructionOpen,
  switchConstructionMounted,
} from "@/store/reducer/buttonToggleSlice";

interface Coordinates {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
}

const Construction = () => {
  const dispatch = useDispatch();
  const isConstructionOpen = useStoreSelector((state) => state.buttonToggle.isConstructionOpen);
  const pdfRef = useRef<Konva.Stage>(null);
  const imgSrc = useStoreSelector((state) => state.construction.constructionSrc);
  const constructionInfo = useStoreSelector((state) => state.construction.constructionInfo);
  const tiles = useStoreSelector((state) => state.tile.present.court);
  const tilesColor = useMemo(() => tiles.map((item) => item.color), []);
  const distinctColor = useMemo(() => {
    return findDistinctColor(tilesColor);
  }, []);

  const { beginPointX, beginPointY, endPointX, endPointY, tileSize } = constructionInfo;
  const constructionRatio = window.innerHeight / (endPointY - beginPointY);
  // calculate suitable font size for different design
  const coordinateFontSize = Math.floor(3 * constructionRatio);
  const constructionWidth = constructionRatio * (endPointX - beginPointX);
  const constructionHeight = constructionRatio * (endPointY - beginPointY);
  const canvasWidth =
    constructionWidth * IMAGE_COVERAGE +
    COORDINATES_AREA_WIDTH +
    tileSize * constructionRatio * IMAGE_COVERAGE;
  const canvasHeight =
    constructionHeight * IMAGE_COVERAGE +
    COORDINATES_AREA_WIDTH +
    tileSize * constructionRatio * IMAGE_COVERAGE;

  const [img, setImg] = useState(new window.Image());
  useEffect(() => {
    if (imgSrc) {
      const loadImg = new window.Image();
      loadImg.onload = () => {
        setImg(loadImg);
      };
      loadImg.src = imgSrc;
    }
  }, []);

  // prepare start and end points of lines along the x axis
  const xLineLength =
    Math.ceil(constructionHeight / (tileSize * constructionRatio) - 0.001) *
    (tileSize * constructionRatio) *
    IMAGE_COVERAGE;

  const xLinesPoints = useMemo(() => {
    return Array.from(
      { length: Math.ceil((endPointX - beginPointX) / tileSize) + 1 },
      (v, k) => k
    ).map((number) => {
      const x = number * tileSize * constructionRatio * IMAGE_COVERAGE + COORDINATES_AREA_WIDTH;
      return [x, COORDINATES_AREA_WIDTH, x, COORDINATES_AREA_WIDTH + xLineLength];
    });
  }, []);

  // prepare start and end points of lines along the y axis
  const yLineLength =
    Math.ceil(constructionWidth / (tileSize * constructionRatio) - 0.001) *
    (tileSize * constructionRatio) *
    IMAGE_COVERAGE;

  const yLinesPoints = useMemo(() => {
    return Array.from(
      { length: Math.ceil((endPointY - beginPointY) / tileSize) + 1 },
      (v, k) => k
    ).map((number) => {
      const y = number * tileSize * constructionRatio * IMAGE_COVERAGE + COORDINATES_AREA_WIDTH;
      return [COORDINATES_AREA_WIDTH, y, COORDINATES_AREA_WIDTH + yLineLength, y];
    });
  }, []);

  const xCoordinates = useMemo(() => {
    return xLinesPoints
      .map((item, index) => {
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
      })
      .slice(0, -1);
  }, []);

  const yCoordinates = useMemo(() => {
    return yLinesPoints
      .map((item, index) => {
        return {
          x: 0,
          y: item[1],
          width: COORDINATES_AREA_WIDTH,
          height: tileSize * constructionRatio * IMAGE_COVERAGE,
          text:
            String.fromCharCode(65 + Math.floor(index / 26)) +
            String.fromCharCode(65 + (index % 26)),
        };
      })
      .slice(0, -1);
  }, []);

  const getCartesianCoordinates = useCallback(
    (xCoordinates: Coordinates[], yCoordinates: Coordinates[]) => {
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
    },
    []
  );

  const cartesianCoordinates = useMemo(() => {
    return getCartesianCoordinates(xCoordinates, yCoordinates);
  }, []);

  // extract the position of original construction button
  const constructionButton = document.getElementById("constructionButton");
  const rect = constructionButton?.getBoundingClientRect();

  useEffect(() => {
    setTimeout(() => {
      if (pdfRef.current) {
        const constructionUrl = pdfRef.current.toDataURL({
          x: 0,
          y: 0,
          width: canvasWidth,
          height: canvasHeight,
          pixelRatio: PIXEL_RATIO,
        });
        dispatch(changeConstructionPdfSrc(constructionUrl));
      }
    }, DRAW_DELAY);
  }, []);

  const handleConstructionClose = useCallback(() => {
    dispatch(switchConstructionOpen(false));
    dispatch(switchConstructionMounted(false));
    dispatch(changeConstructionPdfSrc(null));
  }, []);

  return (
    <Box
      position="fixed"
      h="100vh"
      w="100vw"
      bottom="0"
      left="0"
      bg="blackAlpha.600"
      zIndex="5999"
      visibility={isConstructionOpen ? "visible" : "hidden"}
    >
      <Center h="100vh" w={`calc(100vw - ${RIGHT_BAR_WIDTH})`}>
        <Stage width={canvasWidth} height={canvasHeight} ref={pdfRef}>
          <Layer>
            <Rect x={0} y={0} width={canvasWidth} height={canvasHeight} fill="white" />
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
          <Layer>
            <Image
              x={COORDINATES_AREA_WIDTH}
              y={COORDINATES_AREA_WIDTH}
              image={img}
              width={(img.width * constructionRatio * IMAGE_COVERAGE) / PIXEL_RATIO}
              height={(img.height * constructionRatio * IMAGE_COVERAGE) / PIXEL_RATIO}
            />
          </Layer>
          <Layer>
            {xLinesPoints.map((linePoints, index) => {
              return (
                <Line
                  key={index}
                  points={linePoints}
                  stroke="#000000"
                  strokeWidth={1}
                  opacity={0.5}
                />
              );
            })}
            {yLinesPoints.map((linePoints, index) => {
              return (
                <Line
                  key={index}
                  points={linePoints}
                  stroke="#000000"
                  strokeWidth={1}
                  opacity={0.5}
                />
              );
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
                  fontSize={coordinateFontSize}
                  fill={distinctColor}
                />
              );
            })}
          </Layer>
        </Stage>
      </Center>
      {rect && (
        <Button
          variant="solid"
          w="160px"
          bg="black"
          color="white"
          onClick={handleConstructionClose}
          position="fixed"
          zIndex="5999"
          top={rect.top}
          left={rect.left}
        >
          Construction Off
        </Button>
      )}
    </Box>
  );
};

export default Construction;
