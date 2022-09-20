import { useStoreSelector } from "@/store/hooks";
import { Flex } from "@chakra-ui/react";
import { mockCartData } from "../MockData/MockCartData";
import ShoppingCartContainer from "./ShoppingCartContainer";
import { useState, useEffect } from "react";
import { useGetItemQuantityQuery } from "@/redux/api/cartApi";
import { userData } from "@/store/reducer/userSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import EmptyCart from "./EmptyCart";

export interface CartData {
  key: string;
  content: {
    id: string;
    courtName: string;
    quotation: string;
    quotationDetails: string;
  };
}

export interface userCartList {
  userid: string;
  userShoppingCart: CartData[];
}

const ShoppingCart = () => {
  const isCartOpen = useStoreSelector((state) => state.cartControl.isCartOpen);
  const currentUserId = useStoreSelector(userData).userId;
  const { data } = useGetItemQuantityQuery(currentUserId ? currentUserId : skipToken);
  const quentity = data?.length;
  // Need to fetch the realdata to here.
  const cartInfo = mockCartData;

  const [cartData, setCartData] = useState([]);
  const [userId, setUserId] = useState("");

  return (
    <>
      {isCartOpen && (
        <Flex
          position="fixed"
          backgroundColor="#fff"
          top="72px"
          left="98px"
          padding="20px 20px 80px 20px"
          color="rgb(58, 75, 92)"
          width="calc(100vw - 98px)"
          height="100vh"
          zIndex={1600}
        >
          {quentity > 0 && (
            <ShoppingCartContainer
              userid={cartInfo.userid}
              userShoppingCart={cartInfo.userShoppingCart}
            />
          )}
          {quentity == 0 && <EmptyCart />}
        </Flex>
      )}
    </>
  );
};

export default ShoppingCart;
