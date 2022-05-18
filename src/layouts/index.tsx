import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import NavigationBar from "../components/NavBar";
import BottomMenu from "@/components/BottomMenu";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <Box as="main">
        <NavigationBar />
        {children}
        <Footer />
      </Box>
      <BottomMenu />
    </>
  );
};
export default Layout;
