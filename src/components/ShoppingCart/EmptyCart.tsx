import { Text, Button, Flex } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { switchCartDisplay } from "@/store/reducer/buttonToggleSlice";

const EmptyCart = () => {
  const disPatch = useDispatch();
  const handleReturnToDesign = () => {
    disPatch(switchCartDisplay());
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
        <Text variant="headerFont">Shopping Cart</Text>
        <Text
          variant="bodyFont"
          textTransform="none"
          fontWeight="500"
          color="black"
          role="text"
          aria-label="paragraph"
        >
          You currently have{" "}
          <Text display="inline" fontWeight="900">
            no items
          </Text>{" "}
          in your cart
        </Text>
        <Button
          aria-label="ReturnHomeBtn"
          variant="shareBtn"
          size="lg"
          padding="10px 20px"
          onClick={handleReturnToDesign}
        >
          Return to Design
        </Button>
      </Flex>
    </Flex>
  );
};

export default EmptyCart;
