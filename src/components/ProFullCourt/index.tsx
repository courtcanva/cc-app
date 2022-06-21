import { useEffect, useState } from "react";
import { Stage, Layer, Group } from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider } from "react-redux";
import ThreePointArea from "../BasketballCourt/ThreePointArea";
import KeyArea from "../BasketballCourt/KeyArea";
import CourtArea from "../BasketballCourt/CourtArea";
import CircleArea from "../BasketballCourt/CircleArea";
import TopKeyArea from "../BasketballCourt/TopKeyArea";
import Border from "../BasketballCourt/Border";
import BorderDimensionLine from "../BasketballCourt/BorderDimensionLine";
import ArrowLine from "../BasketballCourt/Arrow";
import { useStoreSelector } from "@/store/hooks";
import React from "react";

const ProFullCourt = () => {
  const { courtAreaXLength, courtAreaYLength } = useStoreSelector((state) => state.courtSize);
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const checkSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const stageMargin = 2500;
  const convaWidth = courtAreaXLength * 2 + stageMargin * 2; // actual court size plus reserved margin size (prepare for 2m border)
  const convaHeight = courtAreaYLength + stageMargin * 2;

  let stageHeight: number;
  size.height >= 768 ? (stageHeight = size.height - 250) : (stageHeight = 768 - 250);
  let stageWidth = stageHeight * (convaWidth / convaHeight);

  if ((size.height - 250) / (size.width - 118) > convaHeight / convaWidth) {
    size.width >= 768 ? (stageWidth = size.width - 118) : (stageWidth = 768 - 118);
    stageHeight = stageWidth * (convaHeight / convaWidth);
  }

  const courtRatio = stageHeight / (courtAreaYLength + stageMargin * 2);
  const startPoint = {
    X: stageWidth / 2 - courtAreaXLength * courtRatio,
    Y: stageHeight / 2 - (courtAreaYLength * courtRatio) / 2,
  };

  return (
    <Flex
      position="fixed"
      top="123px"
      left="98px"
      width="calc(100% - 98px)"
      height="calc(100% - 230px)"
      minWidth={stageWidth}
      minHeight={stageHeight}
      justifyContent="center"
      alignItems="center"
      margin="auto"
    >
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            id="basketball-court"
            height={stageHeight}
            width={stageWidth}
            visible={true}
            style={{ backgroundColor: "white" }}
          >
            <Provider store={store}>
              <Layer>
                {/* border only for pro full court size */}
                <Border courtRatio={courtRatio} startPoint={startPoint} />
                {/* arrowLine & dimensionText can be reuse for all courts*/}
                <ArrowLine
                  courtRatio={courtRatio}
                  arrowXEndLength={courtAreaXLength}
                  startPoint={startPoint}
                />
                {/* left side of pro full court*/}
                <Group>
                  <BorderDimensionLine courtRatio={courtRatio} startPoint={startPoint} />
                  <CourtArea courtRatio={courtRatio} startPoint={startPoint} />
                  <ThreePointArea courtRatio={courtRatio} startPoint={startPoint} />
                  <KeyArea courtRatio={courtRatio} startPoint={startPoint} />
                  <CircleArea courtRatio={courtRatio} startPoint={startPoint} />
                  <TopKeyArea courtRatio={courtRatio} startPoint={startPoint} />
                </Group>
                {/* right side of pro full court(flip the left side)*/}
                <Group scaleX={-1} x={startPoint.X * 2 + courtAreaXLength * 2 * courtRatio}>
                  <BorderDimensionLine courtRatio={courtRatio} startPoint={startPoint} />
                  <CourtArea courtRatio={courtRatio} startPoint={startPoint} />
                  <ThreePointArea courtRatio={courtRatio} startPoint={startPoint} />
                  <KeyArea courtRatio={courtRatio} startPoint={startPoint} />
                  <CircleArea courtRatio={courtRatio} startPoint={startPoint} />
                  <TopKeyArea courtRatio={courtRatio} startPoint={startPoint} />
                </Group>
              </Layer>
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </Flex>
  );
};

export default ProFullCourt;
