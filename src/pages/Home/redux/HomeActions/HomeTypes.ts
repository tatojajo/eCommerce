import {
  ADD_PRODUCT_CART,
  CHANGE_PAGE_NUMBER,
  MOVE_TO_PRODUCT_PAGE,
  NEXT_PAGE_DATA,
  REMOVE_FAVORITE_PRODUCT,
  SAVE_PRODUCTS_DATA,
  SAVE_PRODUCTS_TOTAL_AMOUNT,
  SAVE_SEARCHED_PRODUCTS,
  SAVE_SLIDER_IMAGES,
  SEARCHED_PRODUCTS_NEXT_PAGE_DATA,
  SELECTED_BRANDS_PRODUCTS,
  SELECT_BRAND,
  SELECT_CATEGORY,
  SET_ERROR,
  SET_FAVORITE_PRODUCTS,
  SET_LOADING,
  SAVE_SIMILAR_PRODUCTS,
  SAVE_PRODUCTS_TO_FILTER,
  RESERVE_PRODUCT,
  CHANGE_THEME
} from './HomeActions';

export type SAVE_PRODUCTS_DATA_ACTION = {
  type: typeof SAVE_PRODUCTS_DATA;
  products: ProductItem[];
};

export type SAVE_PTODUCTS_TOTAL_AMOOUNT_ACTION = {
  type: typeof SAVE_PRODUCTS_TOTAL_AMOUNT;
  total: number;
};

export type SAVE_SLIDER_IMAGES_ACTION = {
  type: typeof SAVE_SLIDER_IMAGES;
  products: ProductItem[];
};

export type SELECT_CATEGORY_ACTION = {
  type: typeof SELECT_CATEGORY;
  category: Categories;
};

export type NEXT_PAGE_DATA_ACTION = {
  type: typeof NEXT_PAGE_DATA;
  products: ProductItem[];
};

export type CHANGE_PAGE_NUMBER_ACTION = {
  type: typeof CHANGE_PAGE_NUMBER;
  value: number;
};

export type ADD_PRODUCT_CART_ACTION = {
  type: typeof ADD_PRODUCT_CART;
  product: ProductItem | CartProductItem;
};

export type SET_LOADING_ACTION = {
  type: typeof SET_LOADING;
  loading: boolean;
};

export type SET_ERROR_ACTION = {
  type: typeof SET_ERROR;
  error: any;
};

export type MOVE_TO_PRODUCT_PAGE_ACTION = {
  type: typeof MOVE_TO_PRODUCT_PAGE;
  product: ProductItem;
};

export type SAVE_SEARCHED_PRODUCTS_ACTION = {
  type: typeof SAVE_SEARCHED_PRODUCTS;
  products: ProductItem[];
  total_found: number;
};

export type SEARCHED_PRODUCTS_NEXT_PAGE_DATA_ACTION = {
  type: typeof SEARCHED_PRODUCTS_NEXT_PAGE_DATA;
  products: ProductItem[];
};

export type SET_FAVORITE_PRODUCTS_ACTION = {
  type: typeof SET_FAVORITE_PRODUCTS;
  product: ProductItem;
};

export type REMOVE_FAVORITE_PRODUCT_ACTION = {
  type: typeof REMOVE_FAVORITE_PRODUCT;
  product: ProductItem;
};

export type SELECT_BRAND_ACTION = {
  type: typeof SELECT_BRAND;
  brand: string;
};

export type SELECTED_BRANDS_PRODUCTS_ACTION = {
  type: typeof SELECTED_BRANDS_PRODUCTS;
  products: ProductItem[];
};

export type SAVE_SIMILAR_PRODUCTS_ACTION = {
  type: typeof SAVE_SIMILAR_PRODUCTS;
  products: ProductItem[];
};

export type SAVE_PRODUCTS_TO_FILTER_ACTION = {
  type: typeof SAVE_PRODUCTS_TO_FILTER;
  products: ProductItem[];
  total_found: number;
};

export type RESERVE_PRODUCT_ACTION = {
  type: typeof RESERVE_PRODUCT;
  product: ProductItem;
};

export type CHANGE_THEME_ACTION = {
  type: typeof CHANGE_THEME;
  theme: string;
};
export type HOME_ACTIONS =
  | SAVE_PRODUCTS_DATA_ACTION
  | SAVE_PTODUCTS_TOTAL_AMOOUNT_ACTION
  | SAVE_SLIDER_IMAGES_ACTION
  | SELECT_CATEGORY_ACTION
  | CHANGE_PAGE_NUMBER_ACTION
  | NEXT_PAGE_DATA_ACTION
  | ADD_PRODUCT_CART_ACTION
  | SET_LOADING_ACTION
  | SET_ERROR_ACTION
  | MOVE_TO_PRODUCT_PAGE_ACTION
  | SAVE_SEARCHED_PRODUCTS_ACTION
  | SEARCHED_PRODUCTS_NEXT_PAGE_DATA_ACTION
  | SET_FAVORITE_PRODUCTS_ACTION
  | REMOVE_FAVORITE_PRODUCT_ACTION
  | SELECT_BRAND_ACTION
  | SELECTED_BRANDS_PRODUCTS_ACTION
  | SAVE_SIMILAR_PRODUCTS_ACTION
  | SAVE_PRODUCTS_TO_FILTER_ACTION
  | RESERVE_PRODUCT_ACTION
  | CHANGE_THEME_ACTION;
