import React from "react";
import style from "./aside.module.css";


const AsideLeft = () => {
  return (
    <div className={style.aside}>
      <h4>Categories</h4>
      <span className={style.list}>
        <p>House Plants</p>
        <p>(24)</p>
      </span>
      <span className={style.list}>
        <p>House Plants</p>
        <p>(24)</p>
      </span>
      <span className={style.list}>
        <p>House Plants</p>
        <p>(24)</p>
      </span>
      <span className={style.list}>
        <p>House Plants</p>
        <p>(24)</p>
      </span>
      <span className={style.list}>
        <p>House Plants</p>
        <p>(24)</p>
      </span>
    </div>
  );
};

export default AsideLeft;
