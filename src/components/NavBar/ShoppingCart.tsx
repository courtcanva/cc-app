import React from "react";
import { IconButton, Circle, Stack } from "@chakra-ui/react";
import { HiOutlineShoppingBag } from "react-icons/hi";

interface Props {
  quantity: number;
  loginState: boolean;
}

const ShoppingCart = ({ quantity, loginState }: Props) => {
  return (
    <Stack position="relative">
      <IconButton aria-label="Order" icon={<HiOutlineShoppingBag />} variant="navbarIconBtn" />
      {quantity > 0 && loginState && (
        <Circle
          background="background.lightOrange"
          color="fontcolor.primary"
          fontSize="xs"
          position="absolute"
          top="-10px"
          left="18px"
          textAlign="center"
          size="20px"
          data-testid="quantity-box"
        >
          {quantity}
        </Circle>
      )}
    </Stack>
  );
};

export default ShoppingCart;
