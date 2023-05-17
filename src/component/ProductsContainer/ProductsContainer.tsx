import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import {
  saveProductsData,
  saveProductsTotalAmount,
  saveSliderImages,
  nextPage,
  changePageNumber,
} from "../../redux/HomeActions/HomeActions";

import ProductCard from "../ProductCard";

import {
  getAllProducts,
  productsNextpage,
} from "../../Helpers/Services/products";
import { MainContainer, ProductContainer } from "./ProductsContainer.Style";
import { HomeState, ProductItem } from "../../@types/general";
import { useAppSelector } from "../../redux/hooks";
import Slider from "../Slider/Slider";
import { Box, Pagination, Stack } from "@mui/material";
import useDebounce from "../../Helpers/CustomHooks/useBoolean/useDebounce";
import SideBar from "../Sidebar/Sidebar";

const ProductsContainer = () => {
  const dispatch = useDispatch();
  const { products, totalProducts, searchedResults, pageNumber, totalSearchedProducts } =
    useAppSelector<HomeState>((state) => state);

  const startIndex = (pageNumber - 1) * 12;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(changePageNumber(value));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (pageNumber > 1) {
          const { data } = await productsNextpage(startIndex);
          dispatch(nextPage(data.products));
        } else {
          
          const { data } = await getAllProducts();
          dispatch(saveProductsData(data.products));
          dispatch(saveProductsTotalAmount(data.total_found));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pageNumber]);

  return (
    <MainContainer>
      <Box>
        <Slider />

        <ProductContainer>
          {(searchedResults.length === 0 ? products : searchedResults).map(
            (product: ProductItem) => {
              return <ProductCard key={product.id} product={product} />;
            }
          )}
        </ProductContainer>

        <Box>
          <Stack spacing={2} mt={4}>
            <Pagination
              count={Math.ceil((totalSearchedProducts ? totalSearchedProducts : totalProducts) / 12)}
              page={pageNumber}
              variant="outlined"
              shape="rounded"
              onChange={handleChangePage}
            />
          </Stack>
        </Box>
      </Box>
    </MainContainer>
  );
};

export default ProductsContainer;
