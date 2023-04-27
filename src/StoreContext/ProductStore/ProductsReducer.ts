import { useEffect } from "react";
import { getAllProducts } from "../../Helpers/Services/products";

const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.products, total_products:action.totalProducts
      };
     case 'NEXT_PAGE':
      return {
        ...state,
        products: action.products, total_products:action.totalProducts
      };
  }
};

export default ProductReducer;
