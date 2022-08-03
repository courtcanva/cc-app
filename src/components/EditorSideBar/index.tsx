import EditorSideBarItem from "./EditorSideBarItem";
import sideBarItemList from "./SideBarItemList";
import { Box, Flex } from "@chakra-ui/react";
import EditorSideBarContent from "./EditorSideBarContent";
import { useEffect, useState } from "react";
import { useStoreSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { useLoginModal } from "@/store/reducer/loginModalSlice";

const EditorSideBar = () => {
  const dispatch = useDispatch();
  const { googleId } = useStoreSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [iconClickTitle, setIconClick] = useState("");
  const [checkUser, setCheckUser] = useState(googleId);

  useEffect(() => {
    setCheckUser(googleId);
  }, [googleId]);

  const handleIconClick = (title: string) => {
    if (iconClickTitle === title && isOpen) {
      setIsOpen(false);
      setIconClick("");
      return;
    }
    if (title === "Folder" && checkUser === "") {
      setIsOpen(false);
      setIconClick("");
      dispatch(useLoginModal(true));
      return;
    }
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
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          maxW="98px"
          h="calc(100% - 305px)"
        >
          {sideBarItemList.map((item) => (
            <EditorSideBarItem
              key={item.title}
              title={item.title}
              icon={item.icon}
              onHandleIconClick={() => handleIconClick(item.title)}
              iconClickTitle={iconClickTitle}
            />
          ))}
        </Flex>
      </Box>
      {isOpen && (
        <EditorSideBarContent
          iconClickTitle={iconClickTitle}
          onHandleCloseClick={handleCloseClick}
        />
      )}
    </Box>
  );
};

export default EditorSideBar;
