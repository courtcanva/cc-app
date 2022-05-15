import { Box, Text, Flex, Icon} from "@chakra-ui/react";
import React from "react";
interface Props {
  key: string;
  item_text: string;
  icon_svg: React.FC
}
const EditorSideBarItem = (props: Props) => {
  return (
    <Box as="button" role="group" w="full" p="30px 7px">
    <Flex flexDirection="column" align="center" justify="flex-start">
      <Icon as={props.icon_svg}
        _groupHover={{ color: "fontcolor.primary" }}
        color="fontcolor.secondary"
        w="28px"
        h="28px"
      />
      <Text
        m={2}
        as="span"
        color="fontcolor.secondary"
        fontSize="md"
        fontWeight="bold"
        lineHeight="19px"
        _groupHover={{ color: "fontcolor.primary" }}
      >
        {props.item_text}
      </Text>
    </Flex>
  </Box>
  );
};

export default EditorSideBarItem;
