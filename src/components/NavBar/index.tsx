import { Flex, Button, IconButton, Grid, useDisclosure } from "@chakra-ui/react";
import { Menu, MenuButton } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { RiArrowGoBackLine, RiArrowGoForwardLine } from "react-icons/ri";
import Link from "next/link";
import HOME_PAGE_LINK from "@/constants/index";
import EditorDesignName from "@/components/NavBar/EditorDesignName";
import LoginModalContent from "../Login";
import { useEffect, useMemo, useState } from "react";
import { ActionCreators } from "redux-undo";
import { useDispatch } from "react-redux";
import { useStoreSelector } from "@/store/hooks";
import { defaultUser, initialState, updateUserInfo, UserState } from "@/store/reducer/userSlice";
import { fetchDesignData } from "@/redux/api/designApi";
import { designMapping } from "@/utils/designMapping";
import { defaultCourt, getDesignsData, setDefaultCourt } from "@/store/reducer/courtSpecDataSlice";
import { defaultTile, getDesignsTileData, setTileColor } from "@/store/reducer/tileSlice";
import { changeDesignNameList } from "@/store/reducer/designNameSlice";
import { IDesign } from "@/interfaces/design";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [designData, setDesignData] = useState<IDesign[]>([]);

  // Get user info from local storage
  const getInfo = () => {
    if (typeof window !== "undefined") {
      const userInfo = JSON.parse(localStorage.getItem("UserInfo")!);
      return userInfo;
    }
    return;
  };
  const [loginData, setLoginData] = useState(getInfo());  

  useMemo(async () => {
    if (loginData === null || loginData === undefined) {
      dispatch(updateUserInfo(initialState));
      dispatch(setDefaultCourt(defaultCourt));
      dispatch(setTileColor(defaultTile));
      dispatch(getDesignsData([]));
      dispatch(updateUserInfo(defaultUser));
      return;
    }
    dispatch(updateUserInfo(loginData));
    const design = await fetchDesignData(loginData.googleId);
    setDesignData(design.data);
  }, [loginData]);

  /* istanbul ignore next */
  
  useEffect(() => {
    if (designData === undefined) return;
    const { mappedDesignsData, mappedtileData, MappedNameList } = designMapping(designData);
    dispatch(getDesignsData(mappedDesignsData));
    dispatch(getDesignsTileData(mappedtileData));
    dispatch(changeDesignNameList(MappedNameList));
  }, [designData]);

  /* istanbul ignore next */
  const updateLoginData = (loginData: any) => {
    setLoginData(loginData);
  };

  /* istanbul ignore next */
  useEffect(() => {
    const userInfo = localStorage.getItem("UserInfo");
    userInfo && setLoginData(JSON.parse(userInfo));
  }, []);

  /* istanbul ignore next */
  const handleLogout = () => {
    localStorage.removeItem("UserInfo");
    setLoginData(null);
  };
  const handleUndo = () => {
    dispatch(ActionCreators.undo());
  };
  const handleRedo = () => {
    dispatch(ActionCreators.redo());
  };

  const isThingsToUndo = useStoreSelector((state) => state.tile.past).length;
  const isThingsToRedo = useStoreSelector((state) => state.tile.future).length;

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      bg="brand.primary"
      p={4}
      minW="768px"
      w="100vw"
      position="fixed"
    >
      <Flex alignItems="center">
        <Link href={HOME_PAGE_LINK} passHref>
          <Button leftIcon={<IoIosArrowBack />} pl="0" variant="navbarIconBtn">
            Home
          </Button>
        </Link>
        <Flex flex="1" justifyContent="center">
          <IconButton
            aria-label="Revert edit"
            icon={<RiArrowGoBackLine />}
            variant="navbarIconBtn"
            disabled={!isThingsToUndo}
            onClick={handleUndo}
          />
          <IconButton
            aria-label="Forward edit"
            icon={<RiArrowGoForwardLine />}
            variant="navbarIconBtn"
            disabled={!isThingsToRedo}
            onClick={handleRedo}
          />
        </Flex>
      </Flex>
      <EditorDesignName />
      <Flex alignItems="center" justifyContent="flex-end">
        {!loginData ? (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="User information"
              icon={<FaRegUser />}
              variant="navbarIconBtn"
              bg="white"
              color="black"
              marginRight="10px"
              isRound
              onClick={onOpen}
            ></MenuButton>
          </Menu>
        ) : (
          <Button onClick={handleLogout}>Sign out</Button>
        )}
        <LoginModalContent
          isOpen={isOpen}
          onClose={onClose}
          updateLoginData={updateLoginData}
        ></LoginModalContent>
        <IconButton aria-label="Order" icon={<HiOutlineShoppingBag />} variant="navbarIconBtn" />
        <Button variant="shareBtn" marginLeft="10px" onClick={onOpen} data-testid="share-btn">
          Share
        </Button>
      </Flex>
    </Grid>
  );
};

export default NavigationBar;
