import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";
import NavigationBar from "../components/NavBar";
import EditorSideBar from "../components/EditorSideBar";
import EditorFooter from "@/components/EditorFooter";
import PriceBar from "@/components/PriceBar";
import Custom404 from "@/pages/404";


const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  if(router.pathname === "/404") {
    return (
      <Box as="main">
        <Custom404 />
      </Box>
    )
  }
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
      <EditorFooter />
    </>
  );
};
export default Layout;
