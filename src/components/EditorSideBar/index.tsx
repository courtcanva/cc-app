import EditorSideBarItem from "./EditorSideBarItem";
import sideBarItemList from "./const";
import { Box, Flex } from "@chakra-ui/react";
import EditorSideBarContent from "./EditorSideBarContent";
import { useState } from "react";

const EditorSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [iconClick, setIconClick] = useState("");

  const handleIconClick = (title: string) => {
    setIsOpen(true);
    setIconClick(title);
  };
  const handleCloseClick = () => {
    setIsOpen(false);
    setIconClick("");
  };

  return (
    <Box>
      <Box bg="background.primary" w="98px" h="100vh" position="fixed" top="72px" left="0">
        <Flex align="center" justify="center" flexDirection="column" maxW="98px">
          {sideBarItemList.map((item) => (
            <EditorSideBarItem
              key={item.title}
              title={item.title}
              icon={item.icon}
              onHandleIconClick={() => handleIconClick(item.title)}
              iconClick={iconClick}
            />
          ))}
        </Flex>
      </Box>
      {isOpen && (
        <EditorSideBarContent iconClick={iconClick} onHandleCloseClick={handleCloseClick} />
      )}
    </Box>
  );
};

export default EditorSideBar;
