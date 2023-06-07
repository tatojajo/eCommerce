import { SAVE_PRODUCTS_LIST,SAVE_SEARCHED_PRODUCTS_LIST } from "./action";
import { ADMIN_ACTIONS } from "./types";

const adminInitialState: AdminState = {
  allProducts: [],
};

const adminReducer = (state = adminInitialState, action: ADMIN_ACTIONS) => {
  switch (action.type) {
    case SAVE_PRODUCTS_LIST: {
        const newProducts = action.products;
        return { ...state, allProducts:newProducts};
    }
    case SAVE_SEARCHED_PRODUCTS_LIST:{
        
        const newProducts = action.products;
        return {...state, allProducts: newProducts}

    }
    default:
      return state;
  }
};

export default adminReducer;
