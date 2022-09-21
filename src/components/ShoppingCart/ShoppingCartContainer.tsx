import { Table, Thead, Tbody, Tr, Th, TableContainer, Text, Button, Flex } from "@chakra-ui/react";
import { userCartList } from ".";
import CartListItem from "./CartListItem";
import { useDispatch } from "react-redux";
import { switchCartDisplay } from "@/store/reducer/cartControlSlice";
// import { mockCartData } from "../MockData/MockCartData";

const ShoppingCartContainer = (cartList: userCartList) => {
  const cartItems = cartList.userShoppingCart;

  const dispatch = useDispatch();
  const handleReturnToDesign = () => {
    dispatch(switchCartDisplay());
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <Text fontSize="18px" fontWeight="750" marginBottom="20px" marginTop="20px">
        CART
      </Text>
      <TableContainer min-width="1080px" width="100%" overflowY="auto" whiteSpace="normal">
        <Table
          variant="simple"
          border="1px"
          borderColor="#DCDCDC"
          size="lg"
          sx={{ "table-layout": "fixed" }}
        >
          <Thead>
            <Tr>
              <Th></Th>
              <Th
                fontSize="16px"
                fontWeight="800"
                padding="25px"
                sx={{ "text-transform": "capitalize" }}
              >
                Product
              </Th>
              <Th
                fontSize="16px"
                fontWeight="800"
                padding="25px"
                sx={{ "text-transform": "capitalize" }}
              >
                Quotation
              </Th>
              <Th
                fontSize="16px"
                fontWeight="800"
                padding="25px 40px"
                sx={{ "text-transform": "capitalize" }}
              >
                Quotation Details
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {cartItems.map((cartRow) => (
              <CartListItem key={cartRow.key} content={cartRow.content} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Button
        variant="checkoutBtn"
        size="lg"
        marginBottom="20px"
        marginTop="20px"
        width="200px"
        padding="10px"
        data-testid="checkout-btn"
      >
        Proceed to Checkout
      </Button>
    </Flex>
    // <Flex
    //   width="100%"
    //   justifyContent="center"
    //   alignItems="center"
    //   margin="80px 10px"
    //   bg="#f3f6fb"
    //   borderTop="5px solid #7088B1"
    // >
    //   <Flex flexDirection="column" justifyContent="space-evenly" alignItems="center" height="400px">
    //     <Text fontSize="50px" fontWeight="700">
    //       CART
    //     </Text>
    //     <Text fontSize="18px" fontWeight="500">
    //       You currently have{" "}
    //       <Text display="inline" fontWeight="900">
    //         no items
    //       </Text>{" "}
    //       in your cart
    //     </Text>
    //     <Button variant="checkoutBtn" size="lg" padding="10px 20px" onClick={handleReturnToDesign}>
    //       RETURN TO DESIGN
    //     </Button>
    //   </Flex>
    // </Flex>
  );
};
export default ShoppingCartContainer;
