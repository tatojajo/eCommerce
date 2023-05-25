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

<<<<<<< HEAD
=======
type selectedProduct = ProductItem | CartProductItem;

type HomeState = {
  products: ProductItem[];
  sliderImages: string[];
  cartItems: CartProductItem[];
  searchedResults: ProductItem[];
  pageNumber:number
  totalProducts: number;
  totalSearchedProducts: number;
  totalAmount: number;
  selectedProduct: selectedProduct | null;
  favorites:ProductItem[]
  loading: boolean;
  error: any;
};

>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
type CartProductItem = ProductItem & {
  quantity: number;
};

<<<<<<< HEAD
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
=======

>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
