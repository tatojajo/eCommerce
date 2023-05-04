import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import {
  saveProductsData,
  saveProductsTotalAmount,
  saveSliderImages,
  nextPage,
} from "../../pages/Home/redux/actions";

import ProductCard from "../ProductCard";

import {
  getAllProducts,
  productsNextpage,
} from "../../Helpers/Services/products";

import { Pagination, Stack } from "@mui/material";
import { MainContainer, ProductContainer } from "./ProductsContainer.Style";
import { ProductItem } from "../../@types/general";
import { useAppSelector } from "../../redux/hooks";
import Slider from "../Slider/Slider";

const ProductsContainer = () => {
  const dispatch = useDispatch();

  const { products, totalProducts } = useAppSelector(
    (state) => state.homeReducer
  );

  const [pageNumber, setPageNumber] = useState(1);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageNumber(value);
  };

  const startIndex = (pageNumber - 1) * 20;

  useEffect(() => {
    const getNextpageProducts = async () => {
      const { data } = await productsNextpage(startIndex);
      dispatch(nextPage(data.products));
    };
    getNextpageProducts();
  }, [pageNumber]);

  useEffect(() => {
    try {
      const getproducts = async () => {
        const { data } = await getAllProducts();
        dispatch(saveProductsData(data.products));
        dispatch(saveProductsTotalAmount(data.total_found));
        dispatch(saveSliderImages(data.products));
      };
      getproducts();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <MainContainer>
      <Slider />
      <div>
        <Stack spacing={2} mt={4}>
          <Pagination
            count={Math.ceil(totalProducts / 20)}
            page={pageNumber}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePage}
          />
        </Stack>
      </div>
      <ProductContainer>
        {products.map((product: ProductItem) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </ProductContainer>

      <div>
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(totalProducts / 20)}
            page={pageNumber}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePage}
          />
        </Stack>
      </div>
    </MainContainer>
  );
};

export default ProductsContainer;
