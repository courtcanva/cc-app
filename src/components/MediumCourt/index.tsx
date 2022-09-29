import { Stage, Layer, Group, Line } from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider, useDispatch } from "react-redux";
import ThreePointArea from "../BasketballCourt/ThreePointArea";
import KeyArea from "../BasketballCourt/KeyArea";
import TopKeyArea from "../BasketballCourt/TopKeyArea";
import Border from "../BasketballCourt/Border";
import CourtDimension from "../BasketballCourt/CourtDimension";
import BorderDimension from "../BasketballCourt/BorderDimension";
import CourtArea from "../BasketballCourt/CourtArea";
import DashedLine from "../BasketballCourt/DashedLine";
import useCourt from "@/hooks/useCourt";
import { IZoomShift } from "@/interfaces/zoomShift";
import { useStoreSelector } from "@/store/hooks";
import { centerZoom } from "@/utils/zoomCenterCalculate";
import { dragState } from "@/store/reducer/dragControlSlice";

const MediumCourt = () => {
  const dispatch = useDispatch();
  const {
    courtAreaXLength,
    courtAreaYLength,
    borderLength,
    court,
    stageMargin,
    courtStartPoint,
    componentsStartPoint,
  } = useCourt();

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
                <Line
                  points={[2500, 2500, 12500, 2520, 12500, 9500, 2500, 9500]}
                  stroke="white"
                  strokeWidth={140}
                  visible
                  closed
                />
                <DashedLine startPoint={courtStartPoint} borderLength={borderLength} />
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

export default MediumCourt;
