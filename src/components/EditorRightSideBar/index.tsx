import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import rightSideBarItemList from "./RightSideBarItemList";
import { RIGHT_BAR_WIDTH } from "@/constants/designPage";

const EditorRightSideBar = () => {
  const itemNum = rightSideBarItemList.length;
  return (
    <Box
      bg="background.secondary"
      w={RIGHT_BAR_WIDTH}
      h="100vh"
      position="fixed"
      top="72px"
      right="0"
    >
      <Flex flexDirection="column" maxW={RIGHT_BAR_WIDTH} h="100%">
        {rightSideBarItemList.map((item) => (
          <React.Fragment key={item.id}>
            <Flex
              flex={item.id === itemNum ? 2 : 1}
              h={`${100 / (itemNum + 1)}%`}
              color="#FFFFFF"
              p="16px 10px"
            >
              {item.section}
            </Flex>
            {item.id !== itemNum && <Box bg="#ebecf0" h="1px" w="100%" />}
          </React.Fragment>
        ))}
      </Flex>
    </Box>
  );
};

export default EditorRightSideBar;
