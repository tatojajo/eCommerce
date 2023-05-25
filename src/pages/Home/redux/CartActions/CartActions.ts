import { CartProductItem } from "../../../../@types/general";
import { CART_ACTIONS } from "./CartTypes";

export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
<<<<<<< HEAD:src/pages/Home/redux/CartActions/CartActions.ts
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";
=======
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b:src/redux/CartActions/CartActions.ts

export const increaseQuantity = (product: CartProductItem): CART_ACTIONS => ({
  type: INCREASE_QUANTITY,
  product,
});

export const decreaseQuantity = (product: CartProductItem): CART_ACTIONS => ({
  type: DECREASE_QUANTITY,
  product,
});

<<<<<<< HEAD:src/pages/Home/redux/CartActions/CartActions.ts
export const removeCartItem = (product: CartProductItem): CART_ACTIONS => ({
  type: REMOVE_CART_ITEM,
  product,
});
=======
export const removeCartItem = (product:CartProductItem):CART_ACTIONS=>({
  type:REMOVE_CART_ITEM,
  product
})




>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b:src/redux/CartActions/CartActions.ts
