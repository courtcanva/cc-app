import { Center, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useStoreSelector } from "@/store/hooks";
// import priceCalculation from "./priceCalculation";
import { useGetPriceQuery } from "@/redux/api/priceApi";

const TileColorBoard: React.FC = () => {
  const tileBlocks = useStoreSelector((state) => state.priceBar.blocks);
  const tiles = useStoreSelector((state) => state.tile.priceBar);
  const { data } = useGetPriceQuery();
  console.log(data);

  let totalPrice = 0;

  data?.tiles?.tilePrice.map((colorName: string, price: number) => {
    tiles?.map((tile) => {
      if (tile.color === colorName) {
        totalPrice += price * tile.quantity;
      }
    });
  });

  return (
    <>
      <Flex height="64px">
        <Center width="100%" justifyContent="flex-start" marginLeft={{ base: "30px", xl: "60px" }}>
          <Text fontSize="xs" fontWeight="600">
            Estimated Tiles:
          </Text>
          <Center gap="8px" height="35px" marginLeft="8px" data-testid="tileBoard">
            {tileBlocks?.map((tile) => (
              <Center
                key={tile.color}
                backgroundColor={tile.color}
                width={{ base: "40px", lg: "60px", xl: "85px" }}
                height={{ base: "20px", lg: "25px", xl: "35px" }}
                fontSize={{ base: "xs", xl: "sm" }}
                color="white"
                role="tileBlock"
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
            From $ {totalPrice}
          </Text>
        </Center>
      </Flex>
    </>
  );
};
export default TileColorBoard;
