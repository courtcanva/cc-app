import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const ColorPlate: React.FC = () => {
  const mockPlateColors: string[] = [
    "#305236",
    "#314B33",
    "#43554A",
    "#5C5046",
    "#332828",
    "#633132",
    "#B49F7A",
    "#411A20",
    "#1A1F51",
    "#5B5D61",
    "#162F4E",
    "#2B5178",
    "#8E9196",
    "#80C4E5",
    "#F1CB87",
    "#C66B54",
    "#AA3A34",
    "#000000",
  ];

  return <>
    <Flex wrap="wrap" w="275px" h="150px" columnGap="15px" mt="9px" ml="9px" data-testid="colorPlate">
      {mockPlateColors.map((color) => (
        <Box key={color} bg={color} w="30px" h="30px" 
          cursor="pointer"
          _hover={{ border: "2px solid #40B484" }}
          _active={{ border: "3px solid #40B484" }}
        />
      ))}
    </Flex>

  </>;
};

export default ColorPlate;
