import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  subtotal: 0,
  quantity: 0,
  delivery_charge: 0,
  deliveryType: "",
  delivery_time: "",
};

const cartSlice = createSlice({
  name: "furnitureCart",
  initialState,
  reducers: {
    // add to cart
    addToCart: (state, action) => {
      state.products.push({ ...action.payload });

      // Recalculate subtotal
      state.subtotal = calculateSubtotal(state.products);

      // Update total quantity
      state.quantity = calculateTotalQuantity(state.products);
    },

    // remove from cart
    removeFromCart: (state, action) => {
      const indexToRemove = state.products.findIndex(
        (product) =>
          (product.size === action.payload?.size ||
            product.size === undefined) &&
          product.productId === action.payload.productId
      );

      if (indexToRemove !== -1) {
        // Remove the product from the cart
        state.products.splice(indexToRemove, 1);
      }

      // Recalculate subtotal
      state.subtotal = calculateSubtotal(state.products);

      // Update total quantity
      state.quantity = calculateTotalQuantity(state.products);
    },

    // increment quantity
    incrementQuantity: (state, action) => {
      const existingProduct = state.products.find(
        (product) =>
          (product.size === action.payload?.size ||
            product.size === undefined) &&
          product.productId === action.payload.productId
      );

      if (existingProduct) {
        // Increment the quantity of the existing product
        existingProduct.quantity += 1;
        existingProduct.product_partial_total_payment = action.payload.product_partial_total_payment;
        // state.quantity += 1;
      }

      // Recalculate subtotal
      state.subtotal = calculateSubtotal(state.products);

      // Update total quantity
      state.quantity = calculateTotalQuantity(state.products);
    },

    // decrement quantity
    decrementQuantity: (state, action) => {
      const existingProduct = state.products.find(
        (product) =>
          (product.size === action.payload?.size ||
            product.size === undefined) &&
          product.productId === action.payload.productId
      );

      if (existingProduct && existingProduct.quantity > 1) {
        // Decrement the quantity of the existing product
        existingProduct.quantity -= 1;
        existingProduct.product_partial_total_payment = action.payload.product_partial_total_payment;
        // state.quantity -= 1;
      } else if (existingProduct && existingProduct.quantity === 1) {
        // If quantity is 1, remove the product from the cart
        const indexToRemove = state.products.findIndex(
          (product) =>
            product.productId === action.payload.productId &&
            product.size === action.payload.size
        );

        if (indexToRemove !== -1) {
          state.products.splice(indexToRemove, 1);
        }
      }

      // Recalculate subtotal
      state.subtotal = calculateSubtotal(state.products);

      // Update total quantity
      state.quantity = calculateTotalQuantity(state.products);
    },

    setShippingCharge: (state, action) => {
      state.delivery_charge = action.payload?.delivery_charge;
    },

    setShippingTime: (state, action) => {
      state.delivery_time = action.payload?.delivery_time;
    },

    setShippingType: (state, action) => {
      state.deliveryType = action.payload?.deliveryType;
    },

  },
});

const calculateSubtotal = (products) => {
  return products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
};

const calculateTotalQuantity = (products) => {
  return products.reduce((totalQuantity, product) => {
    return totalQuantity + product.quantity;
  }, 0);
};

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  setShippingCharge,
  setShippingType,
  setShippingTime
} = cartSlice.actions;

export default cartSlice.reducer;
