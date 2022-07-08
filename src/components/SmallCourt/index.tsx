import { useLayoutEffect, useRef, useState } from "react";
import { Stage, Layer, Group } from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider } from "react-redux";
import ThreePointArea from "../BasketballCourt/ThreePointArea";
import KeyArea from "../BasketballCourt/KeyArea";
import CourtArea from "../BasketballCourt/CourtArea";
import TopKeyArea from "../BasketballCourt/TopKeyArea";
import SmallCourtData from "../MockCourtData/SmallCourtData";
import Border from "../BasketballCourt/Border";
import { getCourtAndTileInfo } from "@/utils/getCourtAndTileInfo";
import { useTileCalculation } from "@/hooks/useTileCalculation";
import Konva from "konva";

const SmallCourt = () => {
  const {
    courtAreaXLength,
    courtAreaYLength,
    threePointLineRadius,
    threePointLineToCourtEdgeLength,
    borderLength,
  } = SmallCourtData;
  const stageMargin = 2500;
  // componentsStartPoint is different court area start point
  const componentsStartPoint = {
    X: stageMargin,
    Y:
      -(
        (threePointLineRadius + threePointLineToCourtEdgeLength) * 2 -
        (courtAreaYLength + stageMargin * 2)
      ) / 2,
  };
  const courtStartPoint = {
    X: stageMargin,
    Y: stageMargin,
  };

  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const courtAndInfo = getCourtAndTileInfo(
    courtAreaXLength,
    courtAreaYLength,
    borderLength,
    stageMargin,
    size
  );
  const court = courtAndInfo.court;
  // https://github.com/konvajs/react-konva/issues/316
  const canvasRef = useRef<Konva.Layer>(null);

  useTileCalculation(courtAndInfo, canvasRef);

  useLayoutEffect(() => {
    const checkSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

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
          >
            <Provider store={store}>
              <Layer ref={canvasRef}>
                <Border
                  startPoint={courtStartPoint}
                  borderLength={borderLength}
                  courtAreaXLength={courtAreaXLength}
                  courtAreaYLength={courtAreaYLength}
                />
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
