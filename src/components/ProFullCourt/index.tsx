import { Stage, Layer, Group } from "react-konva";
import {
  Flex,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
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
import { useRef, useEffect, useState } from "react";
import canvasControlModel from "../../utils/canvasControlModel";
import useImageDataUrl from "@/hooks/useImageDataUrl";

const ProFullCourt = () => {
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

  const canvasControl = canvasControlModel(zoomShift);
  const canvasStates = canvasControl.canvasStates;

  useEffect(() => {
    ref.current.x(0);
    ref.current.y(0);
  }, [canvasStates.resetState]);

  useImageDataUrl(ref);
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };
  const [rotateDeg, setRotateDeg] = useState(1);

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
      flexDirection="column"
    >
      <style jsx>{`
        .scene {
          perspective: calc(var(--perspective, 2000) * 1px);
          transform-style: preserve-3d;
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .plane {
          
          height: calc(var(--plane-height, 25) * 1vmin);
          width: calc(var(--plane-width, 25) * 1vmin);
          perspective: calc(var(--perspective, 2000) * 1px);

          transform-style: preserve-3d;
          transform-origin: 55% 60%;
          transform: rotateX(calc(var(--rotate-x, -24) * 1deg)) rotateY(calc(${rotateDeg} * 1deg))
            rotateX(90deg) translate3d(0, 0, 0) translate(-450px, -200px) scale(0.8);
        }
        .hoop_left {
          background-image: url("./hoop.png");
          background-size: 150px 200px;
          height: 200px;
          width: 150px;
          transform-style: preserve-3d;
          transform-origin: 55% 60%;
          transform: rotateX(270deg) rotateY(90deg)
            rotateX(0deg) translate3d(0, 0, 0)  translateY(-80px) translateX(-510px) ;
        }
        .background{
          position:absolute;
          width:100vw;
          height:100vh;
          top:0px;
          left:0px;
          background-image: url("https://images.pexels.com/photos/5967934/pexels-photo-5967934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")
        }
      }
      `}</style>
      <Slider
        aria-label="slider-ex-6"
        onChange={(val) => setRotateDeg(val)}
        defaultValue={0}
        min={0}
        max={360}
        marginTop={"2rem"}
      >
        <SliderMark value={0} {...labelStyles}>
          0
        </SliderMark>
        <SliderMark value={180} {...labelStyles}>
          180
        </SliderMark>
        <SliderMark value={360} {...labelStyles}>
          360
        </SliderMark>
        <SliderMark
          value={rotateDeg}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-10"
          ml="-5"
          w="12"
        >
          {rotateDeg} deg
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <>
            <div className="background"></div>

            <div className="scene">
              <div className="plane">
                <div className="hoop_left"></div>
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
              </div>
            </div>
          </>
        )}
      </ReactReduxContext.Consumer>
    </Flex>
  );
};

export default ProFullCourt;
