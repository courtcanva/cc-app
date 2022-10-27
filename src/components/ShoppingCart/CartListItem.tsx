import { Box, Button, ButtonGroup, Flex, Td, Tr, Text, Checkbox, Center } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
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
        <Td padding="25px" sx={{ "vertical-align": "top" }} height="180px">
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
        <Td padding="25px" fontSize="13px" sx={{ "vertical-align": "top" }} overflowX="auto">
          {productName}
          {isExpired && (
            <Text
              color="#F55252"
              fontSize="16px"
              lineHeight="19px"
              fontWeight="700"
              marginTop="39px"
            >
              Quotation has expired.
            </Text>
          )}
        </Td>
        <Td padding="25px" fontSize="13px" sx={{ "vertical-align": "top" }}>
          AU${quotation}
        </Td>
        <Td padding="25px 40px" fontSize="13px" sx={{ "vertical-align": "top" }}>
          <Box width="100%" height="120px" flexDirection="column">
            <DropDownButton detail={courtDetail} />
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
                onClick={() => {
                  onDelete(item.id);
                }}
              >
                <MdDeleteForever />
              </Button>
            </ButtonGroup>
          </Box>
        </Td>
      </Tr>
    </>
  );
};
export default CartListItem;
