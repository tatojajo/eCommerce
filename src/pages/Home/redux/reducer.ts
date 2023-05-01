import { HomeState } from "../../../@types/general";
import {
  NEXT_PAGE_DATA,
  SAVE_PRODUCTS_DATA,
  SAVE_PRODUCTS_TOTAL_AMOUNT,
  SAVE_SLIDER_IMAGES,
  SET_ERROR,
  SET_LOADING,
} from "./actions";
import { HOME_ACTIONS } from "./types";

const initialState: HomeState = {
  products: [],
  loading: false,
  error: null,
  sliderImages: [],
  totalProducts: 0,
};

const homeReducer = (state = initialState, action: HOME_ACTIONS) => {
  switch (action.type) {
    case SAVE_PRODUCTS_DATA:
      return {
        ...state,
        products: action.payload,
      };
    case SAVE_PRODUCTS_TOTAL_AMOUNT:
      return {
        ...state,
        totalProducts: action.payload,
      };
    case SAVE_SLIDER_IMAGES:
      const products = action.payload;
      const images = products.map((product) => product.images[0]);
      return { ...state, sliderImages: images };
    case NEXT_PAGE_DATA:
      return { ...state, products: action.payload };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
