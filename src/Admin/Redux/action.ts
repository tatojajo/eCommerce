import { SAVE_CATEGORIES_ACTION } from "../../pages/Home/redux/HomeActions/HomeTypes"
import {SAVE_PRODUCTS_LIST_ACTION } from "./types"


export const SAVE_PRODUCTS_LIST = 'SAVE_PRODUCTS_LIST'


export const saveProductsList = (products:ProductItem[]):SAVE_PRODUCTS_LIST_ACTION =>({
    type:SAVE_PRODUCTS_LIST,
    products
})