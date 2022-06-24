import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import { Chakra } from "@/styles/Chakra";
import Layout from "@/layouts";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./style.css";

function CourtCanvaApp({ Component, pageProps }: AppProps) {
  return (
    <Chakra>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </GoogleOAuthProvider>
    </Chakra>
  );
}

export default CourtCanvaApp;
