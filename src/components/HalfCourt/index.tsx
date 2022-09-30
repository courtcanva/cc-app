import { Stage, Layer, Group } from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider, useDispatch } from "react-redux";
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

const HalfCourt = () => {
  const dispatch = useDispatch();
  const { courtAreaXLength, courtAreaYLength, borderLength, court, courtStartPoint } = useCourt();
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

  const canvasContorl = canvasControlModel(zoomShift);
  const canvasStates = canvasContorl.canvasStates;

  useEffect(() => {
    ref.current.x(0);
    ref.current.y(0);
  }, [canvasContorl.canvasStates.resetState]);

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
            x={!canvasStates.dragStart ? canvasContorl.xShift : 0}
            y={!canvasStates.dragStart ? canvasContorl.yShift : 0}
            style={{ backgroundColor: "white" }}
            onDragStart={canvasContorl.handleMouseDragStart}
            onDragEnd={canvasContorl.handleCursorChange}
            ref={ref}
            draggable={
              canvasStates.dragActivate && canvasStates.selectedColor === "none" ? true : false
            }
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
        )}
      </ReactReduxContext.Consumer>
    </Flex>
  );
};

export default HalfCourt;
