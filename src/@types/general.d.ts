type ProductItem = {
  amount: string;
  brand: string;
  categories: string[];
  description: string;
  id: string;
  images: string[];
  price: number | string;
  rating: string;
  title: string;
  favorite?: boolean;
};
type CartProductItem = ProductItem & {
  quantity: number;
};
type HomeState = {
  selectedBrandsProducts: ProductItem[];
  searchedResults: ProductItem[];
  similarProducts: ProductItem[];
  cartItems: CartProductItem[];
  favorites: ProductItem[];
  products: ProductItem[];
  sliderImages: ProductItem[];
  selectedProduct: CartProductItem | null;
  totalSearchedProducts: number;
  selectedCategory: Categories;
  totalProducts: number;
  selectedBrand: string;
  totalAmount: number;
  pageNumber: number;
  loading: boolean;
  error: any;
};

type UserAddress = {
  city: string;
  postCode: Number;
  address: string;
};

interface ProductCartProps {
  product: ProductItem;
}

type AdminState = {
  allProducts: ProductItem[];
  editabeProduct: ProductItem | null;
  brands: string[];
};

type Categories = {
  value: string;
  label: string;
};
