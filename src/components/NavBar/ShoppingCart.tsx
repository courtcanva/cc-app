import React from "react";
import { IconButton, Circle, Stack } from "@chakra-ui/react";
import { useStoreSelector } from "@/store/hooks";
import { userData } from "@/store/reducer/userSlice";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useGetItemQuantityQuery } from "@/redux/api/cartApi";

const ShoppingCart: React.FC = () => {
  const curUserId = useStoreSelector(userData).userId;
  const { data } = useGetItemQuantityQuery(curUserId);

  const quantity = data?.length;

  return (
    <Stack position="relative">
      <IconButton aria-label="Order" icon={<HiOutlineShoppingBag />} variant="navbarIconBtn" />
      {quantity > 0 && (
        <Circle
          background="background.tomato"
          color="fontcolor.primary"
          fontSize="xs"
          position="absolute"
          top="-10px"
          left="18px"
          textAlign="center"
          size="20px"
        >
          {quantity}
        </Circle>
      )}
    </Stack>
  );
};

export default ShoppingCart;
