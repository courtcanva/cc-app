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
import { IZoomShift } from "@/interfaces/zoomShift";
import { useRef, useEffect } from "react";
import canvasControlModel from "../../utils/canvasControlModel";
import useImageDataUrl from "@/hooks/useImageDataUrl";
import { useTileCalculation } from "@/hooks/useTileCalculation";
import ThreeDimensionalToggle from "@/components/ThreeDimensionalCourt";
import { RIGHT_BAR_WIDTH } from "@/constants/designPage";
import CircleAreaWithBadge from "../BasketballCourt/CircleAreaWithBadge";

const ProFullCourt = () => {
  const { courtAreaXLength, courtAreaYLength, borderLength, court, courtStartPoint } = useCourt();
  const stageRef = useRef<any>(null);
  const layerRef = useRef<any>(null);

  const zoomShift: IZoomShift = {
    courtXLen: courtAreaXLength,
    courtYLen: courtAreaYLength,
    startPoint: {
      X: courtStartPoint.X,
      Y: courtStartPoint.Y,
    },
    oriRatio: court.courtRatio,
  };

  const canvasControl = canvasControlModel(zoomShift);
  const canvasStates = canvasControl.canvasStates;

  useEffect(() => {
    stageRef.current.x(0);
    stageRef.current.y(0);
  }, [canvasStates.resetState]);

  useImageDataUrl(stageRef);
  useTileCalculation(layerRef);

  return (
    <Flex
      position="fixed"
      top="123px"
      left="98px"
      width={`calc(100% - 98px - ${RIGHT_BAR_WIDTH})`}
      height="calc(100% - 230px)"
      minWidth={court.stageWidth}
      minHeight={court.stageHeight}
      justifyContent="center"
      alignItems="center"
      margin="auto"
    >
      <Flex flexDirection="row-reverse">
        <ReactReduxContext.Consumer>
          {({ store }) => (
            <ThreeDimensionalToggle width={court.stageWidth} height={court.stageHeight}>
              <Stage
                id="basketball-court"
                data-testid="stage"
                height={court.stageHeight}
                width={court.stageWidth}
                scaleX={court.courtRatio * canvasStates.zoomScale}
                scaleY={court.courtRatio * canvasStates.zoomScale}
                x={!canvasStates.dragStart ? canvasControl.xShift : 0}
                y={!canvasStates.dragStart ? canvasControl.yShift : 0}
                style={{ backgroundColor: "white" }}
                onDragStart={canvasControl.handleMouseDragStart}
                onDragEnd={canvasControl.handleCursorChange}
                ref={stageRef}
                draggable={canvasStates.dragActivate && canvasStates.selectedColor === "none"}
                visible
              >
                <Provider store={store}>
                  <Layer ref={layerRef}>
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
                  <Layer>
                    <CircleAreaWithBadge startPoint={courtStartPoint} />
                  </Layer>
                </Provider>
              </Stage>
            </ThreeDimensionalToggle>
          )}
        </ReactReduxContext.Consumer>
      </Flex>
    </Flex>
  );
};

export default ProFullCourt;
