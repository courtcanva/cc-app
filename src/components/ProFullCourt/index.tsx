import { Stage, Layer, Group } from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider } from "react-redux";
import ThreePointArea from "../BasketballCourt/ThreePointArea";
import KeyArea from "../BasketballCourt/KeyArea";
import CourtArea from "../BasketballCourt/CourtArea";
import CircleArea from "../BasketballCourt/CircleArea";
import TopKeyArea from "../BasketballCourt/TopKeyArea";
import Border from "../BasketballCourt/Border";
import CourtDimension from "../BasketballCourt/CourtDimension";
import DashedLine from "../BasketballCourt/DashedLine";
import BorderDimension from "../BasketballCourt/BorderDimension";
import useCourt from "@/hooks/useCourt";
import { useStoreSelector } from "@/store/hooks";
import { useState } from "react";

const ProFullCourt = () => {
  const { courtAreaXLength, courtAreaYLength, borderLength, court, courtStartPoint } = useCourt();
  const { selectedColor } = useStoreSelector((state) => state.courtColor);
  const handleMouseDragStart = () => {
    document.body.style.cursor = "pointer";
  };
  const handleMouseDragEnd = () => {
    document.body.style.cursor = `auto`;
  };

  return (
    <Flex
      position="fixed"
      top="123px"
      left="98px"
      width="calc(100% - 98px)"
      height="calc(100% - 230px)"
      minWidth={court.stageWidth}
      minHeight={court.stageHeight}
      justifyContent="center"
      alignItems="center"
      margin="auto"
    >
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            id="basketball-court"
            height={court.stageHeight}
            width={court.stageWidth}
            scaleX={court.courtRatio}
            scaleY={court.courtRatio}
            visible
            style={{ backgroundColor: "white" }}
            data-testid="stage"
            draggable={selectedColor === "none" ? true : false}
            onDragEnd={handleMouseDragEnd}
            onDragStart={handleMouseDragStart}
          >
            <Provider store={store}>
              <Layer>
                <Border
                  startPoint={courtStartPoint}
                  borderLength={borderLength}
                  courtAreaXLength={courtAreaXLength}
                  courtAreaYLength={courtAreaYLength}
                />
                <CourtDimension startPoint={courtStartPoint} borderLength={borderLength} />
                <BorderDimension startPoint={courtStartPoint} borderLength={borderLength} />
                <Group>
                  <DashedLine startPoint={courtStartPoint} borderLength={borderLength} />
                  <CourtArea courtWidth={courtAreaXLength / 2} startPoint={courtStartPoint} />
                  <ThreePointArea startPoint={courtStartPoint} />
                  <KeyArea startPoint={courtStartPoint} />
                  <CircleArea startPoint={courtStartPoint} />
                  <TopKeyArea startPoint={courtStartPoint} />
                </Group>
                <Group scaleX={-1} x={courtStartPoint.X * 2 + courtAreaXLength}>
                  <DashedLine startPoint={courtStartPoint} borderLength={borderLength} />
                  <CourtArea courtWidth={courtAreaXLength / 2} startPoint={courtStartPoint} />
                  <ThreePointArea startPoint={courtStartPoint} />
                  <KeyArea startPoint={courtStartPoint} />
                  <CircleArea startPoint={courtStartPoint} />
                  <TopKeyArea startPoint={courtStartPoint} />
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
