import { ADMIN_ACTIONS } from './types';

export const SAVE_PRODUCTS_LIST = 'SAVE_PRODUCTS_LIST';
export const SAVE_SEARCHED_PRODUCTS_LIST = 'SAVE_SEARCHED_PRODUCTS_LIST';
export const SET_EDITABLE_PRODUCT = 'SET_EDITABLE_PRODUCT';
export const ADD_NEW_IMAGE = 'ADD_NEW_IMAGE';
export const DELETE_PRODUCT_IMAGE = 'DELETE_PRODUCT_IMAGE';
export const SAVE_PRODUCTS_BRANDS = 'SAVE_PRODUCTS_BRANDS';

export const saveProductsList = (products: ProductItem[]): ADMIN_ACTIONS => ({
  type: SAVE_PRODUCTS_LIST,
  products
});

export const saveSearchedProductList = (
  products: ProductItem[],
  total_found: number
): ADMIN_ACTIONS => ({
  type: SAVE_SEARCHED_PRODUCTS_LIST,
  products,
  total_found
});

export const setEditabelProduct = (product: ProductItem): ADMIN_ACTIONS => ({
  type: SET_EDITABLE_PRODUCT,
  product
});

export const addNewImage = (image: string): ADMIN_ACTIONS => ({
  type: ADD_NEW_IMAGE,
  image
});

export const deleteProductImage = (imageIndex: number): ADMIN_ACTIONS => ({
  type: DELETE_PRODUCT_IMAGE,
  imageIndex
});

export const saveBrands = (brands: string[]): ADMIN_ACTIONS => ({
  type: SAVE_PRODUCTS_BRANDS,
  brands
});
