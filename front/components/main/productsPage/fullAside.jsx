import React from "react";
import AllProducts from "./rightAside/rightAside";
import AsideLeft from "./leftAside/AsideLeft";
import style from './style.module.css'

const FullAside = () => {
  return (
    <div className={style.wrapper}>
      <AsideLeft />
      <AllProducts />
    </div>
  );
};

export default FullAside;
