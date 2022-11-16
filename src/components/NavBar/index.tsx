import { Flex, Button, IconButton, Grid, Tooltip, Box, useDisclosure } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { RiArrowGoBackLine, RiArrowGoForwardLine } from "react-icons/ri";
import { BsArrowCounterclockwise } from "react-icons/bs";
import Link from "next/link";
import HOME_PAGE_LINK from "@/constants/index";
import EditorDesignName from "@/components/NavBar/EditorDesignName";
import LoginModalContent from "../Login";
import ShoppingCartButton from "./ShoppingCartButton";
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
import { userData } from "@/store/reducer/userSlice";
import { useGetItemQuantityQuery } from "@/redux/api/cartApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import useAuthRequest from "../Login/helpers/authRequest";
import {
  switchSideBar,
  switchLoginModal,
  switchCreateTemplate,
} from "@/store/reducer/buttonToggleSlice";
import { useHandleLocalStorageItem } from "@/hooks/useHandleLocalStorage";
import CreateTemplate from "../CreateTemplate";
import Profile from "./Profile";
import { useRouter } from "next/router";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const { isCartOpen, isLoginModalOpen, isCreateTemplateOpen, isMyTemplateOpen, isSwitch3D } =
    useStoreSelector((state) => state.buttonToggle);
  const { userLogout, updateToken } = useAuthRequest();
  const { getLocalStorageItem } = useHandleLocalStorageItem();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  // Get user info from local storage
  const getInfo = () => {
    return getLocalStorageItem("UserInfo");
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
    dispatch(updateUserInfo(loginData));
    const design = await fetchDesignData(loginData.userId);
    if (design.data === undefined) return;
    const { mappedDesignsData, mappedTileData, mappedNameList } = designMapping(design.data);
    dispatch(getDesignsData(mappedDesignsData));
    dispatch(getDesignsTileData(mappedTileData));
    dispatch(changeDesignNameList(mappedNameList));
  }, [loginData]);

  /* istanbul ignore next */
  const updateLoginData = (loginData: UserState) => {
    setLoginData(loginData);
    setLoginState(true);
  };

  const updateUserInfoInStorage = async () => {
    await updateToken();
  };
  /* istanbul ignore next */
  useEffect(() => {
    updateUserInfoInStorage().then(() => {
      const userInfo = localStorage.getItem("UserInfo");
      userInfo ? setLoginData(JSON.parse(userInfo)) : setLoginData(null);
      userInfo ? setLoginState(true) : setLoginState(false);
    });
  }, []);

  const handleLoginModalOpen = () => {
    dispatch(switchLoginModal(true));
  };
  const handleLoginModalClose = () => {
    dispatch(switchLoginModal(false));
  };

  /* istanbul ignore next */
  const handleLogout = () => {
    userLogout(loginData.userId);
    setLoginData(null);
    setLoginState(false);
    onClose();
  };

  const handleUndo = () => {
    dispatch(switchSideBar(false));
    dispatch(ActionCreators.undo());
  };
  const handleRedo = () => {
    dispatch(switchSideBar(false));
    dispatch(ActionCreators.redo());
  };
  const handleReset = () => {
    dispatch(switchSideBar(false));
    dispatch(ActionCreators.jumpToPast(0));
  };

  const handleCreateTemplateOpen = () => {
    router.push("/");
    dispatch(switchCreateTemplate(true));
  };
  const handleCreateTemplateClose = () => {
    dispatch(switchCreateTemplate(false));
  };

  const isThingsToUndo = useStoreSelector((state) => state.tile.past).length;
  const isThingsToRedo = useStoreSelector((state) => state.tile.future).length;
  const isThingsToReset = isThingsToUndo;

  // Get current userId and item quantity in the shopping cart
  const curUserId = useStoreSelector(userData).userId;
  const { data } = useGetItemQuantityQuery(curUserId ? curUserId : skipToken);
  const quantity = data?.length;

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      bg="background.primary"
      p={4}
      minW="768px"
      w="100vw"
      position="fixed"
      zIndex={9999}
    >
      <Flex alignItems="center">
        <Link href={HOME_PAGE_LINK} passHref>
          <Button leftIcon={<IoIosArrowBack />} pl="0" variant="navbarIconBtn">
            Home
          </Button>
        </Link>
        {!isCartOpen && (
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
        )}
      </Flex>
      {!isCartOpen && !isMyTemplateOpen && !isSwitch3D ? <EditorDesignName /> : <Box></Box>}
      <Flex alignItems="center" justifyContent="flex-end">
        {!loginState ? (
          <Button onClick={handleLoginModalOpen}>Sign up / Login</Button>
        ) : (
          <Profile isOpen={isOpen} onOpen={onOpen} onClose={onClose} handleLogout={handleLogout} />
        )}
        <LoginModalContent
          isOpen={isLoginModalOpen}
          onClose={handleLoginModalClose}
          updateLoginData={updateLoginData}
        ></LoginModalContent>
        <ShoppingCartButton quantity={quantity} loginState={loginState} />
        <CreateTemplate
          isOpen={isCreateTemplateOpen}
          onClose={handleCreateTemplateClose}
        ></CreateTemplate>
        <Button
          variant="shareBtn"
          marginLeft="10px"
          onClick={loginState ? handleCreateTemplateOpen : handleLoginModalOpen}
          data-testid="share-btn"
        >
          Share
        </Button>
      </Flex>
    </Grid>
  );
};

export default NavigationBar;
