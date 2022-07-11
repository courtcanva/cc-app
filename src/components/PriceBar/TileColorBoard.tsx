import { Center, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useStoreSelector } from "@/store/hooks";
import { IPriceCalculation, ITilePrice, ICourts } from "../../interfaces/priceCalculation";
import { useGetPriceQuery } from "@/redux/api/priceApi";
import { useDispatch } from "react-redux";
import { changeTotalPrice } from "@/store/reducer/totalPriceSlice";
import priceFormat from "@/utils/priceFormat";

const TileColorBoard: React.FC = () => {
  const tileBlocks = useStoreSelector((state) => state.priceBar.blocks);
  const dispatch = useDispatch();
  const courts = useStoreSelector((state) => state.courtSize);
  const budget = useStoreSelector((state) => state.totalPrice.budget);
  const { data } = useGetPriceQuery(0);

  useEffect(() => {
    let tilePrice = 0;
    let installPrice = 0;
    let deliveryPrice = 0;
    let totalQuantity = 0;
    if (data) {
      // avoid undefined
      const priceList = data.find((item: IPriceCalculation) => !item.isDeleted);
      if (priceList) {
        // avoid undefined
        tileBlocks?.map((tile) => {
          // tile price
          const tileColor = tile.color.toUpperCase();
          const tileList = priceList.tiles.tilePrice.find(
            (item: ITilePrice) => item.color === tileColor
          );
          if (tileList) {
            tilePrice += (tileList.price / 100) * tile.quantity;
            totalQuantity += tile.quantity;
          }
        });
        // delivery price (a fixed price per 1000 tiles)
        deliveryPrice += (totalQuantity / 1000) * priceList.tiles.deliveryPrice;
        // installation price (fixed prices for corresponding courts)
        const courtList = priceList.court_spec.find(
          (item: ICourts) => item.court === courts.courtName
        );
        if (courtList) {
          installPrice += courtList.installationPrice / 100;
        }
      }
    }
    // check price format
    const totalPrice = priceFormat(tilePrice, deliveryPrice, installPrice);
    dispatch(changeTotalPrice(totalPrice));
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
            From $ {budget}
          </Text>
        </Center>
      </Flex>
    </>
  );
};
export default TileColorBoard;
