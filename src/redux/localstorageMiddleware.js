import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  setShippingCharge,
} from "./feature/cart/cartSlice";

const localstorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Store only the cart value in local storage after the actions have been dispatched
  if (
    action.type === addToCart.type ||
    action.type === removeFromCart.type ||
    action.type === incrementQuantity.type ||
    action.type === decrementQuantity.type ||
    action.type === setShippingCharge.type
  ) {
    localStorage.setItem("cart", JSON.stringify(store.getState()));
  }

  return result;
};

export default localstorageMiddleware;
