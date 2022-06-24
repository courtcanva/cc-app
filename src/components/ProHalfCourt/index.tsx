import { useEffect, useState } from "react";
import { Stage, Layer, Group } from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider } from "react-redux";
import ThreePointArea from "../BasketballCourt/ThreePointArea";
import KeyArea from "../BasketballCourt/KeyArea";
import CourtArea from "../BasketballCourt/CourtArea";
import CircleArea from "../BasketballCourt/CircleArea";
import TopKeyArea from "../BasketballCourt/TopKeyArea";
import { useStoreSelector } from "@/store/hooks";

const ProHalfCourt = () => {
  const { courtAreaXLength, courtAreaYLength } = useStoreSelector((state) => state.courtSize);
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const stageMargin = 500;
  const startPoint = {
    X: stageMargin,
    Y: stageMargin,
  };

  useEffect(() => {
    const checkSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const convasWidth = courtAreaXLength + stageMargin * 2; // actual court size plus reserved margin size (prepare for 2m border)
  const convasHeight = courtAreaYLength + stageMargin * 2;

  let stageHeight: number;
  size.height >= 768 ? (stageHeight = size.height - 250) : (stageHeight = 768 - 250);
  let stageWidth = stageHeight * (convasWidth / convasHeight);

  if ((size.height - 250) / (size.width - 118) > convasHeight / convasWidth) {
    size.width >= 768 ? (stageWidth = size.width - 118) : (stageWidth = 768 - 118);
    stageHeight = stageWidth * (convasHeight / convasWidth);
  }

  const courtRatio = stageHeight / (courtAreaYLength + stageMargin * 2);

  return (
    <Flex
      position="fixed"
      top="123px"
      left="98px"
      width="calc(100% - 98px)"
      height="calc(100% - 230px)"
      minWidth={stageWidth}
      minHeight={stageHeight}
      justifyContent="center"
      alignItems="center"
      margin="auto"
    >
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            id="basketball-court"
            height={stageHeight}
            width={stageWidth}
            scaleX={courtRatio}
            scaleY={courtRatio}
            visible={true}
            style={{ backgroundColor: "white" }}
            data-testid="stage"
          >
            <Provider store={store}>
              <Layer>
                <Group x={7000}>
                  <CourtArea courtWidth={courtAreaXLength / 2} startPoint={startPoint} />
                  <ThreePointArea startPoint={startPoint} />
                  <KeyArea startPoint={startPoint} />
                  <CircleArea startPoint={startPoint} />
                  <TopKeyArea startPoint={startPoint} />
                </Group>
                {/* <Group scaleX={-1} x={startPoint.X * 2 + courtAreaXLength}>
                  <CourtArea courtWidth={courtAreaXLength / 2} />
                  <ThreePointArea />
                  <KeyArea />
                  <CircleArea />
                  <TopKeyArea />
                </Group> */}
              </Layer>
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </Flex>
  );
};

export default ProHalfCourt;
