import React from "react";
import { IconButton, Circle, Stack } from "@chakra-ui/react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { switchCartDisplay, switchSideBar } from "@/store/reducer/designPageButtonSlice";
import { useDispatch } from "react-redux";
import { useLoginModal } from "@/store/reducer/loginModalSlice";

interface Props {
  quantity: number;
  loginState: boolean;
}

const ShoppingCartButton = ({ quantity, loginState }: Props) => {
  const dispatch = useDispatch();
  const handleCartPageOpen = () => {
    loginState
      ? dispatch(switchCartDisplay())
      : dispatch(useLoginModal(true)) && dispatch(switchSideBar(false));
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
