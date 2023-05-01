import { ProductItem } from "../../../@types/general";
import { SAVE_PRODUCTS_DATA_ACTION } from "./types";

export const SAVE_PRODUCTS_DATA = "SAVE_PRODUCTS_DATA";

export const saveProductsData = (
  products: ProductItem[]
): SAVE_PRODUCTS_DATA_ACTION => ({
  type: SAVE_PRODUCTS_DATA,
  payload: products,
});
