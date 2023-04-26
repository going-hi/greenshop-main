import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { productApi } from "./product/product.api";

export function makeStore() {
  return configureStore({
    reducer: {
      [productApi.reducerPath]:productApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([productApi.middleware]),
  });
}

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore["getState"]>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<RootStore>(makeStore, { debug: true });
