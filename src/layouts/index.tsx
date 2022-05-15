import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import PriceBar from "../components/PriceBar";
import NavigationBar from "../components/NavBar";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <Box as="main">
        <NavigationBar />
        {children}
        <Footer />
      </Box>
      <PriceBar />
    </>
  );
};
export default Layout;
