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
import { switchCartDisplay, switchOrderGeneration } from "@/store/reducer/buttonToggleSlice";

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
    <Flex flexDirection="column" alignItems="center" width="100vw">
      <Text variant="headerFont" marginTop="2vh" marginBottom="5vh">
        Shopping Cart
      </Text>
      <TableContainer minWidth="922px" maxWidth="1728px" width="90vw" overflowY="auto">
        {anyExpired && (
          <Flex padding="1.5%" width="100%" backgroundColor="#F55252" justifyContent="center">
            <RiErrorWarningLine
              size="1.5%"
              style={{ marginTop: "auto", marginBottom: "auto" }}
              color="#FFFDFF"
            />
            <Text variant="textFont" marginLeft="1%" color="#F5F5F5">
              Sorry, some quotation has expired. Please edit your cart and try again. We apologize
              for any inconvenience caused.
            </Text>
          </Flex>
        )}
        <Table
          variant="simple"
          border="1px"
          borderColor="#DCDCDC"
          size="lg"
          sx={{ "table-layout": "fixed" }}
        >
          <Thead height={{ base: "48px", lg: "64px", xl: "80px" }}>
            <Tr backgroundColor="#E2E8F0">
              <Th width="22%">
                <Checkbox
                  isDisabled={anyExpired}
                  paddingLeft="1%"
                  borderColor="#b3b2b2"
                  isChecked={!anyExpired ? allChecked : false}
                  isIndeterminate={isIndeterminate}
                  onChange={
                    !anyExpired
                      ? (e) => setCheckedItems(shoppingCart.map(() => e.target.checked))
                      : () => null
                  }
                >
                  <Text variant="bodyFont" color="#000000" marginLeft="70%">
                    All
                  </Text>
                </Checkbox>
              </Th>
              <Th width="16%">
                <Text variant="bodyFont" color="#000000">
                  Product
                </Text>
              </Th>
              <Th width="24%">
                <Text variant="bodyFont" color="#000000">
                  Quotation Details
                </Text>
              </Th>
              <Th width="17%">
                <Text variant="bodyFont" color="#000000">
                  Quotation
                </Text>
              </Th>
              <Th width="17%">
                <Text variant="bodyFont" color="#000000">
                  Deposit
                </Text>
              </Th>
              <Th width="4%"></Th>
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
      <Flex gap="100px" marginTop="44px" marginBottom="32px" justifyContent="center">
        <Button
          padding="10px 24px"
          fontSize="lg"
          fontWeight="700"
          borderWidth="1px"
          borderColor="brand.primary"
          backgroundColor="#F3F2F7"
          data-testid="back-btn"
          onClick={() => dispatch(switchCartDisplay())}
        >
          Back
        </Button>
        <Tooltip label="Please select items" isDisabled={checkedItems.some(Boolean)}>
          <Box>
            <Button
              variant="shareBtn"
              padding="10px 24px"
              fontWeight="700"
              data-testid="checkout-btn"
              onClick={handleCreateOrder}
              isDisabled={!checkedItems.some(Boolean)}
            >
              Place Order
            </Button>
          </Box>
        </Tooltip>
      </Flex>
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
