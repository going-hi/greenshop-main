import React from "react";
import "@/styles/styles.css";
import Layout from "@/components/layout/Layout";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function App({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
