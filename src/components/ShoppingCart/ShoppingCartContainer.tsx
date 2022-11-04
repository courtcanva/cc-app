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
import DeleteComfirmModal from "@/components/DeleteComfirmModal";
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
    // 记得改回去
    const orders_ = orders.map(item => {
      return {
        ...item,
        quotation: "100.00"
      }
    })
    dispatch(addOrderItems(orders_));
    dispatch(switchOrderGeneration(true));
  };

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
            <Tr>
              <Th>
                <Checkbox
                  paddingLeft="10px"
                  borderColor="#b3b2b2"
                  isChecked={allChecked}
                  isIndeterminate={isIndeterminate}
                  onChange={(e) => setCheckedItems(shoppingCart.map(() => e.target.checked))}
                >
                  All
                </Checkbox>
              </Th>
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

      <DeleteComfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => confirmDeleteDesign(cartItemIdToDelete)}
      />
    </Flex>
  );
};
export default ShoppingCartContainer;
