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
      const existingIndex = state.products.findIndex(
        (product) =>
          product.id === action.payload.id &&
          product.size === action.payload.size
      );

      if (existingIndex !== -1) {
        // If the product already exists, decrement its quantity
        if (state.products[existingIndex].quantity > 1) {
          state.products[existingIndex].quantity -= 1;
        } else {
          // If quantity is 1, remove the product from the cart
          state.products.splice(existingIndex, 1);
        }
      } else {
        // If the product doesn't exist, add it to the cart with quantity 1
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },
    // remove from cart
    removeFromCart: (state, action) => {
      const indexToRemove = state.products.findIndex(
        (product) =>
          product.id === action.payload.id &&
          product.size === action.payload.size
      );

      if (indexToRemove !== -1) {
        // Remove the product from the cart
        state.products.splice(indexToRemove, 1);
      }
    },
    // increment quantity
    incrementQuantity: (state, action) => {
      const existingProduct = state.products.find(
        (product) =>
          product.id === action.payload.id &&
          product.size === action.payload.size
      );

      if (existingProduct) {
        // Increment the quantity of the existing product
        existingProduct.quantity += 1;
      }
    },
    // decrement quantity
    decrementQuantity: (state, action) => {
      const existingProduct = state.products.find(
        (product) =>
          product.id === action.payload.id &&
          product.size === action.payload.size
      );

      if (existingProduct && existingProduct.quantity > 1) {
        // Decrement the quantity of the existing product
        existingProduct.quantity -= 1;
      } else if (existingProduct && existingProduct.quantity === 1) {
        // If quantity is 1, remove the product from the cart
        const indexToRemove = state.products.findIndex(
          (product) =>
            product.id === action.payload.id &&
            product.size === action.payload.size
        );

        if (indexToRemove !== -1) {
          state.products.splice(indexToRemove, 1);
        }
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
