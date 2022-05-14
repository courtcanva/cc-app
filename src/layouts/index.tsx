import { ReactNode } from "react";
import { Box, Container } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import PriceFooter from "../components/PriceFooter";
import PriceBar from "../components/PriceBar";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <Box as="main">
        <Container>{children}</Container>
        <Footer />
      </Box>
      <PriceBar />
      <PriceFooter />
      
    </>
  );
};
export default Layout;
