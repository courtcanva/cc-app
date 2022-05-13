import { Box, Icon, Text, Flex } from "@chakra-ui/react";

const SideBarItem = (props: any) => {
  return (
    <a data-testid={props.item_text}>
      <Box w="100%" p="32px 7px">
        <Flex flexDirection="column" align="center" justify="flex-start">
          <Icon
            viewBox={props.item_viewBox}
            fill="none"
            boxSize="28px"
            xmlns="http://www.w3.org/2000/svg"
            color="#C8C5C5"
          >
            {props.children}
          </Icon>
          <Text
            m="8px"
            as="span"
            fontSize="16px"
            fontWeight="700"
            lineHeight="19.4px"
            color="#C8C5C5"
          >
            {props.item_text}
          </Text>
        </Flex>
      </Box>
    </a>
  );
};

export default SideBarItem;
