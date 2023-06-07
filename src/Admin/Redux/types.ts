import { SAVE_PRODUCTS_LIST, SAVE_SEARCHED_PRODUCTS_LIST } from "./action";

export type SAVE_PRODUCTS_LIST_ACTION = {
  type: typeof SAVE_PRODUCTS_LIST;
  products: ProductItem[];
};
export type SAVE_SEARCHED_PRODUCTS_LIST_ACTION = {
  type: typeof SAVE_SEARCHED_PRODUCTS_LIST;
  products: ProductItem[];
  total_found: number;
};

export type ADMIN_ACTIONS =
  | SAVE_PRODUCTS_LIST_ACTION
  | SAVE_SEARCHED_PRODUCTS_LIST_ACTION;
