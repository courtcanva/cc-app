import { Button, Center, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState, useMemo } from "react";
import { useStoreSelector } from "@/store/hooks";
import { IPriceCalculation } from "@/interfaces/priceCalculation";
import { useGetPriceQuery } from "@/redux/api/priceApi";
import priceFormat from "@/utils/priceFormat";
import { useAddToCartMutation } from "@/redux/api/cartAPi";
import { ICartItem } from "@/interfaces/cartItem";
import { saveDesignMapping } from "@/utils/designMapping";
import { IDesign, ITileColor } from "@/interfaces/design";

const TileColorBoard: React.FC = () => {
  const tileBlocks = useStoreSelector((state) => state.priceBar.blocks);
  const court = useStoreSelector((state) => state.courtSpecData).activeCourt;
  const tileData = useStoreSelector((state) => state.tile.present.court);
  const { data } = useGetPriceQuery(0);
  const userId = useStoreSelector((state) => state.user.userId);
  const priceList = data?.find((item: IPriceCalculation) => item.tile_id === "tile001");
  const [useTotalPrice, setTotalPrice] = useState<string>("0.00");
  const [addToCart] = useAddToCartMutation();
  const mappedCourtSize = saveDesignMapping(court);
  const tiles: ITileColor[] = [];
  for (const tile of tileData) {
    tiles.push(tile);
  }
  const currentDesign: IDesign = {
    _id: court.courtId,
    user_id: userId,
    designName: court.designName,
    courtSize: mappedCourtSize,
    tileColor: tiles,
  };

  const newCartItem: ICartItem = {
    design: currentDesign,
    quotation: useTotalPrice,
    quotationDetails: tileBlocks,
    previewPic: "",
  };

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

  const handleAddToCart = () => {
    addToCart({ item: newCartItem });
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
      <Flex height="64px">
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
        <Center
          width="50%"
          justifyContent={{ base: "flex-start", lg: "flex-end" }}
          paddingLeft={{ base: "10px", lg: "0px", xl: "0px" }}
          borderLeft="1px solid #ABABAD"
          alignItems="center"
          color="brand.primary"
        >
          <Center alignItems="baseline">
            <Text fontSize={{ base: "xs", lg: "sm" }} fontWeight="600" marginLeft="50px">
              Estimated Budget
            </Text>
            <Text
              fontSize={{ base: "xs", lg: "sm" }}
              fontWeight={{ base: "700", lg: "800" }}
              marginLeft="8px"
            >
              From
            </Text>
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              fontWeight={{ base: "700", lg: "800" }}
              marginLeft="5px"
              marginRight="20px"
            >
              ${useTotalPrice === "0.00" ? "Loading..." : useTotalPrice}
            </Text>
          </Center>
          <Button
            variant="shareBtn"
            marginRight="30px"
            onClick={handleAddToCart}
            data-testid="add-to-cart-button"
          >
            Add to Cart
          </Button>
        </Center>
      </Flex>
    </>
  );
};
export default TileColorBoard;
