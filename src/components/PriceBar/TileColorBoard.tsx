import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useStoreSelector } from "@/store/hooks";

const TileColorBoard: React.FC = () => {
  const tiles = useStoreSelector((state) => state.tile);

  return (
    <>
      <Flex
        w={[252, 252, 272, 350]}
        width="450px"
        h="64px"
        alignItems="flex-start"
        borderLeft="1px solid #ABABAD"
        paddingTop="15px"
      >
        <Text marginX="8px" minWidth="150px" textAlign="left" fontWeight="600" fontSize="11px">
          Estimated Budget:
          <br />
          From $ xxxx
        </Text>
        <Text fontWeight="600" minWidth="100px" fontSize="11px">
          Estimate Tiles:
        </Text>
        <Box
          w="275px"
          h="51px"
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
          marginLeft="9px"
          marginRight="8px"
          textAlign="center"
          borderRadius="6px"
        >
          <Flex wrap="wrap" gap="8px" w="150px" h="35px" marginLeft="8px">
            {tiles.map((tile) => (
              <Box key={tile.type} bg={tile.color} w="40px" h="16px" fontSize="10px" color="white">
                {tile.quantity}
              </Box>
            ))}
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
export default TileColorBoard;
