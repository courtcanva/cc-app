import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Text,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import CartListItem from "./CartListItem";
import { ICartItem } from "@/interfaces/cartItem";
import DeleteComfirmModal from "@/components/DeleteComfirmModal";
import { useDeleteItemFromCartMutation } from "@/redux/api/cartApi";
import { WarningIcon } from "@chakra-ui/icons";

interface userCartList {
  shoppingCart: ICartItem[];
}

const ShoppingCartContainer = ({ shoppingCart }: userCartList) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteItemFromCart] = useDeleteItemFromCartMutation();

  const confirmDeleteDesign = (id: string) => {
    deleteItemFromCart(id);
    onClose();
  };
  const [cartItemIdToDelete, setCartItemIdToDelete] = useState("");

  const anyExpired = shoppingCart.filter((item) => item.isExpired).length;

  return (
    <Flex flexDirection="column" alignItems="center">
      <Text
        fontSize="32px"
        lineHeight="39px"
        fontWeight="700"
        color="brand.primary"
        marginTop="23px"
        marginBottom="20px"
      >
        Shopping Cart
      </Text>
      {anyExpired > 0 && (
        <Flex
          marginBottom="12px"
          padding="31px 24px"
          width="100%"
          backgroundColor="#F55252"
          alignItems="center"
        >
          <WarningIcon width="24px" height="24px" marginRight="25px" color="#FFFDFF" />
          <Text fontSize="18px" lineHeight="22px" fontWeight="700" color="#F5F5F5">
            Sorry, some product’s quotation has expired. Please edit your cart and try again. We’re
            apologize for any inconvenience caused.
          </Text>
        </Flex>
      )}

      <TableContainer minWidth="1080px" width="100%" overflowY="auto">
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
            {shoppingCart.map((cartRow) => (
              <CartListItem
                key={cartRow.id}
                item={cartRow}
                onDelete={(id) => {
                  setCartItemIdToDelete(id);
                  onOpen();
                }}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Button
        variant="shareBtn"
        size="lg"
        marginBottom="20px"
        marginTop="20px"
        width="200px"
        padding="10px"
        data-testid="checkout-btn"
      >
        Proceed to Checkout
      </Button>

      <DeleteComfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => confirmDeleteDesign(cartItemIdToDelete)}
      />
    </Flex>
  );
};
export default ShoppingCartContainer;
