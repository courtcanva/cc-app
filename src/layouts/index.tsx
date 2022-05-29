import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";
import NavigationBar from "../components/NavBar";
import EditorSideBar from "../components/EditorSideBar";
import EditorFooter from "@/components/EditorFooter";
import PriceBar from "@/components/PriceBar";
import TopBar from "@/components/TopBar";
import { PAGE_NOT_FOUND } from "../../src/constants";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  if (router.pathname === PAGE_NOT_FOUND) {
    return (
      <>
        <Header />
        <Box as="main">
          <NavigationBar />
          {children}
        </Box>
      </>
    );
  }
  return (
    <>
      <Header />
      <Box as="main">
        <NavigationBar />
        <EditorSideBar />
        {children}
        <TopBar />
        <Footer />
      </Box>
      <PriceBar />
      <EditorFooter />
    </>
  );
};
export default Layout;
