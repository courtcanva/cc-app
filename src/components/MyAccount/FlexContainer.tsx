import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const FlexContainer = ({ title, content }: any) => {
  return (
    <Flex
      height="100px"
      border="1px solid #B6B6B6"
      padding="0 52px"
      alignItems="center"
      marginBottom="-1px"
    >
      <Text variant="bodyFont" flex={1}>
        {title}
      </Text>
      <Box flex={1}>{content}</Box>
    </Flex>
  );
};

export default FlexContainer;
