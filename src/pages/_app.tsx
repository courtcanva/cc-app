import React from "react";
import { StoreProvider } from "../stores";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { colors } from "../styles";
import { AppProps } from "next/app";

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider hydrationData={pageProps.hydrationData}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </StoreProvider>
  );
}

export default MyApp;
