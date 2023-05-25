type HomeState = {
  selectedBrandsProducts:ProductItem[];
  searchedResults: ProductItem[];
  cartItems: CartProductItem[];
  favorites: ProductItem[];
  products: ProductItem[];
  sliderImages: string[];
  selectedProduct: CartProductItem | null;
  totalSearchedProducts: number;
  totalProducts: number;
  selectedBrand:string
  totalAmount: number;
  pageNumber: number;
  loading: boolean;
  error: any;
};
type ProductItem = {
  amount: string;
  brand: string;
  categories: string;
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

interface ProductCartProps {
  product: ProductItem;
}
