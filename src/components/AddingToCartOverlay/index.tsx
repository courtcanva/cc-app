import { Center, Spinner, useToast, Flex, Text, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { switchAddingToCart, switchConstructionMounted } from "@/store/reducer/buttonToggleSlice";

const AddingToCartOverlay = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(10);
  const toast = useToast();
  if (count <= -2) {
    toast({
      title: `Adding to cart failed, please try again`,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }
  useEffect(() => {
    if (count <= -2) {
      dispatch(switchAddingToCart(false));
      dispatch(switchConstructionMounted(false));
      return;
    }
    const timerId = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [count]);
  return (
    <Center
      position="fixed"
      h="100vh"
      w="100vw"
      bottom="0"
      left="0"
      bg="blackAlpha.600"
      zIndex="5999"
    >
      <Flex alignItems="center">
        <Box width="100px">
          <Spinner size="xl" color="teal.300" />
        </Box>
        <Text fontSize="24" color="teal.300">{`Add to cart in ${count >= 0 ? count : 0} s`}</Text>
      </Flex>
    </Center>
  );
};

export default AddingToCartOverlay;
