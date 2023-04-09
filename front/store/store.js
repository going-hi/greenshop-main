import { configureStore } from "@reduxjs/toolkit";
import cart from "./cart/cartSlice";
import { productApi } from "./product/product.api";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    cart,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([productApi.middleware]),
  devTools: true,
});
