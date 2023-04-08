import Image from "next/image";
import React from "react";

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await response.json();

  return {
    props: {
      products: data,
    },
  };
};

const Item = ({ products }) => {
  return (
    <div>
      {products.title}
      <h1> {products.description}</h1>
    </div>
  );
};

export default Item;
