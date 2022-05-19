import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import NavigationBar from "../components/NavBar";
import EditorSideBar from "../components/EditorSideBar";
import BottomMenu from "@/components/BottomMenu";
import EditorFooter from "@/components/EditorFooter";


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
      <BottomMenu />
      <EditorFooter />
    </>
  );
};
export default Layout;
