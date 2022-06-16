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
  const { initPointX, courtAreaXLength, courtAreaYLength, borderLength } = useStoreSelector((state) => state.courtSize);
  const courtRatio = 0.25; // (TBC)A flexible ratio based on stage size can adjust the whole court size easier.
  const proFullCourtXLength = (courtAreaXLength + borderLength) * 2 / 100;
  const proFullCourtYLength = (courtAreaYLength + borderLength * 2) / 100;

  return (
    <Flex
      position="fixed"
      top="122px"
      left="98px"
      width="calc(100% - 98px)"
      height="calc(100% - 162px)"
      minWidth={850}
      minHeight={600}
      justifyContent="center"
      alignItems="center"
      margin="auto"
    >
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            id="basketball-court"
            width={850}
            height={600}
            visible={true}
            style={{ backgroundColor: "white" }}
          >
            <Provider store={store}>
              <Layer>
                {/* court title */}
                <Text
                  width={850}
                  height={100}
                  text={`Pro Full Court: `+ (proFullCourtXLength * proFullCourtYLength) + `㎡ (`+ proFullCourtXLength +` * `+ proFullCourtYLength + `)`}
                  fontSize={150 * courtRatio}
                  align="center"
                  fill="black"
                  x={0}
                  y={40}
                /> 
                {/* border only for pro full court size */}
                <Border courtRatio={courtRatio} color={"#195955"} /> 
                {/* arrowLine & dimensionText can be reuse for all courts*/}
                <ArrowLine courtRatio={courtRatio} arrowXEndLength={courtAreaXLength} />
                {/* left side of pro full court*/}
                <Group> 
                  <BorderDimensionLine courtRatio={courtRatio} />
                  <CourtArea courtRatio={courtRatio} color={"#B61313"} />
                  <ThreePointArea courtRatio={courtRatio} color={"#72818B"} />
                  <KeyArea courtRatio={courtRatio} color={"#2C4E8A"} />
                  <CircleArea courtRatio={courtRatio} color={"#606F14"} />
                  <TopKeyArea courtRatio={courtRatio} color={"#B61313"} />
                </Group>
                {/* right side of pro full court(flip the left side)*/}
                <Group scaleX={-1} x={initPointX * 2 + courtAreaXLength * 2 * courtRatio}>
                  <BorderDimensionLine courtRatio={courtRatio} />
                  <CourtArea courtRatio={courtRatio} color={"#B61313"} />
                  <ThreePointArea courtRatio={courtRatio} color={"#72818B"} />
                  <KeyArea courtRatio={courtRatio} color={"#2C4E8A"} />
                  <CircleArea courtRatio={courtRatio} color={"#606F14"} />
                  <TopKeyArea courtRatio={courtRatio} color={"#B61313"} />
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
