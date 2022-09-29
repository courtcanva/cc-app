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
import { useStoreSelector } from "@/store/hooks";
import { centerZoom } from "@/utils/zoomCenterCalculate";
import { useRef } from "react";

const HalfCourt = () => {
  const { courtAreaXLength, courtAreaYLength, borderLength, court, courtStartPoint } = useCourt();

  const zoomScale = useStoreSelector((state) => state.zoomControl.zoomScale);
  const { selectedColor } = useStoreSelector((state) => state.courtColor);
  const dragPos = useRef({ x: 0, y: 0 });
  const stageRef = useRef<any>(null);

  const zoomShift: IZoomShift = {
    courtXLen: courtAreaXLength,
    courtYLen: courtAreaYLength,
    startPoint: {
      X: courtStartPoint.X,
      Y: courtStartPoint.Y,
    },
    dragPos: {
      X: dragPos.current.x,
      Y: dragPos.current.y,
    },
    oriRatio: court.courtRatio,
    zoomRatio: zoomScale,
  };

  const { xShift, yShift } = centerZoom(zoomShift);
  const handlePosition = () => {
    dragPos.current = { x: stageRef.current.x(), y: stageRef.current.y() };
    document.body.style.cursor = `auto`;
  };

  const handleMouseDragStart = () => {
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
            x={xShift}
            y={yShift}
            ref={stageRef}
            visible
            style={{ backgroundColor: "white" }}
            data-testid="stage"
            draggable={zoomScale > 1 && selectedColor === "none" ? true : false}
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
