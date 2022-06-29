import { Flex, Button, IconButton, Grid, useDisclosure } from "@chakra-ui/react";
import { Menu, MenuButton } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { RiArrowGoBackLine, RiArrowGoForwardLine } from "react-icons/ri";
import Link from "next/link";
import HOME_PAGE_LINK from "@/constants/index";
import EditorDesignName from "@/components/NavBar/EditorDesignName";

import LoginModalContent from "../Login";
import { useEffect, useState } from "react";
import { useStoreSelector } from "@/store/hooks";

const NavigationBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // TODO: Try using customHooks later:https://usehooks.com/useLocalStorage/
  /* istanbul ignore next */
  const [loginData, setLoginData] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("loginData")
        ? JSON.parse(localStorage.getItem("loginData")!)
        : null
      : null
  );

  /* istanbul ignore next */
  const updateLoginData = (loginData: any) => {
    setLoginData(loginData);
  };

  /* istanbul ignore next */
  useEffect(() => {
    const userInfo = localStorage.getItem("UserInfo");
    userInfo && setLoginData(JSON.parse(userInfo))
  }, []);

  /* istanbul ignore next */
  const handleLogout = () => {
    localStorage.removeItem("UserInfo");
  };

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
        <Menu>
          <MenuButton as={Button} variant="navbarIconBtn">
            File
          </MenuButton>
        </Menu>
        <Flex flex="1" justifyContent="center">
          <IconButton
            aria-label="Revert edit"
            icon={<RiArrowGoBackLine />}
            variant="navbarIconBtn"
          />
          <IconButton
            aria-label="Forward edit"
            icon={<RiArrowGoForwardLine />}
            variant="navbarIconBtn"
            color="#72818B"
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
          <form method="post">
            <button onClick={handleLogout} style={{ color: "white" }} type="submit">
              Sign out
            </button>
          </form>
        )}
        <LoginModalContent
          isOpen={isOpen}
          onClose={onClose}
          updateLoginData={updateLoginData}
        ></LoginModalContent>
        <IconButton aria-label="Download design" icon={<FiDownload />} variant="navbarIconBtn" />
        <IconButton aria-label="Order" icon={<HiOutlineShoppingBag />} variant="navbarIconBtn" />
        <Button variant="shareBtn" marginLeft="10px" onClick={onOpen} data-testid="share-btn">
          Share
        </Button>
      </Flex>
    </Grid>
  );
};

export default NavigationBar;
