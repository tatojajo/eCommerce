import { BackdropProps } from "@mui/material";

type ProductItem = {
  amount: string;
  barnd: string;
  category: string;
  description: string;
  id: string;
  images: string[];
  price: string;
  rating: string;
  title: string;
};

type TotalAmount = {
  total_found: number
}


type HomeState = {
  products:ProductItem[] | null;
  sliderImages:[];
  totalProducts:number;
  loading:boolean;
  error:any;
}
