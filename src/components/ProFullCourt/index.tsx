import { Stage, Layer, Group, Text } from "react-konva";
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
  const { initPointX, courtAreaXLength } = useStoreSelector((state) => state.courtSize);
  const courtRatio = 0.25; // (TBC)A flexible ratio based on stage size can adjust the whole court size easier.

  return (
    <>
      <Flex
        position="fixed"
        top="122px"
        left="98px"
        width="calc(100% - 98px)"
        height="calc(100% - 162px)"
        minWidth={850}
        minHeight={500}
        justifyContent="center"
        alignItems="center"
        margin="auto"
      >
        <ReactReduxContext.Consumer>
          {({ store }) => (
            <Stage
              id="basketball-court"
              width={850}
              height={500}
              visible={true}
              style={{ backgroundColor: "white" }}
            >
              <Provider store={store}>
                <Layer>
                  {/* border only for pro full court size */}
                  <Border courtRatio={courtRatio} />
                  {/* arrowLine & dimensionText can be reuse for all courts*/}
                  <ArrowLine courtRatio={courtRatio} arrowXEndLength={courtAreaXLength} />
                  {/* left side of pro full court*/}
                  <Group>
                    <BorderDimensionLine courtRatio={courtRatio} />
                    <CourtArea courtRatio={courtRatio} />
                    <ThreePointArea courtRatio={courtRatio} />
                    <KeyArea courtRatio={courtRatio} />
                    <CircleArea courtRatio={courtRatio} />
                    <TopKeyArea courtRatio={courtRatio} />
                  </Group>
                  {/* right side of pro full court(flip the left side)*/}
                  <Group scaleX={-1} x={initPointX * 2 + courtAreaXLength * 2 * courtRatio}>
                    <BorderDimensionLine courtRatio={courtRatio} />
                    <CourtArea courtRatio={courtRatio} />
                    <ThreePointArea courtRatio={courtRatio} />
                    <KeyArea courtRatio={courtRatio} />
                    <CircleArea courtRatio={courtRatio} />
                    <TopKeyArea courtRatio={courtRatio} />
                  </Group>
                </Layer>
              </Provider>
            </Stage>
          )}
        </ReactReduxContext.Consumer>
      </Flex>
    </>
  );
};

export default ProFullCourt;
