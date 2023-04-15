import React from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "@/store/auth/authSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  React.useLayoutEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
