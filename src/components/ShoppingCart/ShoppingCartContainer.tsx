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

interface userCartList {
  userShoppingCart: ICartItem[];
}

const ShoppingCartContainer = ({ userShoppingCart }: userCartList) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteItemFromCart] = useDeleteItemFromCartMutation();

  const confirmDeleteDesign = (id: string) => {
    deleteItemFromCart(id);
    onClose();
  };
  const [cartItemIdToDelete, setCartItemIdToDelete] = useState("");

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
                key={cartRow.id}
                item={cartRow}
                onDelete={(id) => {
                  setCartItemIdToDelete(id);
                  onOpen();
                }}
                // id={cartRow.id}
                // key={cartRow.user_id}
                // user_id={cartRow.user_id}
                // design={cartRow.design}
                // quotation={cartRow.quotation}
                // quotationDetails={cartRow.quotationDetails}
                // previewPic={cartRow.previewPic}
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

      <DeleteComfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => confirmDeleteDesign(cartItemIdToDelete)}
      />
    </Flex>
  );
};
export default ShoppingCartContainer;
