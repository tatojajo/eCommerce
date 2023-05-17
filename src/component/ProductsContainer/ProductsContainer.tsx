import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import {
  saveProductsData,
  saveProductsTotalAmount,
  saveSliderImages,
  nextPage,
} from "../../redux/HomeActions/HomeActions";

import ProductCard from "../ProductCard";

import {
  getAllProducts,
  productsNextpage,
} from "../../Helpers/Services/products";

import { Pagination, Stack } from "@mui/material";
import { MainContainer, ProductContainer } from "./ProductsContainer.Style";
import { HomeState, ProductItem } from "../../@types/general";
import { useAppSelector } from "../../redux/hooks";
import Slider from "../Slider/Slider";

const ProductsContainer = () => {
  const dispatch = useDispatch();

  const { products, totalProducts, searchedResults } =
    useAppSelector<HomeState>((state) => state);

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
    if (searchedResults.length === 0)
      try {
        const getproducts = async () => {
          const { data } = await getAllProducts();
          // console.log(data);
          dispatch(saveProductsData(data.products));
          dispatch(saveProductsTotalAmount(data.total_found));
          dispatch(saveSliderImages(data.products));
        };
        getproducts();
      } catch (error) {
        console.log(error);
      }
  }, []);
  // console.log(searchedResults, "searched");
  // console.log(products, "products");
  return (
    <MainContainer>
      <Slider />
      <div>
        <Stack spacing={2} mt={4}>
          <Pagination
            count={Math.ceil(totalProducts / 12)}
            page={pageNumber}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePage}
          />
        </Stack>
      </div>
      <ProductContainer>
        {(searchedResults.length === 0 ? products : searchedResults).map(
          (product: ProductItem) => {
            return <ProductCard key={product.id} product={product} />;
          }
        )}
      </ProductContainer>

      <div>
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(totalProducts / 12)}
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
