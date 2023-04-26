import React from "react";
import Slider from "./slider";
import FullAside from "./productsPage/fullAside";
import News from "./news";
import Posts from "./posts";

const Main = () => {
  return (
    <>
      <Slider />
      <FullAside />
      <Posts />
      <News />
    </>
  );
};

export default Main;
