import { Stage, Layer, Group } from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider, useDispatch } from "react-redux";
import ThreePointArea from "../BasketballCourt/ThreePointArea";
import KeyArea from "../BasketballCourt/KeyArea";
import TopKeyArea from "../BasketballCourt/TopKeyArea";
import Border from "../BasketballCourt/Border";
import { Line } from "react-konva";
import CourtArea from "../BasketballCourt/CourtArea";
import CourtDimension from "../BasketballCourt/CourtDimension";
import BorderDimension from "../BasketballCourt/BorderDimension";
import DashedLine from "../BasketballCourt/DashedLine";
import useCourt from "@/hooks/useCourt";
import { IZoomShift } from "@/interfaces/zoomShift";
import { useRef, useEffect } from "react";
import canvasControlModel from "../../utils/canvasControlModel";

const SmallCourt = () => {
  const {
    courtAreaXLength,
    courtAreaYLength,
    borderLength,
    court,
    stageMargin,
    courtStartPoint,
    componentsStartPoint,
  } = useCourt();
  const ref = useRef<any>(null);

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
    ref.current.x(0);
    ref.current.y(0);
  }, [canvasStates.resetState]);

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
            ref={ref}
            draggable={canvasStates.dragActivate && canvasStates.selectedColor === "none"}
            visible
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
                <DashedLine startPoint={courtStartPoint} borderLength={borderLength} />
                <Line
                  points={[2500, 2500, 11500, 2500, 11500, 7500, 2500, 7500]}
                  stroke="white"
                  strokeWidth={140}
                  visible
                  closed
                />
                <Group scaleX={-1} x={courtStartPoint.X * 2 + courtAreaXLength}>
                  <DashedLine startPoint={courtStartPoint} borderLength={borderLength} />
                </Group>
                <Group
                  clipFunc={(ctx: any) => {
                    ctx.beginPath();
                    ctx.rect(stageMargin, stageMargin, courtAreaXLength, courtAreaYLength);
                    ctx.clip();
                  }}
                >
                  <CourtArea startPoint={componentsStartPoint} courtWidth={courtAreaXLength} />
                  <ThreePointArea startPoint={componentsStartPoint} />
                  <KeyArea startPoint={componentsStartPoint} />
                  <TopKeyArea startPoint={componentsStartPoint} />
                </Group>
              </Layer>
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </Flex>
  );
};

export default SmallCourt;
