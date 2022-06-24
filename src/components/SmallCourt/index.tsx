import { useContext, useEffect, useState } from "react";
import { Stage, Layer, Group } from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider } from "react-redux";
import ThreePointArea from "../BasketballCourt/ThreePointArea";
import KeyArea from "../BasketballCourt/KeyArea";
import CourtArea from "../BasketballCourt/CourtArea";
import TopKeyArea from "../BasketballCourt/TopKeyArea";
import { useStoreSelector } from "@/store/hooks";
import { STAGE_MARGIN, START_POINT } from "@/constants/courtSize";

const SmallCourt = () => {
  const { courtAreaXLength, courtAreaYLength } = useStoreSelector((state) => state.courtSize);
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const startPoint = useContext(START_POINT);

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

  const convasWidth = courtAreaXLength + STAGE_MARGIN * 2; // actual court size plus reserved margin size (prepare for 2m border)
  const convasHeight = courtAreaYLength + STAGE_MARGIN * 2;

  let stageHeight: number;
  size.height >= 768 ? (stageHeight = size.height - 250) : (stageHeight = 768 - 250);
  let stageWidth = stageHeight * (convasWidth / convasHeight);

  if ((size.height - 250) / (size.width - 118) > convasHeight / convasWidth) {
    size.width >= 768 ? (stageWidth = size.width - 118) : (stageWidth = 768 - 118);
    stageHeight = stageWidth * (convasHeight / convasWidth);
  }

  const courtRatio = stageHeight / (courtAreaYLength + STAGE_MARGIN * 2);
  const courtWidth = courtAreaXLength / 2.8;
  const SmallCourtDefaultScale = courtRatio * 2;
  console.log(courtRatio);
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
            scaleX={SmallCourtDefaultScale}
            scaleY={SmallCourtDefaultScale}
            visible={true}
            style={{ backgroundColor: "white" }}
            data-testid="stage"
          >
            <Provider store={store}>
              <Layer>
                <Group
                  x={startPoint.X / 7.5}
                  y={-startPoint.Y * 2}
                  clipFunc={(ctx: any) => {
                    ctx.beginPath();
                    ctx.rect(0, 7500, 20000, 5000);
                    ctx.clip();
                  }}
                >
                  <CourtArea courtWidth={courtWidth} />
                  <ThreePointArea />
                  <KeyArea />
                  {/* <CircleArea /> */}
                  <TopKeyArea />
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
