import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const TireColorBoard: React.FC = () => {
  const mockTireColors: string[] = [
    "#1A1F51",
    "#643132",
    "#C96E55",
    "#375239",
    "#411920",
    "#B59F7A",
  ];

  return (
    <>
      <Flex
        w={[192, 192, 222, 292]}
        h="64px"
        alignItems="center"
        justifyContent="center"
        borderLeft="1px solid #ABABAD"
      >
        <Box
          w="275px"
          h="51px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginLeft="9px"
          marginRight="8px"
          textAlign="center"
          borderRadius="6px"
          boxShadow="
          inset -1px -1px 5px rgba(255, 255, 255, .9),
          inset 1px 1px 5px rgba(0, 0, 0, .4);"
        >
          <Flex wrap="wrap" gap="4px" w="56px" h="35px" marginLeft="8px">
            {mockTireColors.map((color) => (
              <Box key={color} bg={color} w="16px" h="16px" />
            ))}
          </Flex>
          <Text
            w="105px"
            marginRight="8px"
            textAlign="left"
            fontWeight="700"
            fontSize="12px"
            overflowWrap="break-word"
          >
            Estimated Budget: From $ 1647
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default TireColorBoard;
