import { Center, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useStoreSelector } from "@/store/hooks";
import { IPriceCalculation, ITilePrice, ICourts } from "../../interfaces/priceCalculation";
import { useGetPriceQuery } from "@/redux/api/priceApi";
import priceFormat from "@/utils/priceFormat";

const TileColorBoard: React.FC = () => {
  const tileBlocks = useStoreSelector((state) => state.priceBar.blocks);
  const courts = useStoreSelector((state) => state.courtSize);
  const { data } = useGetPriceQuery(0);
  const [useTotalPrice, setTotalPrice] = useState<string>("0.00");

  useEffect(() => {
    let tilePrice = 0;
    let installPrice = 0;
    let deliveryPrice = 0;
    let totalQuantity = 0;
    const priceList = data?.find((item: IPriceCalculation) => !item.isDeleted);
    tileBlocks?.map((tile) => {
      // tile price
      const tileColor = tile.color.toUpperCase();
      const tileList = priceList?.tiles.tilePrice.find(
        (item: ITilePrice) => item.color === tileColor
      );
        tilePrice += tileList?.price / 100 * tile.quantity;
        totalQuantity += tile.quantity;
    });
    console.log(`tilePrice: ` + tilePrice)
    console.log(`Quantity: `+ totalQuantity)
      // delivery price (a fixed price per 1000 tiles)
    deliveryPrice += Math.ceil(totalQuantity / 1000) * priceList?.tiles.deliveryPrice;
    console.log(`delivery: `+deliveryPrice)
      // installation price (fixed prices for corresponding courts)
    const courtList = priceList?.court_spec.find(
      (item: ICourts) => item.court === courts.courtName
    );
    if (courtList) {
      installPrice += courtList.installationPrice / 100;
    }
    console.log(`installation: `+installPrice)
    const price = tilePrice + deliveryPrice + installPrice;
    // check price format, type transfer to string
    const totalPrice = priceFormat(price);
    setTotalPrice(totalPrice);
  }, [tileBlocks, courts]);

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
            From $ {useTotalPrice}
          </Text>
        </Center>
      </Flex>
    </>
  );
};
export default TileColorBoard;
