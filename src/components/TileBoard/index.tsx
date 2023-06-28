import { Center, Flex, Wrap, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { RIGHT_BAR_WIDTH } from "@/constants/designPage";
import { useStoreSelector } from "@/store/hooks";

const TileBoard = () => {
  const { blocks: tileBlocks } = useStoreSelector((state) => state.priceBar);

  const centers = useMemo(() => {
    return tileBlocks.map(({ color, quantity }) => {
      if (quantity !== 0) {
        const colorArray = color.split(" ");
        return (
          <Flex
            key={color}
            width={{ base: "27px", xl: "40px", "2xl": "50px" }}
            height={{ base: "27px", xl: "40px", "2xl": "50px" }}
            position="relative"
            borderRadius="md"
            role="tileBlock"
            overflow="hidden"
          >
            {colorArray.map((singleColor) => {
              return (
                <Center backgroundColor={singleColor} key={singleColor} width={"100%"}></Center>
              );
            })}
            <Center
              position="absolute"
              width="100%"
              height="100%"
              color="fontcolor.primary"
              fontSize={{ base: "9px", xl: "12px", "2xl": "15px" }}
            >
              {quantity}
            </Center>
          </Flex>
        );
      }
    });
  }, [tileBlocks]);

  return (
    <Flex
      height="64px"
      backgroundColor="background.tertiary"
      position="fixed"
      bottom="106px"
      left="98px"
      width={`calc(100vw - 98px - ${RIGHT_BAR_WIDTH})`}
      zIndex="1500"
    >
      <Center
        width="100%"
        justifyContent="flex-start"
        mx={{ base: "10px", lg: "35px", xl: "60px" }}
      >
        <Text
          fontSize={{ base: "xs", lg: "sm" }}
          fontWeight="600"
          color="brand.primary"
          marginRight="12px"
        >
          Estimated Tiles
        </Text>
        <Wrap gap="8px" marginLeft="8px" data-testid="tileBoard">
          {centers}
        </Wrap>
      </Center>
    </Flex>
  );
};

export default TileBoard;
