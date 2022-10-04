import { Box, Button, ButtonGroup, Flex, Td, Tr, Text } from "@chakra-ui/react";
import React from "react";
import { FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ICartItem } from "@/interfaces/cartItem";
import DropDownButton from "@/components/ShoppingCart/dropDownButton";
import { WarningIcon } from "@chakra-ui/icons";

interface CartListItemProps {
  item: ICartItem;
  onDelete: (id: string) => void;
}

const CartListItem = ({ item, onDelete }: CartListItemProps) => {
  const {
    design: { designName: productName },
    quotation: quotation,
    quotationDetails: quotationDetails,
  } = item;
  const image = item.previewPic;
  const isExpire = true;
  // const expired = { isExpire };
  // todo: link to mockdata

  return (
    <>
      <Tr alignItems="center" role="dataRow">
        <Td padding="20px 60px" sx={{ "vertical-align": "top" }} height="180px">
          {/* Todo: space for thumbnail images that implementing in the future. */}
          <Flex flexDirection="row" alignItems="center" justifyContent="flex-end">
            <Box paddingRight="40px">
              {isExpire ? <WarningIcon style={{ color: "red", fontSize: "25px" }} /> : null}
            </Box>
            <Box width="250px" height="110px" backgroundColor="blue"></Box>
          </Flex>
        </Td>
        <Td padding="25px" fontSize="13px" sx={{ "vertical-align": "top" }} overflowX="auto">
          {productName}
          <Flex
            color="#ff4d4d"
            fontSize="18px"
            fontWeight="semibold"
            style={{ padding: "20px 0 20px 0" }}
          >
            {isExpire ? "Quotation has expired." : null}
          </Flex>
        </Td>
        <Td padding="25px" fontSize="13px" sx={{ "vertical-align": "top" }}>
          AU${quotation}
        </Td>
        <Td padding="25px 40px" fontSize="13px" sx={{ "vertical-align": "top" }}>
          <Box width="100%" height="120px" flexDirection="column">
            <DropDownButton detail={quotationDetails} />
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
          </Box>
        </Td>
      </Tr>
    </>
  );
};
export default CartListItem;
