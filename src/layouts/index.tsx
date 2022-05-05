import { ReactNode } from "react";
import { Box, Container } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "../components/Footer";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <Box as="main">
        <Container>{children}</Container>
        <Footer />
      </Box>
    </>
  );
};
export default Layout;
