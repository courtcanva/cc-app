import { ReactNode } from "react";
import { Box, Container } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
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
    </>
  );
};
export default Layout;
