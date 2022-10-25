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
      templateRows="repeat(6, 1fr)"
      templateColumns="repeat(3, 1fr)"
      rounded="2xl"
      height="420px"
      fontWeight="700"
      boxShadow="4px 4px 8px rgba(0, 0, 0, 0.25), -4px -4px 8px #EBECF0"
    >
      <GridItem
        colSpan={3}
        rowSpan={1}
        padding="19px 64px"
        fontSize="24px"
        borderBottom="1px #e2e1e1 solid"
      >
        Qutation {index + 1}
      </GridItem>
      <GridItem colSpan={1} rowSpan={5} padding="30px 64px" borderRight="1px #e2e1e1 solid">
        <Text fontSize="16px" marginBottom="25px">
          Design Preview
        </Text>
        <Box width="372px" height="217px" position="relative">
          <Image src={image} alt="Court image" layout="fill" objectFit="contain" />
        </Box>
      </GridItem>
      <GridItem colSpan={2} padding="30px 64px" borderBottom="1px #e2e1e1 solid">
        <Flex alignItems="center">
          <Text fontSize="16px" flex="2 1 0">
            Design Name
          </Text>
          <Spacer />
          <Text fontSize="14px" fontWeight="500!important" flex="1.2 1 0">
            {designName}
          </Text>
        </Flex>
      </GridItem>
      <GridItem colSpan={2} padding="30px 64px" borderBottom="1px #e2e1e1 solid">
        <Flex alignItems="center">
          <Text fontSize="16px" flex="2 1 0">
            Quotation
          </Text>
          <Spacer />
          <Text fontSize="14px" fontWeight="500!important" flex="1.2 1 0">
            AU${quotation}
          </Text>
        </Flex>
      </GridItem>
      <GridItem colSpan={2} rowSpan={3} padding="30px 64px ">
        <Flex>
          <Text fontSize="16px" flex="2 1 0">
            Details
          </Text>
          <Spacer />
          <UnorderedList fontSize="14px" fontWeight="500!important" flex="1.2 1 0 ">
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
