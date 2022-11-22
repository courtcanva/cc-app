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

  return (
    <>
      <Tr alignItems="center" role="dataRow" height={{ base: "90px", lg: "135px", xl: " 180px" }}>
        <Td verticalAlign="top">
          {/* Todo: space for thumbnail images that implementing in the future. */}
          <Flex alignItems="center" paddingLeft="1%">
            {isExpired ? (
              <RiErrorWarningLine size="25px" color="#F55252" data-testid="expired-icon" />
            ) : (
              <Checkbox
                borderColor="#DCDCDC"
                isChecked={checkedItems[index]}
                onChange={handleCheckBox}
              />
            )}
            <Box
              width={{ base: "140px", lg: "210px", xl: "280px" }}
              height={{ base: "70px", lg: "105px", xl: "140px" }}
              marginLeft="5%"
              position="relative"
            >
              {image && (
                <Image src={image} alt="Court image" layout="fill" objectFit="contain"></Image>
              )}
            </Box>
          </Flex>
        </Td>
        <Td verticalAlign="top" overflowX="auto">
          <Text variant="textFont">{productName}</Text>
          {isExpired && (
            <Text variant="textFont" color="#F55252" marginTop="40%">
              Quotation expired
            </Text>
          )}
        </Td>
        <Td verticalAlign="top">
          <DropDownButton detail={courtDetail} />
        </Td>
        <Td verticalAlign="top">
          <Text variant="textFont">A${quotation}</Text>
        </Td>
        <Td verticalAlign="top">
          <Text variant="textFont">A${(parseFloat(quotation) * 0.02).toFixed(2)}</Text>
        </Td>
        <Td verticalAlign="top">
          <Button
            marginTop={{ base: "22px", lg: "33px", xl: "44px" }}
            right={{ base: "22px", lg: "33px", xl: "44px" }}
            fontSize={{ base: "10px", lg: "15px", xl: "20px" }}
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
