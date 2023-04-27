import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import Products from "../../../public/products.json";

import ProductReducer from "./ProductsReducer";
import { getAllProducts } from "../../Helpers/Services/products";
import axios from "axios";
import { setProductsState, setSliderImages } from "./productsAction";

type productsStore = {
  dispatch: any;
  products: object[];
  setProducts: any;
  handleTheme: any;
  state: any;
};

export const ProductsStoreContext = createContext({});

export const useProducts = () => useContext(ProductsStoreContext);

const initialValue = {
  products: [],
  total_products: "",
};

const ProductsProvider = ({ children }) => {
  const [sliderImages, setSliderImages] = useState([]);
  const [ProductsState, ProductDdispatch] = useReducer(
    ProductReducer,
    initialValue
  );
 
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await getAllProducts();
      ProductDdispatch(setProductsState(data.products, data.total_found));
    };
    getProducts();
  }, []);

  useMemo(() => {
    const imagesForSlider = () => {
      ProductsState.products.map((product) => {
        return setSliderImages((prev) => [...prev, { url: product.images[0] }]);
      });
    };
    imagesForSlider();
  }, [ProductsState.products]);

  const store = {
    sliderImages,
    ProductsState,
    ProductDdispatch,
  };

  return (
    <ProductsStoreContext.Provider value={store}>
      {children}
    </ProductsStoreContext.Provider>
  );
};

export default ProductsProvider;
