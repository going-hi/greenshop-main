import React from "react";
import { useSelector } from "react-redux";

const BasketItem = ({ item }) => {
  const { totalPrice } = useSelector((state) => state.cart);
  return (
    <>
     <span>
     товар
      <h1>{item.title}</h1>
      <h2>{item.price}</h2>
      <h3>{count}</h3>
      {totalPrice}
     </span>
    </>
  );
};

export default BasketItem;
