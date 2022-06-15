import { Stage, Layer } from "react-konva";
import { Flex, Heading } from "@chakra-ui/react";
import { ReactReduxContext, Provider } from "react-redux";
import { useStoreSelector } from "@/store/hooks";
import ThreePointArea from "./ThreePointArea";
import KeyArea from "./KeyArea";
import CourtArea from "./CourtArea";
import CircleArea from "./CircleArea";
import TopKeyArea from "./TopKeyArea";
import Border from "./Border";

const BasketballCourt = () => {
  const { name: courtName } = useStoreSelector((state) => state.courtName);

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
      flexDirection="column"
      margin="auto"
    >
      <Heading as="h2" transform="translateY(37px)" fontWeight="medium" fontSize="20px">
        {courtName}
      </Heading>
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
    </Flex>
  );
};

export default BasketballCourt;
