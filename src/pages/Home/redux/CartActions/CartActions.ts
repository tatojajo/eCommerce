import { CART_ACTIONS } from "./CartTypes";

export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";

export const increaseQuantity = (product: CartProductItem): CART_ACTIONS => ({
  type: INCREASE_QUANTITY,
  product,
});

export const decreaseQuantity = (product: CartProductItem): CART_ACTIONS => ({
  type: DECREASE_QUANTITY,
  product,
});

export const removeCartItem = (product: CartProductItem): CART_ACTIONS => ({
  type: REMOVE_CART_ITEM,
  product,
});
