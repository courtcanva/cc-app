import { Center, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState, useMemo } from "react";
import { useStoreSelector } from "@/store/hooks";
import { IPriceCalculation } from "../../interfaces/priceCalculation";
import { useGetPriceQuery } from "@/redux/api/priceApi";
import priceFormat from "@/utils/priceFormat";

const TileColorBoard: React.FC = () => {
  const tileBlocks = useStoreSelector((state) => state.priceBar.blocks);
  const court = useStoreSelector((state) => state.courtSpecData).activeCourt;
  const { data } = useGetPriceQuery(0);
  const priceList = data?.find((item: IPriceCalculation) => item.tile_id === "tile001");
  const [useTotalPrice, setTotalPrice] = useState<string>("0.00");

  // const calculateTiles = () => {
  //   // for loop
  // }

  // const calculateTotalPrice = () => {
  //   // for loop
  // }

  useEffect(() => {
    let tilePrice = 0;
    let installPrice = 0;
    let deliveryPrice = 0;
    let totalQuantity = 0;
    const priceList = data?.find((item: IPriceCalculation) => !item.isDeleted);

    // delivery price (a fixed price per 1000 tiles)
    deliveryPrice += Math.ceil(totalQuantity / 1000) * priceList?.tiles.deliveryPrice;
    // installation price (fixed prices for corresponding courts)
    const courtList = priceList?.court_spec.find(
      (item: ICourts) => item.court === courts.courtName
    );
    if (courtList) {
      installPrice += courtList.installationPrice / 100;
      // =======incoming====
  const priceDetails = {
    tilePrice: 0,
    deliveryPrice: 0,
  };

  const calculateDelivery = () => {
    let totalQuantity = 0;
    for (const tile of tileBlocks) {
      totalQuantity += tile.quantity;
    }
    const delivery = priceList?.deliveryPrice;
    priceDetails.deliveryPrice += Math.ceil(totalQuantity / 1000) * (delivery / 100);
  };

  const calculateTile = () => {
    const courtSize =
      (((court.courtAreaXLength + court.borderLength * 2) / 1000) *
        (court.courtAreaYLength + court.borderLength * 2)) /
      1000;
    priceDetails.tilePrice = (priceList?.tilePrice / 100) * courtSize;
  };

  useEffect(() => {
    if (data === undefined) return;
    calculateTile();
    calculateDelivery();
    const price = (priceDetails.tilePrice + priceDetails.deliveryPrice) * 1.1;
    const totalPrice = priceFormat(price);
    setTotalPrice(totalPrice);
  }, [tileBlocks, court, data]);

  const centers = useMemo(() => {
    if (!tileBlocks) return null;

    return tileBlocks.map(({ color, quantity }) => (
      <Center
        key={color}
        backgroundColor={color}
        width={{ base: "40px", lg: "60px", xl: "85px" }}
        height={{ base: "20px", lg: "25px", xl: "35px" }}
        fontSize={{ base: "xs", xl: "sm" }}
        color="white"
        role="tileBlock"
      >
        {quantity}
      </Center>
    ));
  }, [tileBlocks]);

  return (
    <>
      <Flex height="64px">
        <Center width="100%" justifyContent="flex-start" marginLeft={{ base: "30px", xl: "60px" }}>
          <Text fontSize="xs" fontWeight="600">
            Estimated Tiles:
          </Text>
          <Center gap="8px" height="35px" marginLeft="8px" data-testid="tileBoard">
            {centers}
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
            From $ {useTotalPrice === "0.00" ? "Loading..." : useTotalPrice}
          </Text>
        </Center>
      </Flex>
    </>
  );
};
export default TileColorBoard;
