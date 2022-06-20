import { Stage, Layer, Group } from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider } from "react-redux";
import ThreePointArea from "../BasketballCourt/ThreePointArea";
import KeyArea from "../BasketballCourt/KeyArea";
import CourtArea from "../BasketballCourt/CourtArea";
import CircleArea from "../BasketballCourt/CircleArea";
import TopKeyArea from "../BasketballCourt/TopKeyArea";
import Border from "../BasketballCourt/Border";
import BorderDimensionLine from "../BasketballCourt/BorderDimensionLine";
import ArrowLine from "../BasketballCourt/Arrow";
import { useStoreSelector } from "@/store/hooks";

const ProFullCourt = () => {
  const { courtAreaXLength, courtAreaYLength } = useStoreSelector((state) => state.courtSize);

  const stageMargin = 2500;
  const convaWidth = courtAreaXLength * 2 + stageMargin * 2;
  const convaHeight = courtAreaYLength + stageMargin * 2;

  let stageHeight = window.innerHeight - 250;
  let stageWidth = stageHeight * (convaWidth / convaHeight);

  if ((window.innerHeight - 250) / (window.innerWidth - 118) > convaHeight / convaWidth) {
    stageWidth = window.innerWidth - 118;
    stageHeight = stageWidth * (convaHeight / convaWidth);
  }
  const courtRatio = stageHeight / (courtAreaYLength + stageMargin * 2);
  const initPointX = stageWidth / 2 - courtAreaXLength * courtRatio;
  const initPointY = stageHeight / 2 - (courtAreaYLength * courtRatio) / 2;

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
            visible={true}
            style={{ backgroundColor: "white" }}
          >
            <Provider store={store}>
              <Layer>
                {/* border only for pro full court size */}
                <Border courtRatio={courtRatio} initPointX={initPointX} initPointY={initPointY} />
                {/* arrowLine & dimensionText can be reuse for all courts*/}
                <ArrowLine
                  courtRatio={courtRatio}
                  arrowXEndLength={courtAreaXLength}
                  initPointX={initPointX}
                  initPointY={initPointY}
                />
                {/* left side of pro full court*/}
                <Group>
                  <BorderDimensionLine
                    courtRatio={courtRatio}
                    initPointX={initPointX}
                    initPointY={initPointY}
                  />
                  <CourtArea
                    courtRatio={courtRatio}
                    initPointX={initPointX}
                    initPointY={initPointY}
                  />
                  <ThreePointArea
                    courtRatio={courtRatio}
                    initPointX={initPointX}
                    initPointY={initPointY}
                  />
                  <KeyArea
                    courtRatio={courtRatio}
                    initPointX={initPointX}
                    initPointY={initPointY}
                  />
                  <CircleArea
                    courtRatio={courtRatio}
                    initPointX={initPointX}
                    initPointY={initPointY}
                  />
                  <TopKeyArea
                    courtRatio={courtRatio}
                    initPointX={initPointX}
                    initPointY={initPointY}
                  />
                </Group>
                {/* right side of pro full court(flip the left side)*/}
                <Group scaleX={-1} x={initPointX * 2 + courtAreaXLength * 2 * courtRatio}>
                  <BorderDimensionLine
                    courtRatio={courtRatio}
                    initPointX={initPointX}
                    initPointY={initPointY}
                  />
                  <CourtArea
                    courtRatio={courtRatio}
                    initPointX={initPointX}
                    initPointY={initPointY}
                  />
                  <ThreePointArea
                    courtRatio={courtRatio}
                    initPointX={initPointX}
                    initPointY={initPointY}
                  />
                  <KeyArea
                    courtRatio={courtRatio}
                    initPointX={initPointX}
                    initPointY={initPointY}
                  />
                  <CircleArea
                    courtRatio={courtRatio}
                    initPointX={initPointX}
                    initPointY={initPointY}
                  />
                  <TopKeyArea
                    courtRatio={courtRatio}
                    initPointX={initPointX}
                    initPointY={initPointY}
                  />
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
