import { ADMIN_ACTIONS } from "./types";

export const SAVE_PRODUCTS_LIST = "SAVE_PRODUCTS_LIST";
export const SAVE_SEARCHED_PRODUCTS_LIST = "SAVE_SEARCHED_PRODUCTS_LIST";

export const saveProductsList = (products: ProductItem[]): ADMIN_ACTIONS => ({
  type: SAVE_PRODUCTS_LIST,
  products,
});

export const saveSearchedProductList = (
  products: ProductItem[],
  total_found: number
): ADMIN_ACTIONS => ({
  type: SAVE_SEARCHED_PRODUCTS_LIST,
  products,
  total_found,
});
