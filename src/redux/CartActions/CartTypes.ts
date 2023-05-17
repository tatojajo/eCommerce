import { DECREASE_QUANTITY, INCREASE_QUANTITY, REMOVE_CART_ITEM } from "./CartActions";
import { CartProductItem } from "../../@types/general";



export type INCREASE_QUANTITY_ACTION = {
    type: typeof INCREASE_QUANTITY;
    product:CartProductItem 
}

export type DECREASE_QUANTITY_ACTION = {
    type: typeof DECREASE_QUANTITY;
    product: CartProductItem
}

export type REMOVE_CART_ITEM_ACTION={
    type: typeof REMOVE_CART_ITEM;
    product:CartProductItem
}


export type CART_ACTIONS = INCREASE_QUANTITY_ACTION | DECREASE_QUANTITY_ACTION | REMOVE_CART_ITEM_ACTION