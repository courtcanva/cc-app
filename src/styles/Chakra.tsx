import type { GetServerSideProps } from "next";
import { ChakraProvider, cookieStorageManager, localStorageManager } from "@chakra-ui/react";
import theme from "./theme";

interface ChakraProps {
  cookies: any;
  children: React.ReactNode;
}

export const Chakra = ({ cookies, children }: ChakraProps) => {
  const colorModeManager =
    typeof cookies === "string" ? cookieStorageManager(cookies) : localStorageManager;

  return (
    <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async function getServerSideProps({ req }) {
  return {
    props: {
      cookies: req.headers.cookie ?? "",
    },
  };
};
