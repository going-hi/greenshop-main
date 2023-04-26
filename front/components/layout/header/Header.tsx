import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Api from "../../../api/index";

import styles from "./style.module.css";

const Header: React.FC = () => {
  const { pathname } = useRouter();

  const [isOpen, setIsOpen] = React.useState(false);

  const handleBurgerClick = () => {
    setIsOpen(!isOpen);
  };

  const onClickLogout = () => {
    if (window.confirm("Выйти?")) {
      Api.auth.logout();
      location.href = "/dashboard/auth";
    }
  };

  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <Image
            className={styles.logo}
            src="/logo.svg"
            alt="logo"
            width={150}
            height={35}
          />
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={pathname == "/" ? styles.active : ""}>
            Home
          </Link>
          <Link
            href="/shop"
            className={pathname == "/shop" ? styles.active : ""}
          >
            Shop
          </Link>
          <Link
            href="/shop"
            className={pathname == "/shop" ? styles.active : ""}
          >
            Plant Care
          </Link>
          <Link
            href="/posts"
            className={pathname == "/posts" ? styles.active : ""}
          >
            Blogs
          </Link>
          <button type="button" onClick={onClickLogout}>
            Выйти
          </button>
        </nav>
        <span className={styles.session}>
          <Link href="/registration">
            <span>регистрация</span>
          </Link>
        </span>
        <div onClick={handleBurgerClick} className={styles.burger}>
          <Image src="/burger.png" width={30} height={20} alt="burger" />
        </div>
      </header>
      {isOpen && (
        <nav className={styles.menu}>
          <ul>
            <li>
              <Link href="/" className={pathname == "/" ? styles.active : ""}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className={pathname == "/shop" ? styles.active : ""}
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className={pathname == "/shop" ? styles.active : ""}
              >
                Plant Care
              </Link>
            </li>
            <li>
              <Link
                href="/posts"
                className={pathname == "/posts" ? styles.active : ""}
              >
                Blogs
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Header;
