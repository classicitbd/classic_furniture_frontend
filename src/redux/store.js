
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import cartReducer from "./feature/cart/cartSlice";
import localstorageMiddleware from "./localstorageMiddleware";

const loadState = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    if (serializedCart === null) {
      return undefined;
    }
    return JSON.parse(serializedCart);
  } catch (error) {
    return undefined;
  }
};

const preloadedState = loadState();
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart: cartReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, localstorageMiddleware),
});

export default store;
