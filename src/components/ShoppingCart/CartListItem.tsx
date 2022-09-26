import { Box, Button, ButtonGroup, Flex, Td, Tr, Text } from "@chakra-ui/react";
import React from "react";
import { FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ICartItem } from "@/interfaces/cartItem";
import DropDownButton from "./dropDownButton";

const CartListItem = (props: ICartItem) => {
  // import cart information
  const productName = props.design.designName;
  const quotation = props.quotation;
  const quotationDetails = props.quotationDetails;
  const image = props.previewPic;

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
            <DropDownButton content={JSON.stringify(quotationDetails)} />
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
