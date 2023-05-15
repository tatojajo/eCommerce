import { BackdropProps } from "@mui/material";

type ProductItem = {
  amount: string;
  brand: string;
  category: string;
  description: string;
  id: string;
  images: string[];
  price: number;
  rating: string;
  title: string;
};

type selectedProduct = ProductItem | CartProductItem;

type HomeState = {
  products: ProductItem[];
  sliderImages: [];
  cartItems: CartProductItem[];
  categories: string[];
  searchedResults: ProductItem[];
  mobiles: ProductItem[];
  television: ProductItem[];
  totalProducts: number;
  totalSearchedProducts: number;
  totalAmount: number;
  selectedProduct: selectedProduct | null;
  loading: boolean;
  error: any;
};

type CartProductItem = ProductItem & {
  quantity: number;
};
