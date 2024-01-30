import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  subtotal: 0,
  vat: 0,
  shippingCharge: 0,
  shippingType: "select",
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add to cart
    addToCart: (state, action) => {
      const existingIndex = state.products.findIndex(
        (product) =>
          product.productId === action.payload.productId &&
          product.size === action.payload.size
      );

      if (existingIndex !== -1) {
        // If the product already exists, decrement its quantity
        if (state.products[existingIndex].quantity > 1) {
          state.products[existingIndex].quantity -= 1;
          // state.quantity -= 1;
        } else {
          // If quantity is 1, remove the product from the cart
          state.products.splice(existingIndex, 1);
          // state.quantity += 1;
        }
      } else {
        // If the product doesn't exist, add it to the cart with quantity 1
        state.products.push({ ...action.payload, quantity: 1 });
        // state.quantity += 1;
      }

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
        // state.quantity -= 1;
      }

      // Recalculate subtotal
      state.subtotal = calculateSubtotal(state.products);

      // Update total quantity
      state.quantity = calculateTotalQuantity(state.products);

      // update delivery charge
      state.deliveryCharge = calculateDeliveryCharge(
        state.shippingType,
        state.quantity
      );
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

      // update delivery charge
      state.deliveryCharge = calculateDeliveryCharge(
        state.shippingType,
        state.quantity
      );
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

      console.log(state.quantity);

      // update delivery charge
      state.deliveryCharge = calculateDeliveryCharge(
        state.shippingType,
        state.quantity
      );
    },

    // // set Shipping Charge
    // setShippingCharge: (state, action) => {
    //   state.shippingCharge = action.payload;
    // },
    // // set Shipping Type
    // setShippingType: (state, action) => {
    //   state.shippingType = action.payload;
    // },

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
