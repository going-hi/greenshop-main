import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "@/store/auth/authSlice";

const Header = () => {
  const { pathname } = useRouter();
  const { items, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотитей выйти?")) {
      dispatch(logout());
    }
  };

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={150} height={35} />
      </Link>
      <nav className={styles.nav}>
        <Link href="/" className={pathname == "/" ? styles.active : ""}>
          Home
        </Link>
        <Link href="/shop" className={pathname == "/shop" ? styles.active : ""}>
          Shop
        </Link>
        <Link href="/shop" className={pathname == "/shop" ? styles.active : ""}>
          Plant Care
        </Link>
        <Link href="/shop" className={pathname == "/shop" ? styles.active : ""}>
          Blogs
        </Link>
      </nav>
      <span>
        {isAuth ? (
          <button onClick={onClickLogout}>Выйти </button>
        ) : (
          <Link href="/login">
            <button type="button">войти</button>
          </Link>
        )}
        <Link href="/registration">
          <span>регистрация</span>
        </Link>
        <Link href="/basket">
          <span>корзина:{items.length}</span>
        </Link>
        <span>обащя цена:{totalPrice}</span>
      </span>
    </header>
  );
};

export default Header;
