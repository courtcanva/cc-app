/* eslint-disable require-jsdoc */
import React from "react";
import { Flex, Box, Button, Text, Grid, Stack, Badge } from "@chakra-ui/react";
import moment from "moment";
import { MdDeleteOutline, MdRemoveRedEye } from "react-icons/md";
import Image from "next/image";

function MyTemplateListItem({ ...item }) {
  console.log(item.image);
  return (
    <Grid
      justifyContent="space-around"
      alignItems="center"
      width="1200px"
      margin="auto 120px"
      padding="1rem"
      placeItems="center"
      templateColumns="45% 30% 25%"
      rounded="2xl"
      height="300px"
      fontWeight="700"
      boxShadow="4px 4px 8px rgba(0, 0, 0, 0.25), -4px -4px 8px #EBECF0"
      data-testid="templateListItems"
    >
      <Flex
        borderRight="2px solid #EBECF0"
        fontSize="2rem"
        fontWeight="500"
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        color="#000"
      >
        <Box width="80%" height="100%" textAlign="center" position="relative">
          <Image src={item.image} alt="Court image" layout="fill" objectFit="contain"></Image>
        </Box>
      </Flex>
      <Flex
        flexDirection="column"
        maxWidth="15rem"
        overflow="hidden"
        height="100%"
        gap="10px"
        position="relative"
      >
        <Text
          fontSize="24px"
          fontWeight={700}
          whiteSpace="pre-wrap"
          width="100%"
          color="#344C5C"
          paddingTop="1rem"
        >
          {item.courtName}
        </Text>
        <Stack direction="row" marginTop="00px">
          <Badge backgroundColor="tag.courtCategory" fontSize="12px">
            {item.tags.CourtCategory}
          </Badge>
          <Badge backgroundColor="tag.courtType" fontSize="12px">
            {item.tags.CourtType}
          </Badge>
        </Stack>
        <Box>
          <Text fontSize="xs" fontWeight="300" lineHeight="15px" fontStyle="italic">
            Status
          </Text>
          <Text
            marginTop="0"
            fontSize="16px"
            lineHeight="20px"
            color={item.status === "published" ? "CourtSizecolor.btc" : "fontcolor.quaternary"}
          >
            {item.status}
          </Text>
        </Box>
        <Box>
          <Text fontSize="xs" fontWeight="300" fontStyle="italic">
            Created at
          </Text>
          <Text fontSize="16px">{moment(item.createdAt).format("DD/MM/YYYY")}</Text>
        </Box>
        <Text
          fontSize="xs"
          fontWeight="400"
          marginTop="12px"
          textOverflow="ellipsis
        "
        >
          {item.description}
        </Text>
      </Flex>

      <Flex gap="28px" flexDirection="column">
        <Button leftIcon={<MdDeleteOutline />} variant="deleteBtn">
          Delete
        </Button>
        <Button leftIcon={<MdRemoveRedEye />} variant="displayBtn">
          Undisplayed
        </Button>
      </Flex>
    </Grid>
  );
}

export default MyTemplateListItem;
