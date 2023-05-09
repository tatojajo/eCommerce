import { HomeState } from "../@types/general";
import {
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
} from "./CartActions/CartActions";
import { CART_ACTIONS } from "./CartActions/CartTypes";
import {
  ADD_PRODUCT_CART,
  MOVE_TO_PRODUCT_PAGE,
  NEXT_PAGE_DATA,
  SAVE_PRODUCTS_DATA,
  SAVE_PRODUCTS_TOTAL_AMOUNT,
  SAVE_SLIDER_IMAGES,
  SET_ERROR,
  SET_LOADING,
} from "./HomeActions/HomeActions";
import { HOME_ACTIONS } from "./HomeActions/HomeTypes";

const initialState: HomeState = {
  products: [],
  sliderImages: [],
  totalProducts: 0,
  cartItems: [],
  categories: [],
  searchResults: null,
  selectedProduct: null,
  loading: false,
  error: null,
};

const homeReducer = (
  state = initialState,
  action: HOME_ACTIONS | CART_ACTIONS
) => {
  switch (action.type) {
    case SAVE_PRODUCTS_DATA:
      return {
        ...state,
        products: action.products,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.type,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
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
      return { ...state, selectedProduct: action.product };
    case INCREASE_QUANTITY:
      const increaseQuantity = {
        ...action.product,
        quantity: action.product.quantity + 1,
      };
      const newCartItems = state.cartItems.map((item) => {
        if (item.id === increaseQuantity.id) {
          return increaseQuantity;
        }
        return item;
      });
      return { ...state, cartItems: newCartItems };
    case DECREASE_QUANTITY:
      const decreaseQuantity = {
        ...action.product,
        quantity: action.product.quantity - 1,
      };
      const itemsAfterDecreaseing = state.cartItems.map((item) => {
        if (item.id === decreaseQuantity.id) {
          return decreaseQuantity;
        }
        return item;
      });
      if (decreaseQuantity.quantity === 0) {
        const newItems = state.cartItems.filter(
          (item) => item.id !== decreaseQuantity.id
        );
        return { ...state, cartItems: newItems };
      }
      return { ...state, cartItems: itemsAfterDecreaseing };
    default:
      return state;
  }
};

export default homeReducer;
