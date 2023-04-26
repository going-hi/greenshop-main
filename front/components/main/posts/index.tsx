import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import Link from "next/link";

const Posts: React.FC = () => {
  return (
    <div className={style.posts}>
      <h3>Our Blog Posts</h3>
      <p className={style.descr}>
        We are an online plant shop offering a wide range of cheap and trendy
        plants.
      </p>
      <div className={style.postsWrapper}>
        <div className={style.item}>
          {/* <Image url="" width={268} height={195} alt="blog" /> */}
          <div className={style.bottom}>
            <p className={style.date}>September 12 I Read in 6 minutes</p>
            <h4 className={style.title}>Cactus & Succulent Care Tips</h4>
            <p className={style.bottomDescr}>
              Cacti are succulents are easy care plants for any home or patio.{" "}
            </p>
            <Link href="/posts">
              Read More
              <svg
                width="12"
                height="10"
                viewBox="0 0 12 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.666656 4.81714C0.666656 4.56401 0.854759 4.35481 1.09881 4.3217L1.16666 4.31714L11.1667 4.31714C11.4428 4.31714 11.6667 4.541 11.6667 4.81714C11.6667 5.07027 11.4786 5.27947 11.2345 5.31257L11.1667 5.31714L1.16666 5.31714C0.890514 5.31714 0.666656 5.09328 0.666656 4.81714Z"
                  fill="#3D3D3D"
                />
                <path
                  d="M6.78066 1.15514C6.58498 0.960302 6.5843 0.64372 6.77914 0.448038C6.95627 0.270145 7.23401 0.25341 7.43006 0.398224L7.48624 0.446515L11.5196 4.46252C11.698 4.64017 11.7142 4.91891 11.5683 5.11496L11.5196 5.17111L7.48627 9.18778C7.29061 9.38264 6.97403 9.38198 6.77917 9.18632C6.60203 9.00844 6.58646 8.73063 6.7321 8.53519L6.78063 8.47921L10.458 4.81663L6.78066 1.15514Z"
                  fill="#3D3D3D"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className={style.item}>
          {/* <Image url="" width={268} height={195} alt="blog" /> */}
          <div className={style.bottom}>
            <p className={style.date}>September 12 I Read in 6 minutes</p>
            <h4 className={style.title}>Cactus & Succulent Care Tips</h4>
            <p className={style.bottomDescr}>
              Cacti are succulents are easy care plants for any home or patio.{" "}
            </p>
            <Link href="/posts">
              Read More
              <svg
                width="12"
                height="10"
                viewBox="0 0 12 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.666656 4.81714C0.666656 4.56401 0.854759 4.35481 1.09881 4.3217L1.16666 4.31714L11.1667 4.31714C11.4428 4.31714 11.6667 4.541 11.6667 4.81714C11.6667 5.07027 11.4786 5.27947 11.2345 5.31257L11.1667 5.31714L1.16666 5.31714C0.890514 5.31714 0.666656 5.09328 0.666656 4.81714Z"
                  fill="#3D3D3D"
                />
                <path
                  d="M6.78066 1.15514C6.58498 0.960302 6.5843 0.64372 6.77914 0.448038C6.95627 0.270145 7.23401 0.25341 7.43006 0.398224L7.48624 0.446515L11.5196 4.46252C11.698 4.64017 11.7142 4.91891 11.5683 5.11496L11.5196 5.17111L7.48627 9.18778C7.29061 9.38264 6.97403 9.38198 6.77917 9.18632C6.60203 9.00844 6.58646 8.73063 6.7321 8.53519L6.78063 8.47921L10.458 4.81663L6.78066 1.15514Z"
                  fill="#3D3D3D"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className={style.item}>
          {/* <Image url="" width={268} height={195} alt="blog" /> */}
          <div className={style.bottom}>
            <p className={style.date}>September 12 I Read in 6 minutes</p>
            <h4 className={style.title}>Cactus & Succulent Care Tips</h4>
            <p className={style.bottomDescr}>
              Cacti are succulents are easy care plants for any home or patio.{" "}
            </p>
            <Link href="/posts">
              Read More
              <svg
                width="12"
                height="10"
                viewBox="0 0 12 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.666656 4.81714C0.666656 4.56401 0.854759 4.35481 1.09881 4.3217L1.16666 4.31714L11.1667 4.31714C11.4428 4.31714 11.6667 4.541 11.6667 4.81714C11.6667 5.07027 11.4786 5.27947 11.2345 5.31257L11.1667 5.31714L1.16666 5.31714C0.890514 5.31714 0.666656 5.09328 0.666656 4.81714Z"
                  fill="#3D3D3D"
                />
                <path
                  d="M6.78066 1.15514C6.58498 0.960302 6.5843 0.64372 6.77914 0.448038C6.95627 0.270145 7.23401 0.25341 7.43006 0.398224L7.48624 0.446515L11.5196 4.46252C11.698 4.64017 11.7142 4.91891 11.5683 5.11496L11.5196 5.17111L7.48627 9.18778C7.29061 9.38264 6.97403 9.38198 6.77917 9.18632C6.60203 9.00844 6.58646 8.73063 6.7321 8.53519L6.78063 8.47921L10.458 4.81663L6.78066 1.15514Z"
                  fill="#3D3D3D"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className={style.item}>
          {/* <Image url="" width={268} height={195} alt="blog" /> */}
          <div className={style.bottom}>
            <p className={style.date}>September 12 I Read in 6 minutes</p>
            <h4 className={style.title}>Cactus & Succulent Care Tips</h4>
            <p className={style.bottomDescr}>
              Cacti are succulents are easy care plants for any home or patio.{" "}
            </p>
            <Link href="/posts">
              Read More
              <svg
                width="12"
                height="10"
                viewBox="0 0 12 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.666656 4.81714C0.666656 4.56401 0.854759 4.35481 1.09881 4.3217L1.16666 4.31714L11.1667 4.31714C11.4428 4.31714 11.6667 4.541 11.6667 4.81714C11.6667 5.07027 11.4786 5.27947 11.2345 5.31257L11.1667 5.31714L1.16666 5.31714C0.890514 5.31714 0.666656 5.09328 0.666656 4.81714Z"
                  fill="#3D3D3D"
                />
                <path
                  d="M6.78066 1.15514C6.58498 0.960302 6.5843 0.64372 6.77914 0.448038C6.95627 0.270145 7.23401 0.25341 7.43006 0.398224L7.48624 0.446515L11.5196 4.46252C11.698 4.64017 11.7142 4.91891 11.5683 5.11496L11.5196 5.17111L7.48627 9.18778C7.29061 9.38264 6.97403 9.38198 6.77917 9.18632C6.60203 9.00844 6.58646 8.73063 6.7321 8.53519L6.78063 8.47921L10.458 4.81663L6.78066 1.15514Z"
                  fill="#3D3D3D"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
