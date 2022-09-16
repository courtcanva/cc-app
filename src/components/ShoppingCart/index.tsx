import { useStoreSelector } from "@/store/hooks";
import { useLoginModal } from "@/store/reducer/loginModalSlice";
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ShoppingCartContainer from "./ShoppingCartContainer";
import { getCartDisplayCondition } from "@/store/reducer/cartControlSlice";

import { useSelector } from "react-redux";

const ShoppingCart = () => {
  const { userId } = useStoreSelector((state) => state.user);
  const [checkUser, setCheckUser] = useState(userId);
  // const isOpen = useSelector(getCartDisplayCondition);
  const isOpen = useStoreSelector((state) => state.cartControl.isCartOpen);

  // useEffect(() => {
  //   console.log("initial: ", isOpen);
  // }, [isOpen]);

  return (
    <>
      {isOpen && (
        <Flex
          position="fixed"
          backgroundColor="#fff"
          flexDirection="column"
          top="72px"
          left="98px"
          padding="50px 20px 80px 20px"
          color="rgb(58, 75, 92)"
          width="calc(100vw-98px)"
          height="100vh"
          alignItems="center"
          zIndex={1600}
        >
          <ShoppingCartContainer />
        </Flex>
      )}
    </>
  );
};

export default ShoppingCart;
