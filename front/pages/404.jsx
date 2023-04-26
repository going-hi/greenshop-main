import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <div className="error">
      <span>
        <h1>Данной страницы или URL не существует.</h1>
        <Link href="/">Вернутся на главную страницу</Link>
      </span>
    </div>
  );
};

export default Error;
