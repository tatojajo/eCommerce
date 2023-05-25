import { SAVE_PRODUCTS_LIST } from "./action"


export type SAVE_PRODUCTS_LIST_ACTION =  {
    type:typeof SAVE_PRODUCTS_LIST
    products:ProductItem[]
}

export type ADMIN_ACTIONS = SAVE_PRODUCTS_LIST_ACTION