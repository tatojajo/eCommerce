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
type HomeState = {
  selectedBrandsProducts:ProductItem[];
  searchedResults: ProductItem[];
  cartItems: CartProductItem[];
  favorites: ProductItem[];
  products: ProductItem[];
  sliderImages: ProductItem[];
  selectedProduct: CartProductItem | null;
  totalSearchedProducts: number;
  selectedCategory:Categories;
  totalProducts: number;
  selectedBrand:string
  totalAmount: number;
  pageNumber: number;
  loading: boolean;
  error: any;
};


type UserAddress = {
  city:string;
  postCode:Number;
  address:string
}

interface ProductCartProps {
  product: ProductItem;
}


type AdminState = {
  allProducts:ProductItem[]
}


type Categories = {
  value: string,
  label: string,
}
