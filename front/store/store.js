import { configureStore } from "@reduxjs/toolkit";
import cart from "./cart/cartSlice";
import { productApi } from "./product/product.api";
import userReducer from "./slices/userSlice";
import { authReducer } from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    cart,
    user: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([productApi.middleware]),
  devTools: true,
});
