import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import rightSideBarItemList from "./RightSideBarItemList";

const EditorRightSideBar = () => {
  const itemNum = rightSideBarItemList.length;
  return (
    <Box bg="background.secondary" w="200px" h="100vh" position="fixed" top="72px" right="0">
      <Flex flexDirection="column" maxW="200px" h="100%">
        {rightSideBarItemList.map((item) => (
          <React.Fragment key={item.id}>
            <Flex
              flex={item.id === itemNum ? 2 : 1}
              h={`${100 / (itemNum + 1)}%`}
              color="white"
              p="20px 16px"
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
