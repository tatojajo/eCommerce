import { BackdropProps } from "@mui/material";

type ProductItem = {
  amount: string;
  brand: string;
  category: string;
  description: string;
  id: string;
  images: string[];
  price: string;
  rating: string;
  title: string;
};

type TotalAmount = {
  total_found: number;
};

type selectedProduct = ProductItem  | CartProductItem

type HomeState = {
  products: ProductItem[];
  sliderImages: [];
  totalProducts: number;
  cartItems: CartProductItem[];
  categories:string[]
  searchResults: ProductItem[] | null;
  selectedProduct:selectedProduct | null;
  loading: boolean;
  error: any;
};

type CartProductItem = ProductItem & {
  quantity: number;
};
