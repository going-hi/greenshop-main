import React from "react";
import BasketItem from "./basketItem";
import { useDispatch, useSelector } from "react-redux";

const BasketPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  return (
    <>
      <div>компоненты корзины</div>
      {items.map((item) => (
        <BasketItem key={item.id} {...item} />
      ))}
    </>
  );
};

export default BasketPage;
