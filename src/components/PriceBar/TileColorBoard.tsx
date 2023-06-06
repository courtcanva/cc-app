import { Center, Text, Flex, Wrap } from "@chakra-ui/react";
import React, { useEffect, useMemo, Dispatch, SetStateAction } from "react";
import { useStoreSelector } from "@/store/hooks";
import { TilePrices } from "../../interfaces/priceCalculation";
import { useGetPriceQuery } from "@/redux/api/priceApi";
import priceFormat from "@/utils/priceFormat";

interface ITileColorBoard {
  setTotalPrice: Dispatch<SetStateAction<string>>;
}

interface ITilePrice {
  price: {
    singleTone: number;
    twoTone: number;
    threeTone: number;
  };
}

const TileColorBoard: React.FC<ITileColorBoard> = ({ setTotalPrice }) => {
  const { blocks: tileBlocks } = useStoreSelector((state) => state.priceBar);
  const court = useStoreSelector((state) => state.courtSpecData).activeCourt;
  const { colorList } = useStoreSelector((state) => state.colorList);
  const { data } = useGetPriceQuery(0);

  const priceDetails = {
    tilePrice: 0,
    deliveryPrice: 0,
  };

  const calculateDelivery = (tilePricesList: { deliveryPrice: number }) => {
    let totalQuantity = 0;
    for (const tile of tileBlocks) {
      totalQuantity += tile.quantity;
    }
    const delivery = tilePricesList?.deliveryPrice;
    priceDetails.deliveryPrice += Math.ceil(totalQuantity / 1000) * (delivery / 100);
  };

  const calculateTile = (tilePricesList: ITilePrice) => {
    const { singleTone, twoTone, threeTone } = tilePricesList && tilePricesList.price;
    const [singleToneNumber, twoToneNumber, threeToneNumber] = [1, 2, 3].map((length) =>
      tileBlocks
        .filter((item) => item.color.split(" ").length === length)
        .map((tile) => tile.quantity)
        .reduce((number, total) => number + total, 0)
    );
    priceDetails.tilePrice =
      (singleTone * singleToneNumber + twoTone * twoToneNumber + threeTone * threeToneNumber) / 100;
  };

  useEffect(() => {
    if (colorList.length === 0) return;
    if (data === undefined) return;
    const tilePricesList = data[0]?.tilePrices?.find(
      (item: TilePrices) => item.tileName === colorList[0]?.name
    );
    calculateTile(tilePricesList);
    calculateDelivery(tilePricesList);
    const price = (priceDetails.tilePrice + priceDetails.deliveryPrice) * 1.1;
    const totalPrice = priceFormat(price);
    setTotalPrice(totalPrice);
  }, [tileBlocks, court, data, colorList]);

  const centers = useMemo(() => {
    if (!tileBlocks) return null;

    return tileBlocks.map(({ color, quantity }) => {
      if (quantity !== 0) {
        const colorArray = color.split(" ");
        return (
          <Flex
            width={{ base: "27px", lg: "40px", xl: "50px" }}
            height={{ base: "15px", lg: "18px", xl: "22px" }}
            position="relative"
            borderRadius="md"
          >
            {colorArray.map((singleColor, index) => {
              return (
                <Center
                  backgroundColor={singleColor}
                  key={singleColor}
                  width={"100%"}
                  borderStartRadius={index === 0 ? "inherit" : "none"}
                  borderEndRadius={index === colorArray.length - 1 ? "inherit" : "none"}
                ></Center>
              );
            })}
            <Center
              position="absolute"
              width="100%"
              height="100%"
              color="fontcolor.primary"
              fontSize={["8px", "10px", "12px", "14px"]}
            >
              {quantity}
            </Center>
          </Flex>
        );
      }
    });
  }, [tileBlocks]);

  return (
    <>
      <Center
        width="60%"
        justifyContent="flex-start"
        marginLeft={{ base: "10px", lg: "35px", xl: "60px" }}
      >
        <Text
          fontSize={{ base: "xs", lg: "sm" }}
          fontWeight="600"
          color="brand.primary"
          marginRight="12px"
        >
          Estimated Tiles
        </Text>
        <Wrap gap="8px" height="48px" marginLeft="8px" data-testid="tileBoard">
          {centers}
        </Wrap>
      </Center>
    </>
  );
};
export default TileColorBoard;
