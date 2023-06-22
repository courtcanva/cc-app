import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Header from "./Header";
import NavigationBar from "../components/NavBar";
import EditorSideBar from "../components/EditorSideBar";
import EditorFooter from "@/components/EditorFooter";
import PriceBar from "@/components/PriceBar";
import TopBar from "@/components/TopBar";
import ShoppingCart from "@/components/ShoppingCart";
import MyTemplate from "@/components/MyTemplate";
import { PAGE_NOT_FOUND, PAYMENT, MY_ORDER } from "../../src/constants";

import OrderGeneration from "@/components/OrderGeneration";
import MyAccount from "@/components/MyAccount";
import EditorRightSideBar from "@/components/EditorRightSideBar";

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
            <TopBar />
            <EditorRightSideBar />
          </Box>
          <PriceBar />
          <EditorFooter />
        </>
      );
  }
};
export default Layout;
