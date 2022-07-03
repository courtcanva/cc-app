import { useState, useRef, useCallback, useLayoutEffect, useEffect } from "react";
import { Stage, Layer, Group } from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider } from "react-redux";
import ThreePointArea from "../BasketballCourt/ThreePointArea";
import KeyArea from "../BasketballCourt/KeyArea";
import CourtArea from "../BasketballCourt/CourtArea";
import CircleArea from "../BasketballCourt/CircleArea";
import TopKeyArea from "../BasketballCourt/TopKeyArea";
import Border from "../BasketballCourt/Border";
import courtRatio from "../../utils/courtRatio";
import CourtDimension from "../BasketballCourt/CourtDimension";
import { useStoreSelector } from "@/store/hooks";
import DashedLine from "../BasketballCourt/DashedLine";
import BorderDimension from "../BasketballCourt/BorderDimension";
import { calculation } from "@/utils/tileNumberCalculator";
import { useDispatch } from "react-redux";
import { changeTileQuantity } from "@/store/reducer/tileSlice";
import { getCourtAndTileInfo } from "@/utils/getCourtAndTileInfo";

const ProFullCourt = () => {
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
                {/* border only for pro full court size */}
                <Border
                  startPoint={startPoint}
                  borderLength={borderLength}
                  courtAreaXLength={courtAreaXLength}
                  courtAreaYLength={courtAreaYLength}
                />
                {/* arrowLine & dimensionText can be reuse for all courts*/}
                <CourtDimension startPoint={startPoint} />
                <BorderDimension startPoint={startPoint} />
                {/* left side of pro full court*/}
                <Group>
                  <DashedLine startPoint={startPoint} />
                  <CourtArea courtWidth={courtAreaXLength / 2} startPoint={startPoint} />
                  <ThreePointArea startPoint={startPoint} />
                  <KeyArea startPoint={startPoint} />
                  <CircleArea startPoint={startPoint} />
                  <TopKeyArea startPoint={startPoint} />
                </Group>
                {/* right side of pro full court(flip the left side)*/}
                <Group scaleX={-1} x={startPoint.X * 2 + courtAreaXLength}>
                  <DashedLine startPoint={startPoint} />
                  <CourtArea courtWidth={courtAreaXLength / 2} startPoint={startPoint} />
                  <ThreePointArea startPoint={startPoint} />
                  <KeyArea startPoint={startPoint} />
                  <CircleArea startPoint={startPoint} />
                  <TopKeyArea startPoint={startPoint} />
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
