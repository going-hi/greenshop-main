import React from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
