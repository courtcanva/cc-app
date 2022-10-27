import { Stage, Layer, Group } from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider, useDispatch } from "react-redux";
import ThreePointArea from "../BasketballCourt/ThreePointArea";
import KeyArea from "../BasketballCourt/KeyArea";
import CourtArea from "../BasketballCourt/CourtArea";
import CircleArea from "../BasketballCourt/CircleArea";
import TopKeyArea from "../BasketballCourt/TopKeyArea";
import Border from "../BasketballCourt/Border";
import CourtDimension from "../BasketballCourt/CourtDimension";
import BorderDimension from "../BasketballCourt/BorderDimension";
import DashedLine from "../BasketballCourt/DashedLine";
import useCourt from "@/hooks/useCourt";
import { IZoomShift } from "@/interfaces/zoomShift";
import { useRef, useEffect, useState } from "react";
import canvasControlModel from "../../utils/canvasControlModel";
import useImageDataUrl from "@/hooks/useImageDataUrl";
import CustomiseWindow from "./CustomiseWindow";
import CustomiseCourtDimension from "./CustomiseCourtDimension";
import { setNewCourtAreaYLength, setNewCourtAreaXLength } from "@/store/reducer/courtSpecDataSlice";
import CustomiseBorder from "../BasketballCourt/CustomiseBorder";

const ProHalfCourt = () => {
  const dispatch = useDispatch();
  const { courtAreaXLength, courtAreaYLength, borderLength, court, courtStartPoint } = useCourt();
  const ref = useRef<any>(null);
  const [clipWidth, setClipWidth] = useState(0);
  const [clipLength, setClipLength] = useState(0);
  useEffect(() => {
    dispatch(setNewCourtAreaXLength(clipWidth * 1000));
    dispatch(setNewCourtAreaYLength(clipLength * 1000));
  }, [clipWidth, clipLength]);

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

  useImageDataUrl(ref);

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
                {clipLength * clipWidth !== 0 && (
                  <>
                    <CustomiseBorder
                      startPoint={courtStartPoint}
                      borderLength={borderLength}
                      customizeXLength={clipWidth}
                      customizeYLength={clipLength}
                      courtAreaYLength={courtAreaYLength}
                    />
                    <CustomiseCourtDimension
                      startPoint={courtStartPoint}
                      borderLength={borderLength}
                      inputX={clipWidth}
                      inputY={clipLength}
                    />
                  </>
                )}
                <Group
                  clipX={courtStartPoint.X}
                  clipY={courtStartPoint.Y + courtAreaYLength / 2 - (clipLength * 1000) / 2}
                  clipHeight={clipLength * 1000}
                  clipWidth={clipWidth * 1000}
                >
                  <Border
                    startPoint={courtStartPoint}
                    borderLength={borderLength}
                    courtAreaXLength={courtAreaXLength}
                    courtAreaYLength={courtAreaYLength}
                  />
                  <BorderDimension startPoint={courtStartPoint} borderLength={borderLength} />
                  <CourtDimension startPoint={courtStartPoint} borderLength={borderLength} />
                  <DashedLine startPoint={courtStartPoint} borderLength={borderLength} />
                  <Group scaleX={-1} x={courtStartPoint.X * 2 + courtAreaXLength}>
                    <DashedLine startPoint={courtStartPoint} borderLength={borderLength} />
                  </Group>
                  <CourtArea startPoint={courtStartPoint} courtWidth={courtAreaXLength} />
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
      <CustomiseWindow setInputWidth={setClipWidth} setInputLength={setClipLength} />
    </Flex>
  );
};

export default ProHalfCourt;
