import { useLayoutEffect, useState } from "react";
import { Stage, Layer, Group } from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider } from "react-redux";
import ThreePointArea from "../BasketballCourt/ThreePointArea";
import KeyArea from "../BasketballCourt/KeyArea";
import TopKeyArea from "../BasketballCourt/TopKeyArea";
import Border from "../BasketballCourt/Border";
import { getCourtAndTileInfo } from "@/utils/getCourtAndTileInfo";
import { Line } from "react-konva";
import { courtWhiteLine } from "@/store/reducer/courtSizeSlice";
import { useStoreSelector } from "@/store/hooks";
import { useTileCount } from "../../hooks/useTileCount";
import CourtArea from "../BasketballCourt/CourtArea";
import CourtDimension from "../BasketballCourt/CourtDimension";
import BorderDimension from "../BasketballCourt/BorderDimension";
import DashedLine from "../BasketballCourt/DashedLine";

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

  useTileCount();

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
