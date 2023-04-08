import React from "react";
import style from "./style.module.css";

import { useGetProductsQuery } from "../../../../store/product/product.api";
import ItemAside from "./posts";
import Pagination from "@/components/pagination/pagination";

const rightAside = () => {
  const { data = [], isLoading, error } = useGetProductsQuery();

  const count = data.length;
  const pageSize = 9;
  const [currentPage, setCurrentPage] = React.useState(1);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
  };

  const userCrop = paginate(data, currentPage, pageSize);

  return (
    <>
      <div className={style.main}>
        <div className={style.right}>
          {isLoading ? (
            "Loading..."
          ) : error ? (
            { error }
          ) : data ? (
            <>
              {userCrop.map((item) => (
                <ItemAside key={item.id} item={item} />
              ))}
            </>
          ) : null}
        </div>
        <div className={style.pagination}>
          <Pagination
            itemCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default rightAside;
