import { HomeState } from "../../../@types/general";
import {
  ADD_PRODUCT_CART,
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
  sliderImages: [],
  totalProducts: 0,
  cartItems: [],
  loading: false,
  error: null,
  searchResults: null
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
    case ADD_PRODUCT_CART:
      const productToAdd = action.payload;
      const cartItems = state.cartItems;
      const existingProduct = cartItems.find(
        (item) => item.id === productToAdd.id
      );
      if (!existingProduct) {
        return {
          ...state,
          cartItems: [...cartItems, { ...productToAdd, quantity: 1 }],
        };
      }
      if (existingProduct) {
        const indexOfExistingProduct = cartItems.findIndex(
          (item) => item.id === productToAdd.id
        );
        const sameProduct = cartItems[indexOfExistingProduct];
        const updatePorductQuantity = {
          ...sameProduct,
          quantity: sameProduct.quantity + 1,
        };
        cartItems[indexOfExistingProduct] = updatePorductQuantity;
        return { ...state, cartItems: cartItems };
      }
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
