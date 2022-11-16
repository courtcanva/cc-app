import React from "react";
import { IconButton, Circle, Stack } from "@chakra-ui/react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { openCartDisplay, switchLoginModal } from "@/store/reducer/buttonToggleSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
interface Props {
  quantity: number;
  loginState: boolean;
}

const ShoppingCartButton = ({ quantity, loginState }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleCartPageOpen = () => {
    router.push("/");
    loginState ? dispatch(openCartDisplay()) : dispatch(switchLoginModal(true));
  };

  return (
    <Stack position="relative">
      <IconButton
        aria-label="Order"
        icon={<HiOutlineShoppingBag />}
        variant="navbarIconBtn"
        onClick={handleCartPageOpen}
      />
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

export default ShoppingCartButton;
