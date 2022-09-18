import { useStoreSelector } from "@/store/hooks";
import { Flex } from "@chakra-ui/react";
import { mockCartData } from "../MockData/MockCartData";
import ShoppingCartContainer from "./ShoppingCartContainer";

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
  // Need to fetch the realdata to here.
  const cartInfo = mockCartData;

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
          width="calc(100vw-98px)"
          height="100vh"
          zIndex={1600}
        >
          <ShoppingCartContainer
            userid={cartInfo.userid}
            userShoppingCart={cartInfo.userShoppingCart}
          />
        </Flex>
      )}
    </>
  );
};

export default ShoppingCart;
