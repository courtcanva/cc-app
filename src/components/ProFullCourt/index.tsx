import { Stage, Layer, Group} from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider } from "react-redux";
import ThreePointArea from "../BasketballCourt/ThreePointArea";
import KeyArea from "../BasketballCourt/KeyArea";
import CourtArea from "../BasketballCourt/CourtArea";
import CircleArea from "../BasketballCourt/CircleArea";
import TopKeyArea from "../BasketballCourt/TopKeyArea";
import Border from "../BasketballCourt/Border";
import { useStoreSelector } from "@/store/hooks";

const ProFullCourt = () => {
  const { initPointX, initPointY, courtAreaXLength, courtAreaYLength, borderLength } =
    useStoreSelector((state) => state.courtSize);
  const courtRatio = 0.25;
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
                <Border courtRatio={courtRatio} color={"#195955"} />
                <Group>
                  <CourtArea courtRatio={courtRatio} color={"#B61313"} />
                  <ThreePointArea courtRatio={courtRatio} color={"#72818B"} />
                  <KeyArea courtRatio={courtRatio} color={"#2C4E8A"} />
                  <CircleArea courtRatio={courtRatio} color={"#606F14"} />
                  <TopKeyArea courtRatio={courtRatio} color={"#B61313"} />
                </Group>
                <Group scaleX={-1} x={initPointX * 2+ courtAreaXLength * 2 * courtRatio}>
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
