import { Stage, Layer, Group } from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider } from "react-redux";
import ThreePointArea from "../BasketballCourt/ThreePointArea";
import KeyArea from "../BasketballCourt/KeyArea";
import CourtArea from "../BasketballCourt/CourtArea";
import TopKeyArea from "../BasketballCourt/TopKeyArea";
import Border from "../BasketballCourt/Border";
import CourtDimension from "../BasketballCourt/CourtDimension";
import BorderDimension from "../BasketballCourt/BorderDimension";
import DashedLine from "../BasketballCourt/DashedLine";
import useCourt from "@/hooks/useCourt";
import { IZoomShift } from "@/interfaces/zoomShift";
import { useRef, useEffect } from "react";
import canvasControlModel from "../../utils/canvasControlModel";
import useImageDataUrl from "@/hooks/useImageDataUrl";
import ThreeDimensionalToggle from "../ThreeDimensionalCourt";
import { useTileCalculation } from "@/hooks/useTileCalculation";
import { useConstruction } from "@/hooks/useConstruction";
import { RIGHT_BAR_WIDTH } from "@/constants/designPage";

const HalfCourt = () => {
  const {
    courtAreaXLength,
    courtAreaYLength,
    borderLength,
    court,
    courtStartPoint,
    courtAndTileInfo,
  } = useCourt();
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

  const canvasContorl = canvasControlModel(zoomShift);
  const canvasStates = canvasContorl.canvasStates;

  useEffect(() => {
    stageRef.current.x(0);
    stageRef.current.y(0);
  }, [canvasContorl.canvasStates.resetState]);

  useImageDataUrl(stageRef);
  useTileCalculation(layerRef);
  useConstruction(layerRef, courtAndTileInfo);

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
                x={!canvasStates.dragStart ? canvasContorl.xShift : 0}
                y={!canvasStates.dragStart ? canvasContorl.yShift : 0}
                style={{ backgroundColor: "white" }}
                onDragStart={canvasContorl.handleMouseDragStart}
                onDragEnd={canvasContorl.handleCursorChange}
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
                    <DashedLine startPoint={courtStartPoint} borderLength={borderLength} />
                    <Group scaleX={-1} x={courtStartPoint.X * 2 + courtAreaXLength}>
                      <DashedLine startPoint={courtStartPoint} borderLength={borderLength} />
                    </Group>
                    <CourtArea startPoint={courtStartPoint} courtWidth={courtAreaXLength} />
                    <ThreePointArea startPoint={courtStartPoint} />
                    <KeyArea startPoint={courtStartPoint} />
                    <TopKeyArea startPoint={courtStartPoint} />
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

export default HalfCourt;
