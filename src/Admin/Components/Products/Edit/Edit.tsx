import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";

type EditProductProdps = {
  product: ProductItem;
};

const editableproductState: ProductItem = {
  id: "",
  title: "",
  description: "",
  images: [],
  brand: "",
  categories: "",
  price: "",
  rating: "",
  amount: "",
};

const productValidationSchema = yup.object().shape({
  id: yup.string().required("Id is required"),
  title: yup.string().required("title is required"),
  description: yup.string().required("description is required"),
  brand: yup.string().required("brand is required"),
  categories: yup.string().required("categories is required"),
  price: yup.string().required("price is required"),
  rating: yup.string().required("rating is required"),
  amount: yup.string().required("amount is required"),
});
const EditProduct: FC<EditProductProdps> = ({ product }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductItem>({
    resolver: yupResolver(productValidationSchema),
  });

  const onSubmit: SubmitHandler<ProductItem> = async (product) => {};
  return <Box></Box>;
};

export default EditProduct;
