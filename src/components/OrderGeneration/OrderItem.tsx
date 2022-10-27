import { Grid, GridItem, Text, Box, Flex, Spacer, UnorderedList, ListItem } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import { ICartItem } from "@/interfaces/cartItem";

interface IOrderProps {
  item: ICartItem;
  index: number;
}

const OrderItem = ({ item, index }: IOrderProps) => {
  const {
    design: {
      designName,
      courtSize: { name, length, width, sideBorderWidth },
    },
    quotation,
    image,
  } = item;

  const lengthInMeter = (length + sideBorderWidth * 2) / 1000;
  const widthInMeter = (width + sideBorderWidth * 2) / 1000;

  return (
    <Grid
      templateColumns="5fr 7.84fr"
      templateRows="repeat(6, 1fr)"
      rounded="20px"
      height="420px"
      fontWeight="700"
      boxShadow="4px 4px 8px rgba(0, 0, 0, 0.25), -4px -4px 8px #EBECF0"
      maxWidth="1284px"
    >
      <GridItem
        colSpan={2}
        padding={{ base: "19px 16px", lg: "19px 46px", xl: "19px 76px" }}
        fontSize="24px"
        borderBottom="2px solid #EBECF0"
      >
        Qutation {index + 1}
      </GridItem>
      <GridItem
        rowSpan={5}
        padding={{ base: "44px 16px", lg: "44px 46px", xl: "44px 76px" }}
        borderRight="2px solid #EBECF0"
      >
        <Text fontSize="16px" marginBottom="25px">
          Design Preview
        </Text>
        <Box width="100%" height="217px" position="relative" borderWidth="2px">
          <Image src={image} alt="Court image" layout="fill" objectFit="contain" />
        </Box>
      </GridItem>
      <GridItem padding={{ base: "30px 14px", md: "30px 44px" }} borderBottom="2px solid #EBECF0">
        <Flex alignItems="center">
          <Text fontSize="16px" flex="2 1 0">
            Design Name
          </Text>
          <Spacer />
          <Text fontSize="14px" fontWeight="500" flex="1.6 1 0">
            {designName}
          </Text>
        </Flex>
      </GridItem>
      <GridItem padding={{ base: "30px 14px", md: "30px 44px" }} borderBottom="2px solid #EBECF0">
        <Flex alignItems="center">
          <Text fontSize="16px" flex="2 1 0">
            Quotation
          </Text>
          <Spacer />
          <Text fontSize="14px" fontWeight="500" flex="1.6 1 0">
            A${quotation}
          </Text>
        </Flex>
      </GridItem>
      <GridItem rowSpan={3} padding={{ base: "30px 16px", md: "30px 44px" }}>
        <Flex>
          <Text fontSize="16px" flex="2 1 0">
            Details
          </Text>
          <Spacer />
          <UnorderedList fontSize="14px" fontWeight="500" flex="1.6 1 0 " marginLeft="40px">
            <ListItem>
              Court material
              <br /> Tiles({lengthInMeter}m*{widthInMeter}m, {name})
            </ListItem>
            <ListItem>Shipping cost</ListItem>
            <ListItem>Installation fee</ListItem>
          </UnorderedList>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default OrderItem;
