import { Box, Button, Flex, Td, Tr, Text, Checkbox, Center } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
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
      <Tr alignItems="center" role="dataRow">
        <Td sx={{ "vertical-align": "top" }} height="180px">
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
            <Box width="340px" height="140px" position="relative">
              {image && (
                <Image src={image} alt="Court image" layout="fill" objectFit="contain"></Image>
              )}
            </Box>
          </Flex>
        </Td>
        <Td
          fontSize="14px"
          fontWeight="700"
          lineHeight="40px"
          color="#344C5C"
          fontStyle="normal"
          sx={{ "vertical-align": "top" }}
          overflowX="auto"
        >
          {productName}
          {isExpired && (
            <Text
              color="#F55252"
              fontSize="16px"
              lineHeight="40px"
              fontWeight="700"
              marginTop="39px"
            >
              Quotation has expired.
            </Text>
          )}
        </Td>
        <Td
          fontSize="14px"
          fontWeight="700"
          color="#344C5C"
          fontStyle="normal"
          sx={{ "vertical-align": "top" }}
        >
          <Box width="100%" flexDirection="column">
            <DropDownButton detail={courtDetail} />
          </Box>
        </Td>
        <Td
          fontSize="16px"
          fontWeight="700"
          lineHeight="40px"
          color="#344C5C"
          fontStyle="normal"
          sx={{ "vertical-align": "top" }}
        >
          A${quotation}
        </Td>
        <Td
          fontSize="16px"
          fontWeight="700"
          lineHeight="40px"
          color="#344C5C"
          fontStyle="normal"
          sx={{ "vertical-align": "top" }}
        >
          A${parseFloat(quotation) * 0.2}
          <Button
            height="39px"
            float="right"
            fontSize="23px"
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
