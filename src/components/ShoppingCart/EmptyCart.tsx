import { Text, Button, Flex } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setCartDisplayState } from "@/store/reducer/cartControlSlice";

const EmptyCart = () => {
  const disPatch = useDispatch();
  const handleReturnToDesign = () => {
    disPatch(setCartDisplayState(false));
  };
  return (
    <Flex
      width="100%"
      justifyContent="center"
      alignItems="center"
      margin="80px 10px"
      bg="#f3f6fb"
      borderTop="5px solid #7088B1"
    >
      <Flex flexDirection="column" justifyContent="space-evenly" alignItems="center" height="400px">
        <Text fontSize="50px" fontWeight="700">
          CART
        </Text>
        <Text fontSize="18px" fontWeight="500">
          You currently have{" "}
          <Text display="inline" fontWeight="900">
            no items
          </Text>{" "}
          in your cart
        </Text>
        <Button variant="checkoutBtn" size="lg" padding="10px 20px" onClick={handleReturnToDesign}>
          RETURN TO DESIGN
        </Button>
      </Flex>
    </Flex>
  );
};

export default EmptyCart;
