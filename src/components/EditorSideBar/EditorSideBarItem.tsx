import { Box, Text, Flex, Image } from "@chakra-ui/react";

const EditorSideBarItem = (props: any) => {
  return (
    <Box as="button" w="full" p="30px 7px">
      <Flex flexDirection="column" align="center" justify="flex-start">
        <Image
          w={props.icon_width}
          h={props.icon_height}
          src={props.icon_src}
          alt={props.item_text}
          color={props.icon_color}
        ></Image>
        <Text
          m="8px"
          as="span"
          color={props.text_color}
          fontSize="md"
          fontWeight="bold"
          lineHeight="19px"
        >
          {props.item_text}
        </Text>
      </Flex>
    </Box>
  );
};

export default EditorSideBarItem;
