import { HomeState } from "../../../@types/general";
import {
  ADD_PRODUCT_CART,
  MOVE_TO_PRODUCT_PAGE,
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
  categories:[],
  searchResults: null,
  selectedProduct:null ,
  loading: false,
  error: null,
};

const homeReducer = (state = initialState, action: HOME_ACTIONS) => {
  switch (action.type) {
    case SAVE_PRODUCTS_DATA:
      return {
        ...state,
        products: action.products,
      };
    case SAVE_PRODUCTS_TOTAL_AMOUNT:
      return {
        ...state,
        totalProducts: action.total,
      };
    case SAVE_SLIDER_IMAGES:
      const products = action.products;
      const images = products.map((product) => product.images[0]);
      return { ...state, sliderImages: images };
      // case SAVE_CATEGORIES:

    case NEXT_PAGE_DATA:
      return { ...state, products: action.products };
    case ADD_PRODUCT_CART:
      const productToAdd = action.product;
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
      case MOVE_TO_PRODUCT_PAGE:
       return {...state, selectedProduct: action.product}

    case SET_LOADING:
      return {
        ...state,
        loading: action.type
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default homeReducer;
