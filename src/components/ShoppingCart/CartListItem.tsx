import { Box, Button, Flex, Td, Tr, Text, Checkbox, Center } from "@chakra-ui/react";
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
    color: "#344C5C",
  };
  return (
    <>
      <Tr alignItems="center" role="dataRow">
        <Td sx={{ "vertical-align": "top" }}>
          {/* Todo: space for thumbnail images that implementing in the future. */}
          <Flex alignItems="center">
            <Center minWidth="57px">
              {isExpired ? (
                <RiErrorWarningLine size={36} color="#F55252" data-testid="expired-icon" />
              ) : (
                <Checkbox
                  borderColor="#DCDCDC"
                  isChecked={checkedItems[index]}
                  onChange={handleCheckBox}
                />
              )}
            </Center>
            <Box width="20vw" height="10vw" position="relative">
              {image && (
                <Image src={image} alt="Court image" layout="fill" objectFit="contain"></Image>
              )}
            </Box>
          </Flex>
        </Td>
        <Td sx={{ "vertical-align": "top" }} overflowX="auto">
          <Text style={columnStyle}>{productName}</Text>
          {isExpired && (
            <Text
              color="#F55252"
              fontSize="16px"
              lineHeight="4vw"
              fontWeight="700"
              marginTop="39px"
            >
              Quotation has expired.
            </Text>
          )}
        </Td>
        <Td sx={{ "vertical-align": "top" }}>
          <Box style={columnStyle}>
            <DropDownButton detail={courtDetail} />
          </Box>
        </Td>
        <Td sx={{ "vertical-align": "top" }}>
          <Text style={columnStyle}>A${quotation}</Text>
        </Td>
        <Td sx={{ "vertical-align": "top" }}>
          <Text style={columnStyle}>A${(parseFloat(quotation) * 0.02).toFixed(2)}</Text>
        </Td>
        <Td sx={{ "vertical-align": "top" }}>
          <Button
            marginTop="1.5vw"
            right="3vw"
            fontSize="1.25vw"
            colorScheme="whiteAlpha"
            variant="unstyled"
            size="xs"
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
