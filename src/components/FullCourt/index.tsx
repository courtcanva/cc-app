import { useEffect, useLayoutEffect, useState } from "react";
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
import FullCourtData from "../MockCourtData/FullCourtData";
import CourtDimension from "../BasketballCourt/CourtDimension";

const FullCourt = () => {
  const { courtAreaXLength, courtAreaYLength, borderLength } = FullCourtData;
  const stageMargin = 2500;
  const startPoint = {
    X: stageMargin,
    Y: stageMargin,
  };

  const [court, setCourt] = useState({
    stageWidth: 0,
    stageHeight: 0,
    courtRatio: 0,
  });

  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

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

  useEffect(() => {
    const courtData = {
      courtAreaX: courtAreaXLength,
      courtAreaY: courtAreaYLength,
      margin: stageMargin,
      windowHeight: size.height,
      windowWidth: size.width,
    };
    setCourt(courtRatio(courtData));
  }, [size]);

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
              <Layer>
                <Border
                  startPoint={startPoint}
                  borderLength={borderLength}
                  courtAreaXLength={courtAreaXLength}
                  courtAreaYLength={courtAreaYLength}
                />
                <CourtDimension startPoint={startPoint} />
                <Group>
                  <CourtArea startPoint={startPoint} courtWidth={courtAreaXLength / 2} />
                  <ThreePointArea startPoint={startPoint} />
                  <KeyArea startPoint={startPoint} />
                  <CircleArea startPoint={startPoint} />
                  <TopKeyArea startPoint={startPoint} />
                </Group>
                <Group scaleX={-1} x={startPoint.X * 2 + courtAreaXLength}>
                  <CourtArea startPoint={startPoint} courtWidth={courtAreaXLength / 2} />
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

export default FullCourt;
