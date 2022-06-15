import { Stage, Layer } from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider } from "react-redux";
import ThreePointArea from "./ThreePointArea";
import KeyArea from "./KeyArea";
import CourtArea from "./CourtArea";
import CircleArea from "./CircleArea";
import TopKeyArea from "./TopKeyArea";
import Border from "./Border";

// TODO: Only for test
import Check from "./Check-delete-soon";

const BasketballCourt = () => {
  return (
    <Flex
      position="fixed"
      top="122px"
      left="98px"
      width="calc(100% - 98px)"
      height="calc(100% - 162px)"
      minWidth={800}
      minHeight={400}
      justifyContent="center"
      alignItems="center"
      margin="auto"
    >
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            id="basketball-court"
            width={800}
            height={400}
            visible={true}
            style={{ backgroundColor: "white" }}
          >
            <Provider store={store}>
              <Layer>
                <Border />
                <CourtArea />
                <ThreePointArea />
                <KeyArea />
                <CircleArea />
                <TopKeyArea />
              </Layer>
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
      {/* TODO: Only for test */}
      <Check />
    </Flex>
  );
};

export default BasketballCourt;
