import { ProductItem, TotalAmount } from "../../../@types/general";
import {
  SAVE_PRODUCTS_DATA_ACTION,
  SET_LOADING_ACTION,
  SET_ERROR_ACTION,
  SAVE_SLIDER_IMAGES_ACTION,
  SAVE_PTODUCTS_TOTAL_AMOOUNT_ACTION,
  NEXT_PAGE_DATA_ACTION,
  ADD_PRODUCT_CART_ACTION,
} from "./types";

export const SAVE_PRODUCTS_DATA = "SAVE_PRODUCTS_DATA";
export const SAVE_SLIDER_IMAGES = "SAVE_SLIDER_IMAGES";
export const SAVE_PRODUCTS_TOTAL_AMOUNT = "SAVE_PRODUCTS_TOTAL_AMOUNT";
export const NEXT_PAGE_DATA = "NEXT_PAGE";
export const ADD_PRODUCT_CART = 'ADD_PRODUCT_CART'
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

export const saveProductsData = (
  products: ProductItem[]
): SAVE_PRODUCTS_DATA_ACTION => ({
  type: SAVE_PRODUCTS_DATA,
  payload: products,
});

export const nextPage = (products: ProductItem[]): NEXT_PAGE_DATA_ACTION => ({
  type: NEXT_PAGE_DATA,
  payload: products,
});

export const saveSliderImages = (
  products: ProductItem[]
): SAVE_SLIDER_IMAGES_ACTION => ({
  type: SAVE_SLIDER_IMAGES,
  payload: products,
});

export const saveProductsTotalAmount = (
  total: TotalAmount
): SAVE_PTODUCTS_TOTAL_AMOOUNT_ACTION => ({
  type: SAVE_PRODUCTS_TOTAL_AMOUNT,
  payload: total,
});

export const addProductCart = (product:ProductItem):ADD_PRODUCT_CART_ACTION=>({
  type: ADD_PRODUCT_CART,
  payload:product
})

export const setLoading = (loading: boolean): SET_LOADING_ACTION => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error: string): SET_ERROR_ACTION => ({
  type: SET_ERROR,
  payload: error,
});
