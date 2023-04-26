import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "@/utils/api/types";

export const productApi = createApi({
  reducerPath: "api/products",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (build) => ({
    getProducts: build.query<IProduct,string>({
      query: () => `products/`,
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
