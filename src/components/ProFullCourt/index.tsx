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
import DashedLine from "../BasketballCourt/DashedLine";
import BorderDimension from "../BasketballCourt/BorderDimension";
import useCourt from "@/hooks/useCourt";
import { useStoreSelector } from "@/store/hooks";
import { IZoomShift } from "@/interfaces/zoomShift";
import { centerZoom } from "@/utils/zoomCenterCalculate";
import { dragState } from "@/store/reducer/dragControlSlice";

const ProFullCourt = () => {
  const dispatch = useDispatch();
  const { courtAreaXLength, courtAreaYLength, borderLength, court, courtStartPoint } = useCourt();
  const zoomScale = useStoreSelector((state) => state.zoomControl.zoomScale);
  const { selectedColor } = useStoreSelector((state) => state.courtColor);
  const { dragActivate, dragStart } = useStoreSelector((state) => state.dragControl);

  const zoomShift: IZoomShift = {
    courtXLen: courtAreaXLength,
    courtYLen: courtAreaYLength,
    startPoint: {
      X: courtStartPoint.X,
      Y: courtStartPoint.Y,
    },
    oriRatio: court.courtRatio,
    zoomRatio: zoomScale,
  };

  const { xShift, yShift } = centerZoom(zoomShift);

  const handlePosition = () => {
    document.body.style.cursor = `auto`;
  };

  const handleMouseDragStart = () => {
    dispatch(dragState(true));
    document.body.style.cursor = "pointer";
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
            scaleX={court.courtRatio * zoomScale}
            scaleY={court.courtRatio * zoomScale}
            x={!dragStart ? xShift : 0}
            y={!dragStart ? yShift : 0}
            visible
            style={{ backgroundColor: "white" }}
            data-testid="stage"
            draggable={dragActivate && selectedColor === "none" ? true : false}
            onDragStart={handleMouseDragStart}
            onDragEnd={handlePosition}
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
