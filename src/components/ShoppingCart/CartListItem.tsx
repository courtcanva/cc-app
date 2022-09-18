import { Box, Button, ButtonGroup, Flex, Td, Tr, Text } from "@chakra-ui/react";
import React from "react";
import { FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { CartData } from ".";

const CartListItem = (cartRow: CartData) => {
  // import cart information
  const productName = cartRow.content.courtName;
  const productQuotation = cartRow.content.quotation;
  const productDetails = cartRow.content.quotationDetails;

  return (
    <>
      <Tr alignItems="center">
        <Td padding="20px 60px" sx={{ "vertical-align": "top" }} height="180px">
          {/* preserve space for the Court image */}
          <Box width="90%" height="110px" backgroundColor="blue"></Box>
        </Td>
        <Td padding="25px" fontSize="13px" sx={{ "vertical-align": "top" }} overflowX="auto">
          {productName}
        </Td>
        <Td padding="25px" fontSize="13px" sx={{ "vertical-align": "top" }}>
          {productQuotation}
        </Td>
        <Td padding="25px 40px" fontSize="13px" sx={{ "vertical-align": "top" }}>
          <Flex width="100%" height="120px" flexDirection="column" justifyContent="space-between">
            <Text fontSize="13px" overflowX="auto">
              {productDetails}
            </Text>
            <ButtonGroup display="flex" justifyContent="flex-end" variant="outline" spacing="4">
              <Button fontSize="16px" colorScheme="whiteAlpha" variant="unstyled" size="xs">
                <FaPen />
              </Button>
              <Button fontSize="18px" colorScheme="whiteAlpha" variant="unstyled" size="xs">
                <MdDeleteForever />
              </Button>
            </ButtonGroup>
          </Flex>
        </Td>
      </Tr>
    </>
  );
};
export default CartListItem;
