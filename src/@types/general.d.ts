type HomeState = {
  products: ProductItem[];
  sliderImages: string[];
  cartItems: CartProductItem[];
  searchedResults: ProductItem[];
  pageNumber: number;
  totalProducts: number;
  totalSearchedProducts: number;
  totalAmount: number;
  selectedProduct: CartProductItem | null;
  favorites: ProductItem[];
  loading: boolean;
  error: any;
};
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

type CartProductItem = ProductItem & {
  quantity: number;
};

type UserAddress = {
  city:string;
  postCode:Number;
  address:string
}