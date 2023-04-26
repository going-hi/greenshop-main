import Link from "next/link";
import React from "react";
import style from "./style.module.css";
import _ from "lodash"


const Pagination: React.FC = ({
  itemCount,
  pageSize,
  onPageChange,
  currentPage,
}) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  console.log(pages);
  return (
    <div className={style.pagination}>
      <ul className={style.list}>
        {pages.map((page, index) => (
          <li
            className={"page-item" + (page === currentPage ? " active" : " ")}
            key={index}
          >
            <button onClick={() => onPageChange(page)}>{page}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
