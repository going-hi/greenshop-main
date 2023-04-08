import React from "react";
import style from "./style.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../../../store/cart/cartSlice";

const ItemAside = ({ item }) => {
  const dispatch = useDispatch();
  // const cartItem = useSelector((state) =>
  //   state.cart.items.find((obj) => obj.id === item.id)
  // );

  // const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const product = {
      item,
    };
    dispatch(addItem(product));
  };
  return (
    <>
      <div className={style.item}>
        <h3>{item.title}</h3>
        <h4>{item.description}</h4>
        <h5>{item.price}</h5>
        <Link item={item} href={`/product/${item.id}`}>
          полный товар
        </Link>
        <button className={style.btn} type="button" onClick={onClickAdd}>
          добавить
        </button>
      </div>
    </>
  );
};

export default ItemAside;
