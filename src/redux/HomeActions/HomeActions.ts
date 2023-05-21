import {
  CartProductItem,
  HomeState,
  ProductItem,
  
} from "../../@types/general";
import Product from "../../pages/Product";
import { HOME_ACTIONS } from "./HomeTypes";

export const SAVE_PRODUCTS_DATA = "SAVE_PRODUCTS_DATA";
export const SAVE_SLIDER_IMAGES = "SAVE_SLIDER_IMAGES";
export const CHANGE_PAGE_NUMBER = 'CHANGE_PAGE_NUMBER'
export const SAVE_PRODUCTS_TOTAL_AMOUNT = "SAVE_PRODUCTS_TOTAL_AMOUNT";
export const NEXT_PAGE_DATA = "NEXT_PAGE";
export const ADD_PRODUCT_CART = "ADD_PRODUCT_CART";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const MOVE_TO_PRODUCT_PAGE = "MOVE_TO_PRODUCT_PAGE";
export const SAVE_CATEGORIES = "SAVE_CATEGORIES";
export const SAVE_SEARCHED_PRODUCTS = "SAVE_SEARCHED_PRODUCTS";
export const SEARCHED_PRODUCTS_NEXT_PAGE_DATA =
  "SEARCHED_PRODUCTS_NEXT_PAGE_DATA";
export const SET_FAVORITE_PRODUCTS = 'SET_FAVORITE_PRODUCTS'
export const REMOVE_FAVORITE_PRODUCT = 'REMOVE_FAVORITE_PRODUCT'


export const saveProductsData = (products: ProductItem[]): HOME_ACTIONS => ({
  type: SAVE_PRODUCTS_DATA,
  products,
});

export const changePageNumber = (value:number):HOME_ACTIONS=>({
type:CHANGE_PAGE_NUMBER,
value
})

export const nextPage = (products: ProductItem[]): HOME_ACTIONS => ({
  type: NEXT_PAGE_DATA,
  products,
});

export const saveSliderImages = (products: ProductItem[]): HOME_ACTIONS => ({
  type: SAVE_SLIDER_IMAGES,
  products,
});

export const saveProductsTotalAmount = (total: number): HOME_ACTIONS => ({
  type: SAVE_PRODUCTS_TOTAL_AMOUNT,
  total,
});

export const saveCategories = (categorie: string): HOME_ACTIONS => ({
  type: SAVE_CATEGORIES,
  categorie,
});

export const addProductCart = (product: ProductItem | CartProductItem): HOME_ACTIONS => ({
  type: ADD_PRODUCT_CART,
  product,
});

export const moveToProductPage = (product: ProductItem | CartProductItem): HOME_ACTIONS => ({
  type: MOVE_TO_PRODUCT_PAGE,
  product,
});

export const setLoading = (loading: boolean): HOME_ACTIONS => ({
  type: SET_LOADING,
  loading,
});

export const setError = (error: string): HOME_ACTIONS => ({
  type: SET_ERROR,
  error,
});

export const saveSearchedProducts = (
  products: ProductItem[],
  total_found: number
): HOME_ACTIONS => ({
  type: SAVE_SEARCHED_PRODUCTS,
  products,
  total_found,
});

export const searchedProductsNextPage = (
  products: ProductItem[]
): HOME_ACTIONS => ({
  type: SEARCHED_PRODUCTS_NEXT_PAGE_DATA,
  products,
});

export const favoriteProduct = (product:ProductItem):HOME_ACTIONS=>({
  type:SET_FAVORITE_PRODUCTS,
  product
})

export const removeFavoriteProduct=(product:ProductItem):HOME_ACTIONS=>({
  type: REMOVE_FAVORITE_PRODUCT,
  product
})