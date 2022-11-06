import { OrderDetails } from "@/interfaces/order";
import { Grid, GridItem, Flex, Text } from "@chakra-ui/react";

interface Props {
  orderDetails: OrderDetails;
}

const Failure = (props: Props) => {
  const { orderDetails } = props;
  return (
    <Grid
      width="60%"
      height="45%"
      templateColumns="minmax(140px, 2fr) minmax(140px, 2fr) minmax(80px, 1fr)"
      templateRows="1fr 1fr"
      lineHeight={1.2}
      columnGap="2rem"
      rowGap="0.8rem"
    >
      <GridItem paddingTop="1rem">
        <Text fontSize={{ base: "0.6rem", lg: "0.8rem" }} fontStyle="italic" fontWeight="250">
          Order ID
        </Text>
        <Text minWidth="100%" fontSize={{ base: "0.8rem", lg: "1rem" }} fontWeight="700">
          {orderDetails?.orderId}
        </Text>
      </GridItem>
      <GridItem rowSpan={2}>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          height="100%"
          paddingBottom="1rem"
        >
          <Text fontSize={{ base: "0.6rem", lg: "0.8rem" }} fontStyle="italic" fontWeight="250">
            Created at
          </Text>
          <Text fontSize={{ base: "0.8rem", lg: "1rem" }} fontWeight="700">
            {orderDetails?.createdAt}
          </Text>
        </Flex>
      </GridItem>
      <GridItem rowSpan={2}>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          height="100%"
          paddingBottom="1rem"
        >
          <Text fontSize={{ base: "0.6rem", lg: "0.8rem" }} fontStyle="italic" fontWeight="250">
            Deposit
          </Text>
          <Text fontSize={{ base: "0.8rem", lg: "1rem" }} fontWeight="700">
            A${orderDetails?.amount}
          </Text>
        </Flex>
      </GridItem>
      <GridItem>
        <Text fontSize={{ base: "0.6rem", lg: "0.8rem" }} fontStyle="italic" fontWeight="250">
          Status
        </Text>
        <Text fontSize="1rem" fontWeight="700" color="#d64543">
          Unpaid
        </Text>
      </GridItem>
    </Grid>
  );
};

export default Failure;
