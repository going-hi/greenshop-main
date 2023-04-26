import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay } from "swiper";
import style from "./slider.module.css";
import Image from "next/image";

const Slider: React.FC = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        // autoplay={{
        //   delay: 5000,
        //   disableOnInteraction: false,
        // }}
        speed={700}
        // modules={[Pagination, Autoplay]}
        className={style.swiper}
      >
        <SwiperSlide>
          <div className={style.slider}>
            <div className={style.text}>
              <p className={style.title}>Welcome to GreenShop</p>
              <h1 className={style.main}>
                Let’s Make a Better
                <span>Planet</span>
              </h1>
              <p className={style.bottom}>
                We are an online plant shop offering a wide range of cheap and
                trendy plants. Use our plants to create an unique Urban Jungle.
                Order your favorite plants!
              </p>
              <button type="button">SHOP NOW</button>
            </div>
            <Image
              src="/slider.png"
              priority
              alt="slider"
              width={492}
              height={433}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.slider}>
            <div className={style.text}>
              <p className={style.title}>Welcome to GreenShop</p>
              <h1 className={style.main}>
                Let’s Make a Better
                <span>Planet</span>
              </h1>
              <p className={style.bottom}>
                We are an online plant shop offering a wide range of cheap and
                trendy plants. Use our plants to create an unique Urban Jungle.
                Order your favorite plants!
              </p>
              <button type="button">SHOP NOW</button>
            </div>
            <Image
              src="/slider.png"
              priority
              alt="slider"
              width={492}
              height={433}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.slider}>
            <div className={style.text}>
              <p className={style.title}>Welcome to GreenShop</p>
              <h1 className={style.main}>
                Let’s Make a Better
                <span>Planet</span>
              </h1>
              <p className={style.bottom}>
                We are an online plant shop offering a wide range of cheap and
                trendy plants. Use our plants to create an unique Urban Jungle.
                Order your favorite plants!
              </p>
              <button type="button">SHOP NOW</button>
            </div>
            <Image
              src="/slider.png"
              priority
              alt="slider"
              width={492}
              height={433}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
