import { ProductItem } from "../../../@types/general";
import { SAVE_PRODUCTS_DATA } from "./actions";

export type SAVE_PRODUCTS_DATA_ACTION = {
  type: typeof SAVE_PRODUCTS_DATA;
  payload: ProductItem[];
};

export type HOME_ACTIONS = SAVE_PRODUCTS_DATA_ACTION;
