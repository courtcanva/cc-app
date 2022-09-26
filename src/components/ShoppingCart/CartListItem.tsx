import { Box, Button, ButtonGroup, Flex, Td, Tr, Text } from "@chakra-ui/react";
import React from "react";
import { FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ICartItem } from "@/interfaces/cartItem";

interface CartListItemProps {
  item: ICartItem;
  onDelete: (id: string) => void;
}

const CartListItem = ({ item, onDelete }: CartListItemProps) => {
  // import cart information
  const productName = item.design.designName;
  const quotation = item.quotation;
  const quotationDetails = item.quotationDetails;
  const image = item.previewPic;

  return (
    <>
      <Tr alignItems="center" role="dataRow">
        <Td padding="20px 60px" sx={{ "vertical-align": "top" }} height="180px">
          {/* Todo: space for thumbnail images that implementing in the future. */}
          <Box width="90%" height="110px" backgroundColor="blue"></Box>
        </Td>
        <Td padding="25px" fontSize="13px" sx={{ "vertical-align": "top" }} overflowX="auto">
          {productName}
        </Td>
        <Td padding="25px" fontSize="13px" sx={{ "vertical-align": "top" }}>
          AU${quotation}
        </Td>
        <Td padding="25px 40px" fontSize="13px" sx={{ "vertical-align": "top" }}>
          <Flex width="100%" height="120px" flexDirection="column" justifyContent="space-between">
            <Text fontSize="13px" overflowX="auto">
              {JSON.stringify(quotationDetails)}
            </Text>
            <ButtonGroup display="flex" justifyContent="flex-end" variant="outline" spacing="4">
              <Button
                fontSize="16px"
                colorScheme="whiteAlpha"
                variant="unstyled"
                size="xs"
                aria-label="cartEditBtn"
              >
                <FaPen />
              </Button>
              <Button
                fontSize="18px"
                colorScheme="whiteAlpha"
                variant="unstyled"
                size="xs"
                aria-label="cartDeleteBtn"
                onClick={() => {
                  onDelete(item.id);
                }}
              >
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
