import { useStoreSelector } from "@/store/hooks";
import { Flex } from "@chakra-ui/react";
import ShoppingCartContainer from "./ShoppingCartContainer";
import { useGetItemQuantityQuery } from "@/redux/api/cartApi";
import { userData } from "@/store/reducer/userSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import EmptyCart from "./EmptyCart";
import { ICartItem } from "@/interfaces/cartItem";

const ShoppingCart = () => {
  const isCartOpen = useStoreSelector((state) => state.buttonToggle.isCartOpen);
  const currentUserId = useStoreSelector(userData).userId;
  const { data } = useGetItemQuantityQuery(currentUserId ? currentUserId : skipToken);
  const quantity = data?.length;

  const cart: ICartItem[] = data?.map((item: any) => {
    return {
      id: item._id,
      user_id: item.user_id,
      design: item.design,
      quotation: item.quotation,
      quotationDetails: item.quotationDetails,
      image: item.image,
      isExpired: item.isExpired,
    };
  });

  return (
    <>
      {isCartOpen && currentUserId && (
        <Flex
          position="fixed"
          backgroundColor="#fff"
          top="72px"
          padding="20px 20px 80px 20px"
          color="rgb(58, 75, 92)"
          width="100vw"
          height="100vh"
          zIndex={2499}
        >
          {quantity > 0 && <ShoppingCartContainer shoppingCart={cart} />}
          {quantity === 0 && <EmptyCart />}
        </Flex>
      )}
    </>
  );
};

export default ShoppingCart;
