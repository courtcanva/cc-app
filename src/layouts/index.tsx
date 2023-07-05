import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Header from "./Header";
import NavigationBar from "../components/NavBar";
import EditorSideBar from "../components/EditorSideBar";
import ShoppingCart from "@/components/ShoppingCart";
import MyTemplate from "@/components/MyTemplate";
import { PAGE_NOT_FOUND, PAYMENT, MY_ORDER } from "../../src/constants";

import OrderGeneration from "@/components/OrderGeneration";
import MyAccount from "@/components/MyAccount";
import EditorRightSideBar from "@/components/EditorRightSideBar";
import TileBoard from "@/components/TileBoard";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();

  switch (router.pathname) {
    case PAGE_NOT_FOUND:
      return (
        <>
          <Header />
          <Box as="main">
            <NavigationBar />
            {children}
          </Box>
        </>
      );
    case MY_ORDER:
      return (
        <>
          <Header />
          <Box as="main">
            <NavigationBar />
            {children}
          </Box>
        </>
      );

    case PAYMENT:
      return (
        <>
          <Box as="main">
            <NavigationBar />
            {children}
          </Box>
        </>
      );

    default:
      return (
        <>
          <Header />
          <Box as="main">
            <NavigationBar />
            <MyTemplate />
            <MyAccount />
            <ShoppingCart />
            <OrderGeneration />
            <EditorSideBar />
            {children}
            <EditorRightSideBar />
          </Box>
          <TileBoard />
        </>
      );
  }
};
export default Layout;
