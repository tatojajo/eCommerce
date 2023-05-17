import { DECREASE_QUANTITY, INCREASE_QUANTITY } from "./CartActions";
import { CartProductItem } from "../../@types/general";



export type INCREASE_QUANTITY_ACTION = {
    type: typeof INCREASE_QUANTITY;
    product:CartProductItem 
}

export type DECREASE_QUANTITY_ACTION = {
    type: typeof DECREASE_QUANTITY;
    product: CartProductItem
}


export type CART_ACTIONS = INCREASE_QUANTITY_ACTION | DECREASE_QUANTITY_ACTION