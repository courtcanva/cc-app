import { Flex, Button, IconButton, Grid, Tooltip } from "@chakra-ui/react";
import { Menu, MenuButton } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { RiArrowGoBackLine, RiArrowGoForwardLine } from "react-icons/ri";
import { BsArrowCounterclockwise } from "react-icons/bs";
import Link from "next/link";
import HOME_PAGE_LINK from "@/constants/index";
import EditorDesignName from "@/components/NavBar/EditorDesignName";
import LoginModalContent from "../Login";
import { useEffect, useMemo, useState } from "react";
import { ActionCreators } from "redux-undo";
import { useDispatch } from "react-redux";
import { useStoreSelector } from "@/store/hooks";
import { initialState, updateUserInfo, UserState } from "@/store/reducer/userSlice";
import { fetchDesignData } from "@/redux/api/designApi";
import { designMapping } from "@/utils/designMapping";
import { getDesignsData } from "@/store/reducer/courtSpecDataSlice";
import { getDesignsTileData } from "@/store/reducer/designsTileListSlice";
import { defaultCourt, setDefaultCourt } from "@/store/reducer/courtSpecDataSlice";
import { defaultCourtColor, setDefaultCourtColor } from "@/store/reducer/tileSlice";
import { changeDesignNameList } from "@/store/reducer/designNameSlice";
import { useLoginModal } from "@/store/reducer/loginModalSlice";
import { googleUserMapping } from "@/utils/userMapping";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const { loginModalOpen } = useStoreSelector((state) => state.loginModal);

  // Get user info from local storage
  const getInfo = () => {
    if (typeof window !== "undefined") {
      const userInfo = JSON.parse(localStorage.getItem("UserInfo")!);
      return userInfo;
    }
    return;
  };

  const [loginData, setLoginData] = useState(getInfo());
  const [loginState, setLoginState] = useState(false);
  

  useMemo(async () => {
    if (loginData === null || loginData === undefined) {
      dispatch(updateUserInfo(initialState));
      dispatch(setDefaultCourt(defaultCourt));
      dispatch(setDefaultCourtColor(defaultCourtColor));
      dispatch(ActionCreators.clearHistory());
      dispatch(getDesignsData([]));
      dispatch(getDesignsTileData([]));
      return;
    }
    loginData.googleId?
      dispatch(updateUserInfo(googleUserMapping(loginData))) : dispatch(updateUserInfo(loginData));
    const design = loginData.googleId ? await fetchDesignData(loginData.googleId) : await fetchDesignData(loginData.userId) ;
    if (design.data === undefined) return;
    const { mappedDesignsData, mappedtileData, mappedNameList } = designMapping(design.data);
    dispatch(getDesignsData(mappedDesignsData));
    dispatch(getDesignsTileData(mappedtileData));
    dispatch(changeDesignNameList(mappedNameList));
  }, [loginData]);

  /* istanbul ignore next */
  const updateLoginData = (loginData: UserState) => {
    setLoginData(loginData);
    setLoginState(true);
  };

  /* istanbul ignore next */
  useEffect(() => {
    const userInfo = localStorage.getItem("UserInfo");
    userInfo && setLoginData(JSON.parse(userInfo));
    userInfo && setLoginState(true);
  }, []);

  const handleLoginModalOpen = () => {
    dispatch(useLoginModal(true));
  };
  const handleLoginModalClose = () => {
    dispatch(useLoginModal(false));
  };

  /* istanbul ignore next */
  const handleLogout = () => {
    localStorage.removeItem("UserInfo");
    setLoginData(null);
    setLoginState(false);
  };
  const handleUndo = () => {
    dispatch(ActionCreators.undo());
  };
  const handleRedo = () => {
    dispatch(ActionCreators.redo());
  };
  const handleReset = () => {
    dispatch(ActionCreators.jumpToPast(0));
  };

  const isThingsToUndo = useStoreSelector((state) => state.tile.past).length;
  const isThingsToRedo = useStoreSelector((state) => state.tile.future).length;
  const isThingsToReset = isThingsToUndo;

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      bg="background.primary"
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
          <Tooltip hasArrow shouldWrapChildren label="undo color edit" fontSize="sm">
            <IconButton
              aria-label="Revert edit"
              icon={<RiArrowGoBackLine />}
              variant="navbarIconBtn"
              disabled={!isThingsToUndo}
              onClick={handleUndo}
              marginX="10px"
            />
          </Tooltip>
          <Tooltip hasArrow shouldWrapChildren label="redo color edit" fontSize="sm">
            <IconButton
              aria-label="Forward edit"
              icon={<RiArrowGoForwardLine />}
              variant="navbarIconBtn"
              disabled={!isThingsToRedo}
              onClick={handleRedo}
              marginX="10px"
            />
          </Tooltip>
          <Tooltip hasArrow shouldWrapChildren label="reset all color edits" fontSize="sm">
            <IconButton
              aria-label="Reset edit"
              icon={<BsArrowCounterclockwise />}
              variant="navbarIconBtn"
              disabled={!isThingsToReset}
              onClick={handleReset}
              marginX="10px"
            />
          </Tooltip>
        </Flex>
      </Flex>
      <EditorDesignName />
      <Flex alignItems="center" justifyContent="flex-end">
        {!loginState ? (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="User information"
              icon={<FaRegUser />}
              variant="navbarIconBtn"
              bg="background.tertiary"
              color="brand.primary"
              marginRight="10px"
              isRound
              onClick={handleLoginModalOpen}
            ></MenuButton>
          </Menu>
        ) : (
          <Button onClick={handleLogout}>Sign out</Button>
        )}
        <LoginModalContent
          isOpen={loginModalOpen}
          onClose={handleLoginModalClose}
          updateLoginData={updateLoginData}
        ></LoginModalContent>
        <IconButton aria-label="Order" icon={<HiOutlineShoppingBag />} variant="navbarIconBtn" />
        <Button
          variant="shareBtn"
          marginLeft="10px"
          onClick={handleLoginModalOpen}
          data-testid="share-btn"
        >
          Share
        </Button>
      </Flex>
    </Grid>
  );
};

export default NavigationBar;
