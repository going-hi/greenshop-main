import React from "react";
import AsideLeft from "./leftAside/AsideLeft";
import style from "./style.module.css";
import RightAside from "./rightAside/rightAside";

const FullAside: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <AsideLeft />
      <RightAside />
    </div>
  );
};

export default FullAside;
