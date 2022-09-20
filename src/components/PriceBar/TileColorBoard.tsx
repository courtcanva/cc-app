import { Center, Text } from "@chakra-ui/react";
import React, { useEffect, useMemo, Dispatch, SetStateAction } from "react";
import { useStoreSelector } from "@/store/hooks";
import { TilePrices } from "../../interfaces/priceCalculation";
import { useGetPriceQuery } from "@/redux/api/priceApi";
import priceFormat from "@/utils/priceFormat";

interface ITileColorBoard {
  setTotalPrice: Dispatch<SetStateAction<string>>;
}

const TileColorBoard: React.FC<ITileColorBoard> = ({ setTotalPrice }) => {
  const tileBlocks = useStoreSelector((state) => state.priceBar.blocks);
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

  const calculateTile = (tilePricesList: { price: number }) => {
    const courtSize =
      (((court.courtAreaXLength + court.borderLength * 2) / 1000) *
        (court.courtAreaYLength + court.borderLength * 2)) /
      1000;
    priceDetails.tilePrice = (tilePricesList?.price / 100) * courtSize;
  };

  useEffect(() => {
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
        return (
          <Center
            key={color}
            backgroundColor={color}
            width={{ base: "45px", lg: "60px", xl: "85px" }}
            height={{ base: "25px", lg: "30px", xl: "35px" }}
            fontSize={{ base: "xs", xl: "sm" }}
            color="fontcolor.primary"
            role="tileBlock"
            borderRadius="6px"
          >
            {quantity}
          </Center>
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
        <Center gap="8px" height="35px" marginLeft="8px" data-testid="tileBoard">
          {centers}
        </Center>
      </Center>
    </>
  );
};
export default TileColorBoard;
