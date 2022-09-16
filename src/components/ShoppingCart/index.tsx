import { useStoreSelector } from "@/store/hooks";
import { Flex } from "@chakra-ui/react";
import ShoppingCartContainer from "./ShoppingCartContainer";


const ShoppingCart = () => {
  const isOpen = useStoreSelector((state) => state.cartControl.isCartOpen);

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
