import React from "react";
import { Stage, Layer, Text } from "react-konva"; // notice you can import from react-konva normally
import { Box, Flex } from "@chakra-ui/react";
import ThreePointArea from "./ThreePointArea";
import { ReactReduxContext, Provider } from "react-redux";

const BasketballCourt = () => {
  return (
    <Flex justifyContent="center" alignItems="center" w="792px" h="534px" bg="#eee" m="150px auto">
      <Box w="140px" h="150px" bg="white">
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            id="basketball-court"
            width={140}
            height={150}
            visible={true}
            style={{ backgroundColor: "pink" }}
          >
            <Provider store={store}>
              <Layer draggable>
                <ThreePointArea />
              </Layer>
              <Layer draggable>
                {/* https://konvajs.org/api/Konva.Text.html#main */}
              </Layer>
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
      </Box>
    </Flex>
  );
};

export default BasketballCourt;
