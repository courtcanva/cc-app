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
import { PAGE_NOT_FOUND, TEAM_PAGE } from "../../src/constants";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();

  switch (router.pathname) {
    case TEAM_PAGE:
      return (
        <>
          <Header />
          <Box as="main">{children}</Box>
        </>
      );

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

    default:
      return (
        <>
          <Header />
          <Box as="main">
            <NavigationBar />
            <ShoppingCart />
            <EditorSideBar />
            {children}
            <TopBar />
          </Box>
          <PriceBar />
          <EditorFooter />
        </>
      );
  }
};
export default Layout;
