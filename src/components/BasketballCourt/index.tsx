import React from "react";
import { Stage, Layer, Text } from "react-konva"; // notice you can import from react-konva normally
import { Box } from "@chakra-ui/react";
import ThreePointArea from "./ThreePointArea";
import { ReactReduxContext, Provider } from "react-redux";

const BasketballCourt = () => {
  return (
    <Box w="792px" h="534px" bg="white" m="150px auto">
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            id="basketball-court"
            width={669}
            height={369}
            visible={true}
            style={{ backgroundColor: "pink" }}
          >
            <Provider store={store}>
              <Layer draggable>
                <ThreePointArea />
              </Layer>
              <Layer draggable>
                {/* https://konvajs.org/api/Konva.Text.html#main */}
                <Text
                  text="Court Test"
                  fontFamily="Times New Roman"
                  fontStyle="bold"
                  fontSize={50}
                />
              </Layer>
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </Box>
  );
};

export default BasketballCourt;
