import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import PriceBar from "../components/PriceBar";
import NavigationBar from "../components/NavBar";
import EditorSideBar from "../components/EditorSideBar";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <Box as="main">
        <NavigationBar />
        <EditorSideBar />
        {children}
        <Footer />
      </Box>
      <PriceBar />
    </>
  );
};
export default Layout;
