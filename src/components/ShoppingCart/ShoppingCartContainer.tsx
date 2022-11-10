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
  Checkbox,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import CartListItem from "./CartListItem";
import { ICartItem } from "@/interfaces/cartItem";
import ConfirmModal from "@/components/ComfirmModal";
import { useDeleteItemFromCartMutation } from "@/redux/api/cartApi";
import { RiErrorWarningLine } from "react-icons/ri";
import { deleteImage } from "@/utils/manageExternalImage";
import { addOrderItems } from "@/store/reducer/orderSlice";
import { useDispatch } from "react-redux";
import { switchOrderGeneration } from "@/store/reducer/buttonToggleSlice";

interface userCartList {
  shoppingCart: ICartItem[];
}

const ShoppingCartContainer = ({ shoppingCart }: userCartList) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteItemFromCart] = useDeleteItemFromCartMutation();

  const confirmDeleteDesign = (id: string) => {
    deleteItemFromCart(id);
    onClose();
    const imageUrl = shoppingCart.find((cartItem) => {
      return cartItem.id === id;
    })?.image;
    if (imageUrl) deleteImage(imageUrl);
  };
  const [cartItemIdToDelete, setCartItemIdToDelete] = useState("");
  const anyExpired = shoppingCart.some((item) => item.isExpired);

  const [checkedItems, setCheckedItems] = useState(shoppingCart.map(() => false));
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const handleCreateOrder = () => {
    const orders = shoppingCart.filter((e, index) => checkedItems[index]);
    dispatch(addOrderItems(orders));
    dispatch(switchOrderGeneration(true));
  };

  return (
    <Flex flexDirection="column" alignItems="center" marginLeft="78px" marginRight="78px">
      <Text
        fontSize="32px"
        lineHeight="40px"
        fontWeight="700"
        fontStyle="normal"
        color="#344C5C"
        marginTop="20px"
        marginBottom="42px"
      >
        Shopping Cart
      </Text>
      {anyExpired && (
        <Flex padding="31px 24px" width="100%" backgroundColor="#F55252" justifyContent="center">
          <RiErrorWarningLine size={24} color="#FFFDFF" />
          <Text
            fontSize="18px"
            lineHeight="22px"
            fontWeight="700"
            marginLeft="25px"
            color="#F5F5F5"
          >
            Sorry, some product’s quotation has expired. Please edit your cart and try again. We
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
            <Tr backgroundColor="#E2E8F0" height="80px">
              <Th width="350px">
                <Checkbox
                  paddingLeft="21px"
                  borderColor="#b3b2b2"
                  isChecked={allChecked}
                  isIndeterminate={isIndeterminate}
                  onChange={(e) => setCheckedItems(shoppingCart.map(() => e.target.checked))}
                >
                  <Text
                    fontStyle="normal"
                    fontSize="20px"
                    fontWeight="700"
                    lineHeight="28px"
                    color="#000000"
                    sx={{ "text-transform": "capitalize" }}
                    marginLeft="23px"
                  >
                    All
                  </Text>
                </Checkbox>
              </Th>
              <Th
                fontStyle="normal"
                fontSize="20px"
                fontWeight="700"
                lineHeight="28px"
                color="#000000"
                sx={{ "text-transform": "capitalize" }}
                width="200px"
              >
                Product
              </Th>
              <Th
                fontStyle="normal"
                fontSize="20px"
                fontWeight="700"
                lineHeight="28px"
                color="#000000"
                sx={{ "text-transform": "capitalize" }}
                width="300px"
              >
                Quotation Details
              </Th>
              <Th
                fontStyle="normal"
                fontSize="20px"
                fontWeight="700"
                lineHeight="28px"
                color="#000000"
                sx={{ "text-transform": "capitalize" }}
              >
                Quotation
              </Th>
              <Th
                fontStyle="normal"
                fontSize="20px"
                fontWeight="700"
                lineHeight="28px"
                color="#000000"
                sx={{ "text-transform": "capitalize" }}
              >
                Deposit
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {shoppingCart.map((cartRow, index) => (
              <CartListItem
                key={cartRow.id}
                item={cartRow}
                onDelete={(id) => {
                  setCartItemIdToDelete(id);
                  onOpen();
                }}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                index={index}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Tooltip label="Please select items" isDisabled={checkedItems.some(Boolean)}>
        <Box>
          <Button
            variant="shareBtn"
            marginBottom="20px"
            marginTop="20px"
            width="160px"
            padding="10px"
            data-testid="checkout-btn"
            onClick={handleCreateOrder}
            isDisabled={!checkedItems.some(Boolean)}
          >
            Create Order
          </Button>
        </Box>
      </Tooltip>

      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => confirmDeleteDesign(cartItemIdToDelete)}
        buttonText="Remove"
        alertText="remove this item from the shopping cart"
      />
    </Flex>
  );
};
export default ShoppingCartContainer;
