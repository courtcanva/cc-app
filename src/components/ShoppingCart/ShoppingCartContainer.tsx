import { Table, Thead, Tbody, Tr, Th, TableContainer, Text, Button } from "@chakra-ui/react";
import CartListItem from "./CartListItem";
import { mockCartData } from "../MockData/MockCartData";

const ShoppingCartContainer = () => {
  return (
    <>
      <Text fontSize="18px" fontWeight="750" marginBottom="20px">
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
            {mockCartData.map((cartRow) => (
              <CartListItem
                key={cartRow.id}
                id={cartRow.id}
                courtName={cartRow.courtName}
                quotation={cartRow.quotation}
                quotationDetails={cartRow.quotationDetails}
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
        // textAlign="center"
        // alignContent="center"
      >
        Proceed to Checkout
      </Button>
    </>
  );
};
export default ShoppingCartContainer;
