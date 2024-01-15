import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add to cart
    addToCart: (state, action) => {
      const existing = state.products.find(
        (product) =>
          product.id === action.payload.id &&
          product.size === action.payload.size
      );
      if (existing) {
        const updatedVariation = state.products.filter(
          (item) => item.size !== action.payload.size
        );
        state.products.push(updatedVariation)
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
