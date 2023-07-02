import { Flex, Button, IconButton, Grid, Tooltip, Box, useDisclosure } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import HOME_PAGE_LINK from "@/constants/index";
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
import { switchLoginModal, switchCreateTemplate } from "@/store/reducer/buttonToggleSlice";
import { useHandleLocalStorageItem } from "@/hooks/useHandleLocalStorage";
import CreateTemplate from "../CreateTemplate";
import Profile from "./Profile";
import { useRouter } from "next/router";
import UserTokenService from "@/utils/TokenService";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const { isLoginModalOpen, isCreateTemplateOpen } = useStoreSelector(
    (state) => state.buttonToggle
  );
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
    const refreshToken = UserTokenService.getLocalRefreshToken();
    if (refreshToken) {
      updateUserInfoInStorage().then(() => {
        const userInfo = localStorage.getItem("UserInfo");
        userInfo ? setLoginData(JSON.parse(userInfo)) : setLoginData(null);
        userInfo ? setLoginState(true) : setLoginState(false);
      });
    } else {
      setLoginData(null);
      setLoginState(false);
    }
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

  const handleCreateTemplateClose = () => {
    dispatch(switchCreateTemplate(false));
  };

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
      </Flex>

      <Box />

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
      </Flex>
    </Grid>
  );
};

export default NavigationBar;
