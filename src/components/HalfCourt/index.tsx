import { useLayoutEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider } from "react-redux";
import ThreePointArea from "../BasketballCourt/ThreePointArea";
import KeyArea from "../BasketballCourt/KeyArea";
import CourtArea from "../BasketballCourt/CourtArea";
import TopKeyArea from "../BasketballCourt/TopKeyArea";
import Border from "../BasketballCourt/Border";
import { getCourtAndTileInfo } from "@/utils/getCourtAndTileInfo";
import { useTileCalculation } from "@/hooks/useTileCalculation";
import Konva from "konva";
import { useStoreSelector } from "@/store/hooks";
import CourtDimension from "../BasketballCourt/CourtDimension";
import BorderDimension from "../BasketballCourt/BorderDimension";
import DashedLine from "../BasketballCourt/DashedLine";

const HalfCourt = () => {
  const { courtAreaXLength, courtAreaYLength, borderLength } = useStoreSelector(
    (state) => state.courtSize
  );
  const stageMargin = 2500;
  const startPoint = {
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
                  startPoint={startPoint}
                  borderLength={borderLength}
                  courtAreaXLength={courtAreaXLength}
                  courtAreaYLength={courtAreaYLength}
                />
                <CourtDimension startPoint={startPoint} borderLength={borderLength} />
                <BorderDimension startPoint={startPoint} borderLength={borderLength} />
                <DashedLine startPoint={startPoint} borderLength={borderLength} />
                <CourtArea startPoint={startPoint} courtWidth={courtAreaXLength} />
                <ThreePointArea startPoint={startPoint} />
                <KeyArea startPoint={startPoint} />
                <TopKeyArea startPoint={startPoint} />
              </Layer>
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </Flex>
  );
};

export default HalfCourt;
