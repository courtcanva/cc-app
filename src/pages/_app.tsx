import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import { Chakra } from "@/styles/Chakra";
import Layout from "@/layouts";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./style.css";
import { environment } from "@/constants/environment";
import useAuthRequest from "@/components/Login/helpers/authRequest";

function CourtCanvaApp({ Component, pageProps }: AppProps) {
  return (
    <Chakra>
      <GoogleOAuthProvider clientId={environment.googleClientId as string}>
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
