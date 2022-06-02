import { Stage, Layer } from "react-konva";
import { Box, Flex } from "@chakra-ui/react";
import ThreePointArea from "./ThreePointArea";
import { ReactReduxContext, Provider } from "react-redux";

const BasketballCourt = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      w="792px"
      h="534px"
      m="150px auto"
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%)"
      zIndex="-1"
    >
      {/* <Box w="380px" h="300px" bg="white"> */}
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            id="basketball-court"
            width={800}
            height={400}
            visible={true}
            style={{ backgroundColor: "white"}} // TODO: color should be changed later
          >
            <Provider store={store}>
              <Layer>
                <ThreePointArea />
              </Layer>
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
      {/* </Box> */}
    </Flex>
  );
};

export default BasketballCourt;
