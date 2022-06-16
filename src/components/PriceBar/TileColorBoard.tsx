import { Center, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useStoreSelector } from "@/store/hooks";

const TileColorBoard: React.FC = () => {
  const tiles = useStoreSelector((state) => state.tile);
  return (
    <>
      <Flex height="64px">
        <Center width="100%" justifyContent="flex-start" marginLeft={{ base: "30px", xl: "60px" }}>
          <Text fontSize="xs" fontWeight="600">
            Estimated Tiles:
          </Text>
          <Center gap="8px" height="35px" marginLeft="8px" data-testid="tileBoard">
            {tiles.map((tile) => (
              <Center
                key={tile.type}
                backgroundColor={tile.color}
                width={{ base: "40px", xl: "85px" }}
                height={{ base: "20px", xl: "35px" }}
                fontSize={{ base: "xs", xl: "sm" }}
                color="white"
                data-testid="color"
              >
                {tile.quantity}
              </Center>
            ))}
          </Center>
        </Center>
        <Center
          width="350px"
          justifyContent="flex-start"
          borderLeft="1px solid #ABABAD"
          paddingLeft="20px"
        >
          <Text fontSize="xs" fontWeight="600">
            Estimated Budget:
          </Text>
          <Text fontSize="xs" fontWeight="800" marginLeft="6px">
            From $ xxxx
          </Text>
        </Center>
      </Flex>
    </>
  );
};
export default TileColorBoard;
