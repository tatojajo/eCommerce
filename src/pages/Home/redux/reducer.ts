import { DECREASE_QUANTITY, INCREASE_QUANTITY, REMOVE_CART_ITEM } from './CartActions/CartActions';
import { CART_ACTIONS } from './CartActions/CartTypes';
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
  SELECT_CATEGORY,
  SEARCHED_PRODUCTS_NEXT_PAGE_DATA,
  SELECTED_BRANDS_PRODUCTS,
  SELECT_BRAND,
  SET_ERROR,
  SET_FAVORITE_PRODUCTS,
  SET_LOADING,
  SAVE_SIMILAR_PRODUCTS,
  SAVE_PRODUCTS_TO_FILTER,
  RESERVE_PRODUCT,
  CHANGE_THEME
} from './HomeActions/HomeActions';
import { HOME_ACTIONS } from './HomeActions/HomeTypes';

const initialState: HomeState = {
  selectedBrandsProducts: [],
  searchedResults: [],
  similarProducts: [],
  reservedProducts: [],
  productsToFilter: [],
  sliderImages: [],
  cartItems: [],
  favorites: [],
  products: [],
  selectedCategory: {
    value: '',
    label: ''
  },
  totalSearchedProducts: 0,
  totalProductsToFilter: 0,
  totalProducts: 0,
  totalAmount: 0,
  pageNumber: 1,
  selectedProduct: null,
  selectedBrand: '',
  loading: false,
  error: null,
  themeMode: 'light'
};

const homeReducer = (state = initialState, action: HOME_ACTIONS | CART_ACTIONS) => {
  switch (action.type) {
    case SAVE_PRODUCTS_DATA: {
      const products = action.products;
      const addFavStatus = products.map((product) => {
        const isInFavorites = state.favorites.find((favProduct) => favProduct.id === product.id);

        if (isInFavorites) {
          return { ...product, favorite: true };
        } else {
          return { ...product, favorite: false };
        }
      });

      return {
        ...state,
        products: addFavStatus
      };
    }
    case SET_LOADING:
      return {
        ...state,
        loading: action.type
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error
      };
    case SAVE_PRODUCTS_TOTAL_AMOUNT:
      return {
        ...state,
        totalProducts: action.total
      };
    case SAVE_SLIDER_IMAGES:
      return { ...state, sliderImages: action.products };
    case CHANGE_PAGE_NUMBER:
      return { ...state, pageNumber: action.value };

    case NEXT_PAGE_DATA: {
      const products = action.products;
      const addFavStatus = products.map((product) => {
        const isInFavorites = state.favorites.find((favProduct) => favProduct.id === product.id);

        if (isInFavorites) {
          return { ...product, favorite: true };
        } else {
          return { ...product, favorite: false };
        }
      });
      return { ...state, products: addFavStatus };
    }
    case ADD_PRODUCT_CART:
      const productToAdd = action.product;
      const cartItems = state.cartItems;
      const existingProduct = cartItems.find((item) => item.id === productToAdd.id);
      if (!existingProduct) {
        if ('quantity' in productToAdd) {
          return { ...state, cartItems: [...cartItems, productToAdd] };
        }
        return {
          ...state,
          cartItems: [...cartItems, { ...productToAdd, quantity: 1 }]
        };
      }
      if (existingProduct) {
        if ('quantity' in productToAdd) {
          const existedProductNewQuantity = {
            ...productToAdd,
            quantity: productToAdd.quantity + existingProduct.quantity
          };
          const filterArray = cartItems.filter((item) => item.id !== existedProductNewQuantity.id);
          return {
            ...state,
            cartItems: [...filterArray, existedProductNewQuantity]
          };
        }
        const indexOfExistingProduct = cartItems.findIndex((item) => item.id === productToAdd.id);
        const sameProduct = cartItems[indexOfExistingProduct];
        const updatePorductQuantity = {
          ...sameProduct,
          quantity: sameProduct.quantity + 1
        };
        cartItems[indexOfExistingProduct] = updatePorductQuantity;
        return { ...state, cartItems: cartItems };
      }
    case MOVE_TO_PRODUCT_PAGE:
      if (state.selectedProduct?.id === action.product.id) {
        return { ...state, selectedProduct: action.product };
      }
      return { ...state, selectedProduct: { ...action.product, quantity: 1 } };
    case INCREASE_QUANTITY:
      const increaseQuantity = {
        ...action.product,
        quantity: action.product.quantity + 1
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
        quantity: action.product.quantity - 1
      };
      const itemsAfterDecreaseing = state.cartItems.map((item) => {
        if (item.id === decreaseQuantity.id) {
          return decreaseQuantity;
        }
        return item;
      });
      if (decreaseQuantity.quantity === 0) {
        const newItems = state.cartItems.filter((item) => item.id !== decreaseQuantity.id);
        return { ...state, cartItems: newItems };
      }
      return { ...state, cartItems: itemsAfterDecreaseing };
    case REMOVE_CART_ITEM:
      const myCart = state.cartItems.filter((item) => item.id !== action.product.id);
      return { ...state, cartItems: myCart };

    case SAVE_SEARCHED_PRODUCTS:
      const total_found = action.total_found;
      const searchedProducts = action.products;
      console.log(searchedProducts);
      return {
        ...state,
        searchedResults: searchedProducts,
        totalSearchedProducts: total_found
      };
    case SEARCHED_PRODUCTS_NEXT_PAGE_DATA:
      let prevPage = [...state.searchedResults];
      const moreProducts = [...prevPage, ...action.products];
      let uniqueProducts = moreProducts.filter((product, index) => {
        return moreProducts.indexOf(product) === index;
      });

      return {
        ...state,
        searchedResults: uniqueProducts
      };
    case SET_FAVORITE_PRODUCTS:
      return { ...state, favorites: [...state.favorites, action.product] };
    case REMOVE_FAVORITE_PRODUCT:
      const myFavProducts = state.favorites.filter((item) => item.id !== action.product.id);
      return { ...state, favorites: myFavProducts };
    case SELECT_BRAND:
      return { ...state, selectedBrand: action.brand };
    case SELECTED_BRANDS_PRODUCTS: {
      return { ...state, selectedBrandsProducts: action.products };
    }
    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: {
          ...state.selectedCategory,
          value: action.category.value,
          label: action.category.label
        }
      };
    case SAVE_SIMILAR_PRODUCTS:
      return { ...state, similarProducts: action.products };

    case SAVE_PRODUCTS_TO_FILTER: {
      return {
        ...state,
        productsToFilter: action.products,
        totalProductsToFilter: action.total_found
      };
    }
    case RESERVE_PRODUCT: {
      const prevReserved = state.reservedProducts;
      const productToAdd = action.product;
      const updateReservedProducts = [...prevReserved, productToAdd];
      localStorage.setItem('Reserved_Products', JSON.stringify(updateReservedProducts));
      console.log(state.reservedProducts);
      return { ...state, reservedProducts: updateReservedProducts };
    }
    case CHANGE_THEME: {
      return { ...state, themeMode: action.theme };
    }
    default:
      return state;
  }
};

export default homeReducer;
