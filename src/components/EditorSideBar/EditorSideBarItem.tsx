import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import React from "react";
interface Props {
  key: string;
  title: string;
  icon: React.ReactNode;
}
const EditorSideBarItem = (props: Props) => {
  return (
    <Box as="button" role="group" w="full" p="30px 7px">
      <Flex flexDirection="column" align="center" justify="flex-start">
        <Icon
          w="24px"
          h="24px"
          _groupHover={{ color: "fontcolor.primary" }}
          color="fontcolor.secondary"
        >
          {props.icon}
        </Icon>
        <Text
          m={2}
          as="span"
          color="fontcolor.secondary"
          fontSize="md"
          fontWeight="bold"
          lineHeight="19px"
          _groupHover={{ color: "fontcolor.primary" }}
        >
          {props.title}
        </Text>
      </Flex>
    </Box>
  );
};

export default EditorSideBarItem;
