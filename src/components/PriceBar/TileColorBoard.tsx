import { Center, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useStoreSelector } from "@/store/hooks";
import { IPriceCalculation, IDeliveryPrice } from "../../interfaces/priceCalculation";
import { useGetPriceQuery } from "@/redux/api/priceApi";
import priceFormat from "@/utils/priceFormat";

const TileColorBoard: React.FC = () => {
  const tileBlocks = useStoreSelector((state) => state.priceBar.blocks);
  const court = useStoreSelector((state) => state.courtSize);
  const { data } = useGetPriceQuery(0);
  const priceList = data?.find((item: IPriceCalculation) => !item.isDeleted);
  const [useTotalPrice, setTotalPrice] = useState<string>("0.00");

  const priceDetails = {
    tilePrice: 0,
    deliveryPrice: 0,
  };
  
  const calculateDelivery = () => {
    let totalQuantity = 0;
    for (const tile of tileBlocks) {
      totalQuantity += tile.quantity;
    }
    const delivery = priceList?.deliveryPrice.find(
      (item: IDeliveryPrice) => item.tile_id === "tile001"
    );
    priceDetails.deliveryPrice += Math.ceil(totalQuantity / 1000) * (delivery.price / 100);
  };

  const calculateTile = () => {
    const courtSize = (court.courtAreaXLength + court.borderLength * 2) / 1000 * (court.courtAreaYLength + court.borderLength * 2) / 1000
    priceDetails.tilePrice = priceList?.tilePrice / 100 * courtSize;
  };

  useEffect(() => {
    if (data === undefined) return;
    calculateTile();
    calculateDelivery();
    const price = priceDetails.tilePrice + priceDetails.deliveryPrice;
    const totalPrice = priceFormat(price);
    setTotalPrice(totalPrice);
  }, [tileBlocks, court, data]);

  return (
    <>
      <Flex height="64px">
        <Center width="100%" justifyContent="flex-start" marginLeft={{ base: "30px", xl: "60px" }}>
          <Text fontSize="xs" fontWeight="600">
            Estimated Tiles:
          </Text>
          <Center gap="8px" height="35px" marginLeft="8px" data-testid="tileBoard">
            {tileBlocks?.map(
              (tile) =>
                tile.quantity !== 0 && (
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
                )
            )}
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
            From $ {useTotalPrice === "0.00" ? "Loading..." : (useTotalPrice)}
          </Text>
        </Center>
      </Flex>
    </>
  );
};
export default TileColorBoard;
