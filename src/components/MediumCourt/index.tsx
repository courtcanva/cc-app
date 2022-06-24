import { useEffect, useState } from "react";
import { Stage, Layer, Group } from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider } from "react-redux";
import ThreePointArea from "../BasketballCourt/ThreePointArea";
import KeyArea from "../BasketballCourt/KeyArea";
import CourtArea from "../BasketballCourt/CourtArea";
import TopKeyArea from "../BasketballCourt/TopKeyArea";
import { useStoreSelector } from "@/store/hooks";

const MediumCourt = () => {
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
  const courtWidth = courtAreaXLength / 2.8;
  const mediumCourtDefaultScale = courtRatio * 2;
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
            // scaleX={mediumCourtDefaultScale}
            // scaleY={mediumCourtDefaultScale}
            visible={true}
            style={{ backgroundColor: "white" }}
            data-testid="stage"
          >
            <Provider store={store}>
              <Layer>
                <Group
                  scaleX={mediumCourtDefaultScale}
                  scaleY={mediumCourtDefaultScale}
                  x={startPoint.X / 40}
                  y={-startPoint.Y / 7.5}
                  // scaleX={courtRatio*60} scaleY={courtRatio*60} y={-startPoint.Y*courtRatio*100}
                  clipFunc={(ctx: any) => {
                    ctx.beginPath();
                    ctx.rect(0, 6500, 20000, 7000);
                    ctx.clip();
                  }}
                >
                  {/* <Group x={startPoint.X} y={startPoint.Y * mediumScale - startPoint.Y } clipFunc={(ctx) => {
                  ctx.beginPath()
                  ctx.rect(0, 6500, 20000, 7000)
                  ctx.clip()
                }}> */}
                  <CourtArea courtWidth={courtWidth} startPoint={startPoint} />
                  <ThreePointArea startPoint={startPoint} />
                  <KeyArea startPoint={startPoint} />
                  {/* <CircleArea /> */}
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

export default MediumCourt;
