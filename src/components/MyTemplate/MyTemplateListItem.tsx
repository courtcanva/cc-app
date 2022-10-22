/* eslint-disable require-jsdoc */
import React from "react";
import { Flex, Box, Button, Heading, Text } from "@chakra-ui/react";

function MyTemplateListItem() {
  return (
    <Flex
      justifyContent="space-around"
      alignItems="center"
      width="100%"
      border="solid"
      padding="1rem"
    >
      <Box>preview picture</Box>
      <Heading mb={4}>Template Court Name</Heading>
      <Box>
        <Text>Created date</Text>
        <Text>Status</Text>
      </Box>
      <Flex flexDirection="column" gap="5px">
        <Button>Delete</Button>
        <Button>Take Down</Button>
      </Flex>
    </Flex>
  );
}

export default MyTemplateListItem;
