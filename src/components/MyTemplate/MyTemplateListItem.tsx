/* eslint-disable require-jsdoc */
import React from "react";
import { Flex, Box, Button, Text, Grid } from "@chakra-ui/react";
import moment from "moment";

function MyTemplateListItem({ ...item }) {
  return (
    <Grid
      justifyContent="space-around"
      alignItems="center"
      margin="auto 20px"
      border="solid"
      padding="1rem"
      templateColumns="repeat(4, 1fr)"
      placeItems="center"
      // gap={6}
    >
      <Box>{item.image}</Box>
      <Flex flexDirection="column" maxWidth="15rem" overflow="hidden">
        <Text fontSize="xl" fontWeight={700} whiteSpace="pre-wrap" width="100%">
          {item.courtName}
        </Text>
        <Text>{item.description}</Text>
      </Flex>
      <Box>
        <Text>{moment(item.createdAt).format("DD/MM/YYYY")}</Text>
        <Text fontSize="sm" color={item.status === "published" ? "green" : "red"}>
          {item.status}
        </Text>
      </Box>
      <Flex gap="1rem" flexDirection="column">
        <Button colorScheme="teal" variant="outline" size="md">
          TAKE DOWN
        </Button>
        <Button size="md">DELETE</Button>
      </Flex>
    </Grid>
  );
}

export default MyTemplateListItem;
