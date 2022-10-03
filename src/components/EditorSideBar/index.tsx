import EditorSideBarItem from "./EditorSideBarItem";
import sideBarItemList from "./SideBarItemList";
import { Link, Box, Flex } from "@chakra-ui/react";
import EditorSideBarContent from "./EditorSideBarContent";
import { useEffect, useState } from "react";
import { useStoreSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { useLoginModal } from "@/store/reducer/loginModalSlice";
import { AiOutlineTeam } from "react-icons/ai";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { switchSideBar } from "@/store/reducer/designPageButtonSlice";

const EditorSideBar = () => {
  const dispatch = useDispatch();
  const { userId } = useStoreSelector((state) => state.user);
  const { sideBar } = useStoreSelector((state) => state.designPageButton);
  const [iconClickTitle, setIconClick] = useState("");

  useEffect(() => {
    if (iconClickTitle === "Folder" && userId === "") {
      dispatch(switchSideBar(false));
    }
  }, [userId]);

  useEffect(() => {
    sideBar || setIconClick("");
  }, [sideBar]);

  const handleIconClick = (title: string) => {
    if (title === "Folder" && userId === "") {
      dispatch(switchSideBar(false));
      dispatch(useLoginModal(true));
      return;
    }
    if (title === iconClickTitle) {
      dispatch(switchSideBar(false));
      return;
    }
    dispatch(switchSideBar(true));
    setIconClick(title);
  };

  const handleCloseClick = () => {
    dispatch(switchSideBar(false));
  };

  return (
    <Box>
      <Box bg="background.secondary" w="98px" h="100vh" position="fixed" top="72px" left="0">
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
        <Flex
          flexDirection="column"
          alignItems="center"
          margin="180px auto 0 auto"
          color="fontcolor.primary"
          fontSize="x-small"
          fontWeight="bold"
        >
          <AiOutlineTeam size="24px" />
          <Link href="/team">
            Our Team <ExternalLinkIcon mx="2px" />
          </Link>
        </Flex>
      </Box>

      {sideBar && (
        <EditorSideBarContent
          iconClickTitle={iconClickTitle}
          onHandleCloseClick={handleCloseClick}
        />
      )}
    </Box>
  );
};

export default EditorSideBar;
