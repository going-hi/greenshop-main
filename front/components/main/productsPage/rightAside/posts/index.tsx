import React from "react";
import style from "./style.module.css";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const ItemAside:React.FC = ({ item }) => {
  const dispatch = useDispatch();
  const onClickAdd = () => {
    const product = {
      item,
    };
  };
  return (
    <>
      <div className={style.item}>
        <span className={style.substrate}>
          <img src={item.image} width={250} height={250} alt="image" />
          <span className={style.hidden}>
            <button className={style.btn} type="button">
              <Image src="/basket.svg" width={20} height={20} alt="basket" />
            </button>
            <button className={style.btn} type="button">
              <Image src="/like.svg" width={20} height={20} alt="like" />
            </button>
            <Link href={`/product/${item.id}`}>
              <button className={style.btn} type="button">
                <Image src="/look.svg" width={20} height={20} alt="look" />
              </button>
            </Link>
          </span>
        </span>
        <p className={style.description}>Краткое описание</p>
        <p className={style.price}>$ {item.price}</p>
      </div>
    </>
  );
};

export default ItemAside;
