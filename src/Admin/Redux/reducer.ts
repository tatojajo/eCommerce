import {
  ADD_NEW_IMAGE,
  DELETE_PRODUCT_IMAGE,
  SAVE_PRODUCTS_BRANDS,
  SAVE_PRODUCTS_LIST,
  SAVE_SEARCHED_PRODUCTS_LIST,
  SET_EDITABLE_PRODUCT
} from './action';
import { ADMIN_ACTIONS } from './types';

const adminInitialState: AdminState = {
  allProducts: [],
  editabeProduct: null,
  brands: []
};

const adminReducer = (state = adminInitialState, action: ADMIN_ACTIONS) => {
  switch (action.type) {
    case SAVE_PRODUCTS_LIST: {
      const newProducts = action.products;
      return { ...state, allProducts: newProducts };
    }
    case SAVE_SEARCHED_PRODUCTS_LIST: {
      const newProducts = action.products;
      return { ...state, allProducts: newProducts };
    }
    case SET_EDITABLE_PRODUCT: {
      return { ...state, editabeProduct: action.product };
    }
    case ADD_NEW_IMAGE: {
      if (action.image === '') return { ...state, editabeProduct: state.editabeProduct };
      const prevProduct = state.editabeProduct;
      const withNewImage = { ...prevProduct, images: [...prevProduct!.images, action.image] };
      return { ...state, editabeProduct: withNewImage };
    }
    case DELETE_PRODUCT_IMAGE: {
      const prevProduct = state.editabeProduct;
      const afterDeleteImage = prevProduct?.images.filter(
        (image, index) => index !== action.imageIndex
      );
      return { ...state, editabeProduct: { ...state.editabeProduct, images: afterDeleteImage } };
    }
    case SAVE_PRODUCTS_BRANDS: {
      return { ...state, brands: action.brands };
    }
    default:
      return state;
  }
};

export default adminReducer;
