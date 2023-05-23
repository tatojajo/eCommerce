import {
  ADD_PRODUCT_CART,
  CHANGE_PAGE_NUMBER,
  MOVE_TO_PRODUCT_PAGE,
  NEXT_PAGE_DATA,
  REMOVE_FAVORITE_PRODUCT,
  SAVE_CATEGORIES,
  SAVE_PRODUCTS_DATA,
  SAVE_PRODUCTS_TOTAL_AMOUNT,
  SAVE_SEARCHED_PRODUCTS,
  SAVE_SLIDER_IMAGES,
  SEARCHED_PRODUCTS_NEXT_PAGE_DATA,
  SELECTED_BRANDS_PRODUCTS,
  SELECT_BRAND,
  SET_ERROR,
  SET_FAVORITE_PRODUCTS,
  SET_LOADING,
} from "./HomeActions";

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

export type SAVE_CATEGORIES_ACTION = {
  type: typeof SAVE_CATEGORIES;
  categorie: string;
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
  type:typeof SELECT_BRAND;
  brand:string
}

export type SELECTED_BRANDS_PRODUCTS_ACTION = {
  type:typeof SELECTED_BRANDS_PRODUCTS;
  products:ProductItem[]
}
export type HOME_ACTIONS =
  | SAVE_PRODUCTS_DATA_ACTION
  | SAVE_PTODUCTS_TOTAL_AMOOUNT_ACTION
  | SAVE_SLIDER_IMAGES_ACTION
  | SAVE_CATEGORIES_ACTION
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
  |SELECTED_BRANDS_PRODUCTS_ACTION;
