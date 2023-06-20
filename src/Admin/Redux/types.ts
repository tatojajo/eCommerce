import {
  ADD_NEW_IMAGE,
  DELETE_PRODUCT_IMAGE,
  SAVE_PRODUCTS_BRANDS,
  SAVE_PRODUCTS_LIST,
  SAVE_SEARCHED_PRODUCTS_LIST,
  SET_EDITABLE_PRODUCT
} from './action';

export type SAVE_PRODUCTS_LIST_ACTION = {
  type: typeof SAVE_PRODUCTS_LIST;
  products: ProductItem[];
};
export type SAVE_SEARCHED_PRODUCTS_LIST_ACTION = {
  type: typeof SAVE_SEARCHED_PRODUCTS_LIST;
  products: ProductItem[];
  total_found: number;
};

export type SET_EDITABLE_PRODUCT_ACTION = {
  type: typeof SET_EDITABLE_PRODUCT;
  product: ProductItem;
};

export type ADD_NEW_IMAGE_ACTION = {
  type: typeof ADD_NEW_IMAGE;
  image: string;
};

export type DELETE_PRODUCT_IMAGE_ACTION = {
  type: typeof DELETE_PRODUCT_IMAGE;
  imageIndex: number;
};

export type SAVE_PRODUCTS_BRANDS_ACTION = {
  type: typeof SAVE_PRODUCTS_BRANDS;
  brands: string[];
};
export type ADMIN_ACTIONS =
  | SAVE_PRODUCTS_LIST_ACTION
  | SAVE_SEARCHED_PRODUCTS_LIST_ACTION
  | SET_EDITABLE_PRODUCT_ACTION
  | ADD_NEW_IMAGE_ACTION
  | DELETE_PRODUCT_IMAGE_ACTION
  | SAVE_PRODUCTS_BRANDS_ACTION;
