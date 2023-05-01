import { ProductItem, TotalAmount } from "../../../@types/general";
import {
  ADD_PRODUCT_CART,
  NEXT_PAGE_DATA,
  SAVE_PRODUCTS_DATA,
  SAVE_PRODUCTS_TOTAL_AMOUNT,
  SAVE_SLIDER_IMAGES,
  SET_ERROR,
  SET_LOADING,
} from "./actions";

export type SAVE_PRODUCTS_DATA_ACTION = {
  type: typeof SAVE_PRODUCTS_DATA;
  payload: ProductItem[];
};

export type SAVE_PTODUCTS_TOTAL_AMOOUNT_ACTION = {
  type: typeof SAVE_PRODUCTS_TOTAL_AMOUNT;
  payload: TotalAmount;
};

export type SAVE_SLIDER_IMAGES_ACTION = {
  type: typeof SAVE_SLIDER_IMAGES;
  payload: ProductItem[];
};

export type NEXT_PAGE_DATA_ACTION = {
  type: typeof NEXT_PAGE_DATA;
  payload: ProductItem[];
};

export type ADD_PRODUCT_CART_ACTION = {
  type: typeof ADD_PRODUCT_CART;
  payload: ProductItem;
};

export type SET_LOADING_ACTION = {
  type: typeof SET_LOADING;
  payload: boolean;
};

export type SET_ERROR_ACTION = {
  type: typeof SET_ERROR;
  payload: any;
};

export type HOME_ACTIONS =
  | SAVE_PRODUCTS_DATA_ACTION
  | SAVE_PTODUCTS_TOTAL_AMOOUNT_ACTION
  | SAVE_SLIDER_IMAGES_ACTION
  | NEXT_PAGE_DATA_ACTION
  | ADD_PRODUCT_CART_ACTION
  | SET_LOADING_ACTION
  | SET_ERROR_ACTION;
