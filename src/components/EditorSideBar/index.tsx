import EditorSideBarItem from "./EditorSideBarItem";
import sideBarItemList from "./const";
import { Box, Flex } from "@chakra-ui/react";

const EditorSideBar = () => {
  return (
    <Box bg="background.primary" w="98px" h="calc(100vh)" position="fixed" top="71px" left="0">
      <Flex align="center" justify="center" flexDirection="column" maxW="98px">
        {sideBarItemList.map((item) => (
          <EditorSideBarItem key={item.title} title={item.title} icon={item.icon} />
        ))}
      </Flex>
    </Box>
  );
};

export default EditorSideBar;
