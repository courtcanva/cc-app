import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import { Chakra } from "@/styles/Chakra";
import Layout from "@/layouts";
import "./style.css";

function CourtCanvaApp({ Component, pageProps }: AppProps) {
  return (
    <Chakra>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </Chakra>
  );
}

export default CourtCanvaApp;
