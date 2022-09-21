import { Table, Thead, Tbody, Tr, Th, TableContainer, Text, Button, Flex } from "@chakra-ui/react";
import { userCartList } from ".";
import CartListItem from "./CartListItem";
import { useDispatch } from "react-redux";
import { switchCartDisplay } from "@/store/reducer/cartControlSlice";
import { keyBy } from "lodash";

const ShoppingCartContainer = ({ userShoppingCart }: userCartList) => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Text fontSize="18px" fontWeight="750" marginBottom="20px" marginTop="20px">
        CART
      </Text>
      <TableContainer min-width="1080px" width="100%" overflowY="auto">
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
                Quotation Detials
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {userShoppingCart.map((cartRow) => (
              <CartListItem
                key={cartRow.user_id}
                user_id={cartRow.user_id}
                design={cartRow.design}
                quotation={cartRow.quotation}
                quotationDetails={cartRow.quotationDetails}
                previewPic={cartRow.previewPic}
              />
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
  );
};
export default ShoppingCartContainer;
