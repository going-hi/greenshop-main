import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Header.module.css";
import { userAuth } from "@/hooks/userAuth";
import { removeUser } from "@/store/slices/userSlice";

const Header = () => {
  const { pathname } = useRouter();
  const { items, totalPrice } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const { isAuth, email } = userAuth();

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src="logo.svg" alt="logo" width={150} height={35} />
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
          <button onClick={() => dispatch(removeUser())}>Выйти {email}</button>
        ) : (
          <Link href="/login">
            <button type="button">Login</button>
          </Link>
        )}
        <Link href="/basket">
          <span>корзина:{items.length}</span>
        </Link>
        <span>обащя цена:{totalPrice}</span>
      </span>
    </header>
  );
};

export default Header;
