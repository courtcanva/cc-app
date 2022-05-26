import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import mockPlateColors from "./colorList";

const ColorPlate: React.FC = () => {
  return (
    <Flex
      wrap="wrap"
      w="275px"
      h="150px"
      columnGap="18px"
      mt="9px"
      ml="2px"
      data-testid="colorPlate"
    >
      {mockPlateColors.map((color) => (
        <Box
          key={color}
          bg={color}
          data-testid={color}
          w="30px"
          h="30px"
          cursor="pointer"
          _hover={{ border: "2px solid #40B484" }}
          _active={{ border: "3px solid #40B484" }}
        />
      ))}
    </Flex>
  );
};

export default ColorPlate;
