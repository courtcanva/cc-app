import { Flex, Box, Text, Stack, Badge } from "@chakra-ui/react";
import Image from "next/image";
const MyOrderItem = ({ ...mergedItem }) => {
  return (
    <Flex key={mergedItem.design.designName} flexDirection="column" alignItems="center">
      <Flex width="85%" minHeight="150px">
        <Flex width="25%" alignItems="center" justifyContent="center">
          <Text>{mergedItem.design.designName}</Text>
        </Flex>
        <Flex flexDirection="column" width="50%" alignItems="center">
          <Box width="100%" height="100%" position="relative">
            <Image
              src={mergedItem.image}
              alt={`${mergedItem.design.designName} image`}
              layout="fill"
              objectFit="contain"
            ></Image>
          </Box>
          <Stack direction="row">
            <Badge backgroundColor="tag.courtCategory" fontSize={{ base: "10px", lg: "12px" }}>
              {mergedItem.design.courtSize.name}
            </Badge>
            <Badge backgroundColor="tag.courtType" fontSize={{ base: "10px", lg: "12px" }}>
              {mergedItem.design.courtType}
            </Badge>
          </Stack>
        </Flex>
        <Flex flexDirection="column" gap="10px" width="25%" justifyContent="center">
          <Flex flexDirection="column">
            <Text fontSize="12px" fontStyle="italic" fontWeight="300">
              Quotation
            </Text>
            <Text>{`A$${mergedItem.quotation}`}</Text>
          </Flex>
          <Flex flexDirection="column">
            <Text fontSize="14px" fontStyle="italic" fontWeight="300">
              Deposit
            </Text>
            <Text fontSize="20px">{`A$${(
              Number(mergedItem.quotation) * mergedItem.orderDepositRatio
            ).toFixed(2)}`}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default MyOrderItem;
