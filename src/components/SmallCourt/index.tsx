import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Stage, Layer, Group } from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider, useDispatch } from "react-redux";
import ThreePointArea from "../BasketballCourt/ThreePointArea";
import KeyArea from "../BasketballCourt/KeyArea";
import CourtArea from "../BasketballCourt/CourtArea";
import TopKeyArea from "../BasketballCourt/TopKeyArea";
import Border from "../BasketballCourt/Border";
import { useStoreSelector } from "@/store/hooks";
import { calculation } from "@/utils/tileNumberCalculator";
import { changeTileQuantity } from "@/store/reducer/tileSlice";
import { getCourtAndTileInfo } from "@/utils/getCourtAndTileInfo";
import { Line } from "react-konva";
import { courtWhiteLine } from "@/store/reducer/courtSizeSlice";

const SmallCourt = () => {
  const {
    courtAreaXLength,
    courtAreaYLength,
    threePointLineRadius,
    threePointLineToCourtEdgeLength,
    borderLength,
  } = useStoreSelector((state) => state.courtSize);
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
  const courtAndTileInfo = courtAndInfo.courtAndTileInfo;

  const canvasRef = useRef(null);

  const tileCalculation = useCallback(calculation, []);

  const tileColorState = useStoreSelector((state) => state.tile.court);

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

  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      const tileNumberResult = tileCalculation(canvasRef, courtAndTileInfo);
      dispatch(changeTileQuantity(tileNumberResult));
    }, 100);
    return () => clearTimeout(timer);
  }, [tileColorState]);

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
            visible={true}
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
                {/* create a line divide border and court  */}
                <Line
                  points={[2500, 2500, 11500, 2500, 11500, 7500, 2500, 7500]}
                  stroke="white"
                  strokeWidth={courtWhiteLine}
                  visible
                  closed
                />
              </Layer>
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </Flex>
  );
};

export default SmallCourt;
