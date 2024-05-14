import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  subtotal: 0,
  quantity: 0,
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
          product.productId === action.payload.productId &&
          product.size === action.payload.size
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
          product.productId === action.payload.productId &&
          product.size === action.payload.size
      );

      if (existingProduct) {
        // Increment the quantity of the existing product
        existingProduct.quantity += 1;
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
          product.productId === action.payload.productId &&
          product.size === action.payload.size
      );

      if (existingProduct && existingProduct.quantity > 1) {
        // Decrement the quantity of the existing product
        existingProduct.quantity -= 1;
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
      state.shippingType = action.payload;
      const deliveryCharge = calculateDeliveryCharge(
        state.subtotal,
        state.shippingType
      );
      state.shippingCharge = deliveryCharge;
    },

    setShippingType: (state, action) => {
      state.shippingType = action.payload;
      const deliveryCharge = calculateDeliveryCharge(
        state.shippingType,
        state.quantity
      );
      state.shippingCharge = deliveryCharge;
    },
  },
});

const calculateSubtotal = (products) => {
  return products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
};

const calculateDeliveryCharge = (shippingType, quantity) => {
  const insideDhakaCharge = 100;
  const additionalChargePerQuantity = 50; // Adjust the value as needed
  const outsideDhakaCharge = 160;

  if (shippingType === "Dhaka") {
    return (
      insideDhakaCharge +
      (quantity > 1 ? (quantity - 1) * additionalChargePerQuantity : 0)
    );
  } else {
    return outsideDhakaCharge;
  }
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
} = cartSlice.actions;

export default cartSlice.reducer;
