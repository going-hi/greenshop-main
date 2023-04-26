import React from "react";
import style from "./style.module.css";
import Image from "next/image";

const News: React.FC = () => {
  return (
    <>
      <div className={style.news}>
        <div className={style.wrapper}>
          <div className={style.item}>
            <Image src="/news-1.jpg" width={100} height={100} alt="news" />
            <p className={style.name}>Garden Care</p>
            <p className={style.description}>
              We are an online plant shop offering a wide range of cheap and
              trendy plants.
            </p>
          </div>
          <div className={style.item}>
            <Image src="/news-1.jpg" width={100} height={100} alt="news" />
            <p className={style.name}>Plant Renovation</p>
            <p className={style.description}>
              We are an online plant shop offering a wide range of cheap and
              trendy plants.
            </p>
          </div>
          <div className={style.item}>
            <Image src="/news-1.jpg" width={100} height={100} alt="news" />
            <p className={style.name}>Watering Gradene</p>
            <p className={style.description}>
              We are an online plant shop offering a wide range of cheap and
              trendy plants.
            </p>
          </div>
        </div>
        <form className={style.form}>
          <h4>Would you like to join newsletters?</h4>
          <span>
            <input
              type="email"
              placeholder="enter your email address..."
              required
            />
            <button type="submit">Join</button>
          </span>
          <p></p>
        </form>
      </div>
      <div className={style.bottom}>
        <Image
          className={style.logo}
          src="/logo.svg"
          width={150}
          height={26}
          alt="logo"
        />
        <span>
          <Image src="/Location.svg" width={20} height={20} alt="Локация" />
          70 West Buckingham Ave. Farmingdale, NY 11735
        </span>
        <span>
          <Image src="/mail.svg" width={20} height={20} alt="почта" />
          contact@greenshop.com
        </span>
        <span>
          <Image src="/tel.svg" width={20} height={20} alt="Локация" />
          +88 01911 717 490
        </span>
      </div>
    </>
  );
};

export default News;
