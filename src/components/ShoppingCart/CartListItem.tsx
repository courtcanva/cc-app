import { Box, Button, Flex, Td, Tr, Text, Checkbox } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ICartItem } from "@/interfaces/cartItem";
import DropDownButton from "@/components/ShoppingCart/dropDownButton";
import { RiErrorWarningLine } from "react-icons/ri";
import Image from "next/image";

interface CartListItemProps {
  item: ICartItem;
  onDelete: (id: string) => void;
  checkedItems: boolean[];
  setCheckedItems: Dispatch<SetStateAction<boolean[]>>;
  index: number;
}

const CartListItem = ({
  item,
  onDelete,
  checkedItems,
  setCheckedItems,
  index,
}: CartListItemProps) => {
  const {
    design: { designName: productName, courtSize: courtDetail },
    quotation: quotation,
    image: image,
    isExpired,
  } = item;

  const handleCheckBox = () => {
    setCheckedItems(
      checkedItems.map((item, i) => {
        return index === i ? !item : item;
      })
    );
  };

  const columnStyle = {
    fontSize: "1vw",
    fontWeight: "700",
    marginTop: "1.5vw",
    color: "brand.primary",
  };
  return (
    <>
      <Tr alignItems="center" role="dataRow">
        <Td verticalAlign="top">
          {/* Todo: space for thumbnail images that implementing in the future. */}
          <Flex alignItems="center" marginLeft="1vw">
            {isExpired ? (
              <RiErrorWarningLine size="2.1vw" color="#F55252" data-testid="expired-icon" />
            ) : (
              <Checkbox
                borderColor="#DCDCDC"
                isChecked={checkedItems[index]}
                onChange={handleCheckBox}
              />
            )}
            <Box width="20vw" height="10vw" marginLeft="1vw" position="relative">
              {image && (
                <Image src={image} alt="Court image" layout="fill" objectFit="contain"></Image>
              )}
            </Box>
          </Flex>
        </Td>
        <Td verticalAlign="top" overflowX="auto">
          <Text style={columnStyle}>{productName}</Text>
          {isExpired && (
            <Text color="#F55252" fontSize="1vw" fontWeight="700" marginTop="3vw">
              Quotation has expired.
            </Text>
          )}
        </Td>
        <Td verticalAlign="top">
          <Box style={columnStyle}>
            <DropDownButton detail={courtDetail} />
          </Box>
        </Td>
        <Td verticalAlign="top">
          <Text style={columnStyle}>A${quotation}</Text>
        </Td>
        <Td verticalAlign="top">
          <Text style={columnStyle}>A${(parseFloat(quotation) * 0.02).toFixed(2)}</Text>
        </Td>
        <Td verticalAlign="top">
          <Button
            marginTop="1vw"
            right="3vw"
            fontSize="1.1vw"
            colorScheme="whiteAlpha"
            variant="unstyled"
            aria-label="cartDeleteBtn"
            onClick={() => {
              onDelete(item.id);
            }}
          >
            <FaTrashAlt />
          </Button>
        </Td>
      </Tr>
    </>
  );
};
export default CartListItem;
